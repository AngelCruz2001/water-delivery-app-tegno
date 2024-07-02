


import React from 'react'
import { Card } from '../shared/Card'
import { TDisplayOrder } from '../../../interfaces/order'
import { Alert, Pressable, View } from 'react-native'
import { AppText } from '../shared'
import Icon from 'react-native-vector-icons/Ionicons'
import { colors } from '../../../config/theme/colors'
import { DataItem } from '../shared/DataItem'
import { useMutation } from '@tanstack/react-query'
import { useRoutesStore } from '../../../store/routes/useRoutesStore'
import { deleteOrder } from '../../../store/routes/api/deleteOrder'
import { showCreatedToast, showErrorToast, showLoadingToast } from '../toasts/toasts'
import { useUiStore } from '../../../store/ui/useUiStore'



type Props = {
    order: TDisplayOrder,
    isLast?: boolean,
    routeId: string,
}
export const RouteDisplayOrder = ({ order, isLast, routeId }: Props) => {

    const routes = useRoutesStore(state => state.routes);
    const setRoutes = useRoutesStore(state => state.setRoutes);
    const setIsLoading = useUiStore(state => state.setIsLoading);

    const { mutate, isPending } = useMutation({
        mutationFn: async () => {
            setIsLoading(true)
            return deleteOrder(order._id)
        },
        onSuccess: () => {
            setIsLoading(false)
            try {
                setRoutes(routes.map(route => {
                    if (route._id !== routeId) return route;
                    const orders = route.routeOrders.filter(o => o._id !== order._id)
                    return { ...route, totalOrders: route.totalOrders - 1, routeOrders: orders }
                }))
            } catch (error) {
                console.log("setRoutes error:", { error })
            }
            showCreatedToast('Pedido eliminado con éxito')
        },
        onError: () => {
            setIsLoading(false)
            showErrorToast('Error al eliminar el pedido')
        }
    })

    return (
        <Card
            key={order._id}
            style={{
                flexDirection: 'column',
                marginBottom: (isLast ? 0 : 10)
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: 25
                }}
            >
                <AppText
                    style={{
                        maxWidth: '90%'
                    }}
                >
                    {order.addressName}
                </AppText>

                <Pressable
                    onPress={() => {
                        Alert.alert('Eliminar pedido', '¿Está seguro de eliminar este pedido?', [
                            {
                                text: 'Cancelar',
                                style: 'cancel'
                            },
                            {
                                text: 'Eliminar',
                                onPress: () => {
                                    mutate()
                                }
                            }
                        ])
                    }}
                >
                    <Icon name='trash' size={25} color={colors.red} />
                </Pressable>
            </View>

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
    )
}
