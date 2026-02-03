"use client";

import { useParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useMessages } from "@/hooks/useMessages";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useState } from "react";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { useEffect } from "react";


export default function ChatRoomPage() {
  const params = useParams();
  const chatId = params?.chatId as string;

  const { user } = useAuth();
  const { messages, loading } = useMessages(chatId);
  const [text, setText] = useState("");

  useEffect(() => {
    if (!user) return;

    messages.forEach((m) => {
      if (!m.readBy?.includes(user.uid)) {
        updateDoc(doc(db, "messages", m.id), {
          readBy: arrayUnion(user.uid),
        });
      }
    });
  }, [messages, user]);


  const sendMessage = async () => {
    if (!text.trim() || !user) return;

    await addDoc(collection(db, "messages"), {
      chatId,
      senderId: user.uid,
      text,
      createdAt: Date.now(),
    });

    setText("");
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {loading && (
          <p className="text-sm text-gray-500">Loading…</p>
        )}

        {messages.map((m) => (
          <div
            key={m.id}
            className={`max-w-[75%] p-2 rounded text-sm ${m.senderId === user?.uid
                ? "ml-auto bg-black text-white"
                : "mr-auto bg-black text-white"
              }`}
          >
            {/* Message text */}
            <div>{m.text}</div>

            {/* Seen indicator */}
            <div className="text-xs opacity-70 mt-1 text-right">
              {m.senderId === user?.uid &&
                m.readBy &&
                m.readBy.length > 1 &&
                "Seen 👁️"}
            </div>
          </div>
        ))}

      </div>

      {/* Input */}
      <div className="border-t p-2 flex gap-2">
        <input
          className="flex-1 border rounded px-3 py-2 text-sm"
          placeholder="Type a message…"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />
        <button
          onClick={sendMessage}
          className="bg-black text-white px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
