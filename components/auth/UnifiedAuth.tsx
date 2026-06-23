"use client";

import { useState, useCallback } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import Link from "next/link";

type Mode = "login" | "register";
type Role = "student" | "instructor";

interface FieldErrors {
  name?: string;
  email?: string;
  password?: string;
}

export default function UnifiedAuth({ initialMode }: { initialMode: Mode }) {
  const { t, locale, setLocale } = useLocale();
  const [mode, setMode] = useState<Mode>(initialMode);
  const [role, setRole] = useState<Role>("student");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});

  const isLogin = mode === "login";

  const clearError = (field: keyof FieldErrors) =>
    setErrors((prev) => ({ ...prev, [field]: undefined }));

  const toggleMode = useCallback(() => {
    setMode((m) => (m === "login" ? "register" : "login"));
    setErrors({});
    setName("");
    setEmail("");
    setPassword("");
    setShowPassword(false);
  }, []);

  const validate = useCallback((): FieldErrors => {
    const errs: FieldErrors = {};
    if (!isLogin && name.trim().length < 2)
      errs.name = t("auth.fullNameRequired");
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = t("auth.emailRequired");
    if (password.length < 8)
      errs.password = t("auth.passwordRequired");
    return errs;
  }, [isLogin, name, email, password, t]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const errs = validate();
      if (Object.keys(errs).length > 0) {
        setErrors(errs);
        return;
      }
      setErrors({});
      setLoading(true);
      // TODO: wire real auth
      await new Promise((r) => setTimeout(r, 1200));
      setLoading(false);
    },
    [validate]
  );

  const handleGoogle = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    // TODO: wire Google OAuth
  }, []);

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }

        .auth-page {
          font-family: var(--font-poppins), var(--font-body), sans-serif;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: linear-gradient(125deg, #FDEEE9 0%, #F7EEF8 48%, #ECEDFE 78%, #E9ECFC 100%);
          background-attachment: fixed;
          position: relative;
          overflow-x: hidden;
        }
        .auth-blob-1 {
          position: fixed;
          top: -160px;
          right: -120px;
          width: 460px;
          height: 460px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(106,90,240,0.10) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }
        .auth-blob-2 {
          position: fixed;
          bottom: -180px;
          left: -140px;
          width: 480px;
          height: 480px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(240,97,74,0.08) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }
        .auth-header {
          max-width: 1180px;
          width: 100%;
          margin: 0 auto;
          padding: 22px 34px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          position: relative;
          z-index: 10;
        }
        .auth-lang-select {
          appearance: none;
          background: white;
          border: 1px solid #ECE9F6;
          border-radius: 10px;
          padding: 8px 28px 8px 12px;
          font-family: var(--font-poppins), sans-serif;
          font-size: 13px;
          color: #1B1830;
          cursor: pointer;
          outline: none;
          background-image: url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3 4.5L6 7.5L9 4.5' stroke='%236B6783' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 8px center;
          transition: border-color 0.15s ease;
        }
        .auth-lang-select:hover { border-color: #DDD8EE; }
        .auth-center {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0 20px 48px;
          position: relative;
          z-index: 10;
        }
        .auth-card-wrap {
          width: 100%;
          max-width: 472px;
          animation: authFadeUp 0.45s ease-out both;
        }
        @keyframes authFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0);   }
        }
        .auth-intro {
          text-align: center;
          margin-bottom: 22px;
        }
        .auth-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: white;
          border-radius: 999px;
          padding: 6px 14px;
          font-family: var(--font-poppins), sans-serif;
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.10em;
          text-transform: uppercase;
          color: #F0614A;
          box-shadow: 0 4px 14px -8px rgba(27,24,48,0.25);
          margin-bottom: 14px;
        }
        .auth-eyebrow-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #F0614A;
          flex-shrink: 0;
        }
        .auth-h1 {
          font-family: var(--font-poppins), sans-serif;
          font-size: 33px;
          font-weight: 800;
          letter-spacing: -0.02em;
          color: #1B1830;
          margin: 0 0 8px;
          line-height: 1.2;
        }
        .auth-h1-accent { color: #6A5AF0; }
        .auth-subtitle {
          font-family: var(--font-poppins), sans-serif;
          font-size: 14.5px;
          color: #6B6783;
          margin: 0 auto;
          max-width: 372px;
          line-height: 1.55;
        }
        .auth-card {
          background: white;
          border: 1px solid #F0EEF8;
          border-radius: 24px;
          padding: 30px;
          box-shadow:
            0 2px 4px rgba(27,24,48,0.03),
            0 26px 60px -30px rgba(106,90,240,0.40);
        }
        .auth-role-label {
          font-family: var(--font-poppins), sans-serif;
          font-size: 12.5px;
          font-weight: 600;
          color: #4A4660;
          display: block;
          margin-bottom: 11px;
        }
        .auth-role-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 22px;
        }
        .auth-role-card {
          border-radius: 15px;
          padding: 14px;
          cursor: pointer;
          transition: all 0.15s ease;
          border: 1.5px solid #ECE9F6;
          background: white;
          display: flex;
          flex-direction: column;
          gap: 6px;
          user-select: none;
          text-align: left;
          outline: none;
        }
        .auth-role-card:hover { border-color: #DDD8EE; }
        .auth-role-card:focus-visible {
          box-shadow: 0 0 0 3px rgba(106,90,240,0.20);
        }
        .auth-role-card.selected {
          background: #F1EEFE;
          border-color: #6A5AF0;
          box-shadow: 0 0 0 3px rgba(106,90,240,0.12);
        }
        .auth-role-row1 {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 2px;
        }
        .auth-role-icon {
          width: 31px;
          height: 31px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-poppins), sans-serif;
          font-size: 14px;
          font-weight: 700;
          transition: all 0.15s ease;
          background: #F1EEFB;
          color: #6B6783;
        }
        .auth-role-icon.on { background: #6A5AF0; color: white; }
        .auth-role-dot {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 1.5px solid #D6D1E8;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.15s ease;
          background: white;
          flex-shrink: 0;
        }
        .auth-role-dot.on { background: #6A5AF0; border-color: #6A5AF0; }
        .auth-role-name {
          font-family: var(--font-poppins), sans-serif;
          font-size: 14.5px;
          font-weight: 600;
          color: #1B1830;
          margin: 0;
        }
        .auth-role-desc {
          font-family: var(--font-poppins), sans-serif;
          font-size: 11.5px;
          color: #797592;
          margin: 0;
          line-height: 1.45;
        }
        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .auth-field { display: flex; flex-direction: column; gap: 6px; }
        .auth-field-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .auth-field-label {
          font-family: var(--font-poppins), sans-serif;
          font-size: 12.5px;
          font-weight: 600;
          color: #4A4660;
        }
        .auth-input-wrap {
          display: flex;
          align-items: center;
          border: 1.5px solid #ECE9F6;
          border-radius: 12px;
          background: #F8F7FC;
          padding: 0 15px;
          transition: all 0.15s ease;
        }
        .auth-input-wrap:focus-within {
          border-color: #6A5AF0;
          background: white;
          box-shadow: 0 0 0 3px rgba(106,90,240,0.14);
        }
        .auth-input-wrap.has-error { border-color: #e53e3e; background: #fff8f8; }
        .auth-input-wrap.has-error:focus-within {
          border-color: #e53e3e;
          box-shadow: 0 0 0 3px rgba(229,62,62,0.12);
        }
        .auth-input {
          flex: 1;
          min-width: 0;
          border: none !important;
          background: transparent !important;
          box-shadow: none !important;
          outline: none !important;
          font-family: var(--font-poppins), sans-serif;
          font-size: 14.5px;
          padding: 13px 0;
          color: #1B1830;
        }
        .auth-input::placeholder { color: #A8A4C0; }
        .auth-field-error {
          font-family: var(--font-poppins), sans-serif;
          font-size: 12px;
          font-weight: 500;
          color: #e53e3e;
        }
        .auth-toggle-pw {
          flex-shrink: 0;
          border: none;
          background: transparent;
          color: #797592;
          font-family: var(--font-poppins), sans-serif;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          padding: 4px 0 4px 8px;
          white-space: nowrap;
          transition: color 0.15s ease;
        }
        .auth-toggle-pw:hover { color: #6A5AF0; }
        .auth-forgot {
          font-family: var(--font-poppins), sans-serif;
          font-size: 12px;
          font-weight: 600;
          color: #6A5AF0;
          text-decoration: none;
        }
        .auth-forgot:hover { text-decoration: underline; }
        .auth-submit {
          margin-top: 5px;
          width: 100%;
          background: linear-gradient(135deg, #7B6CF6 0%, #6A5AF0 100%);
          color: white;
          border: none;
          border-radius: 13px;
          padding: 14px;
          font-family: var(--font-poppins), sans-serif;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 12px 24px -12px rgba(106,90,240,0.85);
          transition: filter 0.15s ease, opacity 0.15s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .auth-submit:hover:not(:disabled) { filter: brightness(0.94); }
        .auth-submit:disabled { opacity: 0.7; cursor: not-allowed; }
        .auth-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.35);
          border-top-color: white;
          border-radius: 50%;
          animation: auth-spin 0.65s linear infinite;
          flex-shrink: 0;
        }
        @keyframes auth-spin { to { transform: rotate(360deg); } }
        .auth-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 20px 0;
        }
        .auth-divider-line { flex: 1; height: 1px; background: #EFEDF6; }
        .auth-divider-text {
          font-family: var(--font-poppins), sans-serif;
          font-size: 11.5px;
          font-weight: 600;
          color: #A8A4C0;
          letter-spacing: 0.04em;
        }
        .auth-google-btn {
          width: 100%;
          background: white;
          border: 1.5px solid #ECE9F6;
          border-radius: 13px;
          padding: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          cursor: pointer;
          font-family: var(--font-poppins), sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #3A3550;
          transition: all 0.15s ease;
        }
        .auth-google-btn:hover { background: #F8F7FC; border-color: #DDD8EE; }
        .auth-footer-text {
          text-align: center;
          font-family: var(--font-poppins), sans-serif;
          font-size: 13.5px;
          color: #6B6783;
          margin: 22px 0 0;
        }
        .auth-switch-btn {
          background: none;
          border: none;
          color: #6A5AF0;
          font-family: var(--font-poppins), sans-serif;
          font-size: 13.5px;
          font-weight: 600;
          cursor: pointer;
          padding: 0;
        }
        .auth-switch-btn:hover { text-decoration: underline; }
        .auth-reassurance {
          text-align: center;
          font-family: var(--font-poppins), sans-serif;
          font-size: 12px;
          color: #948FAB;
          max-width: 360px;
          margin: 20px auto 0;
          line-height: 1.5;
        }
        .auth-reassurance a { color: #6A5AF0; text-decoration: none; font-weight: 600; }
        .auth-reassurance a:hover { text-decoration: underline; }
        @media (max-width: 520px) {
          .auth-header { padding: 16px 18px; }
          .auth-card   { padding: 22px 18px; border-radius: 20px; }
          .auth-h1     { font-size: 26px; }
        }
      `}</style>

      <div className="auth-page">
        <div className="auth-blob-1" aria-hidden="true" />
        <div className="auth-blob-2" aria-hidden="true" />

        {/* Header — language picker only */}
        <header className="auth-header">
          <select
            className="auth-lang-select"
            value={locale}
            onChange={(e) => setLocale(e.target.value as "en" | "fr")}
            aria-label={t("common.language")}
          >
            <option value="en">English</option>
            <option value="fr">Français</option>
          </select>
        </header>

        <main className="auth-center">
          <div className="auth-card-wrap">

            {/* Intro */}
            <div className="auth-intro">
              <div className="auth-eyebrow">
                <span className="auth-eyebrow-dot" aria-hidden="true" />
                {isLogin ? t("auth.welcomeBack") : t("auth.getStarted")}
              </div>
              <h1 className="auth-h1">
                {isLogin ? t("auth.signInToYour") : t("auth.createYour")}{" "}
                <span className="auth-h1-accent">
                  {isLogin ? t("auth.portalInPlace") : t("auth.accountInPlace")}
                </span>
              </h1>
              <p className="auth-subtitle">
                {isLogin ? t("auth.signInSubtitle") : t("auth.pickPortalSubtitle")}
              </p>
            </div>

            {/* Card */}
            <div className="auth-card">

              {/* Role selector */}
              <span className="auth-role-label">
                {isLogin ? t("auth.signInAsLabel") : t("auth.registerAsLabel")}
              </span>
              <div className="auth-role-grid" role="radiogroup" aria-label="Select portal">
                {(["student", "instructor"] as Role[]).map((r) => {
                  const on = role === r;
                  return (
                    <button
                      key={r}
                      type="button"
                      className={`auth-role-card${on ? " selected" : ""}`}
                      onClick={() => setRole(r)}
                      role="radio"
                      aria-checked={on}
                    >
                      <div className="auth-role-row1">
                        <span className={`auth-role-icon${on ? " on" : ""}`}>
                          {r === "student" ? "S" : "I"}
                        </span>
                        <span className={`auth-role-dot${on ? " on" : ""}`}>
                          {on && (
                            <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden="true">
                              <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </span>
                      </div>
                      <p className="auth-role-name">
                        {r === "student" ? t("auth.portalStudent") : t("auth.portalInstructor")}
                      </p>
                      <p className="auth-role-desc">
                        {r === "student" ? t("auth.portalStudentDesc") : t("auth.portalInstructorDesc")}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Form */}
              <form className="auth-form" onSubmit={handleSubmit} noValidate>

                {/* Full name — register only */}
                {!isLogin && (
                  <div className="auth-field">
                    <label className="auth-field-label" htmlFor="auth-name">
                      {t("auth.fullName")}
                    </label>
                    <div className={`auth-input-wrap${errors.name ? " has-error" : ""}`}>
                      <input
                        id="auth-name"
                        className="auth-input"
                        type="text"
                        placeholder="Ada Obi"
                        value={name}
                        autoComplete="name"
                        onChange={(e) => { setName(e.target.value); clearError("name"); }}
                      />
                    </div>
                    {errors.name && <span className="auth-field-error" role="alert">{errors.name}</span>}
                  </div>
                )}

                {/* Email */}
                <div className="auth-field">
                  <label className="auth-field-label" htmlFor="auth-email">
                    {t("auth.email")}
                  </label>
                  <div className={`auth-input-wrap${errors.email ? " has-error" : ""}`}>
                    <input
                      id="auth-email"
                      className="auth-input"
                      type="email"
                      placeholder="you@school.edu"
                      value={email}
                      autoComplete="email"
                      onChange={(e) => { setEmail(e.target.value); clearError("email"); }}
                    />
                  </div>
                  {errors.email && <span className="auth-field-error" role="alert">{errors.email}</span>}
                </div>

                {/* Password */}
                <div className="auth-field">
                  <div className="auth-field-row">
                    <label className="auth-field-label" htmlFor="auth-password">
                      {t("auth.password")}
                    </label>
                    {isLogin && (
                      <Link href="/forgot-password" className="auth-forgot">
                        {t("auth.forgotPassword")}
                      </Link>
                    )}
                  </div>
                  <div className={`auth-input-wrap${errors.password ? " has-error" : ""}`}>
                    <input
                      id="auth-password"
                      className="auth-input"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      autoComplete={isLogin ? "current-password" : "new-password"}
                      onChange={(e) => { setPassword(e.target.value); clearError("password"); }}
                    />
                    <button
                      type="button"
                      className="auth-toggle-pw"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  {errors.password && <span className="auth-field-error" role="alert">{errors.password}</span>}
                </div>

                <button type="submit" className="auth-submit" disabled={loading}>
                  {loading && <span className="auth-spinner" aria-hidden="true" />}
                  {loading
                    ? (isLogin ? t("auth.signingIn") : t("auth.creating"))
                    : (isLogin ? t("auth.signIn") : t("auth.createAccount"))}
                </button>
              </form>

              {/* OR divider */}
              <div className="auth-divider" aria-hidden="true">
                <div className="auth-divider-line" />
                <span className="auth-divider-text">OR</span>
                <div className="auth-divider-line" />
              </div>

              {/* Google sign-in */}
              <button type="button" className="auth-google-btn" onClick={handleGoogle}>
                <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                {t("auth.continueGoogle")}
              </button>

              {/* Mode toggle */}
              <p className="auth-footer-text">
                {isLogin ? t("auth.noAccount") : t("auth.hasAccount")}{" "}
                <button type="button" className="auth-switch-btn" onClick={toggleMode}>
                  {isLogin ? t("auth.newAccount") : t("auth.backToLogin")}
                </button>
              </p>
            </div>

            {/* Legal */}
            <p className="auth-reassurance">
              By continuing you agree to our{" "}
              <Link href="/terms">{t("footer.terms")}</Link> and{" "}
              <Link href="/privacy">{t("footer.privacy")}</Link>.
            </p>

          </div>
        </main>
      </div>
    </>
  );
}
