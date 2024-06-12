export const createWebSocket = (url: string) => {
  const socket = new WebSocket(url);

  socket.onopen = () => {
    console.log('WebSocket connected');
  };

  socket.onmessage = event => {
    console.log('WebSocket message received:', event.data);
  };

  socket.onerror = error => {
    console.log('WebSocket error:', error);
  };

  socket.onclose = () => {
    console.log('WebSocket closed');
  };

  return socket;
};
