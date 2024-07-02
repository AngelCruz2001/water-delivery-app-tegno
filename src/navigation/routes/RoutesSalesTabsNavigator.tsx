





import { View } from 'react-native'
import React, { useLayoutEffect } from 'react'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../config/theme/colors';
import { useUserStore } from '../../store/users/useUserStore';
import { RoutesStackNavigator } from './RoutesStackNavigator';
import { SalesStackNavigator } from '../sales/SalesStackNavigator';

export type RoutesSalesTabsProps = {
    // ClientsStack: undefined,
    // UsersStack: undefined
    RoutesStack: undefined,
    SalesStack: undefined
}

const Tab = createMaterialTopTabNavigator<RoutesSalesTabsProps>();

export function RoutesSalesTabsNavigator() {

    const navigation = useNavigation<NavigationProp<RoutesSalesTabsProps>>();
    const { top } = useSafeAreaInsets()
    const user = useUserStore(state => state.user)

    // useLayoutEffect(() => {
    //     navigation.setOptions({
    //         header: () => (
    //             <View style={{
    //                 height: top,
    //                 backgroundColor: colors.success,
    //                 justifyContent: 'flex-end',
    //                 alignItems: 'flex-start',
    //             }} />
    //         )
    //     });
    // }, [navigation]);

    return (
        <Tab.Navigator
            initialRouteName='RoutesStack'
            screenOptions={{
                tabBarStyle: {
                    elevation: 0,
                    shadowColor: 'transparent',
                    backgroundColor: colors.background,
                    top
                }
            }}
        >
            <Tab.Screen name="RoutesStack" component={RoutesStackNavigator}
                options={{
                    title: 'Órdenes',
                }}
            />
            <Tab.Screen name="SalesStack" component={SalesStackNavigator}
                options={{
                    title: 'Ventas',
                }}
            />
        </Tab.Navigator>
    );
}

