"use client";

import { useRouter } from "next/navigation";

export default function FakePage() {
  const router = useRouter();

  return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="max-w-md w-full p-6">
        <h1 className="text-xl font-semibold mb-4">
          Notes
        </h1>

        <ul className="space-y-2 text-sm text-gray-700">
          <li>• Buy groceries</li>
          <li>• Finish college assignment</li>
          <li>• Call friend in evening</li>
          <li>• Revise React hooks</li>
        </ul>

        {/* Return to chat */}
        <button
          onClick={() => router.push("/chat")}
          className="mt-6 text-sm text-blue-600 hover:underline"
        >
          Back
        </button>
      </div>
    </div>
  );
}
