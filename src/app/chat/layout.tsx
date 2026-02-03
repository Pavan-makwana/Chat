"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LogoutButton from "@/components/LogoutButton";
import PanicButton from "@/components/PanicButton";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!user) return null;

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`
          fixed md:static z-40
          w-64 h-full bg-white border-r
          transform transition-transform
          ${showSidebar ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          flex flex-col
        `}
      >
        <div className="p-4 font-semibold border-b flex justify-between text-black">
          Chats
          <button
            className="md:hidden"
            onClick={() => setShowSidebar(false)}
          >
            ✕
          </button>
        </div>

        <div className="p-4 text-sm text-gray-500 flex-1">
          Invite-only chats
        </div>

        {/* ✅ Logout button (moved INSIDE sidebar, no style change) */}
        <div className="p-4">
          <LogoutButton />
        </div>
      </aside>

      {/* Overlay for mobile */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black/30 md:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Mobile Top Bar */}
        <div className="md:hidden p-3 border-b flex items-center justify-between">
          <button onClick={() => setShowSidebar(true)}>☰</button>
          <span className="font-medium">Chat</span>

          {/* ✅ Panic button (this was missing) */}
          <PanicButton />
        </div>

        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
