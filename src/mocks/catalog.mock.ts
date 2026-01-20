export type CatalogProduct = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
};

export const CATALOG_PRODUCTS: CatalogProduct[] = [
  {
    id: 1,
    name: 'Gasolina Corriente',
    description: 'Combustible de alta calidad para tu vehículo',
    price: 12000,
    image: 'https://via.placeholder.com/300x200/D32F2F/FFFFFF?text=Gasolina',
  },
  {
    id: 2,
    name: 'Gasolina Extra',
    description: 'Mayor octanaje para mejor rendimiento',
    price: 14000,
    image: 'https://via.placeholder.com/300x200/B71C1C/FFFFFF?text=Extra',
  },
  {
    id: 3,
    name: 'ACPM',
    description: 'Combustible diésel de excelente calidad',
    price: 11000,
    image: 'https://via.placeholder.com/300x200/C62828/FFFFFF?text=ACPM',
  },
  {
    id: 4,
    name: 'Lubricante',
    description: 'Aceite de motor sintético premium',
    price: 45000,
    image: 'https://via.placeholder.com/300x200/E53935/FFFFFF?text=Aceite',
  },
  {
    id: 5,
    name: 'Lavado Premium',
    description: 'Lavado completo con encerado',
    price: 35000,
    image: 'https://via.placeholder.com/300x200/EF5350/FFFFFF?text=Lavado',
  },
  {
    id: 6,
    name: 'Cambio de Aceite',
    description: 'Servicio rápido con lubricante recomendado',
    price: 65000,
    image: 'https://via.placeholder.com/300x200/FF7043/FFFFFF?text=Servicio',
  },
];
