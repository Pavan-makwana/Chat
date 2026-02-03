"use client";

import { useAuth } from "@/hooks/useAuth";
import LogoutButton from "@/components/LogoutButton";

export default function SettingsPage() {
  const { user } = useAuth();

  return (
    <div className="p-6">
      <h1 className="text-lg font-semibold mb-4">Settings</h1>

      <div className="text-sm mb-4">
        Logged in as: <b>{user?.email}</b>
      </div>

      <LogoutButton />
    </div>
  );
}
