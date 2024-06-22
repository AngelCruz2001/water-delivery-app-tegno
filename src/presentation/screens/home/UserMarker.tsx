import React, { useState, useEffect } from 'react';
import { Marker } from 'react-native-maps';
import { getCurrentLocation } from '../../../actions/location/location';
import { TLocation, TMarker } from '../../../interfaces/location';
import MapView from 'react-native-maps';

interface UserMarkerProps {
    marker: TMarker | null;
}

const UserMarker: React.FC<UserMarkerProps> = ({ marker }) => {

    return (
        marker && (
            <Marker
                coordinate={{
                    latitude: marker.latitude,
                    longitude: marker.longitude,
                }}
                title={marker.title}
                description={marker.description}
            />
        )
    );
};

export default UserMarker;
