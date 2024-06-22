import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { useUserStore } from '../../../store/users/useUserStore';
import { useFetchRouteByUserId } from '../../hooks/routers/useFetchRouteByUserId';
import UserMarker from './UserMarker';
import DriverMarkers from './DriverMarkers';
import WaypointMarkers from './WaypointMarkers';
import MapDirections from './MapDirections';
import { TLocation, TMarker } from '../../../interfaces/location';
import { getCurrentLocation } from '../../../actions/location/location';
import { TWaypoint } from '../../../interfaces/routers';

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

export const MainMap: React.FC = () => {
    const user = useUserStore((state) => state.user);
    const mapViewRef = useRef<MapView>(null);

    const { routeOnView } = useFetchRouteByUserId(user?._id || '');

    const [location, setLocation] = useState<TLocation>({ latitude: 24.015576, longitude: -104.657245 });
    const [marker, setMarker] = useState<TMarker | null>(null);

    useEffect(() => {
        getCurrentLocation().then(loc => {
            setLocation(loc);
            setMarker({
                latitude: loc.latitude,
                longitude: loc.longitude,
                title: 'Mi ubicación',
                description: 'Mi ubicación actual'
            });
            if (mapViewRef.current) {
                mapViewRef.current.animateCamera({
                    center: loc,
                });
            }
        });
    }, [mapViewRef]);

    const waypoints: TWaypoint[] = routeOnView?.routeOrders.map(order => ({
        clientName: order.clientName,
        clientId: order.clientId,
        userId: order.userId,
        location: {
            lat: order.location.lat,
            lng: order.location.lng,
        }
    })) || [];

    if (!user) {
        return null;
    }

    return (
        <View style={styles.container}>
            <MapView
                ref={mapViewRef}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                    latitude: 24.015576,
                    longitude: -104.657245,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                }}
                showsUserLocation
            >
                <UserMarker marker={marker} />
                <DriverMarkers />
                <WaypointMarkers currentLocation={location} waypoints={waypoints} userId={user._id} />
                {/*<MapDirections origin={location} mapViewRef={mapViewRef} waypoints={waypoints.map(wp => wp.location)} />*/}
            </MapView>
        </View>
    );
};

