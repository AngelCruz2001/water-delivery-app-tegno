import React, { useMemo, useState } from 'react'

import { AppButton, AppText } from '../../../components/shared'
import { Card } from '../../../components/shared/Card';
import { paddingMap } from '../../../../config/theme/globalstyle';
import { ScreenContainer } from '../../../components/shared/ScreenContainer';
import { useRoutesStore } from '../../../../store/routes/useRoutesStore';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RoutesStackProps } from '../../../../navigation/routes/RoutesStackNavigator';
import { Pressable, View } from 'react-native';
import { colors } from '../../../../config/theme/colors';


const weekDays = [
    { label: 'Lun', value: 0 },
    { label: 'Mar', value: 1 },
    { label: 'Mié', value: 2 },
    { label: 'Jue', value: 3 },
    { label: 'Vie', value: 4 },
    { label: 'Sáb', value: 5 },
    { label: 'Dom', value: 6 }
];

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
                <View
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        gap: 10
                    }}
                >
                    {weekDays.map((day) => {
                        const isSelected = newRoute.scheduledDays.includes(day.value);
                        return (
                            <Pressable
                                onPress={() => {
                                    const updatedDays = [...newRoute.scheduledDays];
                                    if (isSelected) {
                                        updatedDays.splice(updatedDays.indexOf(day.value), 1);
                                    } else {
                                        updatedDays.push(day.value);
                                    }
                                    setNewRoute({
                                        ...newRoute,
                                        scheduledDays: updatedDays
                                    })
                                }}
                                style={{
                                    padding: 10,
                                    borderWidth: 1,
                                    borderRadius: 5,
                                    borderColor: '#ddd',
                                    backgroundColor: isSelected ? '#007bff' : colors.white,
                                }} >
                                <AppText
                                    style={{
                                        color: isSelected ? colors.white : 'black'
                                    }}
                                >{day.label}</AppText>
                            </Pressable>
                        )
                    })}
                </View>
                {/* <WeekDayPicker
                    key={newRoute.scheduledDays.length}
                    onChange={handleDayPickerChange}
                /> */}

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
