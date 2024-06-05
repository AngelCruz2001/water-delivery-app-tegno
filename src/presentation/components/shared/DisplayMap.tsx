


import { StyleSheet, ViewStyle } from 'react-native'
import React, { useRef } from 'react'
import { TClientLocation } from '../../../interfaces/location'
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'

type Props = {
    location: TClientLocation;
    title: string;
    description: string;
    style?: ViewStyle;
}

export const DisplayMap = ({ location, title, description, style }: Props) => {

    const mapRef = useRef<MapView | null>(null);

    return (
        <MapView
            ref={(map) => mapRef.current = map!}
            provider={PROVIDER_GOOGLE}
            style={{
                flex: 1
            }}
            initialRegion={{
                latitude: location.lat, longitude: location.lng,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
            }}
            showsUserLocation
        >
            <Marker
                coordinate={{
                    latitude: location.lat, longitude: location.lng,
                }}
                title={title}
                description={description}
                image={require('../../../assets/marker.png')}
            />
        </MapView>
    )
}

const styles = StyleSheet.create({})