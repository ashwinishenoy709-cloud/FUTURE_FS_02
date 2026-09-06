import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { api } from "../api.js";
import ApexLeadLogo from "../components/ApexLeadLogo.jsx";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const [registrationAllowed, setRegistrationAllowed] = useState(false);

  useEffect(() => {
    async function checkSetup() {
      try {
        const data = await api.setupStatus();
        setRegistrationAllowed(data.registrationAllowed);
      } catch (err) {
        console.error("Could not check setup status:", err);
      }
    }

    checkSetup();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await login(form.email, form.password);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <div className="auth-brand">
          <ApexLeadLogo className="auth-brand-logo" />
        </div>

        <h1>Sign in</h1>
        <p className="sub">Access your lead pipeline.</p>

        {error && <div className="form-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              autoComplete="email"
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
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
            />
          </div>

          <button
            className="btn btn-primary"
            type="submit"
            disabled={submitting}
          >
            {submitting ? "Signing in…" : "Sign in"}
          </button>
          {registrationAllowed && (
            <p className="auth-switch">
              New here?{" "}
              <Link to="/register">
                Create the admin account
              </Link>
            </p>
          )}
        </form>
      </div>
    </div>
  );
}