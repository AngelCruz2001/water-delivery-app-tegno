export type TDisplayOrder = {
  _id: string;
  programedDate: string;
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
  programedDate: string;
  driverId: string;
  userId: string;
  routeId: string;
  clientId: string;
  addressId: string;
  products: TOrderProduct[];
  note: string;
};

// type CreateOrderDTO struct {
// 	ProgramedDate time.Time      `json:"programedDate" bson:"programedDate"`
// 	DriverId      string         `json:"driverId" bson:"driverId"`
// 	UserId        string         `json:"userId" bson:"userId"`
// 	RouteId       string         `json:"routeId" bson:"routeId"`
// 	ClientId      string         `json:"clientId" bson:"clientId"`
// 	AddressId     string         `json:"addressId" bson:"addressId"`
// 	Products      []OrderProduct `json:"products" bson:"products"`
// 	Note          string         `json:"note" bson:"note"`
// }
