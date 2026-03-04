/**
 * Shared types for API request/response shapes.
 */

export interface LoginResponse {
  success: boolean;
  error?: string;
  user?: {
    id: number;
    email: string;
    fullname: string;
  };
  /** When present (e.g. when host is IP), client should redirect here to set cookie via GET */
  redirectUrl?: string;
}

export interface SessionResponse {
  authenticated: boolean;
  user?: {
    id: number;
    email: string;
    fullname: string;
  };
}

export interface ProfileData {
  fullname: string;
  email: string;
  phone?: string;
  address?: string;
  photo?: string | null;
}

export interface ProfileUpdateResponse {
  success: boolean;
  message?: string;
  photo?: string | null;
  error?: string;
}

export interface AboutSaveResponse {
  success: boolean;
  updated?: boolean;
  inserted?: boolean;
  id?: number;
  error?: string;
}

export interface ApiError {
  success?: false;
  error: string;
}
