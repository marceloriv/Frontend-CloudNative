// Login de residentes con Google vía AWS Cognito Hosted UI (OAuth 2.0
// Authorization Code + PKCE). El backend (Cognito User Pool + Google IdP)
// está modelado en terraform/cognito.tf pero aún no desplegado — las env
// vars VITE_COGNITO_* son placeholders hasta que exista un `terraform apply`
// real (ver .env.example).

const PKCE_VERIFIER_KEY = "convivo.pkce_verifier";

function base64UrlEncodeBytes(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export function generateCodeVerifier(): string {
  return base64UrlEncodeBytes(crypto.getRandomValues(new Uint8Array(32)));
}

export async function generateCodeChallenge(verifier: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier));
  return base64UrlEncodeBytes(new Uint8Array(digest));
}

export async function buildGoogleAuthorizeUrl(): Promise<string> {
  const verifier = generateCodeVerifier();
  sessionStorage.setItem(PKCE_VERIFIER_KEY, verifier);
  const challenge = await generateCodeChallenge(verifier);

  const params = new URLSearchParams({
    client_id: import.meta.env.VITE_COGNITO_CLIENT_ID,
    response_type: "code",
    scope: "openid email profile",
    redirect_uri: import.meta.env.VITE_COGNITO_REDIRECT_URI,
    identity_provider: "Google", // salta el selector propio de Cognito, va directo a Google
    code_challenge: challenge,
    code_challenge_method: "S256",
  });

  return `https://${import.meta.env.VITE_COGNITO_DOMAIN}/oauth2/authorize?${params.toString()}`;
}

export interface CognitoTokens {
  id_token: string;
  access_token: string;
  refresh_token?: string;
  expires_in: number;
  token_type: string;
}

export async function exchangeCodeForTokens(code: string): Promise<CognitoTokens> {
  const verifier = sessionStorage.getItem(PKCE_VERIFIER_KEY);
  if (!verifier) {
    throw new Error(
      "No hay code_verifier guardado — el flujo de login expiró o se abrió en otra pestaña.",
    );
  }

  const response = await fetch(`https://${import.meta.env.VITE_COGNITO_DOMAIN}/oauth2/token`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      client_id: import.meta.env.VITE_COGNITO_CLIENT_ID,
      code,
      redirect_uri: import.meta.env.VITE_COGNITO_REDIRECT_URI,
      code_verifier: verifier,
    }),
  });

  if (!response.ok) {
    throw new Error(`Cognito rechazó el intercambio de code por tokens (HTTP ${response.status}).`);
  }

  sessionStorage.removeItem(PKCE_VERIFIER_KEY);
  return response.json();
}
/* TODO: configurar el teme del Roles dentro del cognitio para el tema de Autenticacion con Google  */
export interface CognitoIdTokenClaims {
  sub: string;
  email?: string;
  name?: string;
  given_name?: string;
  picture?: string;
  "custom:unidad"?: string;
  "custom:torre"?: string;
  "custom:piso"?: string;
  [key: string]: unknown;
}

// No verifica firma — la verificación real (RS256 contra el JWKS de Cognito)
// vive en el bff (mvp.md RF-T.4). Acá solo se leen claims para poblar el
// estado de demo del frontend.
export function decodeIdToken(idToken: string): CognitoIdTokenClaims {
  const [, payload] = idToken.split(".");
  const padded = payload.padEnd(payload.length + ((4 - (payload.length % 4)) % 4), "=");
  const binary = atob(padded.replace(/-/g, "+").replace(/_/g, "/"));
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return JSON.parse(new TextDecoder().decode(bytes));
}
