import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from "@react-navigation/drawer";
import { ProfileScreen } from "../presentation/screens/profile/ProfileScreen";
import { BottomTabsNavigator } from "./BottomTabsNavigator";
import { PermissionsChecker } from "../providers/PermissionsChecker";
import { AppButton, AppText } from "../presentation/components/shared";
import { removeToken } from "../presentation/api/api";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Alert, Pressable, View } from "react-native";
import { RootStackProps } from "./RootStackNavigator";
import { useUserStore } from "../store/users/useUserStore";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Drawer = createDrawerNavigator();

export function AppNavigator() {

    return (
        <PermissionsChecker>
            <Drawer.Navigator
                drawerContent={(props) => <CustomDrawerContent {...props} />}
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

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {

    const navigation = useNavigation<NavigationProp<RootStackProps>>();
    const verifyToken = useUserStore(state => state.verifyToken);
    const { bottom } = useSafeAreaInsets()

    return (
        <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
            <DrawerItemList {...props} />
            <View style={{
                marginTop: 'auto',
                marginBottom: bottom + 10,
            }}>
                <Pressable
                    style={{
                        alignItems: 'center'
                    }}
                    onPress={() => {
                        removeToken();
                        verifyToken();
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'LoginScreen' }],
                        })
                    }}>
                    <AppText style={{ color: 'red' }} >Cerrar sesión</AppText>
                </Pressable>
            </View>
        </DrawerContentScrollView>
    );
};
