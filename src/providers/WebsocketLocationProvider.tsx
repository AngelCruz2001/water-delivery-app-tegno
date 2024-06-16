
import React, { PropsWithChildren, useEffect } from 'react'
import { useWebSocketStore } from '../store/websocket/useWebsocketStore';
import { getToken } from '../presentation/api/api';
import { createWebSocket } from '../actions/websocket/websocket';
import { useDriverStore } from '../store/driver/useDriverStore';
import { getCurrentLocation } from '../actions/location/location';
import { useUserStore } from '../store/users/useUserStore';

type Props = PropsWithChildren & {

}

export const WebsocketLocationProvider = ({ children }: Props) => {
    const setSocket = useWebSocketStore((state) => state.setSocket);
    const addMessage = useWebSocketStore((state) => state.addMessage);

    // Drivers
    const drivers = useDriverStore((state) => state.drivers);
    const addDriver = useDriverStore((state) => state.addDriver);
    const updateLocation = useDriverStore((state) => state.updateLocation);

    // User 
    const user = useUserStore((state) => state.user);

    // const url = "ws://localhost:8080/ws";
    const url = "ws://192.168.1.85:8080/ws";

    useEffect(() => {
        let socket: WebSocket | null = null;

        const connectWebSocket = async () => {
            try {
                const token = await getToken();

                const tokenWithoutBearer = token?.split(" ")[1];
                socket = createWebSocket(`${url}?token=${tokenWithoutBearer}`);

                socket.onmessage = (event) => {
                    const message = JSON.parse(event.data);

                    switch (message.type) {
                        case "init":
                            console.log("Init message received:", message);
                            addMessage(message);
                            break;
                        case "location_update":
                            console.log("Location update received:", message);

                            const { data, name } = message.data;

                            console.log(message.data)
                            //TODO: Pass lcoationS

                            const driver = drivers.find((driver) => driver._id === message.clientId);
                            if (driver) {
                                updateLocation({
                                    ...driver,
                                    location: data.location,
                                });

                                break;
                            }

                            addDriver({
                                _id: message.clientId,
                                name: name,
                                location: data.location,
                            });

                            break;
                        case "driver_disconnected":
                            console.log("Driver disconnected:", message);
                            break;
                        default:
                            console.log("Unknown message type:", message);
                            break;
                    }
                }


                setSocket(socket);
            } catch (error) {
                console.error("Error while connecting WebSocket:", error);
            }
        };

        connectWebSocket();

        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, [url, setSocket, addMessage]);

    const sendMessage = (message: Record<string, any>) => {
        const socket = useWebSocketStore.getState().socket;
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(message));
        } else {
            console.error("WebSocket is not open.");
        }
    };



    useEffect(() => {
        if (user?.type !== "driver") {
            return;
        }
        const updateLocation = async () => {
            try {
                const location = await getCurrentLocation();

                const message = {
                    type: "location_update",
                    data: {
                        name: user?.name,
                        location,
                    },
                    clientId: user?._id,
                };

                sendMessage(message);
            } catch (error) {
                console.error("Error getting location:", error);
            }
        };

        const intervalId = setInterval(updateLocation, 10000);

        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            {children}
        </>
    )
}
