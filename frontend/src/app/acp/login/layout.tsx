import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login - Control Dashboard',
  description: 'Sign in to the Control Dashboard',
};

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link rel="stylesheet" href="/assets/acp/css/login_style.css" />
      <link rel="stylesheet" href="/assets/acp/css/acp-login-page.css" />
      {children}
    </>
  );
}
