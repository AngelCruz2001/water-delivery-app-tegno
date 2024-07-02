import React, { useEffect, useMemo, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, Pressable, ScrollView } from 'react-native';
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
import { Card } from '../../components/shared/Card';
import { Text } from 'react-native-svg';
import { DataItem } from '../../components/shared/DataItem';
import { ScreenScrollContainer } from '../../components/shared/ScreenScrollContainer';
import { colors } from '../../../config/theme/colors';
import { AppText } from '../../components/shared';
import { paddingMap } from '../../../config/theme/globalstyle';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { HomeStackProps } from '../../../navigation/HomeStackNavigator';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon2 from 'react-native-vector-icons/FontAwesome';
import { ProductsIcon, ProductsIconSelected } from '../../components/icons/ProductsIcon';
import { AppButton } from '../../components/shared/AppButton';
import { MotiView } from 'moti';
import { Skeleton } from 'moti/skeleton';
import { FAB } from '../../components/shared/fab/Fab';

const { width, height } = Dimensions.get('window');

const mapHeight = height - 550;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: mapHeight,
        zIndex: 0,
    },
});

export const DriverRoutePreviewScreen: React.FC = () => {
    const user = useUserStore((state) => state.user);
    const mapViewRef = useRef<MapView>(null);

    const { routeOnView } = useFetchRouteByUserId(user?._id || '');

    const [location, setLocation] = useState<TLocation>({ latitude: 24.015576, longitude: -104.657245 });
    const [marker, setMarker] = useState<TMarker | null>(null);

    const [waypointsInfo, setWaypointsInfo] = useState<TWaypoint[]>(
        routeOnView?.routeOrders.map(order => ({
            clientName: order.clientName,
            clientId: order.clientId,
            userId: order.userId,
            orderNote: order.note,
            addressName: order.addressName,
            productsOrder: order.products,
            location: {
                latitude: order.location.lat,
                longitude: order.location.lng,
            },
            status: order.status,
            id: order._id,
        })) || []
    );

    useEffect(() => {

        setWaypointsInfo(routeOnView?.routeOrders.map(order => ({
            clientName: order.clientName,
            clientId: order.clientId,
            userId: order.userId,
            orderNote: order.note,
            addressName: order.addressName,
            productsOrder: order.products,
            location: {
                latitude: order.location.lat,
                longitude: order.location.lng,
            },
            status: order.status,
            id: order._id,
        })) || [])

    }, [routeOnView])


    const navigation = useNavigation<NavigationProp<HomeStackProps>>()

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



    if (!user) {
        return null;
    }

    if (!location) {
        return null
    }

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
                {/* // <UserMarker marker={marker} />  */}
                {/* // <DriverMarkers /> */}
                <MapDirections origin={location} mapViewRef={mapViewRef} destination={location} waypoints={waypointsInfo} setWaypointsInfo={setWaypointsInfo} />
                <WaypointMarkers currentLocation={location} waypoints={waypointsInfo} />
            </MapView>

            <Card
                style={{
                    height: height - mapHeight,
                    gap: 10,
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 10
                    }}
                >
                    <Card
                        style={{
                            flex: .5,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 85,
                        }}
                    >
                        <DataItem style={{
                        }} label={
                            <Icon name="time-outline" size={25} color="#4F8EF7" />
                        } value={"49 min"} />

                        <DataItem style={{
                        }} label={
                            <Icon name="car-outline" size={25} color="#4F8EF7" />
                        } value={"16 km"} />
                    </Card>

                    <Card
                        style={{
                            flex: .5,
                            height: 85,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <DataItem label='Ordenes' value={String(routeOnView?.routeOrders.length)} />
                        <DataItem label='Productos' value={String(
                            routeOnView?.routeOrders.reduce((acc, order) => acc + order.totalProducts, 0)
                        )} />
                    </Card>
                </View>

                <ScrollView
                    style={{
                        flexGrow: 0,
                        height: 250,
                    }}
                >

                    {
                        waypointsInfo.map((waypoint, index) => (
                            <Card key={index} style={{
                                backgroundColor: colors.white,
                                marginBottom: 8
                            }} >
                                <AppText>{waypoint.addressName}</AppText>
                                {
                                    waypoint.productsOrder.map((product, index) => (
                                        <DataItem label={product.name} value={String(product.quantity)} key={index} />
                                    ))
                                }
                            </Card>
                        ))
                    }
                </ScrollView>

                <Pressable
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        backgroundColor: colors.primary,
                        borderRadius: 10,
                        padding: 10,
                        elevation: 10,
                        width: '100%',
                        height: 50,
                        alignItems: 'center',
                        justifyContent: 'center',
                        shadowColor: '#000',
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                    }}

                    onPress={() => navigation.navigate('DriverRouteMap', { waypoints: waypointsInfo })}
                >
                    <Icon name='navigate-circle-outline' size={30} color={colors.white} />
                    <AppText style={{
                        color: colors.white,
                        fontSize: 15,
                        fontWeight: 'bold',
                        marginLeft: 10
                    }}>
                        Iniciar ruta
                    </AppText>
                </Pressable>
            </Card>

            <FAB
                iconName='dollar'
                onPress={() => {
                    navigation.navigate('QuickSaleScreen')
                }}
                style={{
                    bottom: 15,
                    right: 15
                }}
            />

        </>
    );
};

