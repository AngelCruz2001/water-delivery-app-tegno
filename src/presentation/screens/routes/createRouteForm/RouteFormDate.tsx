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
    { label: 'Dom', value: 0 },
    { label: 'Lun', value: 1 },
    { label: 'Mar', value: 2 },
    { label: 'Mié', value: 3 },
    { label: 'Jue', value: 4 },
    { label: 'Vie', value: 5 },
    { label: 'Sáb', value: 6 }
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
                                key={day.value}
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
                                    paddingHorizontal: 6,
                                    paddingVertical: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center',
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
