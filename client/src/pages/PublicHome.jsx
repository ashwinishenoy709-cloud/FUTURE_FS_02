import React, { useState } from "react";
import { Link } from "react-router-dom";
import ApexLeadLogo from "../components/ApexLeadLogo.jsx";

import { api } from "../api.js";
import ThemeToggle from "../components/ThemeToggle.jsx";

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

  function scrollToContact() {
    document
      .getElementById("contact")
      ?.scrollIntoView({
        behavior: "smooth",
      });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
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
    <div className="landing-page">
      {/* NAVBAR */}
      <header className="landing-nav">
        <a href="#home" className="landing-logo">
          <ApexLeadLogo className="public-brand-logo" />
        </a>
        <nav className="landing-links">
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#how-it-works">
            How It Works
          </a>
          <a href="#contact">Contact</a>
        </nav>
        <div className="nav-actions">
          <ThemeToggle />
          <button className="nav-cta" onClick={scrollToContact} >
            Start an Inquiry
          </button>
        </div>
      </header>

      {/* HOME / HERO */}
      <section className="landing-hero" id="home" >
        <div className="hero-glow hero-glow-one" />
        <div className="hero-glow hero-glow-two" />
        <div className="hero-content">
          <div className="section-badge">
            SMART LEAD MANAGEMENT
          </div>
          <h1>
            Turn leads into lasting{" "}
            <span className="gradient-text">
              customer relationships.
            </span>
          </h1>
          <p>
            ApexLead helps businesses capture,
            organize and follow up on incoming
            customer leads without losing track
            of important conversations.
          </p>
          <div className="hero-actions">
            <button className="primary-cta" onClick={scrollToContact} >
              Start an Inquiry
              <span>→</span>
            </button>
            <a href="#how-it-works" className="secondary-cta" >
              See how it works
            </a>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="landing-section" id="features" >
        <div className="section-heading">
          <div className="section-badge">
            BUILT FOR BETTER FOLLOW-UPS
          </div>
          <h2>
            Everything needed to keep
            opportunities moving.
          </h2>
          <p>
            From the first message to a converted
            customer, ApexLead keeps every lead
            organized.
          </p>
        </div>

        <div className="feature-grid">
          <article className="feature-card">
            <span className="feature-number">
              01
            </span>
            <h3>Capture inquiries</h3>
            <p>
              Website submissions are automatically
              stored as new leads.
            </p>
          </article>

          <article className="feature-card">
            <span className="feature-number">
              02
            </span>
            <h3>Track progress</h3>
            <p>
              Move leads from New to Contacted
              and finally Converted.
            </p>
          </article>

          <article className="feature-card">
            <span className="feature-number">
              03
            </span>
            <h3>Plan follow-ups</h3>
            <p>
              Add notes, priorities and follow-up
              dates for every conversation.
            </p>
          </article>

          <article className="feature-card">
            <span className="feature-number">
              04
            </span>
            <h3>Understand performance</h3>
            <p>
              Track lead totals, conversions and
              pipeline progress from one dashboard.
            </p>
          </article>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="landing-section process-section" id="how-it-works" >
        <div className="section-heading">
          <div className="section-badge">
            HOW APEXLEAD WORKS
          </div>
          <h2>
            From first contact to{" "}
            <span className="gradient-text">
              converted client.
            </span>
          </h2>
          <p>
            A simple workflow built around
            real customer conversations.
          </p>
        </div>
        <div className="process-list">
          <div className="process-card">
            <span className="process-number">
              01
            </span>
            <div>
              <h3>Customer sends an inquiry</h3>
              <p>
                A visitor submits their name,
                email and requirements using
                the contact form.
              </p>
            </div>
          </div>

          <div className="process-card">
            <span className="process-number">
              02
            </span>
            <div>
              <h3>Lead enters the pipeline</h3>
              <p>
                ApexLead stores the inquiry
                securely in MongoDB with the
                status New.
              </p>
            </div>
          </div>

          <div className="process-card">
            <span className="process-number">
              03
            </span>
            <div>
              <h3>Admin follows up</h3>
              <p>
                The business owner updates status,
                priority, notes and follow-up dates.
              </p>
            </div>
          </div>

          <div className="process-card">
            <span className="process-number">
              04
            </span>
            <div>
              <h3>Lead converts</h3>
              <p>
                Successful leads move to Converted
                and contribute to dashboard analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section
        className="contact-section"
        id="contact"
      >
        <div className="contact-copy">
          <div className="section-badge">
            LET'S TALK
          </div>
          <h2>
            Ready to get started?
          </h2>
          <p>
            Tell us what you're looking for.
            We'll review your requirements
            and get back to you.
          </p>
        </div>

        <div className="contact-card">
          {submitted ? (
            <div className="contact-success">
              <div className="success-icon">
                ✓
              </div>
              <h2>Thank you!</h2>
              <p>
                Your inquiry has been received.
                Our team will contact you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {error && (
                <div className="form-error">
                  {error}
                </div>
              )}

              <div className="field">
                <label>Full Name</label>
                <input
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
                <label>
                  How did you find us?
                </label>
                <select
                  value={form.source}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      source: e.target.value,
                    })
                  }
                >
                  <option>Website</option>
                  <option>Google</option>
                  <option>LinkedIn</option>
                  <option>Instagram</option>
                  <option>Referral</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="field">
                <label>
                  Message / Requirements
                </label>
                <textarea
                  rows="5"
                  required
                  value={form.message}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      message: e.target.value,
                    })
                  }
                />
              </div>
              <button className="primary-cta submit-cta" disabled={submitting} >
                {submitting
                  ? "Sending..."
                  : "Submit Inquiry"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="landing-footer">
        <div>
          <strong>ApexLead</strong>
          <p>
            Smart lead management for growing
            businesses.
          </p>
        </div>

        <div className="footer-right">
          <span>
            © 2026 ApexLead
          </span>
          <Link to="/admin" className="staff-link" >
            Admin Portal
          </Link>
        </div>
      </footer>
    </div>
  );
}