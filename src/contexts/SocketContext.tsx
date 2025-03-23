import { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const SocketContext = createContext<Socket | null>(null);

const VITE_API_URL = "https://quiz-platform-backend-production.up.railway.app"

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const newSocket = io(VITE_API_URL, {
      withCredentials: true,
      autoConnect: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 5000,
    });

    newSocket.on('connect', () => {
      setIsConnected(true);
      console.log('Socket connected:', newSocket.id);
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Socket disconnected');
    });

    setSocket(newSocket);

    return () => {
      newSocket.off('connect');
      newSocket.off('disconnect');
      newSocket.disconnect();
    };
  }, []);


  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);