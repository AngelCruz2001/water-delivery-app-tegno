import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AppButton, AppText } from "../../components/shared"
import { ScreenScrollContainer } from "../../components/shared/ScreenScrollContainer"
import Form from "../../components/shared/Form";
import { useForm } from "react-hook-form";
import { Input } from "../../components/shared/input/Input";
import { useMutation } from "@tanstack/react-query";
import { api, getToken } from "../../api/api";
import { TDisplayClient, TPostClient } from "../../../interfaces/clients";
import { ClientStackProps } from "../../../navigation/clients/ClientsStackNavigator";
import { useClientsStore } from "../../../store/clients/useClientsStore";
import Toast from "react-native-toast-message";
import { useEffect } from "react";
import { Pressable } from "react-native";
import { paddingMap } from "../../../config/theme/globalstyle";

export const CreateClientScreen = () => {

    const addClient = useClientsStore(state => state.addClient)
    const navigation = useNavigation<NavigationProp<ClientStackProps>>();
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: '',
            businessName: '',
            phoneNumber: '618',
        }
    });

    const { mutate, isError, isPending, isSuccess } = useMutation({
        mutationFn: async (clientPayload: TPostClient) => {
            return api.post<{ client: TDisplayClient }>('/clients', clientPayload, {
                headers: {
                    authorization: await getToken(),
                },
            })
        },
        onSuccess: ({ data }) => {
            addClient(data.client);
            showCreatedToast();
            navigation.goBack();
        },
    })

    const onSubmit = (data: TPostClient) => {
        mutate(data)
    }
    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <Pressable
                    onPress={() => navigation.goBack()}
                >
                    <AppText
                        style={{
                            // color: colors.red,
                            color: 'red',
                            marginHorizontal: paddingMap.horizontalContainer,
                        }}
                    >Cancelar
                    </AppText>
                </Pressable>
            )
        })
    }, [])

    return (
        <ScreenScrollContainer>
            <Form
                buttons={
                    <>
                        <AppButton onPress={handleSubmit(onSubmit)}>
                            Crear Cliente
                        </AppButton>
                    </>
                }
            >
                <Input
                    name="name"
                    contrast
                    label="Nombre del cliente"
                    placeholder="Nombre del cliente"
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
                    name="businessName"
                    contrast
                    label="Nombre de negocio"
                    placeholder="ej. Miscelanea el rayo"
                    control={control}
                    rules={{
                        required: "Necesitas agregar un nombre",
                        minLength: {
                            value: 3,
                            message: "El nombre debe tener al menos 3 caracteres",
                        }
                    }}

                    error={errors.businessName?.message || ''}
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

            </Form>
        </ScreenScrollContainer>
    )
}


export const showLoadingToast = (message = 'Cargando...') => {
    Toast.show({
        type: 'loading',
        text1: message,
        visibilityTime: 4000,
    });
}

export const showCreatedToast = (message = 'Cliente registrado') => {
    Toast.show({
        type: 'createdToast',
        text1: message,
    });
}

export const showErrorToast = (message = 'Error al registrar el cliente') => {
    Toast.show({
        type: 'error',
        text1: message,
    });
}