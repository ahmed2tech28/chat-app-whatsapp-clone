"use client";

import React, { useEffect, useState } from "react";
import ProfileMenu from "./ProfileMenu";
import ChatContainer from "./ChatContainer";
import SendMessageContainer from "./SendMessageContainer";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { useChats } from "@/providers/ChatsProvider";

interface User {
  _id: any;
  name: string;
  email: string;
}

const ChatArea = () => {
  const searchParams = useSearchParams();
  const [chats, setChats] = useChats();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    axios
      .get(`/api/users/user?id=${searchParams.get("id")}`)
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchParams.get("id")]);

  if (searchParams.get("id")) {
    return (
      <div className="lg:w-[70%] w-full h-full">
        <ProfileMenu id={searchParams.get("id")} user={user} />
        <ChatContainer chats={chats} setChats={setChats} />
        <SendMessageContainer
          id={searchParams.get("id")}
          user={user}
          setChats={setChats}
          chats={chats}
        />
      </div>
    );
  } else {
    return (
      <div className="w-[80%] h-full flex flex-col justify-center items-center text-center">
        <h1 className="text-3xl">Ahmed's Chatting App</h1>
      </div>
    );
  }
};

export default ChatArea;
