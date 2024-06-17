import {create} from 'zustand';
import {TDriver} from '../../interfaces/drivers';

type DriverState = {
  drivers: TDriver[];

  // Methods
  updateLocation: (driver: TDriver) => void;
  removeDriver: (driver: TDriver) => void;
};

export const useDriverStore = create<DriverState>()((set, get) => ({
  drivers: [],

  updateLocation: (updatedDriver: TDriver) => set(state => {
    const index = state.drivers.findIndex(d => d._id === updatedDriver._id);

    if (index === -1) {
      return { drivers: [...state.drivers, updatedDriver] };
    } else {
      const newDrivers = [...state.drivers];
      newDrivers[index] = updatedDriver;
      return { drivers: newDrivers };
    }
  }),

  removeDriver: (driver: TDriver) => set(state => ({
    drivers: state.drivers.filter(d => d._id !== driver._id),
  })),
}));

