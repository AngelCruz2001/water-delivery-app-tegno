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
    const params = {
        userId,
        origin: {
            lat: currentLocation.latitude,
            lng: currentLocation.longitude,
        },
        destiny: {
            lat: currentLocation.latitude,
            lng: currentLocation.longitude,
        },
        waypoints,
    }
    
    const { optimizedRoute, isError, isLoading } = useGetOptimizedRoutes(params);

    if (isError) {
        console.log('Error getting optimized route', isError);
        return null;
    }

    if (isLoading) {
        return null;
    }

    if (!waypoints || waypoints.length === 0) {
        return null;
    }

    if (!optimizedRoute || optimizedRoute.length === 0) {
        return null;
    }

    return (
        <>
            {optimizedRoute.map((waypoint, index) => (
                <Marker
                    key={index}
                    coordinate={waypoint.location}
                    title={waypoint.clientName}
                />
            ))}
        </>
    );
};

// description={waypoint.productsOrder.map(product => product.name).join(', ')}


export default WaypointMarkers;
