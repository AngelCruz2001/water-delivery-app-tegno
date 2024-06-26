import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Dimensions, Pressable } from 'react-native';
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

    console.log({ routeOnView })
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
        orderNote: order.note,
        addressName: order.addressName,
        productsOrder: order.products,
        location: {
            latitude: order.location.lat,
            longitude: order.location.lng,
        }
    })) || [];

    if (!user) {
        return null;
    }

    if (!location) {
        return null
    }

    return (
        <>

            <Card
                style={{

                }}
            >
                <AppText>Resumen</AppText>
                <DataItem label='Ordenes' value={String(routeOnView?.routeOrders.length)} />
                <DataItem label='Productos' value={String(
                    routeOnView?.routeOrders.reduce((acc, order) => acc + order.totalProducts, 0)
                )} />
            </Card>

            <ScreenScrollContainer style={{
                width: width,
                height: height,
                // position: 'absolute',
                // bottom: 0,
                // width: width,
                // flex: 1,
                // borderRadius: 10,    
                // gap: 10,
                // backgroundColor: colors.white

            }} >
                {
                    waypoints.map((waypoint, index) => (
                        <Card key={index} style={{
                            paddingHorizontal: paddingMap.horizontalCard,
                            paddingVertical: paddingMap.verticalCard,
                            backgroundColor: colors.white,
                            width: '100%',
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
            </ScreenScrollContainer>
            <Pressable onPress={() => { }} style={{ height: 30, width: 30, alignItems: 'center', justifyContent: 'center', marginLeft: 10 }}>
                <AppText>
                    Iniciar orden
                </AppText>
            </Pressable>

            {/* <MapView
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
                <UserMarker marker={marker} /> 
                <DriverMarkers /> 
                <MapDirections origin={location} mapViewRef={mapViewRef} destination={location} waypoints={waypoints} /> 
                <WaypointMarkers currentLocation={location} waypoints={waypoints} userId={user._id} /> 
            </MapView> 
            */}



        </>
    );
};

