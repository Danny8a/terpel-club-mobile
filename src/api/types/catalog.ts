export type CatalogProduct = {
  id: string;
  nombre: string;
  descripcion: string;
  puntos: number;
  imagen?: string;
  disponible: boolean;
  cantidadDisponible: number | null;
  lineaDeNegocio?: string;
  categoria?: string;
  tipoProducto?: string;
};

export type CatalogItem = {
  identificador?: string;
  nombre?: string;
  descripcion?: string;
  puntos?: string;
  urlExterna?: string;
  cantidadDisponible?: string;
  lineaDeNegocio?: string;
  categoria?: string;
  tipoProducto?: string;
};

export type CatalogResponse = {
  ResponseMessage?: any;
  catalogo?: CatalogItem[];
};
