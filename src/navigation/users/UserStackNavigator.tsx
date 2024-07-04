


// screenOptions={{
//     cardStyle: { backgroundColor: colors.background },
//     headerStyle: {
//         backgroundColor: colors.background,
//         elevation: 0,
//         shadowColor: 'transparent',
//     }
// }}


import { NavigationProp, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { colors } from "../../config/theme/colors";
import { UsersScreen } from "../../presentation/screens/users/UsersScreen";
import { CreateUserScreen } from "../../presentation/screens/users/CreateUserScreen";
import { darken } from "../../config/theme/helpers";
import { fontSizeMap } from "../../presentation/components/shared/sizes";
import { UserScreen } from "../../presentation/screens/users/UserScreen";
import { TUser } from "../../interfaces/user";

export type UserStackProps = {
    Usuarios: undefined,
    "Crear usuario": undefined
    Usuario: { userId: string }
    "Editar Usuario": { user: TUser }
}

const Stack = createStackNavigator<UserStackProps>();

export function UserStackNavigator() {

    const navigation = useNavigation<NavigationProp<UserStackProps>>();

    return (
        <Stack.Navigator
            initialRouteName='Usuarios'
            screenOptions={{
                cardStyle: { backgroundColor: colors.background },
                headerStyle: {
                    backgroundColor: colors.primaryDark,
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
            <Stack.Screen name="Usuarios" component={UsersScreen} />
            <Stack.Screen name="Crear usuario" component={CreateUserScreen} />
            <Stack.Screen name="Usuario" component={UserScreen} />
        </Stack.Navigator>
    );
}