import dayjs from 'dayjs';
import {TDisplayOrder, TOrderProduct} from './order';
import {TLocation} from './location';

export interface TDisplayRoute {
  _id: string;
  routeName: string;
  programedDate: string;
  status: string;
  driverId: string;
  totalOrders: number;
  estimatedTimeInMinutes: number;
  startTime: string;
  endTime: string;
  routePauses: TDisplayRoutePause[];
  routeOrders: TDisplayOrder[];
}

export interface TDisplayEnrichedRoute extends TDisplayRoute {
  driverName: string;
}

export interface TPostRoute {
  programedDate: dayjs.Dayjs;
  driverId: string;
  driverName: string;
  routeName: string;
}

export interface TDisplayRoutePause {
  location: TLocation;
  startTime: string;
  endTime: string;
  note: string;
}

export interface TGetOptimizedRoute {
  origin: TWaypointLocation;
  destiny: TWaypointLocation;
  waypoints: TWaypoint[];
  userId: string;
}

export interface OptimizedRoute {
  location: TLocation;
  clientName: string;
  productsOrder: TOrderProduct[];
}

export interface TWaypoint {
  userId: string;
  clientName: string;
  clientId: string;
  orderNote: string;
  addressName: string;
  location: TLocation;
  productsOrder: TOrderProduct[];
  status: string;
  orderId: string;
}

export type TWaypointLocation = {
  lat: number;
  lng: number;
};
