import React, { useState } from "react";
import { api } from "../api.js";

export default function PublicHome() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    source: "Website",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await api.submitInquiry(form);
      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="public-page">
      <header className="public-nav">
        <div className="auth-brand">
          <span className="mark" />
          <span>ApexLead</span>
        </div>
      </header>

      <main className="public-main">
        <section className="public-hero">
          <p className="public-eyebrow">LET'S WORK TOGETHER</p>
          <h1>
            Grow your business
            <br />
            with the right support.
          </h1>
          <p>
            Tell us what you're looking for and our team will get
            back to you with the right solution.
          </p>
        </section>

        <section className="contact-card">
          {submitted ? (
            <div className="contact-success">
              <div className="success-icon">✓</div>
              <h2>Thank you!</h2>
              <p>
                Your inquiry has been received.
                Our team will contact you soon.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setSubmitted(false);

                  setForm({
                    name: "",
                    email: "",
                    message: "",
                    source: "Website",
                  });
                }}
              >
                Send another inquiry
              </button>
            </div>
          ) : (
            <>
              <h2>Start a conversation</h2>
              <p className="sub">
                Tell us a little about what you need.
              </p>
              {error && (
                <div className="form-error">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="field">
                  <label>Full Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        name: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="field">
                  <label>Email Address</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        email: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="field">
                  <label>How did you find us?</label>

                  <select
                    value={form.source}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        source: e.target.value,
                      })
                    }
                  >
                    <option value="Website">Website</option>
                    <option value="Google">Google</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Instagram">Instagram</option>
                    <option value="Referral">Referral</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="field">
                  <label>Message / Requirements</label>
                  <textarea
                    required
                    rows="5"
                    placeholder="Tell us what you're looking for..."
                    value={form.message}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        message: e.target.value,
                      })
                    }
                  />
                </div>
                <button className="btn btn-primary" type="submit" disabled={submitting} >
                  {submitting
                    ? "Sending..."
                    : "Submit Inquiry"}
                </button>
              </form>
            </>
          )}
        </section>
      </main>
    </div>
  );
}