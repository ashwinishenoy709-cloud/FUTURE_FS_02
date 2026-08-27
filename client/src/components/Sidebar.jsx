import React from "react";
import { useAuth } from "../context/AuthContext.jsx";

export default function Sidebar() {
  const { user, logout } = useAuth();

  return (
    <aside className="sidebar">
      <div className="auth-brand">
        <span className="mark" />
        <span>ApexLead</span>
      </div>

      <div className="sidebar-user">
        <div className="role">Admin</div>
        <div className="name">{user?.name}</div>
        <button className="btn btn-ghost" style={{ width: "100%", marginTop: 10 }} onClick={logout}>
          Sign out
        </button>
      </div>
    </aside>
  );
}
