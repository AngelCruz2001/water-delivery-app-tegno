import {create} from 'zustand';
import {
  TDisplayEnrichedRoute,
  TDisplayRoute,
  TPostRoute,
  OptimizedRoute,
} from '../../interfaces/routers';
import dayjs from 'dayjs';

export type RouteState = {
  routes: TDisplayEnrichedRoute[];
  activeRoute: TDisplayEnrichedRoute | null;
  routeOnView: TDisplayEnrichedRoute | null;
  newRoute: TPostRoute;
  optimizedRoute: OptimizedRoute[] | null;
  routeForDriver: TDisplayEnrichedRoute | null;

  // Methods
  getRouteForDriver: (driverId: string) => void;
  setRoutes: (routes: TDisplayEnrichedRoute[]) => void;
  addRoute: (route: TDisplayEnrichedRoute) => void;
  setActiveRoute: (route: TDisplayEnrichedRoute | null) => void;
  switchRoute: (route: TDisplayEnrichedRoute) => void;
  setRouteOnView: (route: TDisplayEnrichedRoute | null) => void;
  setNewRoute: (route: TPostRoute) => void;
  setOptimizedRoute: (route: OptimizedRoute[] | null) => void;
};

export const useRoutesStore = create<RouteState>()(set => ({
  routes: [],
  activeRoute: null,
  newRoute: {
    driverId: '',
    programedDate: dayjs(),
    routeName: '',
    driverName: '',
  },
  optimizedRoute: null,

  routeOnView: null,
  routeForDriver: null,
  // Methods

  getRouteForDriver: (driverId: string) => {
    const route = useRoutesStore
      .getState()
      .routes.find(r => r.driverId === driverId);
    set({routeForDriver: route});
  },
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
  setRouteOnView: (route: TDisplayEnrichedRoute | null) =>
    set({routeOnView: route}),
  setOptimizedRoute: (route: OptimizedRoute[] | null) =>
    set({optimizedRoute: route}),
}));
