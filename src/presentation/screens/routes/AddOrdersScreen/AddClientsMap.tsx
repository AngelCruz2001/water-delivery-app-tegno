


import React, { useRef } from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { useClientsStore } from '../../../../store/clients/useClientsStore';

export const AddClientsMap = () => {
    const mapRef = useRef<MapView | null>(null);
    const { clients } = useClientsStore();

    return (
        <MapView
            ref={(map) => mapRef.current = map!}
            provider={PROVIDER_GOOGLE}
            style={{
                flex: 1
            }}
            initialRegion={{
                latitude: 24.027269, longitude: -104.6666078,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
            }}
            showsUserLocation

        >

            {
                clients.map(({ _id, businessName, phoneNumber, address, location }) => {
                    if (!address) return null

                    const { lat, lng } = location!

                    return (
                        <Marker
                            key={_id}
                            coordinate={{
                                latitude: lat, longitude: lng,
                            }}
                            title={businessName}
                            description={phoneNumber}
                            image={require('../../../../assets/marker.png')}
                        />
                    )
                })
            }

        </MapView>
    )
}
