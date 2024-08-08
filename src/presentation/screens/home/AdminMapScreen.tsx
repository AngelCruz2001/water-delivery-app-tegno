
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, Pressable, ScrollView } from 'react-native';
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
import { FAB } from '../../components/shared/fab/Fab';
import { useDemoStore } from '../../../store/demo/useDemoStore';
import { sendMessage } from '../../../providers/WebsocketLocationProvider';
import { getToken } from '../../api/api';
import { DataOverviewCard } from '../../components/map/DataOverviewCard';
import { DriverCardName } from '../../components/map/DriverCardName';
import { TDriver } from '../../../interfaces/drivers';
import { OrderResume } from '../../components/orders/OrderResume';
import { TCreateOrderDto, TOrderProduct } from '../../../interfaces/order';

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

    const token = getToken();

    const { } = useGetRoutes()
    const isDemoActive = useDemoStore((state) => state.isDemoActive);
    const setIsDemoActive = useDemoStore((state) => state.setIsDemoActive);

    const routes = useRoutesStore((state) => state.routes)
    const mapViewRef = useRef<MapView>(null);

    const activeDriver = useDriverStore((state) => state.activeDriver)
    const drivers = useDriverStore((state) => state.drivers)
    const setActiveDriver = useDriverStore((state) => state.setActiveDriver)
    const routeFollowedByActiveDrive = useDriverStore((state) => state.routeFollowedByActiveDrive)
    const [location, setLocation] = useState<TLocation>({ latitude: 24.015576, longitude: -104.657245 });


    const [activeRoute, setActiveRoute] = useState<TDisplayRoute>()

    const handleActiveDriver = (driver: TDriver) => {
        if (driver && driver._id !== activeDriver?._id) {
            setActiveDriver(driver)
        } else {
            setActiveDriver(null)
        }
    }

    useEffect(() => {
        if (activeDriver && activeDriver._id) {
            const activeRouteWork = routes.find(route => route.driverId === activeDriver._id)
            setActiveRoute(activeRouteWork)
        }
    }, [routes, activeDriver])

    useEffect(() => {
        if (activeDriver) {
            mapViewRef.current?.animateCamera({ center: activeDriver?.location, zoom: 18 })
        }
    }, [activeDriver])

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

    const getFullOrderOfDriver = (driverId: string): TCreateOrderDto => {
        const routeForDriver = routes.find(route => route.driverId === driverId)

        const routeOrdersProducts: Array<TOrderProduct> = routeForDriver!.routeOrders.map(o => o.products.map(p => ({ ...p, quantity: 1 }))).flat()

        const order: TCreateOrderDto = {
            addressId: '',
            clientId: '',
            driverId: '',
            note: '',
            products: routeOrdersProducts,
            scheduledDays: [],
            routeId: '',
            userId: ''
        }

        return order
    }

    const onActiveDemoMode = () => {
        setIsDemoActive(!isDemoActive)
        if (isDemoActive) {
            console.log({ isDemoActive })
            sendMessage({
                type: "start_simulated_drivers",
                data: JSON.stringify(token)
            })
        }
    }


    return (
        <>

            <MapView
                ref={mapViewRef}
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                }}
                showsUserLocation

            >
                {/* <UserMarker marker={marker} />  */}
                <DriverMarkers />
                {
                    activeDriver && routeFollowedByActiveDrive && <Polyline coordinates={routeFollowedByActiveDrive} strokeWidth={4} strokeColor={colors.primary} />
                }
                {/* <MapDirections origin={location} mapViewRef={mapViewRef} destination={location} waypoints={waypoints} /> */}
                {/* <WaypointMarkers currentLocation={location} waypoints={waypoints} /> */}

            </MapView>

            <FAB
                iconName='speedometer-outline'
                iconProvider='Ionicons'
                onPress={onActiveDemoMode}
                style={{
                    bottom: 15,
                    right: 15
                }}
            />

            {
                true &&

                <BottomSheet
                >
                    <View
                        style={{
                            flex: 1
                        }}
                    >
                        <AppText>
                            Elija un conductor para ver sus ordenes
                        </AppText>


                        <View
                            style={{
                                alignItems: 'center',
                                gap: 10,
                                marginTop: 10,
                                flex: 1
                            }}
                        >
                            {
                                drivers.map((driver: TDriver) => (
                                    <Fragment key={driver._id}>
                                        {/* <OrderResume
                                            order={getFullOrderOfDriver(driver._id)}
                                            title='Pedido'
                                        /> */}
                                        <DriverCardName key={driver._id} driverId={driver._id} driverName={driver.name} onPress={() => handleActiveDriver(driver)} />
                                        {activeDriver && activeDriver._id === driver._id && <DataOverviewCard driverId={activeDriver._id} />}
                                        {/* <DataOverviewCard driverId={driver._id} /> */}
                                    </Fragment>
                                ))
                            }

                        </View>

                    </View>
                </BottomSheet>
            }

        </>
    );
};

