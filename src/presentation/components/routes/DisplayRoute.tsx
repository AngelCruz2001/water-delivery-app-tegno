



import React from 'react'
import { Pressable, View } from 'react-native';
import { colors } from '../../../config/theme/colors';
import { paddingMap, roundedMap } from '../../../config/theme/globalstyle';
import { AppText } from '../shared/AppText';
import { AppButton } from '../shared/AppButton';
import { formatPhoneNumber } from '../../../helpers/phone';
import { TDisplayEnrichedRoute, TDisplayRoute } from '../../../interfaces/routers';
import { useClientsStore } from '../../../store/clients/useClientsStore';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ClientStackProps } from '../../../navigation/clients/ClientsStackNavigator';
import { Card } from '../shared/Card';
import { RoutesStackProps } from '../../../navigation/routes/RoutesStackNavigator';
import { useRoutesStore } from '../../../store/routes/useRoutesStore';
import { formatDate } from '../../../helpers/date';


type Props = {
    isLast?: boolean,
    route: TDisplayEnrichedRoute
}

export const DisplayRoute = ({
    isLast,
    route,
    route: {
        _id,
        programedDate,
        status,
        routeName,
        driverId,
        driverName,
        totalOrders,
        estimatedTimeInMinutes,
        startTime,
        endTime,
        routePauses,
    }
}: Props) => {

    const navigation = useNavigation<NavigationProp<RoutesStackProps>>();
    const setActiveRoute = useRoutesStore(state => state.setActiveRoute);

    return (
        <Pressable
            style={{
                backgroundColor: colors.white,
                width: '100%',
                marginBottom: isLast ? 0 : 8
            }}
            onPress={() => {
                // Navigate to the route screen
            }}
        >
            <Card
                style={{
                    paddingHorizontal: paddingMap.horizontalCard,
                    paddingVertical: paddingMap.verticalCard,
                }}
            >
                <View style={{
                    flexDirection: 'row',
                    gap: 5,
                }}>
                    <View style={{ gap: 2, justifyContent: 'space-between', flex: 1 }}>
                        <AppText weight='bold'>
                            {routeName}
                        </AppText>
                        <AppText size='sm' style={{ color: colors.primary }}>
                            {formatDate(new Date(programedDate))}
                        </AppText>

                    </View>
                    <View
                        style={{
                            alignItems: 'flex-end',
                            justifyContent: 'flex-end',
                            flex: .4,
                        }}

                    >
                        <DisplayRouteStatus status={status} />
                    </View>
                </View>
            </Card>
        </Pressable>
    )
}

type StatusProps = {
    status: string
}
const DisplayRouteStatus = ({ status }: StatusProps) => {
    const color = status === 'pending' ? colors.warning : status ===
        'completed' ? colors.success : colors.primaryDark;
    const statusText = status === 'pending' ? 'pendiente' : status ===
        'completed' ? 'completada' : 'en ruta';
    return (
        <View
            style={{
                backgroundColor: color,
                borderRadius: roundedMap.full,
                paddingHorizontal: paddingMap.horizontalCard,
                paddingVertical: 4,
            }}
        >
            <AppText size='sm' style={{
                color: colors.white,
            }}>
                {statusText}
            </AppText>
        </View>
    )
}