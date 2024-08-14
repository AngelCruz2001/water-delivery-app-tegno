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
import { showCreatedToast, showErrorToast } from "../../components/toasts/toasts";
import { useUiStore } from "../../../store/ui/useUiStore";
import { useClientsStore } from "../../../store/clients/useClientsStore";


type Props = NativeStackScreenProps<ClientStackProps, 'Editar Cliente'>;

export const EditClientScreen = ({ route }: Props) => {

    const { params: { client } } = route
    const navigation = useNavigation<NavigationProp<ClientStackProps>>();

    const setIsLoading = useUiStore(state => state.setIsLoading);

    const editClient = useClientsStore(state => state.editClient);

    const { control, handleSubmit, formState: { errors, dirtyFields } } = useForm({
        defaultValues: {
            name: client.name,
            businessName: client.businessName,
            phoneNumber: client.phoneNumber,
        }
    });

    const { mutate, isError, isPending, isSuccess } = useMutation({
        mutationFn: async (clientPayload: TPostClient) => {
            setIsLoading(true)
            console.log({ clientPayload })
            return api.put<{ client: TDisplayClient }>(`/clients/${clientPayload._id}`, clientPayload, {
                headers: {
                    authorization: await getToken(),
                },
            })
        },
        onSuccess: ({ data }) => {
            setIsLoading(false)
            showCreatedToast("Cliente editado con exito");
            editClient(data.client);
            navigation.reset({ index: 0, routes: [{ name: 'Clientes' }] })
            // navigation.goBack()
        },
        onError: (error) => {
            showErrorToast('Error al editar el cliente');
            console.log({ error })
            setIsLoading(false)
        }
    })

    const onSubmit = (data: TPostClient) => {
        //TODO: implementar esta funcionalidad
        console.log(data)
        mutate({
            ...data,
            _id: client._id
        })
        // showErrorToast("Función no implementada")
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
                        // required: "Necesitas agregar un nombre",
                        // minLength: {
                        //     value: 3,
                        //     message: "El nombre debe tener al menos 3 caracteres",
                        // }
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
                        // required: "Necesitas agregar un nombre",
                        // minLength: {
                        //     value: 3,
                        //     message: "El nombre debe tener al menos 3 caracteres",
                        // }
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
                        // required: "Necesitas agregar un número telefónico",
                        // minLength: {
                        //     value: 10,
                        //     message: "El número debe tener al menos 10 digitos"
                        // },
                        // maxLength: {
                        //     value: 10,
                        //     message: "El número debe tener al menos 10 digitos"
                        // }
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
