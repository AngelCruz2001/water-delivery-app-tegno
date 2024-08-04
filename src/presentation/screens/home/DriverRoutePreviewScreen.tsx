import React, { useEffect, useRef, useState } from 'react';
import { View, Dimensions, Pressable, ScrollView, SafeAreaView } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import MapDirections from './MapDirections';
import WaypointMarkers from './WaypointMarkers';
import { TLocation } from '../../../interfaces/location';
import { getCurrentLocation } from '../../../actions/location/location';
import { Card } from '../../components/shared/Card';
import { AppText } from '../../components/shared';
import { colors } from '../../../config/theme/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { DriverMapStackProps } from '../../../navigation/DriverMapStack';
import Icon from 'react-native-vector-icons/Ionicons';
import { DataItem } from '../../components/shared/DataItem';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';

const { width, height } = Dimensions.get('window');
const mapHeight = height - 550;

type DriverRoutePreviewScreenProps = NativeStackScreenProps<DriverMapStackProps, 'DriverRoutePreviewScreen'>

export const DriverRoutePreviewScreen = ({ route: { params } }: DriverRoutePreviewScreenProps) => {
    const mapViewRef = useRef<MapView>(null);
    const [location, setLocation] = useState<TLocation>({ latitude: 24.015576, longitude: -104.657245 });
    const { bottom } = useSafeAreaInsets();
    const navigation = useNavigation<NavigationProp<DriverMapStackProps>>();

    const { originalWaypoints, waypoints, routeOnView, numberAlreadyDelivered } = params;

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const loc = await getCurrentLocation();
                setLocation(loc);
                if (mapViewRef.current) {
                    mapViewRef.current.animateCamera({ center: loc });
                }
            } catch (error) {
                console.error("Error fetching location", error);
            }
        };
        fetchLocation();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <MapView
                ref={mapViewRef}
                provider={PROVIDER_GOOGLE}
                style={{ width: '100%', height: mapHeight, zIndex: 0 }}
                initialRegion={{
                    latitude: 24.015576,
                    longitude: -104.657245,
                    latitudeDelta: 0.5,
                    longitudeDelta: 0.5,
                }}
                showsUserLocation
            >
                <MapDirections origin={location} mapViewRef={mapViewRef} destination={location} waypoints={waypoints} setWaypointsInfo={() => { }} />
                <WaypointMarkers currentLocation={location} waypoints={originalWaypoints} />
            </MapView>

            <Card style={{ height: height - mapHeight, gap: 10 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Card style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center', height: 85 }}>
                        <DataItem label={<Icon name="time-outline" size={25} color="#4F8EF7" />} value={"49 min"} />
                        <DataItem label={<Icon name="car-outline" size={25} color="#4F8EF7" />} value={"16 km"} />
                    </Card>
                    <Card style={{ flex: 0.5, height: 85, alignItems: 'center', justifyContent: 'center' }}>
                        <DataItem label='Ordenes' value={String(routeOnView?.routeOrders.length)} />
                        <DataItem label='Productos' value={String(routeOnView?.routeOrders.reduce((acc, order) => acc + order.totalProducts, 0))} />
                    </Card>
                </View>

                <ScrollView style={{ flexGrow: 0, height: 250 }}>
                    {originalWaypoints.map((waypoint, index) => (
                        <Card key={index} style={{ backgroundColor: colors.white, marginBottom: 10 }}>
                            {waypoint.status === 'completed' && (
                                <AppText style={{ fontWeight: 'bold', color: colors.success }}>Pedido completado</AppText>
                            )}
                            <AppText>{waypoint.addressName}</AppText>
                            {waypoint.productsOrder.map((product, index) => (
                                <DataItem label={product.name} value={String(product.quantity)} key={index} />
                            ))}
                        </Card>
                    ))}
                </ScrollView>

                <Pressable
                    style={{
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
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.25,
                        shadowRadius: 3.84,
                    }}
                    onPress={() => routeOnView && navigation.navigate('DriverRouteMap', { waypoints: waypoints, route: routeOnView, numberAlreadyDelivered: numberAlreadyDelivered })}
                >
                    <Icon name='navigate-circle-outline' size={30} color={colors.white} />
                    <AppText style={{ color: colors.white, fontSize: 15, fontWeight: 'bold', marginLeft: 10 }}>
                        Iniciar ruta
                    </AppText>
                </Pressable>
            </Card>
        </SafeAreaView>
    );
};
