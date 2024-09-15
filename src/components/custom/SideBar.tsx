import { Avatar } from "@mui/material";
import React from "react";

const users = [
  {
    name: "John Doe",
    email: "johndoe@example.com",
    avatar: "/path-to-avatar1.jpg",
  },
  {
    name: "Jane Smith",
    email: "janesmith@example.com",
    avatar: "/path-to-avatar2.jpg",
  },
  {
    name: "Michael Brown",
    email: "michaelbrown@example.com",
    avatar: "/path-to-avatar3.jpg",
  },
  {
    name: "Alice Johnson",
    email: "alicejohnson@example.com",
    avatar: "/path-to-avatar4.jpg",
  },
  {
    name: "Chris Evans",
    email: "chrisevans@example.com",
    avatar: "/path-to-avatar5.jpg",
  },
];

const ChatInfo: React.FC<{ name: string; email: string; avatar: string }> = ({
  name,
  email,
  avatar,
}) => {
  return (
    <div className="flex items-center space-x-4 cursor-pointer">
      <Avatar alt={name} src={avatar} />
      <div>
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-500">{email}</p>
      </div>
    </div>
  );
};

function SideBar() {
  return (
    <div className="w-1/4 h-screen bg-gray-100 p-4 flex flex-col gap-y-4">
      {users.map((user, index) => (
        <ChatInfo
          key={index}
          name={user.name}
          email={user.email}
          avatar={user.avatar}
        />
      ))}
    </div>
  );
}

export default SideBar;
