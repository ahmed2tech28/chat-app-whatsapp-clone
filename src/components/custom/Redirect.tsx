"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";

const Redirect = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "authenticated") {
      if (pathname === "/login") {
        router.push("/");
      }
    } else if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, session, pathname, router]);

  if (status === "loading") {
    return (
      <div className="fixed top-0 left-0 bg-white w-screen h-screen flex justify-center items-center">
        <span className="loader"></span>
      </div>
    );
  }

  return null;
};

export default Redirect;
