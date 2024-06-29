


import React from 'react'
import { Pressable, ScrollView, View } from 'react-native'
import { AppText } from '../shared'
import { colors } from '../../../config/theme/colors'
import { TCreateOrderDto, TDisplayOrder } from '../../../interfaces/order'
import { paddingMap } from '../../../config/theme/globalstyle'
import { TDisplayClient } from '../../../interfaces/clients'
import { Card } from '../shared/Card'


type Props = {
    orders: TCreateOrderDto[] | TDisplayOrder[];
    clients: TDisplayClient[];
    onItemPress: (order: TCreateOrderDto | TDisplayOrder | undefined, client: TDisplayClient | undefined) => void
}

export const OrdersList = ({ orders, clients, onItemPress }: Props) => {
    return (
        <>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                }}
            >
                <AppText
                    weight='bold'
                    size='lg'
                    style={{
                    }}
                >
                    Órdenes
                </AppText>
                <AppText
                    weight='bold'
                    size='lg'
                    style={{
                        color: colors.primary,
                        marginLeft: 5
                    }}
                >
                    {orders.length}
                </AppText>
            </View>
            <ScrollView
                style={{
                    maxHeight: 250,
                    paddingVertical: paddingMap.verticalCard,
                    // paddingHorizontal: 5
                }}
            >
                {
                    orders?.map((order, index) => {
                        // return <AppText></AppText>
                        const client = clients.find((client) => client._id === order.clientId)
                        if (!client) return null;
                        const totalProducts = order.products.reduce((acc, product) => acc + product.quantity, 0)
                        const hasOrder = orders.find((order) => order.clientId === client!._id)
                        return (
                            <Pressable
                                onPress={() => onItemPress(hasOrder, client)}
                                style={{
                                    paddingHorizontal: paddingMap.verticalContainer
                                }}
                            >

                                <Card
                                    key={order.clientId}
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        gap: 20,
                                        marginBottom: paddingMap.verticalCard,
                                    }}
                                >
                                    <AppText
                                        style={{
                                            color: colors.textMuted,
                                            flex: .6
                                        }}
                                    >
                                        {client?.address}
                                    </AppText>
                                    <AppText
                                        size='lg'
                                        weight='bold'
                                        style={{
                                            color: colors.primary,
                                            flex: .4,
                                            textAlign: 'right'
                                        }}
                                    >
                                        {totalProducts}
                                    </AppText>
                                </Card>
                            </Pressable>
                        )
                    })
                }
            </ScrollView>
        </>
    )
}
