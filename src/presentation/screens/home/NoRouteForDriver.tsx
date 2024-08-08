import React, { useEffect, useState } from 'react';
import { AppText } from '../../components/shared';
import { View, Image } from 'react-native';
import { DriverMapStackProps } from '../../../navigation/DriverMapStack';
import { useRouteOnView } from '../../hooks/routes/useRouteOnView';
import { useUserStore } from '../../../store/users/useUserStore';
import { useUiStore } from '../../../store/ui/useUiStore';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ScreenScrollContainer } from '../../components/shared/ScreenScrollContainer';

export const NoRouteForDriver = () => {
    const user = useUserStore(state => state.user);
    const { routeOnView, waypointsInfo, isLoading, refetch } = useRouteOnView(user?._id || '');
    const setIsLoading = useUiStore(state => state.setIsLoading);
    const navigation = useNavigation<NavigationProp<DriverMapStackProps>>();
    const [refetchTimestamp, setRefetchTimestamp] = useState(0);

    useEffect(() => {
        if (waypointsInfo && waypointsInfo.length > 0) {
            const filteredWaypoints = waypointsInfo.filter(waypoint => waypoint.status === 'created');
            if (filteredWaypoints.length > 0) {
                navigation.navigate('DriverRoutePreviewScreen', {
                    numberAlreadyDelivered: waypointsInfo.length - filteredWaypoints.length,
                    waypoints: filteredWaypoints,
                    originalWaypoints: waypointsInfo,
                    routeOnView: routeOnView,
                });
            }
        }
    }, [waypointsInfo, navigation, routeOnView, refetchTimestamp]);

    useEffect(() => {
        setIsLoading(isLoading);
    }, [isLoading, setIsLoading]);

    const handleRefetch = () => {
        refetch().then(() => {
            setRefetchTimestamp(refetchTimestamp + 1);
        })
    };

    return (
        <ScreenScrollContainer
            containerStyle={{ justifyContent: 'center', alignItems: 'center', gap: 10 }}
            onRefresh={handleRefetch}
        >
            <View style={{ height: 100, width: 250 }}>
                <Image
                    source={require('../../../assets/logo.png')}
                    style={{ height: '100%', width: '100%', resizeMode: 'contain' }}
                />
            </View>
            <AppText>No hay rutas disponibles por el momento</AppText>
        </ScreenScrollContainer>
    );
};
