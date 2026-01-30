import {http, toApiError} from './http';
import {TERPEL} from './config';
import {Base64} from 'js-base64';

import type {CatalogProduct, CatalogResponse} from '../types/domain';

function basicAuthHeader(user: string, pass: string) {
  const raw = `${user.trim()}:${pass.trim()}`;
  return `Basic ${Base64.encode(raw)}`;
}

export async function fetchCatalog(): Promise<CatalogProduct[]> {
  const url = `${TERPEL.baseUrl}${TERPEL.appPath}${TERPEL.catalog.path}`;

  try {
    const res = await http.get<CatalogResponse>(url, {
      headers: {
        Authorization: basicAuthHeader(
          TERPEL.catalog.username,
          TERPEL.catalog.password,
        ),
        Accept: 'application/json',
      },
    });

    const items = res.data.catalogo ?? [];

    return items.map(p => {
      const qty =
        p.cantidadDisponible === undefined ? null : Number(p.cantidadDisponible);

      return {
        id: String(p.identificador),
        nombre: p.nombre ?? 'Producto',
        descripcion: p.descripcion ?? '',
        puntos: Number(p.puntos ?? 0),
        imagen: p.urlExterna,
        cantidadDisponible: qty,
        disponible: qty === null || qty === -1 || qty > 0,
        lineaDeNegocio: p.lineaDeNegocio,
        categoria: p.categoria,
        tipoProducto: p.tipoProducto,
      };
    });
  } catch (err) {
    throw toApiError(err);
  }
}

export type {CatalogProduct};
