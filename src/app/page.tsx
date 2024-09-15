import React from "react";
import SideBar from "@/components/custom/SideBar";
import ProfileMenu from "@/components/custom/ProfileMenu";
import ChatContainer from "@/components/custom/ChatContainer";
import SendMessageContainer from "@/components/custom/SendMessageContainer";

function Home() {
  return (
    <main className="flex h-screen w-screen">
      <div className="w-[20%] h-full bg-gray-100 px-2">
        <SideBar />
      </div>
      <div className="w-[80%] h-full">
        <ProfileMenu />
        <ChatContainer />
        <SendMessageContainer />
      </div>
    </main>
  );
}
export default Home;
