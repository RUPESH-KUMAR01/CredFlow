"use client";
import { signOut, useSession } from "next-auth/react";

export default function AppBar() {
  const { data: session } = useSession();

  return (
    <header className="h-16 bg-zinc-900 border-b border-zinc-700 flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center">
        <span className="text-xl font-bold text-silver cursor-pointer hover:text-white transition-colors">
          CredFlow
        </span>
      </div>

      <div className="flex items-center space-x-4">
        {session?.user && (
          <>
            <div className="text-sm text-silver">{session.user.name}</div>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="px-3 py-1 text-sm bg-zinc-700 hover:bg-zinc-600 text-white rounded-md"
            >
              Sign out
            </button>
          </>
        )}
      </div>
    </header>
  );
}
