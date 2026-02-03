"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Chat } from "@/types/chat";

export function useChats(userId: string | undefined) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    const q = query(
      collection(db, "chats"),
      where("participants", "array-contains", userId),
      orderBy("updatedAt", "desc")
    );

    const unsub = onSnapshot(q, (snap) => {
      const list: Chat[] = snap.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Chat, "id">),
      }));
      setChats(list);
      setLoading(false);
    });

    return () => unsub();
  }, [userId]);

  return { chats, loading };
}
