





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
import { AppButton } from '../../components/shared'
import { useUiStore } from '../../../store/ui/useUiStore'
import { showCreatedToast, showErrorToast } from '../../components/toasts/toasts'
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types'

type Props = NativeStackScreenProps<UserStackProps, 'Editar Usuario'>;

export const EditUser = ({ route }: Props) => {

    const { user } = route.params;
    const navigation = useNavigation<NavigationProp<UserStackProps>>();
    const editUser = useUserStore(state => state.editUser);
    const setIsLoading = useUiStore(state => state.setIsLoading);

    const { control, handleSubmit, formState: { errors, isValid, dirtyFields }, } = useForm({
        defaultValues: {
            name: user.name,
            phoneNumber: user.phoneNumber,
            username: user.name,
            password: '',
            type: user.type
        }
    });

    const { mutate, isError, isPending, isSuccess, } = useMutation({
        mutationFn: async (userPayload: TPostUser) => {
            
            setIsLoading(true);
            return api.put<{ user: TUser }>('/users/'+user._id, {...userPayload, password: userPayload.password || null}, {
                headers: {
                    authorization: await getToken(),
                },
            })
        },
        onError(error, variables, context) {
            console.log("Error creating user", { error, variables, context })
            setIsLoading(false)
            showErrorToast('Error creando usuario');
        },
        onSuccess: ({ data }) => {
            editUser(data.user);
            showCreatedToast('Usuario editado con éxito');
            setIsLoading(false);
            navigation.goBack();
        },
    })

    const onSubmit = (data: TPostUser) => {
        mutate(data);
    }

    const onInvalid = () => {
        console.log("Form is invalid")
    }

    return (
        <ScreenScrollContainer>
            <Form
                buttons={
                    <AppButton
                        disabled={(Object.keys(dirtyFields).length === 0) || isPending}
                        onPress={handleSubmit(onSubmit, onInvalid)}
                    >
                        Actualizar usuario
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
                    label="Nueva contraseña"
                    placeholder="Contraseña"
                    control={control}
                    rules={{
                        minLength: {
                            value: 5,
                            message: "La contraseña debe tener al menos 5 caracteres",
                        }
                    }}
                    error={errors.name?.message || ''}
                />

            </Form>

        </ScreenScrollContainer>
    )
}
