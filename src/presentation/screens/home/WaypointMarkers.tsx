import React, { useEffect } from 'react';
import { Marker } from 'react-native-maps';
import { TLocation } from '../../../interfaces/location';
import { useGetOptimizedRoutes } from '../../hooks/routers/useGetOptimizedRoutes';
import { TWaypoint } from '../../../interfaces/routers';

interface WaypointMarkersProps {
    currentLocation: TLocation;
    waypoints: TWaypoint[];
    userId: string;
}

const WaypointMarkers: React.FC<WaypointMarkersProps> = ({ currentLocation, waypoints, userId }) => {

    console.log({waypoints})
    return (
        <>
            {waypoints.map((waypoint, index) => (
                <Marker
                    key={index}
                    coordinate={waypoint.location}
                    title={waypoint.clientName}
                />
            ))}
        </>
    );
};


export default WaypointMarkers;
