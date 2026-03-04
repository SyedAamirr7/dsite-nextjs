import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Faster dev: Turbopack is default in Next 16 (remove --webpack from dev script).
  // Do NOT rewrite /api/acp/* to backend here. Our route handler (app/api/acp/[...path]/route.ts)
  // proxies requests and adds ngrok-skip-browser-warning so the backend returns JSON, not HTML.
};

export default nextConfig;
