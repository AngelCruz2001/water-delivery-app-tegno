import {create} from 'zustand';
import {TDisplayEnrichedRoute, TPostRoute} from '../../interfaces/routers';
import dayjs from 'dayjs';

export type RouteState = {
  routes: TDisplayEnrichedRoute[];
  activeRoute: TDisplayEnrichedRoute | null;

  newRoute: TPostRoute;

  // Methods
  setRoutes: (routes: TDisplayEnrichedRoute[]) => void;
  addRoute: (route: TDisplayEnrichedRoute) => void;
  setActiveRoute: (route: TDisplayEnrichedRoute | null) => void;
  switchRoute: (route: TDisplayEnrichedRoute) => void;
  setNewRoute: (route: TPostRoute) => void;
};

export const useRoutesStore = create<RouteState>()(set => ({
  routes: [],
  activeRoute: null,
  newRoute: {
    driverId: '',
    programedDate: dayjs().toString(),
    routeName: '',
    driverName: '',
  },

  // Methods
  setRoutes: (routes: TDisplayEnrichedRoute[]) => set({routes}),
  addRoute: (route: TDisplayEnrichedRoute) =>
    set(state => ({routes: [...state.routes, route]})),
  setActiveRoute: (route: TDisplayEnrichedRoute | null) =>
    set({activeRoute: route}),
  switchRoute: (route: TDisplayEnrichedRoute) =>
    set(state => ({
      routes: state.routes.map(r => (r._id === route._id ? route : r)),
    })),

  setNewRoute: (route: TPostRoute) => set({newRoute: route}),
}));
