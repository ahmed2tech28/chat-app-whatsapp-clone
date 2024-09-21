"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { signIn } from "next-auth/react";

function AuthPage() {
  const [loginFormShow, setLoginFormShow] = useState(true);

  const handelSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formObject = Object.fromEntries(formData.entries());
    signIn("credentials", {
      email: formObject.email,
      password: formObject.password,
    });
    console.log(formObject);
  };

  const handelSubmitSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formObject = Object.fromEntries(formData.entries());

    try {
      const res = await axios.post("/api/outh/create", formObject);
      console.log(res.data);
      setLoginFormShow(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="flex justify-center items-center w-screen h-screen bg-gray-100">
      {loginFormShow ? (
        <div className="px-5 py-8 rounded-lg w-[25rem] shadow-lg bg-white flex flex-col gap-y-6 items-center">
          <form
            className="w-full flex flex-col gap-y-6"
            onSubmit={handelSubmitLogin}
          >
            <h1 className="text-center font-semibold text-2xl">Login Here</h1>
            <Input name="email" placeholder="Enter Email" id="email" />
            <Input name="password" placeholder="Enter Password" id="password" />
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
          <Button
            variant="link"
            type="button"
            onClick={() => setLoginFormShow(false)}
          >
            Create Account
          </Button>
        </div>
      ) : (
        <div className="px-5 py-8 rounded-lg w-[25rem] shadow-lg bg-white flex flex-col gap-y-6 items-center">
          <form
            className="w-full flex flex-col gap-y-6"
            onSubmit={handelSubmitSignUp}
          >
            <h1 className="text-center font-semibold text-2xl">
              Create Account
            </h1>
            <Input name="email" placeholder="Enter Email" id="email" />
            <Input name="name" placeholder="Enter Name" id="name" />
            <Input name="password" placeholder="Enter Password" id="password" />
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </form>
          <Button
            variant="link"
            type="button" // Change this to "button" to prevent form submission
            onClick={() => setLoginFormShow(true)}
          >
            Login
          </Button>
        </div>
      )}
    </main>
  );
}

export default AuthPage;
