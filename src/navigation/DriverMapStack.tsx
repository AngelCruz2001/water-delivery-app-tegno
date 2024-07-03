import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { colors } from '../config/theme/colors';
import { QuickSaleScreen } from '../presentation/screens/sales/QuickSaleScreen';
import { TDisplayRoute, TWaypoint } from '../interfaces/routers';
import { DriverMapScreen } from '../presentation/screens/home/DriverMapScreen';
import { DriverRoutePreviewScreen } from '../presentation/screens/home/DriverRoutePreviewScreen';
import { CreateClientScreen } from '../presentation/screens/clients/CreateClientScreen';


export type DriverMapStackProps = {
    "QuickSaleScreen": undefined,
    "DriverRouteMap": { waypoints: TWaypoint[], route: TDisplayRoute }
    DriverRoutePreviewScreen: undefined
    CreateClientScreen: undefined
}
const Stack = createStackNavigator<DriverMapStackProps>();

export function DriverMapStack() {
    const navigation = useNavigation()

    useEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, []);

    return (
        <Stack.Navigator
            initialRouteName='DriverRoutePreviewScreen'
            screenOptions={{
                // headerShown: false,
                cardStyle: { backgroundColor: colors.background },
            }}
        >
            <Stack.Screen name="DriverRouteMap" component={DriverMapScreen} options={{ title: 'Ruta del repartidor', headerShown: false }} />
            <Stack.Screen name="QuickSaleScreen" component={QuickSaleScreen} options={{ title: 'Registar Cliente y Venta' }} />
            <Stack.Screen name="DriverRoutePreviewScreen" component={DriverRoutePreviewScreen} options={{ title: 'Resumen' }} />
            <Stack.Screen name="CreateClientScreen" options={{ title: 'Crear cliente' }} component={CreateClientScreen} />
        </Stack.Navigator>
    );
}