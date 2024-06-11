import {create} from 'zustand';
import {TDisplayEnrichedRoute} from '../../interfaces/routers';

export type RouteState = {
  routes: TDisplayEnrichedRoute[];
  activeRoute: TDisplayEnrichedRoute | null;

  // Methods
  setRoutes: (routes: TDisplayEnrichedRoute[]) => void;
  addRoute: (route: TDisplayEnrichedRoute) => void;
  setActiveRoute: (route: TDisplayEnrichedRoute | null) => void;
  switchRoute: (route: TDisplayEnrichedRoute) => void;
};

export const useRoutesStore = create<RouteState>()(set => ({
  routes: [],
  activeRoute: null,

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
}));
