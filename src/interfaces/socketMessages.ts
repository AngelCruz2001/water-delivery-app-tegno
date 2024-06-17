
export type SocketMessage = {
    type: string;
    data: LocationUpdate;
    clientId: string;
};

export type LocationUpdate = {
    name: string, 
    location: {
        latitude: number, 
        longitude: number
    },
}