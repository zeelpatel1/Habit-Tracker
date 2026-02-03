"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export const Username = () => {
  const [userName, setUserName] = useState<string | null>(null);

  const { data: session } = authClient.useSession();

  useEffect(() => {
    if (session?.user?.name) {
      setUserName(session.user.name);
    }
  }, [session]);


  return <div className="py-2 text-black">{session ? session.user.name : "User"}</div>;
};