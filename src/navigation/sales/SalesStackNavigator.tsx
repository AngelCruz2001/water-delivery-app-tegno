



import { createStackNavigator } from "@react-navigation/stack";
import { colors } from "../../config/theme/colors";
import { SalesScreen } from "../../presentation/screens/sales/SalesScreen";
export type RoutesStackProps = {
    SalesScreen: undefined
}

const Stack = createStackNavigator<RoutesStackProps>();

export function SalesStackNavigator() {
    return (
        <Stack.Navigator
            initialRouteName='SalesScreen'
            screenOptions={{
                cardStyle: { backgroundColor: colors.background },
                headerStyle: {
                    backgroundColor: 'white',
                    elevation: 0,
                    shadowColor: 'transparent',
                },
            }}
        >
            <Stack.Screen name="SalesScreen" component={SalesScreen} options={{
                title: 'Ventas',
            }} />
        </Stack.Navigator>
    );
}