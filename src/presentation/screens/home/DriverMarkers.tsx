import React from 'react';
import { Marker } from 'react-native-maps';
import { useDriverStore } from '../../../store/driver/useDriverStore';
import { TDriver } from '../../../interfaces/drivers';
import { sendMessage } from '../../../providers/WebsocketLocationProvider';

const DriverMarkers: React.FC = () => {
    const drivers: TDriver[] = useDriverStore(state => state.drivers);
    const activeDriver: TDriver | null = useDriverStore(state => state.activeDriver)
    const setActiveDriver = useDriverStore(state => state.setActiveDriver)

    // console.log("DRIVERS ", drivers.map(driver => driver.routeMade))

    const handleOnMarkerPress = (driver: TDriver) => {
        setActiveDriver(driver)
        const message = {
            type: "get_location_history",
            clientId: driver._id
        };
        sendMessage(message)
    }

    const handleOnDeselect = () => {
        setActiveDriver(null)
    }

    return (
        <>
            {drivers.map((driver: TDriver) => (
                <Marker
                    key={driver._id}
                    coordinate={{ latitude: driver.location.latitude, longitude: driver.location.longitude }}
                    title={driver.name}
                    image={require('../../../assets/truck.png')}
                    onPress={() => handleOnMarkerPress(driver)}
                    onDeselect={handleOnDeselect}
                />
            ))}
        </>
    );
};

export default DriverMarkers;
