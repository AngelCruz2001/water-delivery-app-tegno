

import { View, StyleSheet } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { getCurrentLocation } from '../../../actions/location/location'
import { useEffect, useRef, useState } from 'react'
import { TLocation, TMarker } from '../../../interfaces/location'
import { paddingMap } from '../../../config/theme/globalstyle'
import { FAB } from '../../components/shared/fab/Fab'
import { HomeStackProps } from '../../../navigation/HomeStackNavigator'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { useDriverStore } from '../../../store/driver/useDriverStore'

type Props = {}


export const MainMap = (props: Props) => {

    const drivers = useDriverStore((state) => state.drivers);

    console.log({ drivers })
    const [location, setLocation] = useState({ latitude: 24.015575981424856, longitude: -104.65724498033524 });

    const [marker, setMarker] = useState<TMarker | null>();


    useEffect(() => {

        getCurrentLocation().then((location) => {
            setLocation(location);
            moveCameraToLocaition(location)
        })

        return () => {

        }
    }, [])

    const mapRef = useRef<MapView | null>(null);

    const moveCameraToLocaition = (location: TLocation) => {
        if (mapRef.current) {
            mapRef.current.animateCamera({
                center: location,
            })
        }
    }

    const handlePlaceMarker = async () => {
        const { latitude, longitude } = await getCurrentLocation();
        setMarker({
            latitude: Number(latitude),
            longitude: Number(longitude),
            title: 'Mi ubicación',
            description: 'Mi ubicación',
        })
    }

    return (
        <>
            <View style={styles.container}>
                {/* <View style={[styles.searchContainer, {
                    top: top
                }]}>
                <GooglePlacesInput setMarkers={setMarkers} markers={markers} />
                </View> */}
                <MapView
                    ref={(map) => mapRef.current = map!}
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    // onPress={(e) => console.log(e.nativeEvent.position)}
                    initialRegion={{
                        latitude: location.latitude, longitude: location.longitude,
                        latitudeDelta: 0.02,
                        longitudeDelta: 0.02,
                    }}
                    showsUserLocation
                >

                    {
                        marker && (
                            <Marker
                                coordinate={{
                                    latitude: marker.latitude, longitude: marker.longitude,
                                }}
                                title={marker.title}
                                description={marker.description}
                            />
                        )

                    }

                    {
                        drivers.map((driver) => (
                            <Marker
                                key={driver._id}
                                coordinate={driver.location}
                                title={driver.name}
                            />
                        ))
                    }

                    {/* <Marker
                    draggable
                    onDragEnd={async (e) => {
                        const { latitude, longitude } = e.nativeEvent.coordinate;
                        moveCameraToLocaition({
                            latitude: e.nativeEvent.coordinate.latitude,
                            longitude: e.nativeEvent.coordinate.longitude
                            })
                            }}
                            coordinate={{
                                latitude: location.latitude, longitude: location.longitude,
                                }}
                                title="My marker"
                                description="My marker description"
                                image={require('../../../assets/marker.png')}
                                /> */}
                </MapView>

            </View>
        </>
    )
}

// export const GooglePlacesInput = ({ setMarkers, markers }: { setMarkers: Dispatch<SetStateAction<TMarker[]>>, markers: TMarker[] }) => {
//     const ref = useRef<GooglePlacesAutocompleteRef | null>(null);

//     const hanldeOnPress = (
//         data: GooglePlaceData,
//         detail: GooglePlaceDetail | null,
//     ) => {
//         const { lat: latitude, lng: longitude } = detail?.geometry?.location || { latitude: 24.015575981424856, longitude: -104.65724498033524 };

//         setMarkers(markers => [...markers, {
//             latitude: Number(latitude),
//             longitude: Number(longitude),
//             description: data.description,
//             title: data.structured_formatting.main_text
//         }])

//     }

//     return (
//         <GooglePlacesAutocomplete
//             styles={{
//                 container: {
//                     width: '100%',
//                     borderRadius: roundedMap.md
//                 },
//                 textInput: {
//                     fontSize: fontSizeMap.base,
//                     backgroundColor: colors.white,
//                     color: colors.primaryLight,
//                     paddingHorizontal: paddingMap.horizontalCard
//                 }
//             }}
//             GooglePlacesDetailsQuery={{
//                 location: 'Durango, Dgo. México'
//             }}
//             fetchDetails
//             ref={ref}
//             placeholder='Buscar ubicación'
//             onPress={hanldeOnPress}
//             autoFillOnNotFound={true}
//             onNotFound={() => console.log('not found')}
//             query={{
//                 key: Platform.OS === 'ios' ? iOSGoogleApiKey : androidGoogleApiKey,
//                 language: 'es',
//                 // location: 
//             }}
//             onFail={({ error }) => console.log({ error })}
//             onTimeout={() => console.log('timeout')}
//         />
//     );
// };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // position: 'relative',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    searchContainer: {
        position: 'absolute',
        width: '100%',
        zIndex: 2,
        paddingHorizontal: paddingMap.horizontalCard,
    }
})


// https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY

