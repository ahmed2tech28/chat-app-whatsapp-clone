"use client";
import React, { createContext, useContext, useState } from "react";

const ChatContext: any = createContext([null]);

export const ChatsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [chats, setChats] = useState([]);
  return (
    <ChatContext.Provider value={[chats, setChats]}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChats: any = () => useContext(ChatContext);
