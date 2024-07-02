import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { LatLng, Marker, Polyline, PROVIDER_GOOGLE, UserLocationChangeEvent } from 'react-native-maps';
import { useUserStore } from '../../../store/users/useUserStore';
import { TLocation } from '../../../interfaces/location';
import { getCurrentLocation } from '../../../actions/location/location';
import { Card } from '../../components/shared/Card';
import { AppText } from '../../components/shared';
import { colors } from '../../../config/theme/colors';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { HomeStackProps } from '../../../navigation/HomeStackNavigator';
import MapViewDirections, { MapDirectionsResponse } from 'react-native-maps-directions';
import { androidGoogleApiKey } from '../../../config/theme/variables';
import { TWaypoint } from '../../../interfaces/routers';

import { accelerometer, setUpdateIntervalForType, SensorTypes } from 'react-native-sensors';

setUpdateIntervalForType(SensorTypes.accelerometer, 400); // Actualiza cada 400ms

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
});

const calculateHeading = (accelData: {
    x: number, y: number
}) => {
    const { x, y } = accelData;
    const heading = Math.atan2(y, x) * (180 / Math.PI);
    return heading;
};

type DriverMapScreenProps = NativeStackScreenProps<HomeStackProps, 'DriverRouteMap'>


export const DriverMapScreen = ({ route: { params } }: DriverMapScreenProps) => {
    const { waypoints } = params;
    const user = useUserStore((state) => state.user);
    const mapViewRef = useRef<MapView>(null);

    const [heading, setHeading] = useState<number | null>(null)
    const [location, setLocation] = useState<TLocation | null>(null);
    const [locationToCalculateRoute, setLocationToCalculateRoute] = useState<TLocation | null>(null)
    const [destination, setDestination] = useState<TWaypoint | null>(null);
    const [originalRouteCoordinates, setOriginalRouteCoordinates] = useState<TLocation[]>([])
    const [remainingRouteCoordinates, setRemainingRouteCoordinates] = useState<TLocation[]>([])
    const [routeVariationDistance, setRouteVariationDistance] = useState<number[]>([])
    const [currentIndexMarker, setCurrentIndexMarker] = useState<number>(0)
    const [currentValue, setCurrentValue] = useState<number>(0)
    const [nextPointLocations, setNextPointLocations] = useState<string>("")
    const [refetchTimes, setRefetchTimes] = useState<number>(0)
    const [logRouteLocations, setLogRouteLocations] = useState<TLocation[]>([])

    useEffect(() => {
        (async () => {
            const loc = await getCurrentLocation();
            setLocation(loc);
            setLocationToCalculateRoute(loc)
            setLogRouteLocations(prev => [...prev, loc])
        })();
    }, []);

    useEffect(() => {
        if (waypoints && waypoints.length > 0) {
            setDestination(waypoints[0]);
        }
    }, [waypoints]);

    useEffect(() => {
        const accelSubscription = accelerometer.subscribe(({ x, y, z }) => {
            const accelData = { x, y, z };
            const currentHeading = calculateHeading(accelData);
            setHeading(currentHeading);
        });

        return () => {
            accelSubscription.unsubscribe();
        };
    }, []);

    useEffect(() => {
        if (location && destination) {
            const { latitude, longitude } = location;
            if (latitude && longitude) {
                mapViewRef.current?.animateCamera({
                    center: { latitude, longitude },
                    zoom: 20,
                    altitude: 100,
                    heading: heading || 0,
                    pitch: 30,
                });
            } else {
                console.warn('Invalid coordinates for destination');
            }
        }
    }, [location]);

    const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        const toRad = (x: number) => x * Math.PI / 180;
        const R = 6371; // Radius of the Earth in km
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return Number((R * c).toFixed(4)); // Distance in km
    };

    const handleUserLocationChange = (event: UserLocationChangeEvent) => {
        const { coordinate } = event.nativeEvent;
        if (coordinate) {
            setLocation({
                latitude: coordinate.latitude,
                longitude: coordinate.longitude,
            });

            const nearestPoint = remainingRouteCoordinates[currentIndexMarker];

            if (nearestPoint && coordinate) {
                const distanceToNearestPoint = haversineDistance(
                    coordinate.latitude,
                    coordinate.longitude,
                    nearestPoint.latitude,
                    nearestPoint.longitude
                );

                const nextPointCoordinates = `${nearestPoint.latitude},  ${nearestPoint.longitude}`


                if (distanceToNearestPoint < 0.01) {
                    console.log("MATCH: ", distanceToNearestPoint, "< 0.01 - ", distanceToNearestPoint < 0.01)
                    setRemainingRouteCoordinates(remainingRouteCoordinates.filter((_, index) => index !== currentIndexMarker))
                    setCurrentIndexMarker(0)
                }
                console.log(`REF IF  ${distanceToNearestPoint} > ${routeVariationDistance[currentIndexMarker]}`)
                if (distanceToNearestPoint > (routeVariationDistance[currentIndexMarker])) {
                    const differenceBtwLocations = distanceToNearestPoint - currentValue

                    if (differenceBtwLocations != 0) {
                        setLocationToCalculateRoute(coordinate)
                        setCurrentIndexMarker(0)
                        setCurrentValue(0)
                        setRefetchTimes(refetchTimes + 1)
                        console.log("Refetching because  ", differenceBtwLocations, "!= 0")
                    }
                }

                setCurrentValue(distanceToNearestPoint)
            }
        }
    }

    const handleDirectionsReady = (result: MapDirectionsResponse) => {
        setOriginalRouteCoordinates(result.coordinates);
        setRemainingRouteCoordinates(result.coordinates);

        const startLocation = {
            latitude: locationToCalculateRoute?.latitude || 0,
            longitude: locationToCalculateRoute?.longitude || 0,
        };

        const coordinatesToCalculate = [startLocation, ...result.coordinates];
        let variationDistanceArray: number[] = [];

        coordinatesToCalculate.forEach((coordinate, index) => {
            if (result.coordinates[index + 1]) {
                const distance = haversineDistance(
                    coordinate.latitude,
                    coordinate.longitude,
                    result.coordinates[index + 1].latitude,
                    result.coordinates[index + 1].longitude
                );

                variationDistanceArray.push(distance);
            }
        });

        setRouteVariationDistance(variationDistanceArray);
    };

    return (
        <View style={styles.container}>
            <Card>
                <AppText>En camino a {destination?.addressName} - {refetchTimes}</AppText>
            </Card>

            <MapView
                ref={mapViewRef}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                    latitude: 24.015576,
                    longitude: -104.657245,
                    latitudeDelta: 0.0021,
                    longitudeDelta: 0.0021,
                }}
                onUserLocationChange={handleUserLocationChange}
                showsUserLocation
            >
                {locationToCalculateRoute && destination && (
                    <MapViewDirections
                        origin={locationToCalculateRoute}
                        destination={destination.location}
                        apikey={androidGoogleApiKey}
                        strokeWidth={1}
                        strokeColor={colors.success}
                        timePrecision="now"
                        resetOnChange={false}
                        onStart={() => {
                            // console.log(`- Started routing from ${locationToCalculateRoute} to ${destination.addressName}`);
                        }}
                        onReady={handleDirectionsReady}
                        onError={(errorMessage) => {
                            console.log('Error with MapViewDirections:', errorMessage);
                        }}
                    />
                )}

                {destination && (
                    <Marker
                        coordinate={destination.location}
                        title={destination.addressName.split('Durango, Dgo')[0]}
                        identifier={destination.addressName}
                        description={destination.clientName}
                    />
                )}

                {remainingRouteCoordinates.length > 0 && location && (
                    <Polyline
                        coordinates={[location, ...remainingRouteCoordinates]}
                        strokeWidth={5}
                        strokeColor="blue"
                    />
                )}

                {location && (
                    <Marker
                        coordinate={location}
                        identifier='location'
                        image={require('../../../assets/truck.png')}
                    />
                )}

                {/* Marker to supply camera */}
                {

                }

                {location && remainingRouteCoordinates.length > 0 && (
                    <Marker
                        identifier='nextLocation'
                        coordinate={remainingRouteCoordinates[currentIndexMarker]}
                    />
                )}


                {/* {location && remainingRouteCoordinates.length > 0 && (
                    [location, ...remainingRouteCoordinates].map((coordinate, index) => (
                        <Marker
                            key={index}
                            title={`${index - 1} - ${haversineDistance(location.latitude, location.longitude, coordinate.latitude, coordinate.longitude).toFixed(5)} km`}
                            coordinate={coordinate}
                        />
                    ))
                )} */}
            </MapView>
        </View>
    )
}