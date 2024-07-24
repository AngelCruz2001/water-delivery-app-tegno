import React from 'react';
import { LatLng } from 'react-native-maps';
import { Marker as MapsMarker } from 'react-native-maps';

type TMarkerStatus = 'created' | 'success' | 'show';

type MarkerProps = {
    status: TMarkerStatus,
    identifier: string,
    description: string,
    coordinate: LatLng,
    title: string,
    customImage?: string,
    onPress?: () => void,
    onDeselect?: () => void
}

export const Marker = (props: MarkerProps) => {

    const getCurrentMarkerImage = (status: TMarkerStatus) => {
        switch (status) {
            case 'created':
                return require('../../../assets/marker_warning.png');
            case 'success':
                return require('../../../assets/marker_success.png');
            default:
                return require('../../../assets/marker.png');
        }
    }

    return (
        <MapsMarker
            {...props}
            image={getCurrentMarkerImage(props.status)}
        />
    );
}