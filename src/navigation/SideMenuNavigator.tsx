import { createDrawerNavigator } from "@react-navigation/drawer";
import { ProfileScreen } from "../presentation/screens/profile/ProfileScreen";
import { BottomTabsNavigator } from "./BottomTabsNavigator";
import { PermissionsChecker } from "../providers/PermissionsChecker";
import { AppButton } from "../presentation/components/shared";
import { removeToken } from "../presentation/api/api";

const Drawer = createDrawerNavigator();

export function AppNavigator() {

    return (
        <PermissionsChecker>
            <Drawer.Navigator
                screenOptions={{
                    headerShown: false,
                    // drawerType: 'back',

                    // drawerActiveBackgroundColor: colors.primary,
                    // drawerActiveTintColor: colors.white,
                    // drawerInactiveTintColor: colors.text,
                }}
            >
                <Drawer.Screen name="BottomTabsNavigator" component={BottomTabsNavigator} />
                <Drawer.Screen name="Profile" component={ProfileScreen} />
            </Drawer.Navigator>
        </PermissionsChecker>
    );
}
