import React, { useState } from "react";
import { useAuth } from "../context/AuthContext.jsx";
import { api } from "../api.js";

const STATUSES = ["new", "contacted", "converted"];

function formatDateTime(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default function LeadModal({ lead, onClose, onSaved, onDeleted }) {
  const { token } = useAuth();
  const isNew = !lead;

  const [form, setForm] = useState({
    name: lead?.name || "",
    email: lead?.email || "",
    phone: lead?.phone || "",
    source: lead?.source || "Website",
    priority: lead?.priority || "medium",
    followUpDate: lead?.followUpDate
      ? lead.followUpDate.slice(0, 10)
      : "",
  });
  const [status, setStatus] = useState(lead?.status || "new");
  const [notes, setNotes] = useState(lead?.notes || []);
  const [noteText, setNoteText] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleSave(e) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      if (isNew) {
        const data = await api.createLead(token, { ...form, status });
        onSaved(data.lead);
      } else {
        const data = await api.updateLead(token, lead._id, form);
        onSaved(data.lead);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleStatusChange(next) {
    setStatus(next);
    if (!isNew) {
      try {
        const data = await api.updateStatus(token, lead._id, next);
        onSaved(data.lead, { keepOpen: true });
      } catch (err) {
        setError(err.message);
      }
    }
  }

  async function handleAddNote(e) {
    e.preventDefault();
    if (!noteText.trim() || isNew) return;
    try {
      const data = await api.addNote(token, lead._id, noteText.trim());
      setNotes(data.lead.notes);
      setNoteText("");
      onSaved(data.lead, { keepOpen: true });
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDeleteNote(noteId) {
    try {
      const data = await api.deleteNote(token, lead._id, noteId);
      setNotes(data.lead.notes);
      onSaved(data.lead, { keepOpen: true });
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDeleteLead() {
    if (!window.confirm(`Remove ${lead.name} from the pipeline?`)) return;
    try {
      await api.deleteLead(token, lead._id);
      onDeleted(lead._id);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2>{isNew ? "New lead" : lead.name}</h2>
            {!isNew && <p className="sub" style={{ margin: 0 }}>{lead.email}</p>}
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        {error && <div className="form-error">{error}</div>}

        {!isNew && (
          <>
            <div className="status-switcher">
              {STATUSES.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={`${s} ${status === s ? "active" : ""}`}
                  onClick={() => handleStatusChange(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </>
        )}

        <form onSubmit={handleSave}>
          <div className="field">
            <label htmlFor="lead-name">Name</label>
            <input
              id="lead-name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="field">
            <label htmlFor="lead-email">Email</label>
            <input
              id="lead-email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="field">
            <label htmlFor="lead-phone">Phone</label>
            <input
              id="lead-phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div className="field">
            <label htmlFor="lead-source">Source</label>
            <input
              id="lead-source"
              placeholder="e.g. Website contact form, Referral, LinkedIn"
              value={form.source}
              onChange={(e) => setForm({ ...form, source: e.target.value })}
            />
          </div>
          <div className="field">
            <label>Priority</label>
            <select
              value={form.priority}
              onChange={(e) =>
                setForm({ ...form, priority: e.target.value })
              }
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div className="field">
            <label>Next follow-up</label>
            <input
              type="date"
              value={form.followUpDate}
              onChange={(e) =>
                setForm({ ...form, followUpDate: e.target.value })
              }
            />
          </div>

          <button className="btn btn-primary" type="submit" disabled={saving}>
            {saving ? "Saving…" : isNew ? "Add lead" : "Save changes"}
          </button>
        </form>

        {!isNew && (
          <>
            <div className="section-label">Follow-up notes</div>
            {notes.length === 0 && <p className="helper-text">No notes yet.</p>}
            <div className="notes-list">
              {notes
                .slice()
                .reverse()
                .map((note) => (
                  <div className="note-item" key={note._id}>
                    {note.text}
                    <span className="note-time">
                      {formatDateTime(note.createdAt)}{" "}
                      <button
                        className="link-btn"
                        style={{ marginLeft: 8 }}
                        onClick={() => handleDeleteNote(note._id)}
                      >
                        remove
                      </button>
                    </span>
                  </div>
                ))}
            </div>
            <form className="note-form" onSubmit={handleAddNote}>
              <textarea
                placeholder="Log a call, email, or follow-up…"
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
              />
              <button className="btn btn-ghost" type="submit">
                Add
              </button>
            </form>

            <div className="modal-footer">
              <button className="btn btn-danger" type="button" onClick={handleDeleteLead}>
                Delete lead
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
