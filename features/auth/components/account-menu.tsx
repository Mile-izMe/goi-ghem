"use client";

import { useState } from "react";
import { useAuth } from "./auth-provider";
import { logout } from "../services/auth-service";
import { getAuthErrorMessage } from "../lib/errors";

export function AccountMenu() {
  const { user } = useAuth();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const fullName: unknown = user?.user_metadata.full_name;
  const name =
    typeof fullName === "string" && fullName.trim()
      ? fullName
      : user?.email?.split("@")[0] || "Bạn đồng hành";

  async function signOut() {
    if (pending) return;
    setPending(true);
    setError("");
    try {
      await logout();
      window.location.replace("/");
    } catch (error) {
      setError(getAuthErrorMessage(error));
      setPending(false);
    }
  }

  return (
    <div>
      <div className="profile">
        <span className="avatar">{name.charAt(0).toUpperCase()}</span>
        <div>
          <strong title={name}>{name}</strong>
          <span>Tài khoản cá nhân</span>
        </div>
        <button className="logout-button" onClick={signOut} disabled={pending}>
          {pending ? "Đang thoát…" : "Đăng xuất"}
        </button>
      </div>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
