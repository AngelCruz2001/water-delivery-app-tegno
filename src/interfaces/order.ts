export type TDisplayOrder = {
  _id: string;
  scheduledDays: number[]
  driverId: string;
  driverName: string;
  userId: string;
  userName: string;
  routeId: string;
  routeName: string;
  clientId: string;
  clientName: string;
  addressId: string;
  addressName: string;
  location: TLocation;
  startTime: string;
  endTime: string;
  status: string;
  products: TOrderProduct[];
  totalProducts: number;
  note: string;
  closeNote: string;
};

export type TOrderProduct = {
  productId: string;
  name: string;
  quantity: number;
  price: number;
};

export type TLocation = {
  lat: number;
  lng: number;
};

export type TCreateOrderDto = {
  scheduledDays: number[]
  driverId: string;
  userId: string;
  routeId: string;
  clientId: string;
  addressId: string;
  products: TOrderProduct[];
  note: string;
};

export type TUpdateOrderDto = TCreateOrderDto & {
  hasChanges: boolean;
};

