"use client";

import { useAuth } from "@/hooks/useAuth";
import { useChats } from "@/hooks/useChats";
import Link from "next/link";

export default function ChatPage() {
  const { user } = useAuth();
  const { chats, loading } = useChats(user?.uid);

  if (loading) {
    return <div className="p-4">Loading chats...</div>;
  }

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-base md:text-lg font-semibold mb-4">
        Your Chats
      </h1>

      {chats.length === 0 && (
        <p className="text-sm text-gray-500">
          No chats yet. Invite someone.
        </p>
      )}

      <div className="space-y-2">
        {chats.map((chat) => (
          <Link
            key={chat.id}
            href={`/chat/${chat.id}`}
            className="block p-3 rounded border hover:bg-gray-100"
          >
            <div className="text-sm font-medium">
              Chat
            </div>
            <div className="text-xs text-gray-500 truncate">
              {chat.lastMessage || "No messages yet"}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
