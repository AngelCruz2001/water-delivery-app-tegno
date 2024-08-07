



import React, { useEffect, useMemo, useState } from 'react'
import { ScreenScrollContainer } from '../../components/shared/ScreenScrollContainer'
import { AppText } from '../../components/shared'
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { RoutesStackProps } from '../../../navigation/routes/RoutesStackNavigator';
import { Card } from '../../components/shared/Card';
import { DataItem } from '../../components/shared/DataItem';
import { formatDate, getWeekDaysFromArray } from '../../../helpers/date';
import { Modal, TouchableOpacity, View } from 'react-native';
import { paddingMap } from '../../../config/theme/globalstyle';
import { colors } from '../../../config/theme/colors';
import { DisplayRouteStatus } from '../../components/routes/DisplayRoute';
import { FAB } from '../../components/shared/fab/Fab';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RouteDisplayOrder } from '../../components/orders/RouteDisplayOrder';
import { useRoutesStore } from '../../../store/routes/useRoutesStore';
import { useGetRoutes } from '../../hooks/routers/useGetRoutes';
import { DriversPicker } from '../../components/routes/DriversPicker';
import { useUiStore } from '../../../store/ui/useUiStore';
import { useMutation } from '@tanstack/react-query';
import { editOrder } from '../../../store/routes/api/editOrder';
import { showCreatedToast, showErrorToast } from '../../components/toasts/toasts';

type Props = NativeStackScreenProps<RoutesStackProps, 'RouteScreen'>;

export const RouteScreen = ({ route }: Props) => {

    const { isLoading, isError, refetch } = useGetRoutes();

    const setIsLoading = useUiStore(state => state.setIsLoading);
    const { params: { enrichedRouteId } } = route;
    const navigation = useNavigation<NavigationProp<RoutesStackProps>>();

    const routes = useRoutesStore(state => state.routes);
    const enrichedRoute = useMemo(() => routes.find(r => r._id === enrichedRouteId), [routes, enrichedRouteId]);

    const [currentDriverId, setCurrentDriverId] = useState(enrichedRoute?.driverId || '')

    useEffect(() => {
        navigation.setOptions({
            title: `Ruta ${enrichedRoute?.routeName || ''}`,
        });
    }, [ enrichedRoute?.routeName]);

    const { mutate, isPending } = useMutation({
        mutationFn: async (driverId: string) => {
            setIsLoading(true)
            setCurrentDriverId(driverId)
            return editOrder(enrichedRoute!._id, { driverId })
        },
        onSuccess: () => {
            setIsLoading(false)
            try {
            } catch (error) {
                console.log("setRoutes error:", { error })
            }
            showCreatedToast('Chofer actualizado con exito')
        },
        onError: () => {
            setIsLoading(false)
            showErrorToast('Error al actualizar el chofer')
        }
    })


    const handleChangeDriver = (driverId: string) => {
        console.log("first: ", driverId)
        mutate(driverId)
    }

    return (
        <>
            <ScreenScrollContainer
                onRefresh={() => refetch()}
            >
                {enrichedRoute && <>

                    <DisplayRouteStatus status={enrichedRoute.status} style={{ alignSelf: 'flex-end' }} />
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginVertical: paddingMap.horizontalContainer,
                        }}
                    >
                        <AppText>Entrega programada</AppText>
                        <AppText
                            weight='bold'
                            size='lg'
                            style={{
                                color: colors.primary
                            }}
                        >
                            {getWeekDaysFromArray(enrichedRoute.scheduledDays).join(', ')}
                        </AppText>
                    </View>
                    <Card style={{ gap: 10, position: 'relative', zIndex: 1 }} >
                        <DataItem
                            label='Repartidor'
                            value={
                                <DriversPicker
                                    currentDriverId={currentDriverId}
                                    onDriverChange={handleChangeDriver}
                                />
                            }
                            isLast
                        />

                    </Card>

                    <View
                        style={{
                            marginTop: 50,
                            flexDirection: 'row',
                            gap: 10,
                            // justifyContent: 'space-between',
                            // paddingHorizontal: paddingMap.horizontalCard,
                            marginBottom: paddingMap.horizontalCard,
                        }}>

                        <Card>
                            <AppText
                                weight='bold'
                                size='lg'
                                style={{
                                    marginBottom: paddingMap.verticalContainer,
                                }}
                            >
                                Órdenes
                            </AppText>
                            <AppText
                                weight='bold'
                                size='lg'
                                style={{
                                    color: colors.primary
                                }}
                            >
                                {enrichedRoute.totalOrders}
                            </AppText>
                        </Card>

                        <Card>
                            <AppText
                                weight='bold'
                                size='lg'
                                style={{
                                    marginBottom: paddingMap.verticalContainer,
                                }}
                            >
                                Productos
                            </AppText>
                            <AppText
                                weight='bold'
                                size='lg'
                                style={{
                                    color: colors.primary
                                }}
                            >
                                {enrichedRoute?.routeOrders?.reduce((acc, order) => acc + order.totalProducts, 0) || 0}
                            </AppText>
                        </Card>

                    </View>
                    {
                        enrichedRoute?.routeOrders?.map((order, index) => (
                            <RouteDisplayOrder
                                key={order._id}
                                order={order}
                                isLast={index === enrichedRoute?.routeOrders.length - 1}
                                routeId={enrichedRoute._id}
                            />
                        ))
                    }
                </>}
            </ScreenScrollContainer>

            {/* <View
                style={{
                    position: 'absolute',
                    right: 10,
                    top: 110,
                    zIndex: 1,
                    width: 230,
                    height: '100%',
                }}
            >


                <DriversPicker
                    currentDriverId={"asdfasdfasdf"}
                    onDriverChange={handleChangeDriver}
                />
            </View> */}

            <FAB
                iconName='pencil'
                onPress={() => {
                    navigation.navigate('CreateOrdersScreen', { enrichedRoute: enrichedRoute! })
                }}
                style={{
                    bottom: 15,
                    right: 15
                }}
            />
        </>
    )
}
