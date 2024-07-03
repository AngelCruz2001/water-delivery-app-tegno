
import { AppState, StyleSheet, Text, View } from 'react-native'
import React, { PropsWithChildren, useEffect } from 'react'
import { usePermissionStore } from '../store/permissions/usePermissionStore'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { HomeStackProps } from '../navigation/HomeStackNavigator';
import { useUserStore } from '../store/users/useUserStore';

export const PermissionsChecker = ({ children }: PropsWithChildren) => {

    const { locationStatus, checkLocationPermission } = usePermissionStore();
    const user = useUserStore(state => state.user)
    const navigation = useNavigation<NavigationProp<HomeStackProps>>();

    useEffect(() => {
        checkLocationPermission();
    }, [])

    useEffect(() => {
        const subscription = AppState.addEventListener('change', (nextAppState) => {
            console.log('AppState', nextAppState)
            if (nextAppState === 'active') {
                checkLocationPermission();
            }
        })

        return () => {
            subscription.remove();
        }
    }, []);

    useEffect(() => {
        console.log(locationStatus)
        if (locationStatus === 'granted') {

            if (user?.type === 'driver') {
                navigation.reset({ routes: [{ name: 'DriverRoutePreviewScreen' }] })
            } else if (user?.type === 'admin' || user?.type === 'super') {
                navigation.reset({ routes: [{ name: 'AdminRouteScreenMap' }] })
            }
        } else if (locationStatus !== 'undetermined') {
            navigation.reset({ routes: [{ name: 'PermissionScreen' }] })
        }
    }, [locationStatus])

    return (children)
}
