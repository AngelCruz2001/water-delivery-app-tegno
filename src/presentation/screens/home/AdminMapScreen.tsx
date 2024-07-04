
import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, Pressable } from 'react-native';
import MapView, { LatLng, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { useUserStore } from '../../../store/users/useUserStore';
import { useFetchRouteByUserId } from '../../hooks/routers/useFetchRouteByUserId';
import UserMarker from './UserMarker';
import DriverMarkers from './DriverMarkers';
import WaypointMarkers from './WaypointMarkers';
import MapDirections from './MapDirections';
import { TLocation, TMarker } from '../../../interfaces/location';
import { getCurrentLocation } from '../../../actions/location/location';
import { TWaypoint } from '../../../interfaces/routers';
import { Card } from '../../components/shared/Card';
import { Text } from 'react-native-svg';
import { DataItem } from '../../components/shared/DataItem';
import { ScreenScrollContainer } from '../../components/shared/ScreenScrollContainer';
import { colors } from '../../../config/theme/colors';
import { AppText } from '../../components/shared';
import { paddingMap } from '../../../config/theme/globalstyle';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { HomeStackProps } from '../../../navigation/HomeStackNavigator';
import { useDriverStore } from '../../../store/driver/useDriverStore';

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

type MainMapProps = NativeStackScreenProps<HomeStackProps, 'AdminRouteScreenMap'>

export const AdminMapScreen = () => {
    const user = useUserStore((state) => state.user);
    const mapViewRef = useRef<MapView>(null);

    const activeDriver = useDriverStore((state) => state.activeDriver)
    const routeFollowedByActiveDrive = useDriverStore((state) => state.routeFollowedByActiveDrive)
    const [location, setLocation] = useState<TLocation>({ latitude: 24.015576, longitude: -104.657245 });


    console.log(routeFollowedByActiveDrive)

    useEffect(() => {
        getCurrentLocation().then(loc => {
            setLocation(loc);
            if (mapViewRef.current) {
                mapViewRef.current.animateCamera({
                    center: loc,
                });
            }
        });
    }, [mapViewRef]);

    // useEffect(() => {
    //     if (activeDriver && activeDriver.routeMade) {
    //         setRouteFollowedByActiveUser(activeDriver.routeMade)
    //     }
    // }, [activeDriver])

    // console.log("ActiveDriver", activeDriver?.routeMade?.length)
    return (
        <>

            <MapView
                ref={mapViewRef}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                    latitude: 24.015576,
                    longitude: -104.657245,
                    latitudeDelta: 0.5,
                    longitudeDelta: 0.5,
                }}
                showsUserLocation
            >
                {/* <UserMarker marker={marker} />  */}
                <DriverMarkers />
                {
                    routeFollowedByActiveDrive && routeFollowedByActiveDrive.length > 0 &&
                    <Polyline coordinates={routeFollowedByActiveDrive} strokeWidth={4} strokeColor={colors.primary} />
                }
                {/* <MapDirections origin={location} mapViewRef={mapViewRef} destination={location} waypoints={waypoints} /> */}
                {/* <WaypointMarkers currentLocation={location} waypoints={waypoints} /> */}
            </MapView>

        </>
    );
};

