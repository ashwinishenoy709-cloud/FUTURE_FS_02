import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import ThemeToggle from "./ThemeToggle.jsx";
import ApexLeadLogo from "./ApexLeadLogo.jsx";
import { ChevronLeft, ChevronRight, LayoutDashboard, Users, LogOut, } from "lucide-react";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  function handleLogout() {
    logout();
    navigate("/admin");
  }

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* Logo + collapse button */}
      <div className="sidebar-brand-row">
        <ApexLeadLogo
          iconOnly={collapsed}
          className={
            collapsed
              ? "sidebar-icon-logo"
              : "sidebar-brand-logo"
          }
        />
        <button
          type="button"
          className="sidebar-collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={
            collapsed ? "Expand sidebar" : "Collapse sidebar"
          }
        >
          {collapsed ? (
            <ChevronRight size={18} />
          ) : (
            <ChevronLeft size={18} />
          )}
        </button>
      </div>
      {/* Navigation */}
      <nav className="sidebar-nav">
        <button
          type="button"
          className="sidebar-nav-item"
          onClick={() => navigate("/admin/dashboard")}
          title="Dashboard"
        >
          <LayoutDashboard size={19} />
          {!collapsed && <span>Dashboard</span>}
        </button>

        <button
          type="button"
          className="sidebar-nav-item"
          onClick={() => navigate("/admin/dashboard")}
          title="Leads"
        >
          <Users size={19} />
          {!collapsed && <span>Leads</span>}
        </button>
      </nav>
      {/* Theme */}
      <div className="sidebar-theme">
        {!collapsed && <span>Theme</span>}

        <ThemeToggle />
      </div>
      {/* Admin */}
      <div className="sidebar-user">
        {!collapsed && (
          <>
            <div className="role">Admin</div>
            <div className="name">{user?.name}</div>
          </>
        )}
        <button
          type="button"
          className="sidebar-logout"
          onClick={handleLogout}
          title="Sign out"
        >
          <LogOut size={18} />
          {!collapsed && <span>Sign out</span>}
        </button>
      </div>
    </aside>
  );
}
