import dayjs from 'dayjs';
import {TDisplayOrder} from './order';

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
  location: Location;
  startTime: string;
  endTime: string;
  note: string;
}

export interface Location {
  lat: number;
  lng: number;
}
