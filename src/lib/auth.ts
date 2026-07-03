import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_development';

export interface JWTPayload {
  userId: string;
  role: 'admin' | 'student' | 'educator';
  name: string;
}

/**
 * Decodes and verifies the auth_token cookie from the incoming request.
 * Returns the decoded payload or null if invalid/missing.
 */
export function getAuthPayload(req: Request): JWTPayload | null {
  try {
    const cookieHeader = req.headers.get('cookie') || '';
    const match = cookieHeader.match(/auth_token=([^;]+)/);
    if (!match) return null;
    const token = match[1];
    const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload;
    return decoded;
  } catch {
    return null;
  }
}

export function signToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}
