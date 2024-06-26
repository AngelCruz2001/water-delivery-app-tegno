import React, { useEffect } from 'react';
import { Marker } from 'react-native-maps';
import { TLocation } from '../../../interfaces/location';
import { useGetOptimizedRoutes } from '../../hooks/routers/useGetOptimizedRoutes';
import { TWaypoint } from '../../../interfaces/routers';

interface WaypointMarkersProps {
    currentLocation: TLocation;
    waypoints: TWaypoint[];
}

const WaypointMarkers: React.FC<WaypointMarkersProps> = ({ currentLocation, waypoints }) => {

    return (
        <>
            {waypoints.map((waypoint, index) => (
                <Marker
                    key={index}
                    coordinate={waypoint.location}
                    title={waypoint.addressName.split('Durango, Dgo')[0]}
                    identifier={waypoint.addressName}
                    description={waypoint.clientName}
                />
            ))}
        </>
    );
};


export default WaypointMarkers;
