import {create} from 'zustand';
import {TDisplayRoute} from '../../interfaces/routers';

export type RouteState = {
  routes: TDisplayRoute[];
  activeRoute: TDisplayRoute | null;

  // Methods
  setRoutes: (routes: TDisplayRoute[]) => void;
  addRoute: (route: TDisplayRoute) => void;
  setActiveRoute: (route: TDisplayRoute | null) => void;
  switchRoute: (route: TDisplayRoute) => void;
};

export const useRoutesStore = create<RouteState>()(set => ({
  routes: [],
  activeRoute: null,

  // Methods
  setRoutes: (routes: TDisplayRoute[]) => set({routes}),
  addRoute: (route: TDisplayRoute) =>
    set(state => ({routes: [...state.routes, route]})),
  setActiveRoute: (route: TDisplayRoute | null) => set({activeRoute: route}),
  switchRoute: (route: TDisplayRoute) =>
    set(state => ({
      routes: state.routes.map(r => (r._id === route._id ? route : r)),
    })),
}));
