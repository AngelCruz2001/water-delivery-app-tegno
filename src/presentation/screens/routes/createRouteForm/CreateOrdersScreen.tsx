import React, { useEffect, useRef, useState } from 'react'
import { AppButton, AppText } from '../../../components/shared'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RoutesStackProps } from '../../../../navigation/routes/RoutesStackNavigator'
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types'
import { formatDate } from '../../../../helpers/date'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { View } from 'react-native'
import { useGetClients } from '../../../hooks/clients/useGetClients'
import { useClientsStore } from '../../../../store/clients/useClientsStore'
import { paddingMap, roundedMap } from '../../../../config/theme/globalstyle'
import { colors } from '../../../../config/theme/colors';
import { TDisplayClient } from '../../../../interfaces/clients'
import { Card } from '../../../components/shared/Card'
import { useGetProducts } from '../../../hooks/products/useGetProducts'
import { useProductsStore } from '../../../../store/products/useProductsStore'
import { TCreateOrderDto } from '../../../../interfaces/order';
import { useForm } from 'react-hook-form'
import { CartProductsList } from '../../../components/orders/CartProductsList'
import { OrderResume } from '../../../components/orders/OrderResume'
import { OrdersList } from '../../../components/orders/CreateOrdersList'
import { useCurrentLocation } from '../../../hooks/location/useLocation'
import { useMutation } from '@tanstack/react-query'
import { showCreatedToast, showErrorToast } from '../../clients/CreateClientScreen'
import { postOrdersBatch } from '../../../../store/routes/api/postOrdersBatch'

type Props = NativeStackScreenProps<RoutesStackProps, 'CreateOrdersScreen'>;
export const CreateOrdersScreen = ({ route: { params } }: Props) => {

    const { enrichedRoute } = params;
    const mapRef = useRef<MapView | null>(null);
    const { location, moveCameraToLocation } = useCurrentLocation(mapRef)
    const navigation = useNavigation<NavigationProp<RoutesStackProps>>();
    const { isLoading, isError } = useGetClients();
    const clients = useClientsStore(state => state.clients);
    const { isLoading: productsIsLoading, isError: productsIsError, refetch } = useGetProducts();
    const products = useProductsStore(state => state.products);
    const [selectedClient, setSelectedClient] = useState<TDisplayClient | null>(null);

    const [orders, setOrders] = useState<TCreateOrderDto[]>(enrichedRoute.routeOrders || []);

    const [newOrder, setNewOrder] = useState<TCreateOrderDto>({
        programedDate: enrichedRoute.programedDate,
        driverId: enrichedRoute.driverId,
        routeId: enrichedRoute._id,
        userId: '',
        clientId: '',
        addressId: '',
        products: [],
        note: ''
    })

    const { control, formState: { } } = useForm({
        defaultValues: {
            note: ''
        }
    })

    const { mutate, isError: isErrorMutate, isPending, isSuccess } = useMutation({
        mutationFn: async (orders: TCreateOrderDto[]) => {
            return postOrdersBatch(orders)
        },
        onError(error, variables, context) {
            console.log("Error creating route", { error, variables, context })
            showErrorToast('Error creando ruta');
        },
        onSuccess: (data) => {
            console.log("res: ", data)
            // addRoute(data);
            // setNewRoute({
            //     driverId: '',
            //     driverName: '',
            //     programedDate: dayjs(),
            //     routeName: '',
            // });
            showCreatedToast('Órdenes registradas con éxito');
            // navigation.reset({
            //     index: 0,
            //     routes: [{ name: 'RoutesScreen' }],
            // });
        },
    })

    useEffect(() => {
        navigation.setOptions({
            title: formatDate(new Date(enrichedRoute.programedDate)),
            headerRight: () => (
                <AppText
                    style={{
                        paddingRight: paddingMap.horizontalCard,
                        color: colors.primary
                    }}
                >
                    {enrichedRoute.driverName}
                </AppText>
            )
        })
    }, [])



    return (
        <View
            style={{
                flex: 1,
                position: 'relative'
            }}>

            <Card
                style={{
                    position: 'absolute',
                    top: 5,
                    zIndex: 1,
                    left: 0,
                    right: 0,
                    borderRadius: roundedMap.md,
                    backgroundColor: colors.white,
                    marginHorizontal: 5,
                    maxHeight: '95%',
                }}
            >
                {/* TODO: selectedClientInfo */}
                {selectedClient ? (
                    <>
                        <AppText
                            weight='bold'
                            // size='lg'
                            style={{
                                marginBottom: 2,
                            }}
                        >
                            Cliente
                        </AppText>
                        <AppText
                            // weight='bold'
                            style={{
                                marginBottom: paddingMap.verticalCard,
                                color: colors.primary
                            }}
                        >
                            {selectedClient.address?.split('Durango, Dgo')[0]}
                        </AppText>
                        <AppText
                            weight='bold'
                            // size='lg'
                            style={{
                                marginTop: 2,
                            }}
                        >
                            Productos
                        </AppText>
                        <CartProductsList
                            products={products}
                            order={newOrder}
                            setOrder={setNewOrder}
                        />
                        <View>
                            <OrderResume
                                order={newOrder}
                            />
                            <View>
                                <AppButton
                                    onPress={() => {
                                        setOrders([...orders, {
                                            ...newOrder,
                                            products: newOrder.products
                                        }])
                                        setNewOrder({
                                            programedDate: enrichedRoute.programedDate,
                                            driverId: enrichedRoute.driverId,
                                            routeId: enrichedRoute._id,
                                            userId: '',
                                            clientId: '',
                                            addressId: '',
                                            products: [],
                                            note: ''
                                        })
                                        setSelectedClient(null);
                                    }}
                                    style={{
                                        marginTop: 10
                                    }}
                                >
                                    Agregar órden
                                </AppButton>
                                <AppButton
                                    color={colors.textMuted}
                                    onPress={() => {
                                        setSelectedClient(null)
                                        setNewOrder({
                                            programedDate: enrichedRoute.programedDate,
                                            driverId: enrichedRoute.driverId,
                                            routeId: enrichedRoute._id,
                                            userId: '',
                                            clientId: '',
                                            addressId: '',
                                            products: [],
                                            note: ''
                                        })
                                    }}
                                    style={{
                                        marginTop: 10,
                                        backgroundColor: 'transparent',
                                    }}
                                >
                                    Cancelar
                                </AppButton>
                            </View>
                        </View>
                    </>
                ) : (
                    <>
                        {/* <AppText>
                            Crear órden para ruta
                        </AppText> */}
                        <AppText
                            style={{
                                // marginTop: 10,
                                color: colors.textMuted
                            }}
                        >
                            Selecciona un cliente del mapa para generar una orden
                        </AppText>
                    </>
                )}

            </Card>
            <MapView
                provider={PROVIDER_GOOGLE}
                ref={mapRef}
                style={{
                    width: '100%',
                    height: '100%',
                }}
                initialRegion={{
                    latitude: location.latitude, longitude: location.longitude,
                    latitudeDelta: 0.02,
                    longitudeDelta: 0.02,
                }}
                showsUserLocation
            >
                {
                    clients.map((client) => {
                        const hasOrder = orders.find((order) => order.clientId === client._id)
                        return (
                            <Marker
                                onPress={() => {
                                    setSelectedClient(client)
                                    if (hasOrder) {
                                        setNewOrder({
                                            ...hasOrder
                                        })
                                    } else {
                                        setNewOrder({
                                            ...newOrder,
                                            clientId: client._id,
                                            addressId: client.addressId || '',
                                        })
                                    }
                                    moveCameraToLocation({ latitude: client.location?.lat || 0, longitude: client.location?.lng || 0 })

                                }}
                                key={client._id}
                                coordinate={{
                                    latitude: client.location?.lat || 0, longitude: client.location?.lng || 0,
                                }}
                                title={client.name}
                                description={client.address}
                                image={
                                    hasOrder
                                        ? require('../../../../assets/marker_success.png')
                                        : require('../../../../assets/marker.png')
                                }
                            >

                                {/* <Callout>

                                </Callout> */}

                            </Marker>
                        )
                    })
                }

            </MapView>

            <Card
                style={{
                    position: 'absolute',
                    bottom: 5,
                    left: 0,
                    right: 0,
                    maxHeight: 250,
                    marginHorizontal: 5,
                }}
            >

                <OrdersList
                    clients={clients}
                    orders={orders}
                    onItemPress={(hasOrder, client) => {
                        setSelectedClient(client!)
                        if (hasOrder) {
                            setNewOrder({
                                ...hasOrder
                            })
                        } else {
                            setNewOrder({
                                ...newOrder,
                                clientId: client!._id,
                                addressId: client!.addressId || '',
                            })
                        }
                        moveCameraToLocation({ latitude: client!.location?.lat || 0, longitude: client!.location?.lng || 0 })
                    }}
                />

                <AppButton
                    disabled={orders.length === 0}
                    style={{
                        marginLeft: 'auto',
                        marginTop: 10
                    }}
                    onPress={() => {
                        console.log(JSON.stringify(orders, null, 2));
                        mutate(orders);
                    }}
                >
                    Guardar órdenes
                </AppButton>
            </Card>

        </View>
    )
}
