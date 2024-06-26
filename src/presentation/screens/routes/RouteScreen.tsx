



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
import { parsePrice } from '../../../helpers/price';


type Props = NativeStackScreenProps<RoutesStackProps, 'RouteScreen'>;

export const RouteScreen = ({ route }: Props) => {

    const { params: { enrichedRoute } } = route;
    const navigation = useNavigation<NavigationProp<RoutesStackProps>>();

    const {
        driverName,
        programedDate,
        totalOrders,
        status,
        routeOrders = [],
        startTime,
        routePauses,
        estimatedTimeInMinutes,
    } = enrichedRoute;

    return (
        <>
            <ScreenScrollContainer>
                <DisplayRouteStatus status={status}
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
                    >{formatDate(new Date(programedDate))}</AppText>
                </View>
                <Card style={{ gap: 10 }} >
                    <DataItem
                        label='Repartidor'
                        value={driverName}
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
                            {totalOrders}
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
                    routeOrders?.map((order, index) => (
                        <Card
                            key={order._id}
                            style={{
                                flexDirection: 'column',
                                marginBottom: (index === routeOrders.length - 1) ? 0 : 10
                            }}
                        >
                            <AppText
                                style={{
                                    marginBottom: 25
                                }}
                            >
                                {order.address}
                            </AppText>

                            {
                                order.products.map((product, index) => (
                                    <DataItem
                                        key={product.productId}
                                        label={product.name}
                                        value={String(product.quantity)}
                                    // isLast={index === order.products.length - 1}
                                    />
                                ))
                            }

                        </Card>
                    ))
                }
            </ScreenScrollContainer>

            <FAB
                iconName='plus'
                onPress={() => {
                    navigation.navigate('CreateOrdersScreen', { enrichedRoute })
                }}
                style={{
                    bottom: 15,
                    right: 15
                }}
            />
        </>
    )
}
