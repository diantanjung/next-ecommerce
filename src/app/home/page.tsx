"use client";

import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const Home = () => {
  const { data: session } = useSession();
  const router = useRouter();
  // const session = await getServerSession(authConfig);
  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [session]);

  return (
    <div>
      <div>Home</div>
      <div>
        <button className="bg-white rounded-full border border-gray-200 text-gray-800 px-4 py-2 flex items-center space-x-2 hover:bg-gray-200">
          <span onClick={() => signOut()}>Logout </span>
        </button>
      </div>
    </div>
  );
};

export default Home;
