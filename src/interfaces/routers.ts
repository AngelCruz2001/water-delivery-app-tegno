export interface TDisplayRoute {
  _id: string;
  programedDate: string;
  status: string;
  driverId: string;
  totalOrders: number;
  estimatedTimeInMinutes: number;
  startTime: string;
  endTime: string;
  routePauses: TDisplayRoutePause[];
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
