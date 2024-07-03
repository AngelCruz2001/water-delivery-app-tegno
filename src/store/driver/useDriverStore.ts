import {create} from 'zustand';
import {TDriver} from '../../interfaces/drivers';

type DriverState = {
  drivers: TDriver[];
  activeDriver: TDriver | null;

  // Methods
  updateLocation: (driver: TDriver) => void;
  removeDriver: (driver: TDriver) => void;

  setActiveDriver: (driver: TDriver | null) => void;
};

export const useDriverStore = create<DriverState>()((set, get) => ({
  drivers: [],
  activeDriver: null,
  setActiveDriver: (driver: TDriver | null) => set({activeDriver: driver}),

  updateLocation: (updatedDriver: TDriver) =>
    set(state => {
      const index = state.drivers.findIndex(d => d._id === updatedDriver._id);

      if (index === -1) {
        return {drivers: [...state.drivers, updatedDriver]};
      } else {
        const newDrivers = [...state.drivers];

        let routeMade = [];

        if (newDrivers[index].routeMade) {
          routeMade = [...newDrivers[index].routeMade, updatedDriver.location];
        } else {
          routeMade.push(updatedDriver.location);
        }
        newDrivers[index] = {
          ...updatedDriver,
          routeMade: routeMade,
        };
        return {drivers: newDrivers};
      }
    }),

  removeDriver: (driver: TDriver) =>
    set(state => ({
      drivers: state.drivers.filter(d => d._id !== driver._id),
    })),
}));
