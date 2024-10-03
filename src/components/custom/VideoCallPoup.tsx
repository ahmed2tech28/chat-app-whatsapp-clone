import React, { useEffect, useRef, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import CallEndIcon from "@mui/icons-material/CallEnd";

interface Props {
  open: boolean;
  handleClose: () => void;
  remoteStream: MediaStream | null;
}

const VideoCallPoup: React.FC<Props> = ({
  handleClose,
  open,
  remoteStream,
}) => {
  const [micDisabled, setMicDisabled] = useState(false);
  const [videoDisabled, setVideoDisabled] = useState(false);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const myVideo = useRef<HTMLVideoElement>(null);
  const remoteVideo = useRef<HTMLVideoElement>(null);

  const toggleMic = () => {
    setMicDisabled((prev) => !prev);
    if (localStream) {
      localStream.getAudioTracks().forEach((track) => {
        track.enabled = !micDisabled;
      });
    }
  };

  const toggleVideo = () => {
    setVideoDisabled((prev) => !prev);
    if (localStream) {
      localStream.getVideoTracks().forEach((track) => {
        track.enabled = !videoDisabled;
      });
    }
  };

  const endCall = () => {
    if (localStream) {
      localStream.getTracks().forEach((track) => {
        track.stop();
      });
      setLocalStream(null);
    }
    handleClose();
  };

  useEffect(() => {
    const getUserMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setLocalStream(stream);
        if (myVideo.current) {
          myVideo.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing media devices.", error);
      }
    };

    getUserMedia();

    return () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (remoteVideo.current && remoteStream) {
      remoteVideo.current.srcObject = remoteStream;
    }
  }, [remoteStream]);

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={open}
      onClick={handleClose}
    >
      <div
        className="w-[95vw] h-[95vh] bg-white rounded-lg flex flex-col justify-center items-center overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="h-[90%] w-full flex justify-center items-center bg-black">
          <video ref={myVideo} autoPlay playsInline muted className="h-full" />
          <video ref={remoteVideo} autoPlay playsInline className="h-full" />
        </div>

        <div className="h-[10%] w-full flex justify-center gap-x-5 items-center bg-gray-100">
          <span className="cursor-pointer" onClick={toggleMic}>
            {micDisabled ? (
              <MicOffIcon sx={{ color: "black" }} />
            ) : (
              <MicIcon sx={{ color: "black" }} />
            )}
          </span>
          <span className="cursor-pointer" onClick={toggleVideo}>
            {videoDisabled ? (
              <VideocamOffIcon sx={{ color: "black" }} />
            ) : (
              <VideocamIcon sx={{ color: "black" }} />
            )}
          </span>
          <span className="cursor-pointer" onClick={endCall}>
            <CallEndIcon sx={{ color: "red" }} />
          </span>
        </div>
      </div>
    </Backdrop>
  );
};

export default VideoCallPoup;
