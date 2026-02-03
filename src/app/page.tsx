"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { createUserIfNotExists } from "@/lib/createUser";


export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const login = async () => {
  setLoading(true);
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);

    if (res.user) {
      await createUserIfNotExists(res.user);
    }

    router.push("/chat");
  } catch (err) {
    if (err instanceof Error) {
      alert(err.message);
    } else {
      alert("Login failed");
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="h-screen flex items-center justify-center text-black">
      <div className="bg-white p-6 shadow w-80 rounded">
        <h1 className="text-xl font-semibold mb-4 text-center text-black">
          Login
        </h1>

        <input
          className="border p-2 w-full mb-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="border p-2 w-full mb-4"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={login}
          disabled={loading}
          className="bg-black text-white w-full py-2 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}
