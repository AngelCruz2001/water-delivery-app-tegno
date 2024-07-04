
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
import { TDisplayRoute, TWaypoint } from '../../../interfaces/routers';
import { Card } from '../../components/shared/Card';
import { Text } from 'react-native-svg';
import { DataItem } from '../../components/shared/DataItem';
import { ScreenScrollContainer } from '../../components/shared/ScreenScrollContainer';
import { colors } from '../../../config/theme/colors';
import { AppText } from '../../components/shared';
import { paddingMap, roundedMap } from '../../../config/theme/globalstyle';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { HomeStackProps } from '../../../navigation/HomeStackNavigator';
import { useDriverStore } from '../../../store/driver/useDriverStore';
import { BottomSheet } from '../../components/shared/BottomSheet';
import { useRoutesStore } from '../../../store/routes/useRoutesStore';
import { useGetRoutes } from '../../hooks/routers/useGetRoutes';
import Icon from 'react-native-vector-icons/Ionicons';

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

    const { } = useGetRoutes()

    const routes = useRoutesStore((state) => state.routes)
    const mapViewRef = useRef<MapView>(null);

    const activeDriver = useDriverStore((state) => state.activeDriver)
    const routeFollowedByActiveDrive = useDriverStore((state) => state.routeFollowedByActiveDrive)


    const [activeRoute, setActiveRoute] = useState<TDisplayRoute>()
    // const [location, setLocation] = useState<TLocation>({ latitude: 24.015576, longitude: -104.657245 });

    useEffect(() => {
        if (activeDriver && activeDriver._id) {
            const activeRouteWork = routes.find(route => route.driverId === activeDriver._id)
            setActiveRoute(activeRouteWork)
        }
    }, [routes, activeDriver])

    useEffect(() => {
        if (activeDriver ) {
            mapViewRef.current?.animateCamera({ center: activeDriver?.location, zoom: 18 })
        }
    }, [activeDriver])



    // console.log({ routeFollowedByActiveDrive })

    // useEffect(() => {
    //     getCurrentLocation().then(loc => {
    //         setLocation(loc);
    //         if (mapViewRef.current) {
    //             mapViewRef.current.animateCamera({
    //                 center: loc,
    //             });
    //         }
    //     });
    // }, [mapViewRef]);

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
                    activeDriver && <Polyline coordinates={routeFollowedByActiveDrive} strokeWidth={4} strokeColor={colors.primary} />
                }
                {/* <MapDirections origin={location} mapViewRef={mapViewRef} destination={location} waypoints={waypoints} /> */}
                {/* <WaypointMarkers currentLocation={location} waypoints={waypoints} /> */}

            </MapView>

            {
                false &&

                <BottomSheet>

                    <View
                        style={{
                            flex: 1,
                        }}
                    >

                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingHorizontal: paddingMap.horizontalCard,
                                gap: 10,
                                marginTop: 10,
                                maxWidth: '80%',
                            }}
                        >
                            <View
                                style={{
                                    paddingVertical: paddingMap.verticalCard,
                                    paddingHorizontal: paddingMap.horizontalCard,
                                    borderRadius: roundedMap.full,
                                    backgroundColor: colors.primary,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    height: 50,
                                    width: 50
                                }}
                            >
                                <Icon
                                    name='navigate'
                                    size={25}
                                    color={colors.white}
                                />
                            </View>
                            <AppText
                                size='lg'
                                style={{
                                    // color: colors.textMuted,
                                }}
                            >{activeRoute?.routeName}</AppText>
                        </View>
                    </View>


                </BottomSheet>
            }

        </>
    );
};

