import React, { useMemo, useState } from 'react'

import { AppButton, AppText } from '../../../components/shared'
import { Card } from '../../../components/shared/Card';
import { paddingMap } from '../../../../config/theme/globalstyle';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import { ScreenContainer } from '../../../components/shared/ScreenContainer';
import { useRoutesStore } from '../../../../store/routes/useRoutesStore';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RoutesStackProps } from '../../../../navigation/routes/RoutesStackNavigator';
import WeekDayPicker from '../../../components/routes/createRouteForm/WeekDayPicker';

export const RouteFormDate = () => {

    const newRoute = useRoutesStore(state => state.newRoute);
    const setNewRoute = useRoutesStore(state => state.setNewRoute);
    const navigation = useNavigation<NavigationProp<RoutesStackProps>>();

    const handleDayPickerChange = (days: number[]) => {
        console.log("days: ", days);

        setNewRoute({
            ...newRoute,
            scheduledDays: days
        })
    }


    return (
        <ScreenContainer>
            <AppText weight='bold'
                style={{
                    marginBottom: paddingMap.verticalCard,
                }}>
                Fecha de entrega
            </AppText>

            <Card>
                <WeekDayPicker
                    key={newRoute.scheduledDays.toString()}
                    onChange={handleDayPickerChange}
                />

                {/* <DateTimePicker
                    mode="single"
                    date={newRoute.}
                    onChange={(params) => setNewRoute({
                        ...newRoute,
                        : dayjs(params.date),
                    })}
                /> */}
                
            </Card>

            <AppButton
                style={{
                    marginTop: 20
                }}
                onPress={() => {
                    navigation.navigate('DriversTab')
                }}>
                Continuar
            </AppButton>
        </ScreenContainer>
    )
}
