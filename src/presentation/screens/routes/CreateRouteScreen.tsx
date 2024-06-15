import React, { useMemo, useState } from 'react'

import { AppText } from '../../components/shared'
import { useGetUsers } from '../../hooks/users/useGetUsers';
import { useUserStore } from '../../../store/users/useUserStore';
import { useForm } from 'react-hook-form';
import Form from '../../components/shared/Form';
import { FlatList, Pressable, StyleProp, View } from 'react-native';
import { Card } from '../../components/shared/Card';
import { paddingMap, roundedMap } from '../../../config/theme/globalstyle';
import { colors } from '../../../config/theme/colors';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import { ScreenScrollContainer } from '../../components/shared/ScreenScrollContainer';

export const CreateRouteScreen = () => {

    const { isLoading, isError, refetch } = useGetUsers();
    const users = useUserStore(state => state.users);
    const drivers = useMemo(() => users.filter(user => user.type === 'driver'), [users]);
    const [selectedDriverId, setSelectedDriverId] = useState<string>('');
    const [date, setDate] = useState<any>(dayjs());

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            programedDate: '',
            routeName: '',
        }
    })

    console.log({ date })
    return (
        <ScreenScrollContainer>
            <AppText weight='bold'
                style={{
                    marginBottom: paddingMap.verticalCard
                }}>
                Fecha de entrega
            </AppText>
            <Card>
                <DateTimePicker
                    mode="single"
                    date={date}
                    onChange={(params) => setDate(params.date)}
                />
            </Card>


            <AppText weight='bold'
                style={{
                    marginTop: 40,
                    marginBottom: paddingMap.verticalCard
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
                        maxHeight: 135,
                        paddingHorizontal: 0
                    }}
                    renderItem={({ item }) => (
                        <Card style={{
                            marginBottom: 10,
                            backgroundColor: selectedDriverId === item._id ? colors.primary : colors.white,
                            padding: 0,
                            borderRadius: roundedMap.full,
                            overflow: 'hidden',
                            borderWidth: 1,
                            borderColor: colors.primary
                        }}>
                            <Pressable
                                style={{
                                    flex: 1,
                                    paddingVertical: paddingMap.horizontalCard,
                                    paddingHorizontal: 20
                                }}
                                onPress={() => setSelectedDriverId(item._id)}
                            >
                                <AppText
                                    style={{
                                        color: selectedDriverId === item._id ? colors.white : colors.text
                                    }}
                                >{item.name}</AppText>
                            </Pressable>
                        </Card>
                    )}
                >
                </FlatList>
            </Card>

            {/* <View style={{
                width: '100%',
                height: 2,
                backgroundColor: colors.primaryLight,
                marginBottom: 30
            }} /> */}


        </ScreenScrollContainer>
    )
}
