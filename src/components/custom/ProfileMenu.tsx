import React, { useCallback, useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { Button } from "../ui/button";
import CallIcon from "@mui/icons-material/Call";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import VideoCallPoup from "./VideoCallPoup";
import { useSocket } from "@/socket/socket"; // Import the custom hook
import { useSession } from "next-auth/react";
import Peer from "simple-peer";

interface User {
  _id: any;
  name: string;
  email: string;
}

function ProfileMenu({ id, user }: { id: string | null; user: User | null }) {
  const [videoCallStarted, setVideoCallStarted] = useState(false);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [incomingCall, setIncomingCall] = useState(false); // State for incoming call notification
  const { data: session } = useSession();

  const socket = useSocket();
  let peer: any = null;

  // Handle video call initiation (caller side)
  const handleVideoCall = useCallback(async () => {
    setVideoCallStarted(true);

    // Get local media stream
    const localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    peer = new Peer({
      initiator: true,
      trickle: false,
      stream: localStream,
    });

    peer.on("signal", (offer: any) => {
      socket?.emit("call:initiate", {
        from: session?.user?.email,
        to: user?.email, // Specify the receiver's email
        offer,
      });
    });

    peer.on("stream", (stream: any) => {
      setRemoteStream(stream); // Set remote video stream
    });

    socket?.on("call:answer", (data) => {
      peer.signal(data.answer);
    });
  }, [socket, user?.email, session]);

  // Listen for incoming call offers
  useEffect(() => {
    socket?.on("call:offer", async (data) => {
      const { from, offer } = data;
      setIncomingCall(true);
      console.log("Incoming call from:", from);

      // Get local media stream
      const localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      peer = new Peer({
        initiator: false,
        trickle: false,
        stream: localStream,
      });

      peer.signal(offer);

      peer.on("stream", (stream: any) => {
        setRemoteStream(stream); // Set remote video stream
      });

      socket?.emit("call:answer", {
        from: user?.email,
        to: from,
        answer: peer.signal(),
      });
    });

    return () => {
      socket?.off("call:offer");
      socket?.off("call:answer");
    };
  }, [socket, user?.email]);

  const acceptCall = () => {
    setIncomingCall(false);
    setVideoCallStarted(true); // Start the video call
  };

  const rejectCall = () => {
    setIncomingCall(false);
  };

  return (
    <>
      <div className="flex items-center justify-between w-full p-4 shadow-md h-[10%] relative z-20">
        <div className="flex items-center space-x-4">
          <Avatar alt={user?.name} />
          <div>
            <h3 className="text-lg font-semibold">{user?.name}</h3>
            <p className="text-sm text-gray-500">{user?.email}</p>
          </div>
        </div>

        <div className="flex h-full">
          <Button variant="link">
            <CallIcon />
          </Button>
          <Button variant="link" onClick={handleVideoCall}>
            <VideoCallIcon />
          </Button>
        </div>
      </div>

      {incomingCall && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 p-4 bg-white shadow-lg rounded-lg z-50">
          <h4 className="font-bold">Incoming Video Call</h4>
          <div className="flex space-x-4">
            <Button onClick={acceptCall}>Accept</Button>
            <Button onClick={rejectCall}>Reject</Button>
          </div>
        </div>
      )}

      {videoCallStarted && (
        <VideoCallPoup
          open={videoCallStarted}
          handleClose={() => setVideoCallStarted(false)}
          remoteStream={remoteStream}
        />
      )}
    </>
  );
}

export default ProfileMenu;
