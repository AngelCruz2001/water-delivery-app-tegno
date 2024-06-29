



import React, { useMemo } from 'react'
import { ScreenScrollContainer } from '../../components/shared/ScreenScrollContainer'
import { AppText } from '../../components/shared'
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { RoutesStackProps } from '../../../navigation/routes/RoutesStackNavigator';
import { Card } from '../../components/shared/Card';
import { DataItem } from '../../components/shared/DataItem';
import { formatDate } from '../../../helpers/date';
import { View } from 'react-native';
import { paddingMap } from '../../../config/theme/globalstyle';
import { colors } from '../../../config/theme/colors';
import { DisplayRouteStatus } from '../../components/routes/DisplayRoute';
import { FAB } from '../../components/shared/fab/Fab';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RouteDisplayOrder } from '../../components/orders/RouteDisplayOrder';
import { useRoutesStore } from '../../../store/routes/useRoutesStore';
import { useGetRoutes } from '../../hooks/routers/useGetRoutes';
import { useUserStore } from '../../../store/users/useUserStore';



type Props = NativeStackScreenProps<RoutesStackProps, 'RouteScreen'>;

export const RouteScreen = ({ route }: Props) => {

    const { isLoading, isError, refetch } = useGetRoutes();
    const { params: { enrichedRouteId } } = route;
    const navigation = useNavigation<NavigationProp<RoutesStackProps>>();
    const routes = useRoutesStore(state => state.routes);
    const enrichedRoute = useMemo(() => routes.find(r => r._id === enrichedRouteId), [routes, enrichedRouteId]);


    return (
        <>
            <ScreenScrollContainer
                onRefresh={() => refetch()}
            >
                {enrichedRoute && <>

                    <DisplayRouteStatus status={enrichedRoute.status}
                        style={{ alignSelf: 'flex-end' }} />
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginVertical: paddingMap.horizontalContainer,
                        }}
                    >
                        <AppText>Fecha de pedido</AppText>
                        <AppText
                            weight='bold'
                            size='lg'
                            style={{
                                color: colors.primary
                            }}
                        >{formatDate(new Date(enrichedRoute.programedDate))}</AppText>
                    </View>
                    <Card style={{ gap: 10 }} >
                        <DataItem
                            label='Repartidor'
                            value={enrichedRoute.driverName}
                            isLast
                        />
                        {/* <DataItem
                    label='Número de órdenes'
                    value={String(totalOrders)}
                    isLast
                /> */}

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
