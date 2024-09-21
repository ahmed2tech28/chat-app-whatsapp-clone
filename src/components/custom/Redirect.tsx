"use client";
import React, { useEffect } from "react";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";

const Redirect = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const pathname = usePathname();

  useEffect(() => {
    console.log(session);
    if (!session) {
      router.push("/login");
    }
    if (session && pathname === "/login") {
      router.push("/");
    }
  }, [session]);

  return <></>;
};

export default Redirect;
