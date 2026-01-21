export type Movement = {
  id: string;
  fecha: string;
  hora?: string;
  descripcion: string;
  puntos: number;
  tipo?: string;
  pdv?: string;
  total?: number;
};

export type TransaccionItem = {
  fecha?: string;
  hora?: string;
  total?: number;
  pdv?: string;
  lineaNegocio?: string;
  tipoTransaccion?: string;
  id?: string;
  puntos?: number;
  nombre?: string;
  nombreProducto?: string;
  cantidadProducto?: number;
  observacion?: string;
};

export type TransaccionesResponse = {
  id?: string;
  nombre?: string;
  transactions?: TransaccionItem[];
  ResponseMessage?: any;
};
