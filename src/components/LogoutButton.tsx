"use client";

import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const logout = async () => {
    await signOut(auth);
    router.push("/");
  };

  return (
    <button
      onClick={logout}
      className="w-full text-left text-sm text-red-600 hover:underline"
    >
      Logout
    </button>
  );
}
