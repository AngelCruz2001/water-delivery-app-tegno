import React from 'react';
import MapViewDirections from 'react-native-maps-directions';
import { Dimensions } from 'react-native';
import { TLocation } from '../../../interfaces/location';
import { androidGoogleApiKey } from '../../../config/theme/variables';
import MapView from 'react-native-maps';

const { width, height } = Dimensions.get('window');

interface MapDirectionsProps {
    mapViewRef: React.RefObject<MapView>;
    waypoints: TLocation[];
    origin: TLocation;
}

const MapDirections: React.FC<MapDirectionsProps> = ({ mapViewRef, waypoints, origin }) => {
    if (!waypoints || waypoints.length < 2) {
        return null;
    }

    const destination = waypoints[waypoints.length - 1];
    const routeWaypoints = waypoints.slice(1, -1);

    return (
        <MapViewDirections
            origin={origin}
            destination={destination}
            waypoints={routeWaypoints}
            apikey={androidGoogleApiKey}
            strokeWidth={3}
            strokeColor="hotpink"
            timePrecision='now'
            optimizeWaypoints={true}
            onStart={() => {
                console.log(`Started routing from ${origin} to ${destination}`);
            }}
            onReady={result => {
                mapViewRef.current?.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                        right: width / 20,
                        bottom: height / 20,
                        left: width / 20,
                        top: height / 20,
                    },
                });
                console.log(`Distance: ${result.distance} km, Duration: ${result.duration} min.`);
            }}
            onError={(errorMessage) => {
                console.log('Error with MapViewDirections:', errorMessage);
            }}
        />
    );
};

export default MapDirections;
