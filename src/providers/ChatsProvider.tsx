"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { createContext, useContext, useEffect, useState } from "react";

const ChatContext: any = createContext([null]);

export const ChatsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data: session } = useSession();
  const [chats, setChats] = useState([]);
  // useEffect(() => {
  //   axios.get("/api/chatsz)
  // }, [])

  return (
    <ChatContext.Provider value={[chats, setChats]}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChats: any = () => useContext(ChatContext);
