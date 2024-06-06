

import { NavigationProp, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect } from "react";
import { colors } from "../../config/theme/colors";
import { ClientsScreen } from "../../presentation/screens/clients/ClientsScreen";
import { CreateClientScreen } from "../../presentation/screens/clients/CreateClientScreen";
import { SetAddressMap } from "../../presentation/screens/clients/SetAddressMap";
import { ClientScreen } from "../../presentation/screens/clients/ClientScreen";
import { TDisplayClient } from "../../interfaces/clients";
import { ClientsMap } from "../../presentation/screens/clients/ClientsMap";
import { EditClientScreen } from "../../presentation/screens/clients/EditClientScreen";
import { fontSizeMap } from "../../presentation/components/shared/sizes";
import { RoutesScreen } from "../../presentation/screens/routes/RoutesScreen";

export type RoutesStackProps = {
    Routes: undefined
}

const Stack = createStackNavigator<RoutesStackProps>();

export function RoutesStackNavigator() {

    const navigation = useNavigation<NavigationProp<RoutesStackProps>>();

    return (
        <Stack.Navigator
            initialRouteName='Routes'
            screenOptions={{
                cardStyle: { backgroundColor: colors.background },
                headerStyle: {
                    backgroundColor: 'white',
                    elevation: 0,
                    shadowColor: 'transparent',
                },
            }}
        >
            <Stack.Screen name="Routes" component={RoutesScreen} options={{
                title: 'Rutas y Órdenes',
            }} />
        </Stack.Navigator>
    );
}