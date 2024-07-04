import { TLocation } from "./location";

export type SocketMessage = {
    type: string;
    data: LocationUpdate | TLocation[]
    clientId: string;
};

export type LocationUpdate = {
    name: string, 
    location: {
        latitude: number, 
        longitude: number
    }
}