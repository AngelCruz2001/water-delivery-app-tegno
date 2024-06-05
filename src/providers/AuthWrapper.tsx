
import React, { PropsWithChildren, useEffect } from 'react'
import { useUserStore } from '../store/users/useUserStore';
import { getToken } from '../presentation/api/api';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { RootStackNavigator, RootStackProps } from '../navigation/RootStackNavigator';
import { NavigationProp, useNavigation } from '@react-navigation/native';

type Props = PropsWithChildren & {}

const Drawer = createDrawerNavigator();

export const AuthWrapper = ({ children }: Props) => {

    const navigation = useNavigation<NavigationProp<RootStackProps>>();
    const verifyToken = useUserStore(state => state.verifyToken);

    useEffect(() => {
        const verify = async () => {
            const token = await verifyToken();
            if (token) {
                navigation.reset({
                    routes: [{ name: 'App Navigator' }],
                });
                return
            } else {
                navigation.reset({
                    routes: [{ name: 'LoginScreen' }],
                });
            }
        }
        verify();
    }, [])

    return (
        <RootStackNavigator />
    )
}
