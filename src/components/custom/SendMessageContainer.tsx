import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useSocket } from "@/socket/socket";
import { useState } from "react";
import { useSession } from "next-auth/react";

interface User {
  _id: any;
  name: string;
  email: string;
}

function SendMessageContainer({
  id,
  user,
  setChats,
  chats,
}: {
  id: string | null;
  user: User | null;
  setChats: any;
  chats: any;
}) {
  const socket = useSocket();
  const [message, setMessage] = useState("");
  const { data: session } = useSession();

  const sendMessage = (e: any) => {
    e.preventDefault();
    const data = {
      from: session?.user?.email,
      to: user?.email,
      message,
    };
    setChats([...chats, data]);
    socket?.emit("send:message", data);
    setMessage("");
  };

  return (
    <form
      className="h-[7%] w-full flex justify-center items-center"
      onSubmit={sendMessage}
    >
      <Button
        variant={"link"}
        className="rounded-full py-7 inline-flex justify-center items-center"
        type="button"
      >
        <AddIcon />
      </Button>
      <Input
        className="border-black rounded-md h-12 active:outline-none focus:outline-none text-xl"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <Button
        variant={"link"}
        className="rounded-full py-7 inline-flex justify-center items-center"
        type="submit"
      >
        <SendIcon />
      </Button>
    </form>
  );
}

export default SendMessageContainer;
