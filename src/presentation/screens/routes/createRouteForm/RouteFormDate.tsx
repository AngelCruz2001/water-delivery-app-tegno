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

export const RouteFormDate = () => {

    const newRoute = useRoutesStore(state => state.newRoute);
    const setNewRoute = useRoutesStore(state => state.setNewRoute);
    const navigation = useNavigation<NavigationProp<RoutesStackProps>>();

    return (
        <ScreenContainer>
            <AppText weight='bold'
                style={{
                    marginBottom: paddingMap.verticalCard,
                }}>
                Fecha de entrega
            </AppText>

            <Card>
                <DateTimePicker
                    mode="single"
                    date={newRoute.programedDate}
                    // onChange={(params) => () => {
                    //     const programedDate = dayjs(params.date).toString();
                    //     console.log({ programedDate });
                    //     return setNewRoute({
                    //         ...newRoute,
                    //         programedDate,
                    //     })
                    // }}
                    onChange={(params) => setNewRoute({
                        ...newRoute,
                        programedDate: dayjs(params.date).toString(),
                    })}
                />
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
