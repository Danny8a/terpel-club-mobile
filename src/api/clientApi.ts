import {http, toApiError} from './http';
import {TERPEL} from './config';
import {getAccessToken} from './tokenStore';
import {store} from '../store/store';

import type {ApiError} from '../types/api';
import type {ClientInfo, Top10Response} from '../types/domain';

function ensureString(v: any) {
  return typeof v === 'string' ? v.trim() : '';
}

function getCustomerHeaders(): {tip: string; doc: string} {
  const auth = store.getState().auth;

  const tip = ensureString(auth?.documentType);

  const doc = ensureString(auth?.documentEncoded);

  if (!tip || !doc) {
    const err: ApiError = {
      message: 'Falta tipo o documento (encoded). Inicia sesión nuevamente.',
      status: 400,
      url: 'local-validation:getCustomerHeaders',
    };
    throw err;
  }

  return {tip, doc};
}

export async function fetchClientInfo(): Promise<ClientInfo> {
  const token = await getAccessToken();
  const url = `${TERPEL.baseUrl}${TERPEL.appPath}/cliente/top10`;

  try {
    const {tip, doc} = getCustomerHeaders();

    const res = await http.get<Top10Response>(url, {
      headers: {
        tip,
        doc,
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });

    return {
      nombreCompleto: res.data.nombre ?? 'Sin nombre',
      puntosDisponibles: Number(res.data.balance ?? 0),
    };
  } catch (err) {
    throw toApiError(err);
  }
}

export type {ClientInfo};
