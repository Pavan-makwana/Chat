"use client";

import { useRouter } from "next/navigation";

export default function PanicButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/fake")}
      className="text-sm text-gray-500 hover:underline"
    >
      Panic
    </button>
  );
}
