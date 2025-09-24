"use client";

import { useEffect, useState } from "react";
import ProjectManager from "../../components/admin/ProjectManager";

const ADMIN_PASSWORD = "password123";

export default function AdminPage() {
  const [passwordInput, setPasswordInput] = useState("");
  const [isAuthed, setIsAuthed] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = sessionStorage.getItem("admin-auth");
    if (saved && saved === "yes") {
      setIsAuthed(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!passwordInput) return;

    if (passwordInput === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin-auth", "yes");
      setIsAuthed(true);
      setError("");
    } else {
      setError("Invalid password");
    }
  };

  if (!isAuthed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm bg-card-bg border border-border rounded-md p-6"
        >
          <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
          <label className="block text-sm mb-1">Password</label>
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            className="w-full px-3 py-2 rounded border border-border bg-transparent focus:outline-none"
            placeholder="Enter admin password"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <button
            type="submit"
            className="mt-4 w-full bg-primary text-white py-2 rounded-sm hover:bg-primary-hover transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    );
  }

  return <ProjectManager />;
}
