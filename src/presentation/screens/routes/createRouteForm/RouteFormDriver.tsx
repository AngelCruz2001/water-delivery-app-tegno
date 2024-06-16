

import React, { useMemo, useState } from 'react'
import { useUserStore } from '../../../../store/users/useUserStore';
import { useGetUsers } from '../../../hooks/users/useGetUsers';
import { AppButton, AppText } from '../../../components/shared';
import { Card } from '../../../components/shared/Card';
import { FlatList, Pressable } from 'react-native';
import { paddingMap, roundedMap } from '../../../../config/theme/globalstyle';
import { colors } from '../../../../config/theme/colors';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useRoutesStore } from '../../../../store/routes/useRoutesStore';
import { ScreenContainer } from '../../../components/shared/ScreenContainer';
import { RoutesStackProps } from '../../../../navigation/routes/RoutesStackNavigator';

export const RouteFormDriver = () => {

    const { isLoading, isError, refetch } = useGetUsers();
    const users = useUserStore(state => state.users);
    const drivers = useMemo(() => users.filter(user => user.type === 'driver'), [users]);
    // const [selectedDriverId, setSelectedDriverId] = useState<string>('');
    const newRoute = useRoutesStore(state => state.newRoute);
    const setNewRoute = useRoutesStore(state => state.setNewRoute);

    const navigation = useNavigation<NavigationProp<RoutesStackProps>>()

    return (
        <ScreenContainer>
            <AppText weight='bold'
                style={{
                    marginBottom: paddingMap.verticalCard,
                }}>
                Selecciona un chofer
            </AppText>

            <Card>
                <FlatList
                    data={drivers}
                    keyExtractor={item => item._id}
                    style={{
                        width: '100%',
                        flex: 0, // No tome todo el espacio disponible
                        // maxHeight: 140,
                        paddingHorizontal: 0,
                        paddingTop: 5
                    }}
                    renderItem={({ item }) => (
                        <Card style={{
                            marginBottom: 10,
                            backgroundColor: newRoute.driverId === item._id ? colors.success : colors.white,
                            padding: 0,
                            borderRadius: roundedMap.full,
                            overflow: 'hidden',
                            borderWidth: 1,
                            borderColor: colors.success
                        }}>
                            <Pressable
                                style={{
                                    flex: 1,
                                    paddingVertical: paddingMap.horizontalCard,
                                    paddingHorizontal: 20
                                }}
                                onPress={() => setNewRoute({
                                    ...newRoute,
                                    driverId: item._id,
                                    driverName: item.name
                                })}
                            >
                                <AppText
                                    style={{
                                        color: newRoute.driverId === item._id ? colors.white : colors.text
                                    }}
                                >{item.name}</AppText>
                            </Pressable>
                        </Card>
                    )}
                >
                </FlatList>
            </Card>
            <AppButton
                disabled={newRoute.driverId === ''}
                style={{
                    marginTop: 20
                }}
                onPress={() => {
                    navigation.navigate('NameTab')
                }}>
                Continuar
            </AppButton>
        </ScreenContainer>
    )
}
