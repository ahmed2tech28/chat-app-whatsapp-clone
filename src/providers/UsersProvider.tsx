"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

import axios from "axios";

interface User {
  _id: any;
  name: string;
  email: string;
}

const UsersContext = createContext<any>(null);

interface Props {
  children: React.ReactNode;
}

export const UsersProvider: React.FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    axios
      .get("/api/users")
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err, "Error while fiteching user");
      });
  }, []);

  return (
    <UsersContext.Provider value={[users, setUsers]}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = (): any => useContext(UsersContext);
