import React from "react";

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

export default function LeadTable({ leads, onSelect }) {
  if (leads.length === 0) {
    return (
      <div className="lead-table-wrap">
        <div className="empty-state">
          <div className="glyph">— no leads —</div>
          <p>No leads match this view yet. New contact-form submissions will land here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lead-table-wrap">
      <table className="lead-table">
        <thead>
          <tr>
            <th>Lead</th>
            <th>Email</th>
            <th>Source</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Follow-up</th>
            <th>Added</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id} onClick={() => onSelect(lead)}>
              <td>
                <span className={`lead-row-signal signal-${lead.status}`} />
                {lead.name}
              </td>
              <td className="email-cell">{lead.email}</td>
              <td>{lead.source || "—"}</td>
              <td>
                <span className={`status-pill ${lead.status}`}>{lead.status}</span>
              </td>
              <td className="timestamp-cell">{formatDate(lead.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
