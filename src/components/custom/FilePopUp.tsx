"use client";
import React from "react";
import Backdrop from "@mui/material/Backdrop";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { useSocket } from "@/socket/socket";

interface FilePopUpProps {
  files: FileList;
  setImages: React.Dispatch<React.SetStateAction<FileList | null>>;
  user: any;
  setChats: any;
  chats: any;
}

const FilePopUp: React.FC<FilePopUpProps> = ({
  files,
  setImages,
  user,
  setChats,
  chats,
}) => {
  const { data: session } = useSession();
  const socket = useSocket();
  const handleClose = () => {
    setImages(null);
  };

  const sendMessage = async (e: any) => {
    e.preventDefault();

    // Helper function to convert file to Base64
    const convertFileToBase64 = (
      file: File
    ): Promise<string | ArrayBuffer | null> => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result); // This will give us the base64 string
        };
        reader.onerror = reject;
        reader.readAsDataURL(file); // Converts file to Base64 string
      });
    };

    let base64Images: (string | ArrayBuffer | null)[] = [];

    if (files) {
      const fileArray = Array.from(files); // Convert FileList to an Array
      base64Images = await Promise.all(
        fileArray.map((file) => convertFileToBase64(file))
      );
    }

    base64Images.forEach((item) => {
      const data = {
        from: session?.user?.email,
        to: user?.email,
        message: item,
      };
      setChats([...chats, data]);
      socket?.emit("send:message", data);
    });

    setImages(null);
  };

  return (
    <Backdrop
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      open={!!files}
      onClick={handleClose}
    >
      <div
        className="bg-white p-5 rounded-lg text-black max-w-[80%] max-h-[80%] overflow-y-auto flex flex-col gap-y-8"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on the popup itself
      >
        <div className="flex w-full justify-between items-center">
          <h3>Uploaded Files:</h3>
          <Button variant={"default"} onClick={sendMessage}>
            send
          </Button>
        </div>
        <ul>
          {Array.from(files).map((file, index) => {
            const isImage = file.type.startsWith("image/");
            const fileUrl = URL.createObjectURL(file);

            return (
              <li key={index} style={{ marginBottom: "10px" }}>
                {isImage && (
                  <img
                    src={fileUrl}
                    alt={file.name}
                    style={{
                      maxWidth: "400px",
                      maxHeight: "400px",
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginBottom: "10px",
                    }}
                  />
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </Backdrop>
  );
};

export default FilePopUp;
