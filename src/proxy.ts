import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_development';

interface JWTPayload {
  userId: string;
  role: 'admin' | 'student' | 'educator';
  name: string;
  exp?: number;
}

// Decode base64url to text
function base64UrlDecode(str: string): string {
  let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
  while (base64.length % 4) {
    base64 += '=';
  }
  return atob(base64);
}

function decodeBase64UrlToText(str: string): string {
  const binary = base64UrlDecode(str);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new TextDecoder().decode(bytes);
}

// Cryptographically verify HS256 JWT signature using Web Crypto API
async function verifyJWT(token: string, secretStr: string): Promise<JWTPayload | null> {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const [headerB64, payloadB64, signatureB64] = parts;

    // Decode and parse payload
    const payloadStr = decodeBase64UrlToText(payloadB64);
    const payload = JSON.parse(payloadStr) as JWTPayload;

    // Check expiration
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return null;
    }

    // Verify HS256 signature
    const encoder = new TextEncoder();
    const data = encoder.encode(`${headerB64}.${payloadB64}`);
    const keyData = encoder.encode(secretStr);
    
    const cryptoKey = await crypto.subtle.importKey(
      'raw',
      keyData,
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    );

    // Decode signature
    const signatureStr = base64UrlDecode(signatureB64);
    const signatureBin = new Uint8Array(signatureStr.length);
    for (let i = 0; i < signatureStr.length; i++) {
      signatureBin[i] = signatureStr.charCodeAt(i);
    }

    const isValid = await crypto.subtle.verify(
      'HMAC',
      cryptoKey,
      signatureBin,
      data
    );

    return isValid ? payload : null;
  } catch (err) {
    console.error("JWT verification failed in proxy:", err);
    return null;
  }
}

export async function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';

  // Extract the subdomain if it exists
  const currentHost =
    process.env.NODE_ENV === 'production' && process.env.VERCEL === '1'
      ? hostname.replace(`.edumiracle.in`, '')
      : hostname.split('.')[0]; // simple way to grab subdomain 'admin' from admin.localhost:3001

  const isAdminSubdomain = currentHost === 'admin';

  const token = request.cookies.get('auth_token')?.value;
  const isAuthRoute = url.pathname.startsWith('/login');

  // Verify the JWT token
  let payload: JWTPayload | null = null;
  if (token) {
    payload = await verifyJWT(token, JWT_SECRET);
  }

  // 1. Admin Subdomain Rewriting and Protection
  if (isAdminSubdomain) {
    // If not logged in as admin under admin subdomain
    if (!payload || payload.role !== 'admin') {
      if (!isAuthRoute) {
        url.pathname = '/login';
        return NextResponse.redirect(url);
      }
    } else {
      // Logged in as admin, trying to access /login under admin subdomain
      if (isAuthRoute) {
        url.pathname = '/';
        return NextResponse.redirect(url);
      }
    }
    
    // Rewrite all admin subdomain traffic to the /admin app directory
    if (!url.pathname.startsWith('/admin') && !isAuthRoute) {
        url.pathname = `/admin${url.pathname === '/' ? '' : url.pathname}`;
        return NextResponse.rewrite(url);
    }
  }

  // 2. Direct route protection (for non-subdomain requests or rewritten/direct paths)
  const pathname = url.pathname;
  const isAdminRoute = pathname.startsWith('/admin');
  const isDashboardRoute = pathname.startsWith('/dashboard');
  const isLoginRoute = pathname === '/login';

  const isAdminApi = pathname.startsWith('/api/admin');
  const isStudentApi = pathname.startsWith('/api/student');
  const isAiApi = pathname.startsWith('/api/ai');

  // Protect Admin API Routes
  if (isAdminApi) {
    if (!payload) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    if (payload.role !== 'admin') {
      return new NextResponse(JSON.stringify({ error: 'Forbidden' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  // Protect Student & AI API Routes
  if (isStudentApi || isAiApi) {
    if (!payload) {
      return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }

  // Protect Admin Page Routes
  if (isAdminRoute) {
    if (!payload) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = '/login';
      return NextResponse.redirect(redirectUrl);
    }
    if (payload.role !== 'admin') {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = '/dashboard';
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Protect Dashboard Page Routes
  if (isDashboardRoute) {
    if (!payload) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = '/login';
      return NextResponse.redirect(redirectUrl);
    }
    if (payload.role === 'admin') {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = '/admin';
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Redirect Logged-in Users Away from Login page (Main Domain)
  if (isLoginRoute && payload) {
    const redirectUrl = request.nextUrl.clone();
    if (payload.role === 'admin') {
      redirectUrl.pathname = '/admin';
    } else {
      redirectUrl.pathname = '/dashboard';
    }
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public assets (like images, SVGs, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
