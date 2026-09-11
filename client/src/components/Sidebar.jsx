import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu,
  LayoutDashboard,
  Users,
  LogOut,
} from "lucide-react";

import { useAuth } from "../context/AuthContext.jsx";
import ThemeToggle from "./ThemeToggle.jsx";
import ApexLeadLogo from "./ApexLeadLogo.jsx";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(true);
  const [logoHover, setLogoHover] = useState(false);

  function handleLogout() {
    logout();
    navigate("/admin");
  }

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>

      {/* BRAND / MENU */}
      <div className="sidebar-brand-row">

        {collapsed ? (
          <button
            type="button"
            className="sidebar-logo-trigger"
            onMouseEnter={() => setLogoHover(true)}
            onMouseLeave={() => setLogoHover(false)}
            onClick={() => setCollapsed(false)}
            aria-label="Open sidebar"
          >
            {logoHover ? (
              <Menu size={24} />
            ) : (
              <ApexLeadLogo
                iconOnly
                className="sidebar-icon-logo"
              />
            )}
          </button>
        ) : (
          <>
            <ApexLeadLogo
              className="sidebar-brand-logo"
            />

            <button
              type="button"
              className="sidebar-collapse-btn"
              onClick={() => setCollapsed(true)}
              aria-label="Collapse sidebar"
            >
              <Menu size={21} />
            </button>
          </>
        )}

      </div>

      {/* ONLY SHOW CONTENT WHEN OPEN */}
      {!collapsed && (
        <>
          <nav className="sidebar-nav">

            <button
              type="button"
              className="sidebar-nav-item"
              onClick={() =>
                navigate("/admin/dashboard")
              }
            >
              <LayoutDashboard size={19} />
              <span>Dashboard</span>
            </button>

            <button
              type="button"
              className="sidebar-nav-item"
              onClick={() =>
                navigate("/admin/dashboard")
              }
            >
              <Users size={19} />
              <span>Leads</span>
            </button>

          </nav>

          <div className="sidebar-bottom">
            <div className="sidebar-theme-row">
              <span>Theme</span>
              <ThemeToggle />
            </div>

            <div className="sidebar-account">
              <span className="account-label">Signed in as</span>
              <span className="account-name">{user?.name || "Admin"}</span>
            </div>

            <button
              type="button"
              className="sidebar-logout"
              onClick={handleLogout}
            >
              <LogOut size={18} />
              <span>Sign out</span>
            </button>
          </div>
        </>
      )}

    </aside>
  );
}