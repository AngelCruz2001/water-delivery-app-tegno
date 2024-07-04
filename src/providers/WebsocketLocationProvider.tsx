import React, { PropsWithChildren, useEffect, useRef } from 'react';
import { useWebSocketStore } from '../store/websocket/useWebsocketStore';
import { getToken } from '../presentation/api/api';
import { createWebSocket } from '../actions/websocket/websocket';
import { useDriverStore } from '../store/driver/useDriverStore';
import { getCurrentLocation } from '../actions/location/location';
import { useUserStore } from '../store/users/useUserStore';
import { LocationUpdate, SocketMessage } from '../interfaces/socketMessages';
import { TLocation } from '../interfaces/location';

type Props = PropsWithChildren & {}

export const WebsocketLocationProvider = ({ children }: Props) => {
    const setSocket = useWebSocketStore((state) => state.setSocket);
    const addMessage = useWebSocketStore((state) => state.addMessage);

    const updateLocation = useDriverStore((state) => state.updateLocation);
    const user = useUserStore((state) => state.user);
    const setRouteFollowedByActiveUser = useDriverStore((state) => state.setRouteFollowedByActiveUser)
    // const url = "ws://localhost:8080/ws";
    const url = "ws://192.168.3.20:8080/ws";
    // const url = "wss://water-delivery-backend.onrender.com/ws";

    const timeoutRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        let socket: WebSocket | null = null;

        const connectWebSocket = async () => {
            try {
                const token = await getToken();

                if (token === '') {
                    return
                }

                const tokenWithoutBearer = token?.split(" ")[1];
                socket = createWebSocket(`${url}?token=${tokenWithoutBearer}`);

                socket.onmessage = (event) => {
                    const message: SocketMessage = JSON.parse(event.data);
                    switch (message.type) {
                        case "location_update":

                            const { location, name } = message.data
                        
                            updateLocation({
                                _id: message.clientId,
                                location: location as TLocation,
                                name,
                            });
                            break;
                        case "location_history": 
                            console.log("message.data: ", message.data)
                            setRouteFollowedByActiveUser(message.data.location as TLocation[])
                            break
                        default:
                            console.log("Received message:", message);
                            break;
                    }
                    
                };


                socket.onopen = () => {
                    console.log("WebSocket connected.");
                    clearTimeout(timeoutRef.current);
                };

                socket.onclose = () => {
                    console.log("WebSocket closed. Reconnecting in 5 seconds...");
                    timeoutRef.current = setTimeout(connectWebSocket, 5000);
                };

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
            clearTimeout(timeoutRef.current);
        };
    }, [url, setSocket, addMessage]);

    // const sendMessage = (message: Record<string, any>) => {
    //     const socket = useWebSocketStore.getState().socket;
    //     if (socket && socket.readyState === WebSocket.OPEN) {
    //         socket.send(JSON.stringify(message));
    //     } else {
    //     }
    // };

    // useEffect(() => {
    //     if (user?.type !== "driver") {
    //         return;
    //     }
    //     const updateLocation = async () => {
    //         try {
    //             const location = await getCurrentLocation();
    //             const message = {
    //                 type: "location_update",
    //                 data: { name: user?.name, location },
    //                 clientId: user?._id,
    //             };
    //             console.log("Updating location")
    //             sendMessage(message);
    //         } catch (error) {
    //             console.error("Error getting location:", error);
    //         }
    //     };

    //     const intervalId = setInterval(updateLocation, 3000);
    //     return () => clearInterval(intervalId);
    // }, [user, sendMessage]);



    return <>{children}</>;
};

export const sendMessage = (message: Record<string, any>) => {
    const socket = useWebSocketStore.getState().socket;
    if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(message))
    } else {
        console.error("WebSocket is not connected.")
    }
}