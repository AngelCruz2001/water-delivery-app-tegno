
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
    location: TLocation;
    startTime: string;
    endTime: string;
    status: string;
    products: TOrderProduct[];
    note: string;
    closeNote: string;
}

export type TOrderProduct = {
    productId: string;
    name: string;
    quantity: number;
    price: number;
}

export type TLocation = {
    lat: number;
    lng: number;
}