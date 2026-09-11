import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { api } from "../api.js";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    async function checkRegistration() {
      try {
        const data = await api.setupStatus();

        if (!data.registrationAllowed) {
          navigate("/login", { replace: true });
        }
      } catch (err) {
        setError("Could not check registration status");
      } finally {
        setChecking(false);
      }
    }

    checkRegistration();
  }, [navigate]);

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSubmitting(true);

    try {
      await register(
        form.name,
        form.email,
        form.password
      );

      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (checking) {
    return null;
  }

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <Link to="/" className="auth-back-link">
          <span>←</span>
          Back to Home
        </Link>
        <div className="auth-brand">
           <ApexLeadLogo className="auth-brand-logo" />
        </div>

        <h1>Create admin account</h1>

        <p className="sub">
          This account manages the lead pipeline.
        </p>

        {error && (
          <div className="form-error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="name">Name</label>

            <input
              id="name"
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
            <label htmlFor="email">Email</label>

            <input
              id="email"
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
            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              required
              minLength={6}
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
            {submitting
              ? "Creating account…"
              : "Create account"}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{" "}
          <Link to="/login">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}