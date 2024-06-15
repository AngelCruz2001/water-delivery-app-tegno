

import { NavigationProp, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { colors } from "../../config/theme/colors";
import { RoutesScreen } from "../../presentation/screens/routes/RoutesScreen";
import { CreateRouteScreen } from "../../presentation/screens/routes/CreateRouteScreen";
import { AddOrdersScreen } from "../../presentation/screens/routes/AddOrdersScreen/AddOrdersScreen";

export type RoutesStackProps = {
    RoutesScreen: undefined;
    CreateRouteScreen: undefined;
    AddOrdersScreen: undefined;
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
            <Stack.Screen name="CreateRouteScreen" component={CreateRouteScreen} options={{
                title: 'Nueva Ruta',
            }} />
            <Stack.Screen name="AddOrdersScreen" component={AddOrdersScreen} options={{
                title: 'Anadir Órdenes',
            }} />
        </Stack.Navigator>
    );
}