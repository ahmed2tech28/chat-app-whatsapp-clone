"use client";

import { useSession } from "next-auth/react";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { io, Socket } from "socket.io-client";

// Define the socket type to use in the app
type SocketContextType = Socket | null;

const SocketContext = createContext<SocketContextType>(null);

// Custom hook to access the socket instance
export const useSocket = (): SocketContextType => {
  return useContext(SocketContext);
};

// Define the props for the provider
interface SocketProviderProps {
  children: ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<SocketContextType>(null);
  const { data: session } = useSession();

  useEffect(() => {
    // Initialize the socket connection
    const socketIo = io({
      query: { email: session?.user?.email },
    });

    setSocket(socketIo);

    // Cleanup on component unmount
    return () => {
      if (socketIo) socketIo.disconnect();
    };
  }, [session]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
