"use client";
import React, { useEffect } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useSession } from "next-auth/react";
import { useSocket } from "@/socket/socket";

function ChatContainer({ chats, setChats }: { chats: any; setChats: any }) {
  const { data: session } = useSession();
  const socket = useSocket();

  useEffect(() => {
    socket?.on("recieve:message", (data) => {
      console.log("message recieed with data");
      setChats([...chats, data]);
    });

    return () => {};
  }, [chats]);

  return (
    <div className="w-full h-[83%] px-2 flex flex-col-reverse overflow-y-auto overflow-x-hidden">
      {[...chats].reverse()?.map((item: any, i: any) => {
        if (item.from == session?.user?.email) {
          return (
            <div className="flex w-full justify-end">
              <Alert className="w-fit my-2">
                <AlertTitle>you</AlertTitle>
                <AlertDescription className="max-w-[80ch]">
                  {item.message}
                </AlertDescription>
              </Alert>
            </div>
          );
        } else {
          return (
            <div className="flex w-full justify-start">
              <Alert className="w-fit my-2">
                <AlertTitle>{item.from}</AlertTitle>
                <AlertDescription className="max-w-[80ch]">
                  {item.message}
                </AlertDescription>
              </Alert>
            </div>
          );
        }
      })}
    </div>
  );
}

export default ChatContainer;
