import React from 'react';
import { Marker } from 'react-native-maps';
import { useDriverStore } from '../../../store/driver/useDriverStore';
import { TDriver } from '../../../interfaces/location';

const DriverMarkers: React.FC = () => {
    const drivers: TDriver[] = useDriverStore(state => state.drivers);

    return (
        <>
            {drivers.map((driver: TDriver) => (
                <Marker
                    key={driver._id}
                    coordinate={{ latitude: driver.location.latitude, longitude: driver.location.longitude }}
                    title={driver.name}
                    image={require('../../../assets/truck.png')}
                />
            ))}
        </>
    );
};

export default DriverMarkers;
