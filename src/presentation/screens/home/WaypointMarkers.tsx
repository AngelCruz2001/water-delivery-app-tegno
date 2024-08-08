import React, { useEffect } from 'react';
import { TLocation } from '../../../interfaces/location';
import { TWaypoint } from '../../../interfaces/routers';
import { Marker } from '../../components/shared/Marker';

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
                    status={waypoint.status === 'created' ? 'show' : 'success'}
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
