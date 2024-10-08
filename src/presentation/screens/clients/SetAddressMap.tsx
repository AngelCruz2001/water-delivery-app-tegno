

import { View, Text, StyleSheet, Platform, Pressable, Alert } from 'react-native'
import MapView, { MapPressEvent, Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { getCurrentLocation, reverseGeocoding } from '../../../actions/location/location'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import { TLocation, TMarker, TPostLocation } from '../../../interfaces/location'
import { GooglePlaceData, GooglePlaceDetail, GooglePlacesAutocomplete, GooglePlacesAutocompleteRef } from 'react-native-google-places-autocomplete'
import { paddingMap, roundedMap } from '../../../config/theme/globalstyle'
import { fontSizeMap } from '../../components/shared/sizes'
import { colors } from '../../../config/theme/colors';
import { androidGoogleApiKey, iOSGoogleApiKey } from '../../../config/theme/variables'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { ClientStackProps } from '../../../navigation/clients/ClientsStackNavigator'
import { useClientsStore } from '../../../store/clients/useClientsStore'
import { AppButton, AppText } from '../../components/shared'
import { ScreenContainer } from '../../components/shared/ScreenContainer'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { api, getToken } from '../../api/api'
import Form from '../../components/shared/Form';
import { Input } from '../../components/shared/input/Input'
import { DataItem } from '../../components/shared/DataItem'
import { Card } from '../../components/shared/Card'
import { showErrorToast } from '../../components/toasts/toasts'
import { useUiStore } from '../../../store/ui/useUiStore'

type Props = {}

export const SetAddressMap = (props: Props) => {

    const navigation = useNavigation<NavigationProp<ClientStackProps>>()
    const client = useClientsStore(state => state.clientToEditAddress);
    const mapRef = useRef<MapView | null>(null);
    const [marker, setMarker] = useState<TLocation | null>(null);
    const [locationName, setLocationName] = useState('');
    const setIsLoading = useUiStore(state => state.setIsLoading);

    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            reference: ''
        }
    });

    const { mutate, isError, isPending, isSuccess } = useMutation({
        mutationFn: async (clientPayload: TPostLocation) => {
            setIsLoading(true);
            return api.post('/address', clientPayload, {
                headers: {
                    authorization: await getToken(),
                },
            })
        },
        onSuccess: ({ data }) => {
            setIsLoading(false);
            navigation.reset({
                index: 0,
                routes: [{ name: 'Clientes' }],
            })
        },
        onError: () => {
            setIsLoading(false);
            showErrorToast('Error al registrar el cliente');
        }
    })

    const moveCameraToLocation = (location: TLocation) => {
        if (mapRef.current) {
            mapRef.current.animateCamera({
                center: location,
                zoom: 16,
            })
        }
    }

    const handleOnPress = async (
        data: GooglePlaceData,
        detail: GooglePlaceDetail | null,
    ) => {
        const latitude = detail?.geometry?.location?.lat || 0;
        const longitude = detail?.geometry?.location?.lng || 0;

        const locationStr = await reverseGeocoding({ latitude, longitude });
        setLocationName(locationStr);
        setMarker({ latitude: latitude, longitude: longitude })
        moveCameraToLocation({
            latitude: latitude,
            longitude: longitude,
        })
    }

    const onSubmit = (data: { reference: string }) => {
        const reference = data.reference;
        const location = marker as TLocation;
        const clientId = client?._id || '';
        mutate({
            reference, location: {
                lat: location.latitude,
                lng: location.longitude
            }, clientId, address: locationName
        });
    }

    return (
        <ScreenContainer style={[styles.container, {
            overflow: 'scroll'
        }]}>
            {client && (
                <Card style={{ gap: 10 }}>
                    <DataItem
                        label={'Nombre'}
                        value={client!.name}
                    />
                    <DataItem
                        label={'Número de contacto'}
                        value={client!.phoneNumber}
                    />
                    <DataItem
                        label={'Negocio'}
                        value={client!.businessName}
                        isLast
                    />

                </Card>
            )}

            <Card style={{ padding: 0, marginTop: 5, position: 'relative', flex: .85 }}>
                {/* <View style={{ backgroundColor: colors.white, position: 'absolute', width: '100%', top: 0, zIndex: 2, borderRadius: roundedMap.md }}>
                    <GooglePlacesInput hanldeOnPress={hanldeOnPress} />
                </View> */}
                <MapView
                    ref={(map) => mapRef.current = map!}
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    initialRegion={{
                        latitude: 24.027269, longitude: -104.6666078,
                        latitudeDelta: 0.02,
                        longitudeDelta: 0.02,
                    }}
                    showsUserLocation
                    onPress={async (e: MapPressEvent) => {
                        e.persist();
                        const { latitude, longitude } = e.nativeEvent.coordinate
                        const locationStr = await reverseGeocoding({ latitude, longitude });
                        setLocationName(locationStr);
                        moveCameraToLocation({
                            latitude: e.nativeEvent.coordinate.latitude,
                            longitude: e.nativeEvent.coordinate.longitude
                        })
                        setMarker({ latitude, longitude })
                    }}
                >

                    {marker && (
                        <Marker
                            draggable
                            onDragEnd={async (e) => {
                                e.persist();
                                const { latitude, longitude } = e.nativeEvent.coordinate;
                                const locationStr = await reverseGeocoding({ latitude, longitude });
                                setLocationName(locationStr);
                                moveCameraToLocation({
                                    latitude: e.nativeEvent.coordinate.latitude,
                                    longitude: e.nativeEvent.coordinate.longitude
                                })
                                setMarker({ latitude, longitude })
                            }}
                            coordinate={{
                                latitude: marker.latitude, longitude: marker.longitude,
                            }}
                            title={client?.businessName}
                        />
                    )}
                </MapView>
            </Card>


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
                {marker && (
                    <AppButton
                        onPress={handleSubmit(onSubmit)}
                    >
                        Guardar ubicación
                    </AppButton>
                )}

            </Card>



        </ScreenContainer>
    )
}

export const GooglePlacesInput = ({ handleOnPress }: { handleOnPress: (data: GooglePlaceData, detail: GooglePlaceDetail | null) => void }) => {
    const ref = useRef<GooglePlacesAutocompleteRef | null>(null);

    return (
        <GooglePlacesAutocomplete
            textInputProps={{
                placeholderTextColor: colors.primary
            }}
            styles={{
                container: {
                    width: '100%',
                    borderRadius: roundedMap.md,
                },
                textInput: {
                    fontSize: fontSizeMap.base,
                    backgroundColor: colors.white,
                    paddingHorizontal: paddingMap.horizontalCard,
                    color: colors.text,

                },
                listView: {
                    position: 'absolute',
                    top: 40,  // Ajusta según sea necesario
                    zIndex: 50,
                    backgroundColor: colors.white,
                    color: colors.primary,
                },
                description: {
                    zIndex: 50,
                    color: colors.primary,
                },
            }}
            fetchDetails
            ref={ref}
            placeholder='Buscar ubicación'
            onPress={(data, details = null) => {
                handleOnPress(data, details);
            }}
            onNotFound={() => console.log('not found')}
            query={{
                key: Platform.OS === 'ios' ? iOSGoogleApiKey : androidGoogleApiKey,
                language: 'es',
            }}
            onFail={({ error }) => {
                showErrorToast("Error al buscar la ubicación, compruebe la conexión a internet");
            }}
            onTimeout={() => console.log('timeout')}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 5
    },
    map: {
        width: '100%',
        flex: 1
    },
    searchContainer: {
        zIndex: 2,
        paddingHorizontal: paddingMap.horizontalCard,
    }
})


// https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY

