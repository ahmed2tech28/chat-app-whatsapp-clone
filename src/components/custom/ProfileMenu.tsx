"use client";

import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { Button } from "../ui/button";
import CallIcon from "@mui/icons-material/Call";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import axios from "axios";

interface User {
  _id: any;
  name: string;
  email: string;
}

function ProfileMenu({ id }: { id: string | null }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    axios
      .get(`/api/users/user?id=${id}`)
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div className="flex items-center justify-between w-full p-4 shadow-md h-[10%]">
      <div className="flex items-center space-x-4">
        <Avatar alt={user?.name} />
        <div>
          <h3 className="text-lg font-semibold">{user?.name}</h3>
          <p className="text-sm text-gray-500">{user?.email}</p>
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
