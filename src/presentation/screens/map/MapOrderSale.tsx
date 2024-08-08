




import React, { useState } from 'react'
import { AppText } from '../../components/shared/AppText';
import { TLocation } from '../../../interfaces/location';
import { CartProductsList } from '../../components/orders/CartProductsList';
import { TCreateOrderDto, TDisplayOrder } from '../../../interfaces/order';
import dayjs from 'dayjs';
import { useProductsStore } from '../../../store/products/useProductsStore';
import { useGetProducts } from '../../hooks/products/useGetProducts';
import { View } from 'react-native';
import { OrderResume } from '../../components/orders/OrderResume';
import { AppButton } from '../../components/shared';
import { paddingMap, roundedMap } from '../../../config/theme/globalstyle';
import { TCreateSaleDTO, TSale } from '../../../interfaces/sale';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import { api, getToken } from '../../api/api';
import { showCreatedToast } from '../../components/toasts/toasts';
import { colors } from '../../../config/theme/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUiStore } from '../../../store/ui/useUiStore';


type Props = {
    order: TDisplayOrder
    total: number
    current: number
    hasArrived?: boolean
    onCloseSale?: () => void
}

export const MapOrderSale = ({ order, total, current, hasArrived, onCloseSale }: Props) => {
    const { bottom } = useSafeAreaInsets()
    // const navigation = useNavigation();
    const products = useProductsStore(state => state.products);
    const setIsLoading = useUiStore(state => state.setIsLoading);
    const { isLoading: productsIsLoading, isError: productsIsError, refetch } = useGetProducts();
    const [location, setLocation] = useState<TLocation | null>(null);
    const {
        addressName
    } = order;

    const [newOrder, setNewOrder] = useState<TCreateOrderDto>({
        scheduledDays: order.scheduledDays,
        driverId: order.driverId,
        routeId: order.routeId,
        userId: order.userId,
        clientId: order.clientId,
        addressId: order.addressId,
        products: order.products.map(product => ({ ...product, productId: product.productId, quantity: product.quantity })),
        note: order.note
    })

    const { mutate, isPending } = useMutation({
        mutationFn: async (sale: TCreateSaleDTO) => {
            setIsLoading(true);
            return api.post<TSale>('/sales', sale, {
                headers: {
                    authorization: await getToken()
                }
            }
            )
        },
        onSuccess: ({ data }) => {
            setIsLoading(false);
            showCreatedToast('Venta registrada con éxito');
            // navigation.goBack();
        },
        onError: (error) => {
            setIsLoading(false);
            console.log({ error })
        }
    })


    return (
        <View
            style={{
                flex: 1,
            }}
        >
            <AppText
                weight='bold'
                style={{
                    marginLeft: 'auto',
                    position: 'absolute',
                    right: 0,
                }}>
                {`${current}/${total}`}
            </AppText>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: paddingMap.horizontalCard,
                    gap: 10,
                    marginTop: 10,
                    maxWidth: '80%',
                }}
            >
                <View
                    style={{
                        paddingVertical: paddingMap.verticalCard,
                        paddingHorizontal: paddingMap.horizontalCard,
                        borderRadius: roundedMap.full,
                        backgroundColor: colors.primary,
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 50,
                        width: 50
                    }}
                >
                    <Icon
                        name='navigate'
                        size={25}
                        color={colors.white}
                    />
                </View>
                <AppText
                    size='lg'
                    style={{
                        // color: colors.textMuted,
                    }}
                >{addressName}</AppText>
            </View>

            <View
                style={{
                    paddingVertical: paddingMap.verticalCard,
                }}
            >
                <OrderResume
                    order={newOrder}
                    title='Pedido'
                />
                <View style={{ height: 10 }} />
                <CartProductsList
                    order={newOrder}
                    setOrder={setNewOrder}
                    products={products}
                    height={220}
                />
            </View>
            <AppButton
                disabled={newOrder.products.length === 0 || isPending || !hasArrived}
                style={{
                    marginBottom: 10,
                    // marginTop: 'auto',
                    // marginBottom: bottom + 20
                }}
                onPress={() => {
                    const saleData: TCreateSaleDTO = {
                        products: newOrder.products,
                        clientId: newOrder.clientId,
                        clientAddress: addressName,
                        location: {
                            lat: location?.latitude || 0,
                            lng: location?.longitude || 0
                        }, 
                        orderId: order._id
                    }
                    mutate(saleData);

                    if (onCloseSale) onCloseSale();
                }}
            >
                Cerrar Venta
            </AppButton>
            <AppButton
                disabled={newOrder.products.length === 0 || isPending || !hasArrived}
                customBackgroundColor={colors.red}
                style={{
                    marginBottom: 10,
                    // marginTop: 'auto',
                    // marginBottom: bottom + 20
                }}
                onPress={() => {
                    const saleData: TCreateSaleDTO = {
                        products: [],
                        clientId: newOrder.clientId,
                        clientAddress: addressName,
                        location: {
                            lat: location?.latitude || 0,
                            lng: location?.longitude || 0
                        }, 
                        orderId: order._id
                    }
                    mutate(saleData);

                    if (onCloseSale) onCloseSale();
                }}
            >
                No se encontro el cliente
            </AppButton>

        </View>
    )
}
