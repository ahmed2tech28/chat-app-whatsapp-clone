import ChatArea from "@/components/custom/ChatArea";
import SideBar from "@/components/custom/SideBar";
import { UsersProvider } from "@/providers/UsersProvider";
import { SocketProvider } from "@/socket/socket";
import { ChatsProvider } from "@/providers/ChatsProvider";

function Home() {
  return (
    <SocketProvider>
      <UsersProvider>
        <main className="flex h-screen w-screen">
          <div className="lg:w-[30%] w-[5rem] h-full bg-gray-100 px-2">
            <SideBar />
          </div>
          <ChatsProvider>
            <ChatArea />
          </ChatsProvider>
        </main>
      </UsersProvider>
    </SocketProvider>
  );
}
export default Home;
