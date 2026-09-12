import React, { useCallback, useEffect, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import KpiStrip from "../components/KpiStrip.jsx";
import LeadTable from "../components/LeadTable.jsx";
import LeadModal from "../components/LeadModal.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { api } from "../api.js";

const FILTERS = [
  { key: "", label: "All" },
  { key: "new", label: "New" },
  { key: "contacted", label: "Contacted" },
  { key: "converted", label: "Converted" },
];

export default function Dashboard() {
  const { token } = useAuth();
  const [leads, setLeads] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [activeLead, setActiveLead] = useState(null);
  const [showNewModal, setShowNewModal] = useState(false);

  const loadLeads = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getLeads(token, { q: search, status: statusFilter });
      setLeads(data.leads);
    } finally {
      setLoading(false);
    }
  }, [token, search, statusFilter]);

  const loadAnalytics = useCallback(async () => {
    const data = await api.getAnalytics(token);
    setAnalytics(data);
  }, [token]);

  useEffect(() => {
    const timeout = setTimeout(loadLeads, 250); // debounce search typing
    return () => clearTimeout(timeout);
  }, [loadLeads]);

  useEffect(() => {
    loadAnalytics();
  }, [loadAnalytics]);

  function handleSaved(lead, opts = {}) {
    setLeads((prev) => {
      const exists = prev.some((l) => l._id === lead._id);
      return exists ? prev.map((l) => (l._id === lead._id ? lead : l)) : [lead, ...prev];
    });
    loadAnalytics();
    if (!opts.keepOpen) {
      setActiveLead(null);
      setShowNewModal(false);
    } else {
      setActiveLead(lead);
    }
  }

  function handleDeleted(leadId) {
    setLeads((prev) => prev.filter((l) => l._id !== leadId));
    setActiveLead(null);
    loadAnalytics();
  }

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-panel">
        <div className="page-header">
          <div>
            <h1>Lead Pipeline</h1>
            <p className="sub">Every lead, from first contact to converted client.</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowNewModal(true)}>
            + Add lead
          </button>
        </div>

        <KpiStrip analytics={analytics} />

        <div className="toolbar">
          <input
            type="text"
            placeholder="Search by name, email, or source…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="status-filter">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                className={`status-chip ${statusFilter === f.key ? "active" : ""}`}
                onClick={() => setStatusFilter(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {!loading && <LeadTable leads={leads} onSelect={setActiveLead} />}

        {(activeLead || showNewModal) && (
          <LeadModal
            lead={activeLead}
            onClose={() => {
              setActiveLead(null);
              setShowNewModal(false);
            }}
            onSaved={handleSaved}
            onDeleted={handleDeleted}
          />
        )}
      </main>
    </div>
  );
}
