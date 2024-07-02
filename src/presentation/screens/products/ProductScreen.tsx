

import { Image, View } from 'react-native'
import React, { useEffect } from 'react'
import { ScreenScrollContainer } from '../../components/shared/ScreenScrollContainer'
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { ProductsStackProps } from '../../../navigation/products/ProductsStackNavigator';
import { AppText } from '../../components/shared/AppText';
import { useHeaderRightNavigationButton } from '../../hooks/useHeaderRightNavigationButton';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { colors } from '../../../config/theme/colors';
import { DataItem } from '../../components/shared/DataItem';
import { Card } from '../../components/shared/Card';
import { parsePrice } from '../../../helpers/price';
import { useGetProducts } from '../../hooks/products/useGetProducts';
import { useProductsStore } from '../../../store/products/useProductsStore';
import { TProduct } from '../../../interfaces/products';
import { FAB } from '../../components/shared/fab/Fab';

type Props = NativeStackScreenProps<ProductsStackProps, 'Producto'>;

const ProductScreen = ({ route }: Props) => {

    const { isError, isLoading, refetch } = useGetProducts();
    const { productId } = route.params
    const products = useProductsStore((state) => state.products);
    const product = products.find(p => p._id === productId) as TProduct;


    const navigation = useNavigation<NavigationProp<ProductsStackProps>>();

    // useHeaderRightNavigationButton({
    //     navigation,
    //     iconName: 'pencil',
    //     navigate: {
    //         screen: 'Editar Producto',
    //         params: { productId: product?._id || '' }
    //     }
    // });

    useEffect(() => {
        navigation.setOptions({
            headerTitle: product?.name || 'Producto'
        })
    }, []);

    if (!product) return null;

    return (
        <>
            <ScreenScrollContainer
                onRefresh={refetch}
            >

                {/* <View
                style={{
                    flex: 1,
                    flexDirection: 'row',
                    gap: 15
                    }}
                    >
                    <AppText>
                    {product.name}
                    </AppText>
                    </View> */}

                <View
                    style={{
                        alignItems: 'center',
                        marginBottom: 20
                    }}
                >
                    <Image source={{
                        uri: product.image.url
                    }}
                        style={{
                            width: 200,
                            aspectRatio: 1,
                            objectFit: 'contain',
                        }}
                    />
                </View>
                <Card
                    style={{ gap: 10 }}
                >
                    <DataItem
                        label={'Nombre'}
                        value={product.name}
                    />
                    <DataItem
                        label={'Descripción'}
                        value={product.description}
                    />
                    <DataItem
                        label={'Precio'}
                        value={'$' + parsePrice(product.price)}
                        isLast
                    />
                </Card>


            </ScreenScrollContainer>
            <FAB
                iconName='pencil'
                onPress={() => {
                    navigation.navigate('Editar Producto', { productId: product?._id || '' })
                }}
                style={{
                    bottom: 15,
                    right: 15
                }}
            />
        </>
    )
}

export default ProductScreen