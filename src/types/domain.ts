export type ClientInfo = {
  nombreCompleto: string;
  puntosDisponibles: number;
};

export type Top10Response = {
  ResponseMessage?: any;
  nombre?: string;
  balance?: number;
};

export type CatalogProduct = {
  id: string;
  nombre: string;
  descripcion: string;
  puntos: number;
  imagen?: string | null;
  cantidadDisponible: number | null;
  disponible: boolean;
  lineaDeNegocio?: string | null;
  categoria?: string | null;
  tipoProducto?: string | null;
};

export type TransaccionesResponse = {
  transactions?: Array<Record<string, any>>;
};

export type Movement = {
  id: string;
  fecha: string;
  hora?: string | undefined;
  descripcion: string;
  puntos: number;
  tipo?: string | undefined;
  pdv?: string | undefined;
  total: number;
};
