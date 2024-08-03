import React, { Dispatch, SetStateAction } from 'react';
import MapViewDirections from 'react-native-maps-directions';
import { Dimensions, Text } from 'react-native';
import { TLocation } from '../../../interfaces/location';
import { androidGoogleApiKey } from '../../../config/theme/variables';
import MapView from 'react-native-maps';
import { TWaypoint } from '../../../interfaces/routers';

const { width, height } = Dimensions.get('window');

interface MapDirectionsProps {
    mapViewRef: React.RefObject<MapView>;
    waypoints: TWaypoint[];
    origin: TLocation;
    destination: TLocation;
    setWaypointsInfo: Dispatch<SetStateAction<TWaypoint[]>>
}

const MapDirections: React.FC<MapDirectionsProps> = ({ mapViewRef, waypoints, origin, destination, setWaypointsInfo }) => {
    if (!waypoints || waypoints.length < 2) {
        return null;
    }


    const waypointsLocations = waypoints.map(waypoint => waypoint.location)

    return (
        <MapViewDirections
            origin={origin}
            destination={destination}
            waypoints={waypointsLocations}
            apikey={androidGoogleApiKey}
            strokeWidth={3}
            strokeColor="blue"
            timePrecision='now'
            optimizeWaypoints={true}
            onStart={() => {
                // console.log(`Started routing from ${origin} to ${destination}`);
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

                const orderArray: Array<number> = result.waypointOrder[0];

                const newWaypointsOrdered: TWaypoint[] = orderArray.map(index => waypoints[index]);
                setWaypointsInfo(newWaypointsOrdered);
                console.log(`Distance: ${result.distance} km, Duration: ${result.duration} min.`);
            }}
            onError={(errorMessage) => {
                // console.log('Error with MapViewDirections:', errorMessage);
            }}
        />
    );
};

export default MapDirections;
