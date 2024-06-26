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
import { useEffect, useRef, useState } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import { paddingMap, roundedMap } from "../../../config/theme/globalstyle";
import { Card } from "../../components/shared/Card";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { colors } from "../../../config/theme/colors";
import { GooglePlacesInput } from "./SetAddressMap";
import { TLocation, TPostLocation } from "../../../interfaces/location";
import { GooglePlaceData, GooglePlaceDetail } from "react-native-google-places-autocomplete";
import { getCurrentLocation, reverseGeocoding } from "../../../actions/location/location";
import { useGetOptimizedRoutes } from "../../hooks/routers/useGetOptimizedRoutes";
import { SetSearchLocationMap } from "../../components/shared/map/SetSearchLocationMap";

export const CreateClientScreen = () => {

    const navigation = useNavigation<NavigationProp<ClientStackProps>>();

    const addClient = useClientsStore(state => state.addClient)

    const [location, setLocation] = useState<TLocation | null>(null);
    const [locationName, setLocationName] = useState('');

    const { control, handleSubmit, formState: { errors }, getValues } = useForm({
        defaultValues: {
            name: '',
            businessName: '',
            phoneNumber: '618',
            reference: '',

        }
    });
    const mapRef = useRef<MapView | null>(null);
    const [marker, setMarker] = useState<TLocation | null>(null);
    const [locationName, setLocationName] = useState('');

    const { mutate: mutateLocation, isError: isErrorLocation, isPending: isPendingLocation, isSuccess: isSuccessLocation } = useMutation({
        mutationFn: async (clientPayload: TPostLocation) => {
            return api.post('/address', clientPayload, {
                headers: {
                    authorization: await getToken(),
                },
            })
        },
        onSuccess: ({ data }) => {
            showCreatedToast();
            // navigation.reset({
            //     index: 0,
            //     routes: [{ name: 'Clientes' }],
            // })
            // TODO: go back
            navigation.canGoBack() && navigation.goBack();
        }
    })

    const { mutate, isError, isPending, isSuccess } = useMutation({
        mutationFn: async (clientPayload: TPostClient) => {

            try {
                const response = await api.post<{ client: TDisplayClient }>('/clients', clientPayload, {
                    headers: {
                        authorization: await getToken(),
                    },
                })
                console.log("response", response)
                return data;
            } catch (error) {
                console.error("error", error)
                showErrorToast();
            }
        },
        onSuccess: (data) => {
            console.log("success postClient")
            console.log({ data })

            addClient(data.client);
            const loc = location as TLocation;
            const { reference } = getValues()
            mutateLocation({
                reference, location: {
                    lat: loc.latitude,
                    lng: loc.longitude
                }, clientId: data.client._id, address: locationName
            })
        },
    })

    const onSubmit = (data: TPostClient) => {
        console.log({ data })
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
                        {/* <AppButton onPress={handleSubmit(onSubmit)}>
                            Crear Cliente
                        </AppButton> */}
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

            <SetSearchLocationMap
                setLocation={setLocation}
                setLocationName={setLocationName}
            />

            <Card style={{ backgroundColor: colors.white, padding: 10, gap: 10 }} >
                <AppText style={{
                    marginBottom: 10
                }}>
                    {locationName}
                </AppText>
                <Input
                    name="reference"
                    label="Referencia"
                    placeholder="indique alguna referencia de la ubicación"
                    control={control}
                    rules={{}}
                    error={errors.reference?.message || ''}
                />
                {location && (
                    <AppButton
                        onPress={() => {
                            console.log('submitting')
                            handleSubmit(onSubmit)();()
                        }}
                    >
                        Guardar cliente
                    </AppButton>
                )}

            </Card>


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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 5
    },
    searchContainer: {
        zIndex: 2,
        paddingHorizontal: paddingMap.horizontalCard,
    }
})
