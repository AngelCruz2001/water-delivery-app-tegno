


import { View, Text } from 'react-native'
import React from 'react'
import { ScreenScrollContainer } from '../../components/shared/ScreenScrollContainer'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { UserStackProps } from '../../../navigation/users/UserStackNavigator'
import { useUserStore } from '../../../store/users/useUserStore'
import { useForm } from 'react-hook-form'
import Form from '../../components/shared/Form'
import { Input } from '../../components/shared/input/Input'
import { useMutation } from '@tanstack/react-query'
import { TPostUser, TUser, TUserType } from '../../../interfaces/user'
import { api, getToken } from '../../api/api'
import { showCreatedToast, showErrorToast, showLoadingToast } from '../clients/CreateClientScreen'
import { AppButton } from '../../components/shared'

type Props = {}

export const CreateUserScreen = (props: Props) => {

    const navigation = useNavigation<NavigationProp<UserStackProps>>();
    const addUser = useUserStore(state => state.addUser);

    const { control, handleSubmit, formState: { errors, isValid },  } = useForm({
        defaultValues: {
            name: '',
            phoneNumber: '618',
            username: '',
            password: '',
            type: 'driver' as TUserType
        }
    });

    const { mutate, isError, isPending, isSuccess } = useMutation({
        mutationFn: async (userPayload: TPostUser) => {
            return api.post<{ user: TUser }>('/register', userPayload, {
                headers: {
                    authorization: await getToken(),
                },
            })
        },
        onError(error, variables, context) {
            console.log("Error creating user", { error, variables, context })
            showErrorToast('Error creando usuario');
        },
        onSuccess: ({ data }) => {
            addUser(data.user);
            showCreatedToast('Usuario creado con éxito');
            navigation.goBack();
        },
    })

    const onSubmit = (data: TPostUser) => {
        mutate(data);
        // console.log(control._formValues)
        // mutate(control._formValues as TPostUser);
    }

    const onInvalid = () => {
        console.log("Form is invalid")
    }

    return (
        <ScreenScrollContainer>
            <Form
                buttons={
                    <AppButton
                        onPress={handleSubmit(onSubmit, onInvalid)}
                    >
                        Crear usuario
                    </AppButton>
                }
            >
                <Input
                    name="name"
                    contrast
                    label="Nombre del usuario"
                    placeholder="Nombre del usuario"
                    control={control}
                    rules={{
                        required: "Necesitas agregar un nombre",
                        minLength: {
                            value: 3,
                            message: "El nombre debe tener al menos 3 caracteres",
                        }
                    }}
                    error={errors.name?.message || ''}
                />
                <Input
                    name="type"
                    contrast
                    label="Tipo de usuario"
                    placeholder="Tipo de usuario"
                    control={control}
                    rules={{
                        required: "Necesitas agregar un nombre",
                        minLength: {
                            value: 3,
                            message: "El nombre debe tener al menos 3 caracteres",
                        }
                    }}
                    error={errors.name?.message || ''}
                />
                <Input
                    accessoryLeft="phone"
                    size="md"
                    grow={false}
                    name="phoneNumber"
                    placeholder="Número de telefono"
                    label="Teléfono"
                    control={control}
                    rules={{
                        required: "Necesitas agregar un número telefónico",
                        minLength: {
                            value: 10,
                            message: "El número debe tener al menos 10 digitos"
                        },
                        maxLength: {
                            value: 10,
                            message: "El número debe tener máximo 10 digitos"
                        }
                    }}
                    error={errors.phoneNumber?.message || ''}
                    contrast
                    keyboardType="number-pad"
                />

                <Input
                    name="username"
                    size="md"
                    contrast
                    label="Apodo"
                    placeholder="Apodo"
                    control={control}
                    rules={{
                        required: "Necesitas agregar un apodo",
                        minLength: {
                            value: 3,
                            message: "El apodo debe tener al menos 3 caracteres",
                        }
                    }}
                    error={errors.name?.message || ''}
                />
                <Input
                    name="password"
                    contrast
                    label="Contraseña"
                    placeholder="Contraseña"
                    control={control}
                    rules={{
                        required: "Necesitas agregar una contraseña",
                        minLength: {
                            value: 5,
                            message: "La contraseña debe tener al menos 3 caracteres",
                        }
                    }}
                    error={errors.name?.message || ''}
                />

            </Form>

        </ScreenScrollContainer>
    )
}
