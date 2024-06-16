

import { createStackNavigator } from "@react-navigation/stack";
import { colors } from "../../config/theme/colors";
import { RoutesScreen } from "../../presentation/screens/routes/RoutesScreen";
import { RouteFormDate } from "../../presentation/screens/routes/createRouteForm/RouteFormDate";
import { RouteFormDriver } from "../../presentation/screens/routes/createRouteForm/RouteFormDriver";
import { RouteFormName } from "../../presentation/screens/routes/createRouteForm/RouteFormName";

export type RoutesStackProps = {
    RoutesScreen: undefined;
    DateTab: undefined;
    DriversTab: undefined;
    NameTab: undefined;
    // CreateRouteScreen: undefined;
    // AddOrdersScreen: undefined;
}

const Stack = createStackNavigator<RoutesStackProps>();

export function RoutesStackNavigator() {
    return (
        <Stack.Navigator
            initialRouteName='RoutesScreen'
            screenOptions={{
                cardStyle: { backgroundColor: colors.background },
                headerStyle: {
                    backgroundColor: 'white',
                    elevation: 0,
                    shadowColor: 'transparent',
                },
            }}
        >
            <Stack.Screen name="RoutesScreen" component={RoutesScreen} options={{
                title: 'Rutas y Órdenes',
            }} />
            <Stack.Screen name="DateTab" component={RouteFormDate} options={{
                title: 'Nueva Ruta',
                headerBackTitle: 'cancelar'
                // headerShown: false
            }} />
            <Stack.Screen name="DriversTab" component={RouteFormDriver} options={{
                title: 'Conductor para Ruta',
                headerBackTitle: 'fecha'
                // headerShown: false
            }} />
            <Stack.Screen name="NameTab" component={RouteFormName} options={{
                title: 'Nombre de ruta',
                headerBackTitle: 'chofer'
                // headerShown: false
            }} />
        </Stack.Navigator>
    );
}