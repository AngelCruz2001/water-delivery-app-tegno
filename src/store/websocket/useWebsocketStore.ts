import { create } from "zustand";

type WebSocketStore = {
  socket: WebSocket | null;
  messages: string[];
  setSocket: (socket: WebSocket) => void;
  addMessage: (message: string) => void;
};

export const useWebSocketStore = create<WebSocketStore>(set => ({
  socket: null,
  messages: [],
  setSocket: socket => set({socket}),
  addMessage: message =>
    set(state => ({messages: [...state.messages, message]})),
}));


