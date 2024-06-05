
import { AppState, StyleSheet, Text, View } from 'react-native'
import React, { PropsWithChildren, useEffect } from 'react'
import { usePermissionStore } from '../store/permissions/usePermissionStore'
import { useNavigation } from '@react-navigation/native';

export const PermissionsChecker = ({ children }: PropsWithChildren) => {

    const { locationStatus, checkLocationPermission } = usePermissionStore();
    const navigation = useNavigation();

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
        if (locationStatus === 'granted') {
            navigation.reset({ routes: [{ name: 'HomeScreen' as never }] })
        } else if (locationStatus !== 'undetermined') {
            navigation.reset({ routes: [{ name: 'PermissionScreen' as never }] })
        }
    }, [locationStatus])

    return (children)
}
