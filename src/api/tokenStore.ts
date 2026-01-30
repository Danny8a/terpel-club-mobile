import {http, toApiError} from './http';
import {TERPEL} from './config';
import { Base64 } from 'js-base64';
import type {TokenResponse} from '../types/api';

let cached: {token: string; expiresAt: number} | null = null;

function basicAuthHeader(user: string, pass: string) {
  const raw = `${user.trim()}:${pass.trim()}`;
  return `Basic ${Base64.encode(raw)}`;
}

export async function getAccessToken(): Promise<string> {
  const now = Date.now();

  if (cached && now < cached.expiresAt - 10_000) {
    return cached.token;
  }

const url = `${TERPEL.baseUrl}${TERPEL.token.path}?grant-type=${TERPEL.token.grantType}`;


  try {
    const res = await http.post<TokenResponse>(
      url,
      null,
      {
        headers: {
          Authorization: basicAuthHeader(
            TERPEL.token.clientId,
            TERPEL.token.clientSecret,
          ),
          Accept: 'application/json',
        },
      },
    );

    const token = (res.data as any).accessToken;
    const expiresIn = Number((res.data as any).expiresIn || 0);

    cached = {
      token,
      expiresAt: Date.now() + expiresIn * 1000,
    };

    return token;
  } catch (err) {
    throw toApiError(err);
  }
}
