"use client";

import { useState, useCallback } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import Link from "next/link";

type Mode = "login" | "register";
type Role = "student" | "instructor";

export default function UnifiedAuth({ initialMode }: { initialMode: Mode }) {
  const { t, locale, setLocale } = useLocale();
  const [mode, setMode] = useState<Mode>(initialMode);
  const [role, setRole] = useState<Role>("student");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isLogin = mode === "login";

  const toggleMode = useCallback(() => {
    setMode((m) => (m === "login" ? "register" : "login"));
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      console.log({ mode, role, name, email, password });
    },
    [mode, role, name, email, password]
  );

  const handleGoogle = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
    },
    []
  );

  return (
    <>
      <style>{`
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
        .auth-page.register-mode {
          background: linear-gradient(125deg, #1a1530 0%, #1f1a38 48%, #1a2040 78%, #151a35 100%);
          background-attachment: fixed;
        }
        .auth-header {
          max-width: 1180px;
          width: 100%;
          margin: 0 auto;
          padding: 22px 34px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
          z-index: 10;
        }
        .auth-center {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 0 20px 40px;
          position: relative;
          z-index: 10;
        }
        .auth-card-wrap {
          width: 100%;
          max-width: 472px;
          animation: authFadeUp 0.5s ease-out;
        }
        @keyframes authFadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
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
          font-size: 12px;
          font-weight: 600;
          color: #F0614A;
          box-shadow: 0 1px 2px rgba(0,0,0,0.04);
          margin-bottom: 14px;
        }
        .auth-eyebrow-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #F0614A;
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
        .auth-h1-violet {
          color: #6A5AF0;
        }
        .auth-subtitle {
          font-family: var(--font-poppins), sans-serif;
          font-size: 14.5px;
          color: #6B6783;
          margin: 0;
          line-height: 1.5;
        }
        .auth-card {
          background: white;
          border: 1px solid #F0EEF8;
          border-radius: 24px;
          padding: 30px;
          box-shadow: 0 2px 4px rgba(27,24,48,0.03);
        }
        .auth-role-label {
          font-family: var(--font-poppins), sans-serif;
          font-size: 12.5px;
          font-weight: 600;
          color: #4A4660;
          margin: 0 0 6px;
        }
        .auth-role-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 20px;
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
          gap: 8px;
          user-select: none;
        }
        .auth-role-card:hover {
          border-color: #DDD8EE;
        }
        .auth-role-card.selected {
          background: #F1EEFE;
          border-color: #6A5AF0;
          box-shadow: 0 0 0 3px rgba(106,90,240,0.12);
        }
        .auth-role-card-row1 {
          display: flex;
          align-items: center;
          justify-content: space-between;
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
        }
        .auth-role-icon.deselected {
          background: #F1EEFB;
          color: #6B6783;
        }
        .auth-role-icon.selected {
          background: #6A5AF0;
          color: white;
        }
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
        }
        .auth-role-dot.selected {
          background: #6A5AF0;
          border-color: #6A5AF0;
        }
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
          line-height: 1.4;
        }
        .auth-form {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .auth-field-label {
          font-family: var(--font-poppins), sans-serif;
          font-size: 12.5px;
          font-weight: 600;
          color: #4A4660;
          margin-bottom: 6px;
          display: block;
        }
        .auth-input-wrap-inner {
          display: flex;
          align-items: center;
          width: 100%;
          border: 1.5px solid #ECE9F6;
          border-radius: 12px;
          background: #F8F7FC;
          transition: all 0.15s ease;
          padding: 0 15px;
        }
        .auth-input-wrap-inner:focus-within {
          border-color: #6A5AF0;
          background: white;
          box-shadow: 0 0 0 3px rgba(106,90,240,0.14);
        }
        .auth-input {
          flex: 1;
          border: none !important;
          background: transparent !important;
          box-shadow: none !important;
          outline: none !important;
          font-family: var(--font-poppins), sans-serif;
          font-size: 14.5px;
          padding: 13px 0;
          color: #1B1830;
          width: 100%;
        }
        .auth-input::placeholder {
          color: #A8A4C0;
        }
        .auth-toggle-pw {
          border: none;
          background: transparent;
          color: #797592;
          font-family: var(--font-poppins), sans-serif;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          padding: 4px;
          white-space: nowrap;
        }
        .auth-forgot {
          font-family: var(--font-poppins), sans-serif;
          font-size: 12px;
          font-weight: 600;
          color: #6A5AF0;
          text-decoration: none;
          cursor: pointer;
        }
        .auth-submit {
          width: 100%;
          background: linear-gradient(135deg, #7B6CF6, #6A5AF0);
          color: white;
          border: none;
          border-radius: 13px;
          padding: 14px;
          font-family: var(--font-poppins), sans-serif;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 12px 24px -12px rgba(106,90,240,0.85);
          transition: filter 0.15s ease;
        }
        .auth-submit:hover:not(:disabled) {
          filter: brightness(0.94);
        }
        .auth-submit:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .auth-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 6px 0;
        }
        .auth-divider-line {
          flex: 1;
          height: 1px;
          background: #EFEDF6;
        }
        .auth-divider-text {
          font-family: var(--font-poppins), sans-serif;
          font-size: 11.5px;
          font-weight: 600;
          color: #A8A4C0;
          white-space: nowrap;
        }
        .auth-google-btn {
          width: 100%;
          background: white;
          border: 1px solid #ECE9F6;
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
        .auth-google-btn:hover {
          background: #F8F7FC;
          border-color: #DDD8EE;
        }
        .auth-footer {
          text-align: center;
          font-family: var(--font-poppins), sans-serif;
          font-size: 13.5px;
          color: #6B6783;
          margin-top: 6px;
        }
        .auth-ghost-btn {
          background: none;
          border: none;
          color: #6A5AF0;
          font-family: var(--font-poppins), sans-serif;
          font-size: 13.5px;
          font-weight: 600;
          cursor: pointer;
          padding: 0;
          text-decoration: none;
          display: inline;
        }
        .auth-reassurance {
          text-align: center;
          font-family: var(--font-poppins), sans-serif;
          font-size: 12px;
          color: #948FAB;
          max-width: 360px;
          margin: 18px auto 0;
          line-height: 1.5;
        }
        .auth-reassurance a {
          color: #6A5AF0;
          text-decoration: none;
          font-weight: 600;
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
          background-image: url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M3 4.5L6 7.5L9 4.5' stroke='%236B6783' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 8px center;
        }
        .auth-nav-btn {
          font-family: var(--font-poppins), sans-serif;
          font-size: 13.5px;
          font-weight: 600;
          padding: 10px 18px;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.15s ease;
          border: none;
        }
        .auth-nav-btn.primary {
          background: linear-gradient(135deg, #7B6CF6, #6A5AF0);
          color: white;
          box-shadow: 0 4px 12px -4px rgba(106,90,240,0.6);
        }
        .auth-nav-btn.secondary {
          background: white;
          color: #1B1830;
          border: 1px solid #ECE9F6;
        }
        @media (max-width: 520px) {
          .auth-header {
            padding: 16px 18px;
          }
          .auth-card {
            padding: 22px 18px;
            border-radius: 20px;
          }
          .auth-h1 {
            font-size: 26px;
          }
        }
        .register-mode .auth-h1 {
          color: white;
        }
        .register-mode .auth-subtitle {
          color: #c4c0d8;
        }
        .register-mode .auth-eyebrow {
          background: rgba(255,255,255,0.08);
          color: #f0947e;
        }
        .register-mode .auth-lang-select {
          background: #1f1a38;
          border-color: #3a3555;
          color: #e4e2f0;
        }
      `}</style>

      <div className={`auth-page ${!isLogin ? "register-mode" : ""}`}>

        <header className="auth-header">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <select
              className="auth-lang-select"
              value={locale}
              onChange={(e) => setLocale(e.target.value as any)}
            >
              <option value="en">English</option>
              <option value="fr">Français</option>
            </select>
          </div>
        </header>

        <main className="auth-center">
          <div className="auth-card-wrap">
            <div className="auth-intro">
              <div className="auth-eyebrow">
                <span className="auth-eyebrow-dot" />
                {isLogin ? t("auth.welcomeBack") : t("auth.getStarted")}
              </div>
              <h1 className="auth-h1">
                {isLogin ? t("auth.signInToYour") : t("auth.createYour")}{" "}
                <span className="auth-h1-violet">
                  {isLogin ? t("auth.portalInPlace") : t("auth.accountInPlace")}
                </span>
              </h1>
              <p className="auth-subtitle">
                {isLogin ? t("auth.signInSubtitle") : t("auth.pickPortalSubtitle")}
              </p>
            </div>

            <div className="auth-card">
              <p className="auth-role-label">
                {isLogin ? t("auth.signInAsLabel") : t("auth.registerAsLabel")}
              </p>
              <div className="auth-role-grid">
                {(["student", "instructor"] as Role[]).map((r) => {
                  const selected = role === r;
                  return (
                    <div
                      key={r}
                      className={`auth-role-card ${selected ? "selected" : ""}`}
                      onClick={() => setRole(r)}
                      role="radio"
                      aria-checked={selected}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setRole(r);
                        }
                      }}
                    >
                      <div className="auth-role-card-row1">
                        <div
                          className={`auth-role-icon ${selected ? "selected" : "deselected"}`}
                        >
                          {r === "student" ? "S" : "I"}
                        </div>
                        <div className={`auth-role-dot ${selected ? "selected" : ""}`}>
                          {selected && (
                            <svg
                              width="10"
                              height="8"
                              viewBox="0 0 10 8"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1 4L3.5 6.5L9 1"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </div>
                      </div>
                      <p className="auth-role-name">
                        {r === "student"
                          ? t("auth.portalStudent")
                          : t("auth.portalInstructor")}
                      </p>
                      <p className="auth-role-desc">
                        {r === "student"
                          ? t("auth.portalStudentDesc")
                          : t("auth.portalInstructorDesc")}
                      </p>
                    </div>
                  );
                })}
              </div>

              <form className="auth-form" onSubmit={handleSubmit}>
                {!isLogin && (
                  <div>
                    <label
                      className="auth-field-label"
                      htmlFor="auth-name"
                    >
                      {t("auth.fullName")}
                    </label>
                    <div className="auth-input-wrap-inner">
                      <input
                        id="auth-name"
                        className="auth-input"
                        type="text"
                        placeholder="Ada Obi"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label
                    className="auth-field-label"
                    htmlFor="auth-email"
                  >
                    {t("auth.email")}
                  </label>
                  <div className="auth-input-wrap-inner">
                    <input
                      id="auth-email"
                      className="auth-input"
                      type="email"
                      placeholder="you@school.edu"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 6,
                    }}
                  >
                    <label
                      className="auth-field-label"
                      htmlFor="auth-password"
                      style={{ marginBottom: 0 }}
                    >
                      {t("auth.password")}
                    </label>
                    {isLogin && (
                      <Link
                        href="/forgot-password"
                        className="auth-forgot"
                      >
                        {t("auth.forgotPassword")}
                      </Link>
                    )}
                  </div>
                  <div className="auth-input-wrap-inner">
                    <input
                      id="auth-password"
                      className="auth-input"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="auth-toggle-pw"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword
                        ? t("auth.hidePassword")
                        : t("auth.showPassword")}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="auth-submit"
                  disabled={
                    !email ||
                    !password ||
                    (!isLogin && !name)
                  }
                >
                  {isLogin ? t("auth.signIn") : t("auth.createAccount")}
                </button>
              </form>

              <div className="auth-divider">
                <div className="auth-divider-line" />
                <span className="auth-divider-text">{t("auth.or")}</span>
                <div className="auth-divider-line" />
              </div>

              <button
                type="button"
                className="auth-google-btn"
                onClick={handleGoogle}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                {t("auth.continueGoogle")}
              </button>

              <p className="auth-footer">
                {isLogin ? t("auth.noAccount") : t("auth.hasAccount")}{" "}
                <button
                  type="button"
                  className="auth-ghost-btn"
                  onClick={toggleMode}
                >
                  {isLogin ? t("auth.newAccount") : t("auth.signIn")}
                </button>
              </p>

              <p className="auth-reassurance">
                {isLogin
                  ? t("auth.loginReassurance")
                  : t("auth.registerSubtitle")}
                {" "}
                <Link href="/terms">{t("footer.terms")}</Link>{" "}
                {isLogin ? "and" : "and"}{" "}
                <Link href="/privacy">{t("footer.privacy")}</Link>
                .
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
