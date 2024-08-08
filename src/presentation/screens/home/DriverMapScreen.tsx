import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, Alert, Pressable } from 'react-native';
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
import { FAB } from '../../components/shared/fab/Fab';
import { DriverMapStackProps } from '../../../navigation/DriverMapStack';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { BottomSheet } from '../../components/shared/BottomSheet';
import { MapOrderSale } from '../map/MapOrderSale';
import { sendMessage } from '../../../providers/WebsocketLocationProvider';

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

type DriverMapScreenProps = NativeStackScreenProps<DriverMapStackProps, 'DriverRouteMap'>


export const DriverMapScreen = ({ route: { params } }: DriverMapScreenProps) => {
    const { waypoints, route, numberAlreadyDelivered } = params;
    const user = useUserStore((state) => state.user);
    const mapViewRef = useRef<MapView>(null);
    const navigation = useNavigation<NavigationProp<DriverMapStackProps>>();

    const [heading, setHeading] = useState<number | null>(null)
    const [location, setLocation] = useState<TLocation | null>(null);
    const [locationToCalculateRoute, setLocationToCalculateRoute] = useState<TLocation | null>(null)
    const [destination, setDestination] = useState<TWaypoint | null>(null);
    const [originalRouteCoordinates, setOriginalRouteCoordinates] = useState<TLocation[]>([])
    const [remainingRouteCoordinates, setRemainingRouteCoordinates] = useState<TLocation[]>([])
    const [routeVariationDistance, setRouteVariationDistance] = useState<number[]>([])
    const [currentIndexMarker, setCurrentIndexMarker] = useState<number>(0)
    const [currentValue, setCurrentValue] = useState<number>(0)
    const [refetchTimes, setRefetchTimes] = useState<number>(0)
    const [logRouteLocations, setLogRouteLocations] = useState<TLocation[]>([])
    const [isFollowing, setIsFollowing] = useState<boolean>(false)
    const [hasArrived, setHasArrived] = useState<boolean>(false)

    const [currentWaypointIndex, setCurrentWaypointIndex] = useState(0);

    const currentOrder = useMemo(() => route.routeOrders.find((order) => order._id === waypoints[currentWaypointIndex]?.orderId), [route, currentWaypointIndex])
    useEffect(() => {
        (async () => {
            const loc = await getCurrentLocation();
            setLocation(loc);
            setLocationToCalculateRoute(loc)
        })();
    }, []);


    // useEffect(() => {
    //     if (waypoints && waypoints.length > 0) {
    //         setCurrentWaypointIndex(0);
    //         console.log("Reset waypoints")
    //     }
    //     // TODO: handle error
    // }, [waypoints])

    useEffect(() => {
        if (waypoints && waypoints.length > 0) {
            setDestination(waypoints[currentWaypointIndex]);
        }
    }, [waypoints, currentWaypointIndex]);

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
            if (latitude && longitude && isFollowing) {
                mapViewRef.current?.animateCamera({
                    center: { latitude, longitude },
                    zoom: 20,
                    altitude: 100,
                    heading: heading || 0,
                    pitch: 30,
                });
            } else if (isFollowing) {
                console.warn('Invalid coordinates for destination');
            }
        }
    }, [location]);

    const haversineDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        const toRad = (x: number) => x * Math.PI / 180;
        const R = 6371;
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


                if (distanceToNearestPoint < 0.01) {
                    setRemainingRouteCoordinates(remainingRouteCoordinates.filter((_, index) => index !== currentIndexMarker))
                    setCurrentIndexMarker(0)
                }
                if (distanceToNearestPoint > (routeVariationDistance[currentIndexMarker])) {
                    const differenceBtwLocations = distanceToNearestPoint - currentValue

                    if (differenceBtwLocations != 0) {
                        setLocationToCalculateRoute(coordinate)
                        setCurrentIndexMarker(0)
                        setCurrentValue(0)
                        setRefetchTimes(refetchTimes + 1)
                        // console.log("Refetching because  ", differenceBtwLocations, "!= 0")
                    }
                }

                const message = {
                    type: "location_update",
                    data: { name: user?.name, location },
                    clientId: user?._id,
                };


                sendMessage(message)

                setCurrentValue(distanceToNearestPoint)
                setLogRouteLocations([...logRouteLocations, coordinate])
            }
        }
    }

    const handleDirectionsReady = (result: MapDirectionsResponse) => {
        const startLocation = {
            latitude: locationToCalculateRoute?.latitude || 0,
            longitude: locationToCalculateRoute?.longitude || 0,
        };

        const coordinatesWithoutStart = result.coordinates.slice(1)

        const coordinatesToCalculate = [startLocation, ...coordinatesWithoutStart];

        setOriginalRouteCoordinates(coordinatesWithoutStart);
        setRemainingRouteCoordinates(coordinatesWithoutStart);


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

    useEffect(() => {

        if (destination && location) {
            const { latitude: latD, longitude: lonD } = destination?.location

            const distanceToDestination = haversineDistance(
                location.latitude, location.longitude,
                latD, lonD
            )
            if (distanceToDestination < 0.07) {
                setHasArrived(true)
            }
        }
    }, [location, destination])


    return (
        <>
            <View style={styles.container}>
                <Card>
                    <AppText>En camino a {destination?.addressName} - {currentWaypointIndex}</AppText>
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
                    onPanDrag={() => {
                        if (isFollowing) setIsFollowing(false);
                    }}
                    showsUserLocation
                >
                    {locationToCalculateRoute && destination && !hasArrived && (
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

                    {remainingRouteCoordinates.length > 0 && location && !hasArrived && (
                        <Polyline
                            coordinates={[location, ...remainingRouteCoordinates]}
                            strokeWidth={5}
                            strokeColor="blue"
                        />
                    )}

                    {/* {logRouteLocations.length > 0 &&
                    <Polyline
                    coordinates={logRouteLocations}
                    strokeWidth={5}
                    strokeColor="red"
                    />
                    }  */}

                    {location && (
                        <Marker
                            coordinate={location}
                            identifier='location'
                            image={require('../../../assets/truck.png')}
                        />
                    )}

                    {/* {location && remainingRouteCoordinates.length > 0 && (
                        <Marker
                            identifier='nextLocation'
                            coordinate={remainingRouteCoordinates[currentIndexMarker]}
                        />
                    )} */}
                </MapView>
            </View>
            {
                !isFollowing && <FAB
                    iconName='compass'
                    onPress={() => {
                        setIsFollowing(true)
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
                            } else if (isFollowing) {
                                console.warn('Invalid coordinates for destination');
                            }
                        }

                    }}
                    style={{
                        bottom: 230,
                        left: 15
                    }}
                />
            }
            <FAB
                iconName='dollar'
                onPress={() => {
                    navigation.navigate('QuickSaleScreen')
                }}
                style={{
                    bottom: 230,
                    right: 15
                }}
            />
            <FAB
                iconProvider='Ionicons'
                iconName="person-add"
                onPress={() => {
                    navigation.navigate('CreateClientScreen')
                }}
                style={{
                    bottom: 290,
                    right: 15
                }}
            />
            {
                currentOrder &&
                <BottomSheet>
                    <MapOrderSale
                        key={currentOrder._id}
                        order={currentOrder}
                        total={route.routeOrders.length}
                        current={currentWaypointIndex + 1 + numberAlreadyDelivered}
                        hasArrived={hasArrived}
                        onCloseSale={() => {
                            setHasArrived(false)

                            if ((currentWaypointIndex + 1) === waypoints.length) { // +1 because the currentWaypointIndex is 0 based
                                navigation.navigate('NoRouteForDriver')
                                return;
                            }

                            setCurrentWaypointIndex(currentWaypointIndex + 1)
                        }}
                    />

                    {/* <Pressable style={{
                        backgroundColor: colors.red,
                        width: 30,
                        height: 30,
                        position: 'absolute',
                        top: 10,
                        zIndex: 200,
                        alignItems: 'center'
                    }} onPress={() => {
                        setCurrentWaypointIndex(currentWaypointIndex + 1)
                        setHasArrived(true)
                    }}>
                        <AppText>+</AppText>
                    </Pressable>
                    <Pressable style={{
                        backgroundColor: colors.red,
                        width: 30,
                        height: 30,
                        position: 'absolute',
                        top: 40,
                        zIndex: 200,
                        alignItems: 'center'
                    }} onPress={() => {
                        setCurrentWaypointIndex(currentWaypointIndex - 1)
                        setHasArrived(true)
                    }}>
                        <AppText>-</AppText>
                    </Pressable> */}
                </BottomSheet>
            }
        </>
    )
}