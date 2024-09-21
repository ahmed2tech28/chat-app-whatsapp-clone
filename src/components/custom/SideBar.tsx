"use client";
import { useUsers } from "@/providers/UsersProvider";
import { Avatar } from "@mui/material";
import React from "react";
import Link from "next/link";

const ChatInfo: React.FC<{ name: string; email: string; _id: any }> = ({
  name,
  email,
  _id,
}) => {
  return (
    <Link
      href={`?id=${_id}`}
      className="flex items-center space-x-4 cursor-pointer"
    >
      <Avatar alt={name} />
      <div>
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-500">{email}</p>
      </div>
    </Link>
  );
};

function SideBar() {
  const [users, setUsers] = useUsers();
  return (
    <div className="w-1/4 h-screen bg-gray-100 p-4 flex flex-col gap-y-4">
      {users.map((user: any, index: any) => (
        <ChatInfo
          key={index}
          name={user.name}
          email={user.email}
          _id={user._id}
        />
      ))}
    </div>
  );
}

export default SideBar;
