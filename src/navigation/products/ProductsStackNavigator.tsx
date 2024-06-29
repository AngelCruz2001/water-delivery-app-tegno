
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect } from "react";
import { colors } from "../../config/theme/colors";
import { ProductsScreen } from "../../presentation/screens/products/ProductsScreen";
import { CreateProductScreen } from "../../presentation/screens/products/CreateProductScreen";
import { TProduct } from "../../interfaces/products";
import ProductScreen from "../../presentation/screens/products/ProductScreen";
import { EditProductScreen } from "../../presentation/screens/products/EditProductScreen";


export type ProductsStackProps = {
    Productos: undefined,
    "Crear producto": undefined,
    Producto: { productId: string },
    "Editar Producto": { productId: string }
}

const Stack = createStackNavigator<ProductsStackProps>();

export function ProductsStackNavigator() {
    const navigation = useNavigation<NavigationProp<ProductsStackProps>>()

    useEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, []);

    return (
        <Stack.Navigator
            initialRouteName='Productos'
            screenOptions={{
                cardStyle: { backgroundColor: colors.background },
                headerStyle: {
                    backgroundColor: 'white',
                    elevation: 0,
                    shadowColor: 'transparent',
                },
            }}
        >
            <Stack.Screen name="Productos" component={ProductsScreen} />
            <Stack.Screen name="Crear producto" component={CreateProductScreen} />
            <Stack.Screen name="Producto" component={ProductScreen} />
            <Stack.Screen name="Editar Producto" component={EditProductScreen} />
        </Stack.Navigator>
    );
}