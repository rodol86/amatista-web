'use client';

import { signIn, signOut, useSession } from "next-auth/react";

export default function AuthButton() {
  const { data: session } = useSession();

  return (
    <div>
      {!session ? (
        <button 
          onClick={() => signIn("google")} 
          className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
      ) : (
        <button 
          onClick={() => signOut()} 
          className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded"
        >
          Logout
        </button>
      )}
    </div>
  );
}
