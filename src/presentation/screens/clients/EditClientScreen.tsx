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
import Toast from "react-native-toast-message";
import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types";
import { useEffect } from "react";
import { colors } from "../../../config/theme/colors";
import { paddingMap } from "../../../config/theme/globalstyle";
import { fontSizeMap } from "../../components/shared/sizes";
import { Pressable } from "react-native";
import { useHeaderRightGoBack } from "../../hooks/useHeaderRightGoBack";


type Props = NativeStackScreenProps<ClientStackProps, 'Editar Cliente'>;

export const EditClientScreen = ({ route }: Props) => {

    const { params: { client } } = route
    const navigation = useNavigation<NavigationProp<ClientStackProps>>();
    const { control, handleSubmit, formState: { errors, dirtyFields } } = useForm({
        defaultValues: {
            name: client.name,
            businessName: client.businessName,
            phoneNumber: client.phoneNumber,
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
            showCreatedToast();
            navigation.goBack();
        },
    })

    const onSubmit = (data: TPostClient) => {
        mutate(data)
    }

    useHeaderRightGoBack(navigation, 'cancelar');

    return (
        <ScreenScrollContainer>
            <Form
                buttons={
                    <>
                        <AppButton
                            disabled={(Object.keys(dirtyFields).length === 0) || isPending}
                            onPress={handleSubmit(onSubmit)}>
                            Editar Cliente
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
                    isDirty={dirtyFields.name}
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
                    isDirty={dirtyFields.businessName}
                />
                <Input
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
                            message: "El número debe tener al menos 10 digitos"
                        }
                    }}
                    contrast
                    keyboardType="number-pad"
                    error={errors.phoneNumber?.message || ''}
                    isDirty={dirtyFields.phoneNumber}
                />

            </Form>
        </ScreenScrollContainer>
    )
}



export const showCreatedToast = (message = 'Cliente registrado') => {
    Toast.show({
        type: 'createdToast',
        text1: message,
    });
}