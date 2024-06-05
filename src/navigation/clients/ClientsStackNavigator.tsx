
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

export type ClientStackProps = {
    Clientes: undefined,
    "Crear Cliente": undefined,
    "Registar Dirección": { id: string }
    // Cliente: { client: TComposedClient }
    "Cliente": { client: TDisplayClient }
    "Editar Cliente": { client: TDisplayClient }
    "Mapa de Clientes": undefined
}

const Stack = createStackNavigator<ClientStackProps>();

export function ClientStackNavigator() {

    const navigation = useNavigation<NavigationProp<ClientStackProps>>();

    return (
        <Stack.Navigator
            initialRouteName='Clientes'
            screenOptions={{
                cardStyle: { backgroundColor: colors.background },
                headerStyle: {
                    backgroundColor: colors.textLight,
                    elevation: 0,
                    shadowColor: 'transparent',
                },
                headerTintColor: colors.white,
                headerTitleStyle: {
                    fontWeight: 'bold',
                    color: colors.white,
                },
                headerBackTitleStyle: {
                    color: colors.white,
                    fontSize: fontSizeMap.sm
                },
            }}
        >
            <Stack.Screen name="Clientes" component={ClientsScreen} />
            <Stack.Screen name="Crear Cliente" component={CreateClientScreen} />
            <Stack.Screen name="Cliente" component={ClientScreen} />
            <Stack.Screen name="Registar Dirección" component={SetAddressMap} />
            <Stack.Screen name="Mapa de Clientes" component={ClientsMap} />
            <Stack.Screen name="Editar Cliente" component={EditClientScreen} />
        </Stack.Navigator>
    );
}