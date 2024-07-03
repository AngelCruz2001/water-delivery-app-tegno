import React from "react";
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem, DrawerItemList, createDrawerNavigator } from "@react-navigation/drawer";
import { ProfileScreen } from "../presentation/screens/profile/ProfileScreen";
import { BottomTabsNavigator } from "./BottomTabsNavigator";
import { PermissionsChecker } from "../providers/PermissionsChecker";
import { AppText } from "../presentation/components/shared";
import { removeToken } from "../presentation/api/api";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Pressable, View } from "react-native";
import { RootStackProps } from "./RootStackNavigator";
import { useUserStore } from "../store/users/useUserStore";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Loader } from "../presentation/components/shared/Loader";
import { useUiStore } from "../store/ui/useUiStore";
import { DriverMapStack } from "./DriverMapStack";

const Drawer = createDrawerNavigator();

export function AppNavigator() {
    const isLoading = useUiStore(state => state.isLoading);
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
                <Drawer.Screen name="DriverMapStack" component={DriverMapStack} />
            </Drawer.Navigator>
            {isLoading && <Loader />}
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
