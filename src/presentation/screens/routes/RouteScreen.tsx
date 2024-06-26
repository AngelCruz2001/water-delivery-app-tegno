



import React, { useMemo } from 'react'
import { ScreenScrollContainer } from '../../components/shared/ScreenScrollContainer'
import { AppText } from '../../components/shared'
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { RoutesStackProps } from '../../../navigation/routes/RoutesStackNavigator';
import { Card } from '../../components/shared/Card';
import { DataItem } from '../../components/shared/DataItem';
import { formatDate } from '../../../helpers/date';
import { Alert, Pressable, View } from 'react-native';
import { paddingMap } from '../../../config/theme/globalstyle';
import { colors } from '../../../config/theme/colors';
import { DisplayRouteStatus } from '../../components/routes/DisplayRoute';
import { FAB } from '../../components/shared/fab/Fab';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { parsePrice } from '../../../helpers/price';
import Icon from 'react-native-vector-icons/Ionicons';
import { RouteDisplayOrder } from '../../components/orders/RouteDisplayOrder';
import { useRoutesStore } from '../../../store/routes/useRoutesStore';


type Props = NativeStackScreenProps<RoutesStackProps, 'RouteScreen'>;

export const RouteScreen = ({ route }: Props) => {

    const { params: { enrichedRouteId } } = route;
    const navigation = useNavigation<NavigationProp<RoutesStackProps>>();
    const enrichedRoute = useRoutesStore(state => state.routes.find(r => r._id === enrichedRouteId));

    // const {
    //     driverName,
    //     programedDate,
    //     totalOrders,
    //     status,
    //     routeOrders = [],
    //     startTime,
    //     routePauses,
    //     estimatedTimeInMinutes,
    // } = enrichedRoute;

    console.log(JSON.stringify(enrichedRoute, null, 2));

    return (
        <>
            <ScreenScrollContainer>
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
                                {11}
                            </AppText>
                        </Card>

                    </View>

                    {/* TODO: Backend empty array */}

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
                iconName='plus'
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
