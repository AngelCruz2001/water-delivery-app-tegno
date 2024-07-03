import React, { useState } from 'react'
import { ScreenScrollContainer } from '../../components/shared/ScreenScrollContainer';
import { AppText } from '../../components/shared/AppText';
import { SetSearchLocationMap } from '../../components/shared/map/SetSearchLocationMap';
import { TLocation } from '../../../interfaces/location';
import { Card } from '../../components/shared/Card';
import { CartProductsList } from '../../components/orders/CartProductsList';
import { TCreateOrderDto } from '../../../interfaces/order';
import dayjs from 'dayjs';
import { useProductsStore } from '../../../store/products/useProductsStore';
import { ScreenContainer } from '../../components/shared/ScreenContainer';
import { useGetProducts } from '../../hooks/products/useGetProducts';
import { View } from 'react-native';
import { colors } from '../../../config/theme/colors';
import { OrderResume } from '../../components/orders/OrderResume';
import { AppButton } from '../../components/shared';
import { paddingMap } from '../../../config/theme/globalstyle';
import { TCreateSaleDTO, TSale } from '../../../interfaces/sale';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { HomeStackProps } from '../../../navigation/HomeStackNavigator';
import { useMutation } from '@tanstack/react-query';
import { api, getToken } from '../../api/api';
import { showCreatedToast, showErrorToast } from '../../components/toasts/toasts';
import { useUiStore } from '../../../store/ui/useUiStore';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const QuickSaleScreen = () => {
    const navigation = useNavigation<NavigationProp<HomeStackProps>>();
    const products = useProductsStore(state => state.products);
    const { isLoading: productsIsLoading, isError: productsIsError, refetch } = useGetProducts();
    const [location, setLocation] = useState<TLocation | null>(null);
    const [locationName, setLocationName] = useState('');
    const setIsLoading = useUiStore(state => state.setIsLoading);
    const { bottom } = useSafeAreaInsets();

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
            console.log({ data });
            showCreatedToast('Venta registrada con éxito');
            setIsLoading(false);
            navigation.goBack();
        },
        onError: (error) => {
            setIsLoading(false);
            showErrorToast('Error al registrar la venta');
            console.log({ error })
        }
    })

    // const [orders, setOrders] = useState<TCreateOrderDto[]>([]);

    const [newOrder, setNewOrder] = useState<TCreateOrderDto>({
        programedDate: dayjs().toString(),
        driverId: '',
        routeId: '',
        userId: '',
        clientId: '',
        addressId: '',
        products: [],
        note: ''
    })

    return (
        <ScreenContainer
            style={{
                paddingBottom: bottom
            }}
        >
            <Card>
                <SetSearchLocationMap
                    setLocation={setLocation}
                    setLocationName={setLocationName}
                    height={150}
                    showInput={false}
                />

                <AppText
                    style={{
                        marginTop: 15,
                    }}
                >{locationName}</AppText>
            </Card>

            <View
                style={{
                    paddingVertical: paddingMap.verticalCard
                }}
            >
                <CartProductsList
                    order={newOrder}
                    setOrder={setNewOrder}
                    products={products}
                    height={180}
                />
            </View>
            <OrderResume
                order={newOrder}
                title='Resumen de Venta'
                height={100}
            />
            <AppButton
                disabled={newOrder.products.length === 0 || isPending}
                style={{
                    marginBottom: 10
                }}
                onPress={() => {
                    const saleData: TCreateSaleDTO = {
                        products: newOrder.products,
                        clientId: newOrder.clientId,
                        clientAddress: locationName,
                        location: {
                            lat: location?.latitude || 0,
                            lng: location?.longitude || 0
                        }
                    }
                    mutate(saleData);
                }}
            >
                Guardar Venta
            </AppButton>

        </ScreenContainer>
    )
}
