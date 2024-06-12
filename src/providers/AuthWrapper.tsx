
import React, { PropsWithChildren, useEffect } from 'react'
import { useUserStore } from '../store/users/useUserStore';
import { RootStackNavigator, RootStackProps } from '../navigation/RootStackNavigator';
import { NavigationProp, useNavigation } from '@react-navigation/native';

type Props = PropsWithChildren & {}

export const AuthWrapper = ({ children }: Props) => {

    const navigation = useNavigation<NavigationProp<RootStackProps>>();
    const verifyToken = useUserStore(state => state.verifyToken);
    const user = useUserStore(state => state.user);

    useEffect(() => {
        const verify = async () => {
            const token = await verifyToken();
            console.log({ token })
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
    }, [user?.type])

    return (
        <RootStackNavigator />
    )
}
