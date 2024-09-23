import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useSocket } from "@/socket/socket";
import { useRef, useState } from "react";
import { useSession } from "next-auth/react";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import FilePopUp from "./FilePopUp";

interface User {
  _id: any;
  name: string;
  email: string;
}
const UploadFileButton = ({
  images,
  setImages,
}: {
  images: FileList | null;
  setImages: React.Dispatch<React.SetStateAction<FileList | null>>;
}) => {
  const fileInputRef = useRef<any>(null);

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <Button
        variant={"link"}
        type="button"
        className="flex h-12"
        onClick={handleFileUpload}
      >
        <AttachFileIcon />
        Upload Images
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        name="images"
        multiple
        onChange={(e) => setImages(e.target.files)}
      />
    </>
  );
};

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

  const [popupShow, setPopupShow] = useState(false);
  const [images, setImages] = useState<FileList | null>(null); // Lifted state for images

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
        className="rounded-full py-7 inline-flex justify-center items-center relative"
        type="button"
      >
        <span onClick={() => setPopupShow(!popupShow)}>
          <AddIcon />
        </span>
        {popupShow && (
          <div className="absolute -top-[10rem] border shadow-md h-40 w-40 bg-white rounded-2xl">
            <UploadFileButton images={images} setImages={setImages} />{" "}
          </div>
        )}
        {images && (
          <FilePopUp
            files={images}
            setImages={setImages}
            user={user}
            setChats={setChats}
            chats={chats}
          />
        )}
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
