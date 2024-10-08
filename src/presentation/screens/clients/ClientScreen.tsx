



import { Alert, Pressable, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { ScreenScrollContainer } from '../../components/shared/ScreenScrollContainer'
import { DataItem } from '../../components/shared/DataItem'
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types'
import { ClientStackProps } from '../../../navigation/clients/ClientsStackNavigator'
import { Card } from '../../components/shared/Card'
import { formatPhoneNumber } from '../../../helpers/phone'
import { DisplayMap } from '../../components/shared/DisplayMap'
import { colors } from '../../../config/theme/colors'
import { AppText } from '../../components/shared'
import { paddingMap } from '../../../config/theme/globalstyle'
import { FAB } from '../../components/shared/fab/Fab'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { useUserStore } from '../../../store/users/useUserStore'
import Icon from 'react-native-vector-icons/Ionicons'
import { useUiStore } from '../../../store/ui/useUiStore'
import { deleteClient } from '../../../store/clients/api/deleteClient'
import { useMutation } from '@tanstack/react-query'
import { showCreatedToast, showErrorToast } from '../../components/toasts/toasts'
import { useClientsStore } from '../../../store/clients/useClientsStore'

type Props = NativeStackScreenProps<ClientStackProps, 'Cliente'>;

export const ClientScreen = ({ route }: Props) => {

    const { params: { client } } = route;
    const navigation = useNavigation<NavigationProp<ClientStackProps>>();
    const user = useUserStore(state => state.user);
    const removeClient = useClientsStore(state => state.removeClient);

    const setIsLoading = useUiStore(state => state.setIsLoading);

    const { mutate,  } = useMutation({
        mutationFn: async () => {
            setIsLoading(true)
            return deleteClient(client._id)
        },
        onSuccess: () => {
            setIsLoading(false)
            try {
                removeClient(client._id)
            } catch (error) {
                console.log("Remove user error:", { error })
            }
            navigation.goBack()
            showCreatedToast('Cliente eliminado con éxito')
        },
        onError: () => {
            setIsLoading(false)
            showErrorToast('Error al eliminar el cliente')
        }
    })


    useEffect(() => {
        if (!(user?.type === 'super' || user?.type === 'admin')) {
            return
        }
        navigation.setOptions({
            headerRight: () => {
                return (
                    <Pressable
                        style={{
                            marginRight: paddingMap.headerButton,
                        }}
                        onPress={() => {
                            Alert.alert('Eliminar cliente', '¿Estás seguro de eliminar este cliente?', [
                                { text: 'Cancelar', style: 'cancel' },
                                { text: 'Eliminar', onPress: () => mutate() }
                            ])
                        }}
                    >
                        <Icon name='trash' size={25} color={colors.muted} />
                    </Pressable>
                )
            }
        })

    }, [])

    return (
        <>
            <ScreenScrollContainer style={{
            }} >
                <Card style={{ gap: 10 }} >
                    <DataItem
                        label='Nombre'
                        value={client.name}
                    />
                    <DataItem
                        label='Negocio'
                        value={client.businessName}
                    />
                    <DataItem
                        label='Número de contacto'
                        value={formatPhoneNumber(client.phoneNumber)}
                    />
                    {/* <Pressable
                    onPress={() => {
                        Alert.alert('Información del cliente', `Registrado el ${new Date(client.createdAt).toLocaleDateString()}`)
                    }}
                > */}
                    <DataItem
                        label='Registrado por'
                        value={client.registeredByName}
                        color={colors.success}
                        isLast
                    />
                    {/* </Pressable> */}
                </Card>

                <Card style={{
                    height: 300,
                    marginVertical: 10
                }}>
                    <DisplayMap
                        title={client.businessName}
                        description={client.address!}
                        location={client.location!}
                    />
                    <AppText style={{
                        marginTop: 10
                    }}>
                        {client.address}
                    </AppText>
                </Card>

                <AppText size='lg' weight='bold' style={{
                    color: colors.text,
                    marginTop: 10,
                    marginBottom: 10
                }}>
                    Historial de Pedidos
                </AppText>
                <Card style={{

                }}>
                    <AppText style={{
                        textAlign: 'center',
                        color: colors.primary,
                        paddingVertical: paddingMap.verticalCard
                    }} size='sm'  >
                        Aún no hay pedidos
                    </AppText>
                </Card>


            </ScreenScrollContainer>

            {
                (user?.type === 'super' || user?.type === 'admin') && (

                    <FAB
                        iconName="pencil"
                        onPress={() => {
                            navigation.navigate('Editar Cliente', { client })
                        }}
                        style={{
                            bottom: 15,
                            right: 15
                        }}
                    />
                )
            }
        </>
    )
}


const styles = StyleSheet.create({})