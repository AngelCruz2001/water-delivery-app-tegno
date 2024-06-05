

import { View } from 'react-native'
import React from 'react'
import { ScreenScrollContainer } from '../../components/shared/ScreenScrollContainer'
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';
import { ProductsStackProps } from '../../../navigation/products/ProductsStackNavigator';
import { AppText } from '../../components/shared/AppText';
import { useHeaderRightNavigationButton } from '../../hooks/useHeaderRightNavigationButton';
import { NavigationProp, useNavigation } from '@react-navigation/native';

type Props = NativeStackScreenProps<ProductsStackProps, 'Producto'>;

const ProductScreen = ({ route }: Props) => {

    const { product } = route.params

    const navigation = useNavigation<NavigationProp<ProductsStackProps>>();

    useHeaderRightNavigationButton({
        navigation,
        iconName: 'pencil',
        navigate: {
            screen: 'Editar Producto',
            params: { product }
        }
    });

    return (
        <ScreenScrollContainer>
            <AppText>
                {product.name}
            </AppText>
        </ScreenScrollContainer>
    )
}

export default ProductScreen