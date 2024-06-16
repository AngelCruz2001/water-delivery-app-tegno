import {create} from 'zustand';
import {TDriver} from '../../interfaces/drivers';

type DriverState = {
  drivers: TDriver[];

  // Methods
  addDriver: (driver: TDriver) => void;
  updateLocation: (driver: TDriver) => void;
  removeDriver: (driver: TDriver) => void;
};

export const useDriverStore = create<DriverState>()((set, get) => ({
  drivers: [],

  // Methods
  updateLocation: (driver: TDriver) =>
    set(state => {
      const drivers = state.drivers.map(d => {
        if (d._id === driver._id) {
          return driver;
        }
        return d;
      });

      return {
        drivers,
      };
    }),

  addDriver: (driver: TDriver) =>
    set(state => {
      return {
        drivers: [...state.drivers, driver],
      };
    }),
  removeDriver: (driver: TDriver) =>
    set(state => ({
      drivers: state.drivers.filter(d => d._id !== driver._id),
    })),
}));
