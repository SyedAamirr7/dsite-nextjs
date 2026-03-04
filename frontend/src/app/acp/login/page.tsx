'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { login as authLogin } from '@/services/authService';

/* Outline eye (visible password) – thin stroke, light gray */
function EyeIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

/* Outline eye with diagonal slash (hidden password) – thin stroke, light gray */
function EyeSlashIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

export default function LoginPage() {
  const [view, setView] = useState<'login' | 'reset'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const clearError = () => setError(null);

  // Reset state on mount to ensure clean state on hard reload vs navigation
  useEffect(() => {
    setView('login');
    setEmail('');
    setPassword('');
    setResetEmail('');
    setShowPassword(false);
    setError(null);
    setIsLoading(false);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      // Send current origin so backend can set cookie for the right host (localhost vs ngrok/tunnel).
      const cookieOrigin = typeof window !== 'undefined' ? window.location.origin : undefined;
      const data = await authLogin(email, password, { cookieOrigin });
      if (data.success) {
        if (data.redirectUrl) {
          window.location.replace(data.redirectUrl);
        } else {
          const origin = typeof window !== 'undefined' ? window.location.origin : '';
          // Short delay so cookie from login response is committed before navigating to home
          setTimeout(() => {
            window.location.replace(origin ? `${origin}/` : '/');
          }, 300);
        }
        return;
      }
      setError(data.error ?? 'Login failed');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Reset password', { email: resetEmail });
    setView('login');
  };

  return (
    <>
      <div id="login" dir="ltr">
        <div className="hero-section">
          <div className={`login-form bg-white${view === 'reset' ? ' login-form-reset' : ''}`}>
            <div className="logo text-center mb-4">
              <Image
                src="/assets/acp/img/logo.svg"
                alt="dsite"
                width={200}
                height={54}
                priority
              />
            </div>

            {view === 'login' ? (
              <div key="login" className="login-form-slide-in">
              <form onSubmit={handleSubmit} className="needs-validation" noValidate data-login="form">
                <div className="text-header text-center mb-4">
                  <h1 className="title mb-0 fw-bold">dsite login</h1>
                </div>

                {error && (
                  <div className="alert alert-danger mb-4" role="alert">
                    {error}
                  </div>
                )}
                <div className="form-group row mb-4" data-login="email-field">
                  <div className="col-lg-12 input-with-icon">
                    <div className="icon">
                      <img src="/assets/acp/img/mail.svg" alt="" />
                    </div>
                    <label htmlFor="login-email" className="sr-only">Email</label>
                    <input
                      id="login-email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      data-login="email"
                      placeholder="example@domain.com"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); clearError(); }}
                      className="form-control"
                      required
                    />
                  </div>
                </div>

                <div className="form-group row mb-4 form-group-password" data-login="password-field">
                  <div className="col-lg-12 input-with-icon">
                    <div className="icon">
                      <img src="/assets/acp/img/lock.svg" alt="" />
                    </div>
                    <label htmlFor="login-password" className="sr-only">Password</label>
                    <input
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      data-login="password"
                      autoComplete="current-password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => { setPassword(e.target.value); clearError(); }}
                      className="form-control password_input"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="eye_password"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      data-login="toggle-password"
                    >
                      {showPassword ? <EyeSlashIcon /> : <EyeIcon />}
                    </button>
                  </div>
                </div>

                <div className="form-group row justify-content-center mt-5">
                  <div className="col-lg-9">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block text-capitalize"
                      data-login="submit"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
                          Logging in...
                        </>
                      ) : (
                        'Login'
                      )}
                    </button>
                  </div>
                </div>

                <div className="mt-4 text-center fw-bold forget-line">
                  <span className="text-secondary">Forget your account? </span>
                  <button
                    type="button"
                    className="btn-login go-to-reset"
                    onClick={() => { setView('reset'); clearError(); }}
                    data-login="reset-password"
                  >
                    Reset Password
                  </button>
                </div>
              </form>
              </div>
            ) : (
              <div key="reset" className="reset-form-slide-in">
                <form onSubmit={handleResetSubmit} className="needs-validation" noValidate data-login="reset-form">
                  <div className="text-header text-center mb-4">
                    <h1 className="title mb-0 fw-bold">Reset website</h1>
                  </div>

                  <div className="form-group row mb-4" data-login="reset-email-field">
                    <div className="col-lg-12 input-with-icon">
                      <div className="icon">
                        <img src="/assets/acp/img/mail.svg" alt="" />
                      </div>
                      <label htmlFor="reset-email" className="sr-only">Email</label>
                      <input
                        id="reset-email"
                        type="email"
                        name="re-email"
                        autoComplete="email"
                        data-login="reset-email"
                        placeholder="example@domain.com"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group row justify-content-center mt-4">
                    <div className="col-lg-9">
                      <button type="submit" className="btn btn-primary btn-block" data-login="reset-submit">
                        Reset Password
                      </button>
                    </div>
                  </div>
                </form>

                <div className="mt-4 text-center fw-bold forget-line">
                  <span className="text-secondary">Go </span>
                  <button type="button" className="btn-login back-to-login" onClick={() => { setView('login'); clearError(); }}>
                    Back
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
