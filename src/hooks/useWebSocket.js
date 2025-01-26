import { useEffect, useRef } from 'react';

const useWebSocket = (userId, token, selectedPair, onMessage) => {
  const ws = useRef(null);

  useEffect(() => {
    if (userId) {
      ws.current = new WebSocket(`ws://localhost:8000/ws/fe/${userId}?token=${token}`);

      ws.current.onopen = () => {
        console.log('WebSocket connected');
      };

      ws.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        onMessage(data);
      };

      ws.current.onclose = () => {
        console.log('WebSocket disconnected');
      };

      return () => {
        if (ws.current) {
          ws.current.close();
        }
      };
    }
  }, [userId, token, selectedPair, onMessage]);

  return ws; 
};

export default useWebSocket;