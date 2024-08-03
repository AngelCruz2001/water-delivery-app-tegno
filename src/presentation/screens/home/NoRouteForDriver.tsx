import React, { useEffect, useState } from 'react'
import { AppText } from '../../components/shared'
import { View } from 'react-native'
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types'
import { DriverMapStackProps } from '../../../navigation/DriverMapStack'
import { useRouteOnView } from '../../hooks/routes/useRouteOnView'
import { useUserStore } from '../../../store/users/useUserStore'
import { useUiStore } from '../../../store/ui/useUiStore'
import { NavigationProp, useNavigation } from '@react-navigation/native'



export const NoRouteForDriver = () => {

    const user = useUserStore((state) => state.user);

    const { routeOnView, waypointsInfo, isLoading } = useRouteOnView(user?._id || '');
    const [filteredWaypoints, setfilteredWaypoints] = useState(waypointsInfo || []);
    const setIsLoading = useUiStore(state => state.setIsLoading);

    const navigation = useNavigation<NavigationProp<DriverMapStackProps>>()


    useEffect(() => {
        setIsLoading(isLoading);
    }, [isLoading, setIsLoading]);


    useEffect(() => {
        const filteredWaypoints = waypointsInfo.filter((waypoint) => waypoint.status === 'created');
        setfilteredWaypoints(filteredWaypoints);
    }, [waypointsInfo]);

    useEffect(() => {
        if (filteredWaypoints.length > 0) {
            navigation.navigate('NoRouteForDriver', { screen: 'NoRouteForDriver' });
        }
    }, [filteredWaypoints])
            

    return (
        <View>
            <AppText>No route for driver</AppText>
        </View>
    )
}
