



import React, { useEffect, useRef } from 'react'
import { Alert, Image, View } from 'react-native';
import { roundedMap } from '../../../../config/theme/globalstyle';
import { Card } from '../Card';
import { colors } from '../../../../config/theme/colors';
import { GooglePlacesInput } from '../../../screens/clients/SetAddressMap';
import { GooglePlaceData, GooglePlaceDetail } from 'react-native-google-places-autocomplete';
import { getCurrentLocation, reverseGeocoding } from '../../../../actions/location/location';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { TLocation } from '../../../../interfaces/location';
import { FAB } from '../fab/Fab';

type Props = {
    setLocation: (location: TLocation) => void;
    setLocationName: (locationName: string) => void;
    height?: number;
    showInput?: boolean
}

export const SetSearchLocationMap = ({
    setLocation,
    setLocationName,
    height = 250,
    showInput = true
}: Props) => {

    const mapRef = useRef<MapView | null>(null);

    const moveCameraToLocation = (location: TLocation) => {
        if (mapRef.current) {
            console.log("go to location")
            mapRef.current.animateCamera({
                center: location,
                zoom: 16,
            })
        }
    }

    const getCenterCoordinates = async (): Promise<{ latitude: number, longitude: number }> => {

        let latitude = 0;
        let longitude = 0;
        try {
            if (mapRef.current) {
                const camera = await mapRef.current.getCamera();
                if (camera && camera.center) {
                    const { center } = camera;
                    latitude = center.latitude;
                    longitude = center.longitude;
                    setLocation({
                        latitude: center.latitude,
                        longitude: center.longitude
                    });
                } else {
                    console.error("Camera or center property is missing.");
                }
            } else {
                console.error("mapRef.current is not initialized.");
            }
        } catch (error) {
            console.error("Error getting center coordinates:", error);
        }
        return { latitude, longitude };
    };

    const handleOnPress = async (
        data: GooglePlaceData,
        detail: GooglePlaceDetail | null,
    ) => {
        const latitude = detail?.geometry?.location?.lat || 0;
        const longitude = detail?.geometry?.location?.lng || 0;

        const locationStr = await reverseGeocoding({ latitude, longitude });
        setLocationName(locationStr);
        setLocation({ latitude: latitude, longitude: longitude })
        moveCameraToLocation({
            latitude: latitude,
            longitude: longitude,
        })
    }

    useEffect(() => {
        getCurrentLocation().then((location) => {
            moveCameraToLocation(location)
            const { latitude, longitude } = location;
            setLocation({ latitude: latitude, longitude: longitude })
        })
    }, [])

    return (
        <>
            <Card style={{ padding: 0, marginTop: 5, position: 'relative', height }}>
                {
                    showInput &&
                    <View style={{ backgroundColor: colors.white, position: 'absolute', width: '100%', top: 0, zIndex: 2, borderRadius: roundedMap.md }}>
                        <GooglePlacesInput handleOnPress={handleOnPress} />
                    </View>
                }
                <MapView
                    ref={(map) => mapRef.current = map!}
                    provider={PROVIDER_GOOGLE}
                    style={{
                        width: '100%',
                        flex: 1,
                    }}
                    initialRegion={{
                        latitude: 24.027269, longitude: -104.6666078,
                        latitudeDelta: 0.09,
                        longitudeDelta: 0.09,
                    }}
                    cameraZoomRange={{ minCenterCoordinateDistance: 10, maxCenterCoordinateDistance: 20 }}
                    showsUserLocation
                    onRegionChangeComplete={async () => {
                        try {
                            const { latitude, longitude } = await getCenterCoordinates()
                            const locationStr = await reverseGeocoding({ latitude, longitude });
                            setLocationName(locationStr);
                        } catch (reverseGeocodingError) {
                            console.error("Error in reverseGeocoding:", reverseGeocodingError);
                        }
                    }}
                >
                </MapView>

                <FAB
                    iconName='compass'
                    onPress={() => {
                        getCurrentLocation().then((location) => {
                            moveCameraToLocation(location)
                            const { latitude, longitude } = location;
                            setLocation({ latitude: latitude, longitude: longitude })
                        })
                    }}
                    style={{
                        bottom: 15,
                        right: 15
                    }}
                />


                <View style={{
                    position: 'absolute', top: '35%', zIndex: 10, left: '45%', width: 40,
                    aspectRatio: 1, alignItems: 'center', justifyContent: 'center',
                    pointerEvents: 'none',
                }}>
                    <Image source={require('../../../../assets/marker.png')} style={{
                        maxWidth: 25,
                        aspectRatio: 1,
                        objectFit: 'contain'
                    }} />
                </View>
            </Card>
        </>
    )
}
