"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import { usePathname, useSearchParams } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";

const ChatContext: any = createContext([null]);

export const ChatsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { data: session } = useSession();
  const [chats, setChats] = useState([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    if (session)
      axios
        .get(
          `/api/chats?from=${session?.user?.email}&to=${searchParams.get(
            "email"
          )}`
        )
        .then((res) => {
          setChats(res.data);
        })
        .catch((err) => {
          err;
        });
  }, [session, searchParams.get("email")]);

  return (
    <ChatContext.Provider value={[chats, setChats]}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChats: any = () => useContext(ChatContext);
