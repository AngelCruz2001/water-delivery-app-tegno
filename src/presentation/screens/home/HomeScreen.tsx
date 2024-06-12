import React, { useEffect } from "react"
import { View } from "react-native"
import { EditMap } from "./EditMap"
import { getToken } from "../../api/api"
import { useWebSocketStore } from "../../../store/websocket/useWebsocketStore"
import { createWebSocket } from "../../../actions/websocket/websocket"


export const HomeScreen = () => {

  const setSocket = useWebSocketStore((state) => state.setSocket);
  const addMessage = useWebSocketStore((state) => state.addMessage);

  const url = "ws://localhost:8080/ws";

  useEffect(() => {
    let socket: WebSocket | null = null;
  
    const connectWebSocket = async () => {
      try {
        const token = await getToken();
  
        const tokenWithoutBearer = token?.split(" ")[1];
        // Crear el WebSocket solo después de obtener el token
        socket = createWebSocket(`${url}?token=${tokenWithoutBearer}`);
  
        socket.onmessage = (event) => {
          const message = JSON.parse(event.data);
          console.log("WebSocket message received:", message)
          addMessage(message);
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
    };
  }, [url, setSocket, addMessage]);



  return (
    <View style={{ flex: 1, }}>
      <EditMap />
    </View>
  )
}
