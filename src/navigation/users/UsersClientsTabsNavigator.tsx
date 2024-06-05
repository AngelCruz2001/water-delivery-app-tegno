


import { View } from 'react-native'
import React, { useLayoutEffect } from 'react'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { ClientStackNavigator } from '../clients/ClientsStackNavigator';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../../config/theme/colors';
import { UserStackNavigator } from './UserStackNavigator';
import { useUserStore } from '../../store/users/useUserStore';

export type UsersClientsTabsProps = {
    ClientsStack: undefined,
    UsersStack: undefined
}

const Tab = createMaterialTopTabNavigator<UsersClientsTabsProps>();

export function UsersClientsTabsNavigator() {

    const navigation = useNavigation<NavigationProp<UsersClientsTabsProps>>();
    const { top } = useSafeAreaInsets()
    const user = useUserStore(state => state.user)

    useLayoutEffect(() => {
        navigation.setOptions({
            header: () => (
                <View style={{
                    height: top,
                    backgroundColor: colors.white,
                    justifyContent: 'flex-end',
                    alignItems: 'flex-start',
                }} />
            )
        });
    }, [navigation]);

    return (
        <Tab.Navigator
            initialRouteName='ClientsStack'
            screenOptions={{
                tabBarStyle: {
                    elevation: 0,
                    shadowColor: 'transparent',
                }
            }}
        >
            <Tab.Screen name="UsersStack" component={UserStackNavigator}
                options={{
                    title: 'Usuarios',
                }}
            />

            <Tab.Screen name="ClientsStack" component={ClientStackNavigator}
                options={{
                    title: 'Clientes',
                }}
            />
        </Tab.Navigator>
    );
}

