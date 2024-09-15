import React from "react";
import { Avatar } from "@mui/material";
import { Button } from "../ui/button";
import CallIcon from "@mui/icons-material/Call";
import VideoCallIcon from "@mui/icons-material/VideoCall";

function ProfileMenu() {
  return (
    <div className="flex items-center justify-between w-full p-4 shadow-md h-[10%]">
      <div className="flex items-center space-x-4">
        <Avatar alt="User Avatar" src="/path-to-avatar.jpg" />
        <div>
          <h3 className="text-lg font-semibold">John Doe</h3>
          <p className="text-sm text-gray-500">johndoe@example.com</p>
        </div>
      </div>

      <div className="flex">
        <Button variant="link">
          <CallIcon />
        </Button>
        <Button variant="link">
          <VideoCallIcon />
        </Button>
      </div>
    </div>
  );
}

export default ProfileMenu;
