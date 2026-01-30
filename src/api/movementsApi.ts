import {http, toApiError} from './http';
import {TERPEL} from './config';
import {getAccessToken} from './tokenStore';
import {store} from '../store/store';

import type {Movement, TransaccionesResponse, ApiError} from '../types/domain';

function formatDateISOToCO(iso?: string) {
  if (!iso) return '';
  const [y, m, d] = iso.split('-');
  if (!y || !m || !d) return iso;
  return `${d}/${m}/${y}`;
}

function formatHour(h?: string) {
  if (!h) return undefined;
  const hhmm = h.slice(0, 5);
  return hhmm.includes(':') ? hhmm : undefined;
}

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

export async function fetchMovements(): Promise<Movement[]> {
  const token = await getAccessToken();
  const url = `${TERPEL.baseUrl}${TERPEL.appPath}/cliente/transaccionesSF`;

  try {
    const {tip, doc} = getCustomerHeaders();

    const res = await http.get<TransaccionesResponse>(url, {
      headers: {
        tip,
        doc,
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });

    const list = res.data.transactions ?? [];

    return list
      .filter(t => !!t?.id)
      .map(t => {
        const nombre = t.nombre?.trim() || 'Movimiento';
        const pdv = t.pdv?.trim();
        const tipo = t.tipoTransaccion?.trim();
        const descripcion = pdv ? `${nombre} • ${pdv}` : nombre;

        return {
          id: String(t.id),
          fecha: formatDateISOToCO(t.fecha),
          hora: formatHour(t.hora),
          descripcion,
          puntos: Number(t.puntos || 0),
          tipo,
          pdv,
          total: typeof t.total === 'number' ? t.total : Number(t.total || 0),
        };
      });
  } catch (err) {
    throw toApiError(err);
  }
}

export type {Movement};
