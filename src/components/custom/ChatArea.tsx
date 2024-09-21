"use client";

import React from "react";
import ProfileMenu from "./ProfileMenu";
import ChatContainer from "./ChatContainer";
import SendMessageContainer from "./SendMessageContainer";
import { useSearchParams } from "next/navigation";

const ChatArea = () => {
  const searchParams = useSearchParams();
  if (searchParams.get("id")) {
    return (
      <div className="w-[80%] h-full">
        <ProfileMenu id={searchParams.get("id")} />
        <ChatContainer />
        <SendMessageContainer />
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
