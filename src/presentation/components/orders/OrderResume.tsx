

import React from 'react'
import { AppText } from '../shared'
import { paddingMap } from '../../../config/theme/globalstyle'
import { ScrollView, View } from 'react-native'
import { TProduct } from '../../../interfaces/products'
import { TCreateOrderDto } from '../../../interfaces/order'
import { colors } from '../../../config/theme/colors'
import { parsePrice } from '../../../helpers/price'



type Props = {
    order: TCreateOrderDto;
    title?: string
}


export const OrderResume = ({ order, title = 'Resumen de pedido' }: Props) => {
    return (
        <>
            <View>
                <AppText
                    weight='bold'
                    size='lg'
                    style={{
                        marginTop: paddingMap.verticalCard,
                        marginBottom: 5,
                    }}
                >
                    {title}
                </AppText>
            </View>
            <ScrollView
                style={{
                    height: 100,
                    paddingVertical: 5,
                }}
            >
                {
                    order.products.map((product) => {
                        return (
                            <View
                                key={product.productId}
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: 5
                                }}
                            >
                                <AppText
                                    style={{
                                        textTransform: 'capitalize'
                                    }}
                                >
                                    {product.name}
                                </AppText>
                                <AppText>
                                    {product.quantity}
                                </AppText>
                            </View>
                        )
                    })
                }

            </ScrollView>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTopWidth: 1,
                    borderColor: colors.textMuted
                }}
            >
                <AppText
                    weight='bold'
                    size='lg'
                    style={{
                        marginTop: paddingMap.verticalCard,
                        marginBottom: 5,
                    }}
                >
                    Total
                </AppText>
                <AppText
                    weight='bold'
                    size='lg'
                    style={{
                        color: colors.primary
                    }}
                >
                    ${parsePrice(
                        order.products.reduce((acc, product) => {
                            console.log({ acc, product })
                            return acc + (product.price * product.quantity)
                        }, 0))
                    }
                </AppText>
            </View>
        </>
    )
}
