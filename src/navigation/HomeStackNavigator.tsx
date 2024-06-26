import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../presentation/screens/home/HomeScreen';
import { PermissionScreen } from '../presentation/screens/permission/PermissionScreen';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { LoadingScreen } from '../presentation/screens/loading/LoadingScreen';
import { colors } from '../config/theme/colors';
import { CreateClientScreen } from '../presentation/screens/clients/CreateClientScreen';
import { QuickSaleScreen } from '../presentation/screens/sales/QuickSaleScreen';

export type HomeStackProps = {
    "HomeScreen": undefined,
    "LoadingScreen": undefined,
    "HomeCreateClient": undefined,
    "PermissionScreen": undefined,
    "QuickSaleScreen": undefined
}
const Stack = createStackNavigator<HomeStackProps>();

export function HomeStackNavigator() {
    const navigation = useNavigation()

    useEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    }, []);

    return (
        <Stack.Navigator
            initialRouteName='LoadingScreen'
            screenOptions={{
                // headerShown: false,
                cardStyle: { backgroundColor: colors.background },
            }}
        >
            <Stack.Screen name="HomeScreen" options={{
                title: 'Inicio'
            }} component={HomeScreen} />
            <Stack.Screen name="HomeCreateClient" options={{ title: 'Crear cliente' }} component={CreateClientScreen} />
            <Stack.Screen name="PermissionScreen" component={PermissionScreen} />
            <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
            <Stack.Screen name="QuickSaleScreen" component={QuickSaleScreen} options={{ title: 'Registar Cliente y Venta' }} />
        </Stack.Navigator>
    );
}