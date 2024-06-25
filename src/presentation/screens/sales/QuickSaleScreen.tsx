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

export const QuickSaleScreen = () => {

    const products = useProductsStore(state => state.products);
    const { isLoading: productsIsLoading, isError: productsIsError, refetch } = useGetProducts();
    const [location, setLocation] = useState<TLocation | null>(null);
    const [locationName, setLocationName] = useState('');

    const [orders, setOrders] = useState<TCreateOrderDto[]>([]);

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
        <ScreenContainer>
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
                    height={150}
                />
            </View>
            <OrderResume
                order={newOrder}
                title='Resumen de Venta'
            />
            <AppButton
                disabled={newOrder.products.length === 0}
                style={{
                    marginBottom: 10
                }}
            // onPress={() => {
            //     setOrders([...orders, newOrder]);
            //     setNewOrder({
            //         programedDate: dayjs().toString(),
            //         driverId: '',
            //         routeId: '',
            //         userId: '',
            //         clientId: '',
            //         addressId: '',
            //         products: [],
            //         note: ''
            //     })
            >
                Guardar Venta
            </AppButton>

        </ScreenContainer>
    )
}
