"use client";
import { useUsers } from "@/providers/UsersProvider";
import { Avatar } from "@mui/material";
import React, { use, useState } from "react";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu"; // Import a three-dot icon
import { Dialog } from "@mui/material"; // For showing sidebar in a backdrop on mobile

// Define proper types for ChatInfo props
interface ChatInfoProps {
  name: string;
  email: string;
  _id: string;
}

const ChatInfo: React.FC<ChatInfoProps> = ({ name, email, _id }) => {
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

const SideBar: React.FC = () => {
  const [users] = useUsers(); // Assuming setUsers isn't used here
  const [isSidebarOpen, setSidebarOpen] = useState(false); // State to handle sidebar visibility on mobile

  // Toggles sidebar visibility on mobile
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <>
      {/* Three-dot menu for small screens */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <MenuIcon
          className="cursor-pointer"
          onClick={toggleSidebar}
          style={{ fontSize: "2rem" }} // Adjust icon size if needed
        />
      </div>

      {/* Sidebar for larger screens */}
      <div className="hidden lg:flex lg:w-1/4 h-screen bg-gray-100 p-4 flex-col gap-y-4">
        {users.map((user: { name: string; email: string; _id: string }) => (
          <ChatInfo
            key={user._id}
            name={user.name}
            email={user.email}
            _id={user._id}
          />
        ))}
      </div>

      {/* Dialog for mobile screens */}
      <Dialog fullScreen open={isSidebarOpen} onClose={toggleSidebar}>
        <div className="h-screen bg-gray-100 p-4 flex flex-col gap-y-4">
          {/* Close button */}
          <div className="flex justify-end">
            <button className="text-lg font-bold p-2" onClick={toggleSidebar}>
              X
            </button>
          </div>
          {/* Sidebar content */}
          {users.map((user: { name: string; email: string; _id: string }) => (
            <ChatInfo
              key={user._id}
              name={user.name}
              email={user.email}
              _id={user._id}
            />
          ))}
        </div>
      </Dialog>
    </>
  );
};

export default SideBar;
