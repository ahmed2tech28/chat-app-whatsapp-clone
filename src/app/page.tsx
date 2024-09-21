import ChatArea from "@/components/custom/ChatArea";
import SideBar from "@/components/custom/SideBar";
import { UsersProvider } from "@/providers/UsersProvider";
import { SocketProvider } from "@/socket/socket";

function Home() {
  return (
    <SocketProvider>
      <UsersProvider>
        <main className="flex h-screen w-screen">
          <div className="w-[20%] h-full bg-gray-100 px-2">
            <SideBar />
          </div>
          <ChatArea />
        </main>
      </UsersProvider>
    </SocketProvider>
  );
}
export default Home;
