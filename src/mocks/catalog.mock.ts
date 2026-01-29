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
  {
    id: 7,
    name: 'Filtro de Aire',
    description: 'Filtro original de alta durabilidad',
    price: 28000,
    image: 'https://via.placeholder.com/300x200/F4511E/FFFFFF?text=Filtro',
  },
  {
    id: 8,
    name: 'Gasolina Súper',
    description: 'Máximo rendimiento y economía',
    price: 16000,
    image: 'https://via.placeholder.com/300x200/E64A19/FFFFFF?text=Super',
  },
  {
    id: 9,
    name: 'Aditivo Premium',
    description: 'Limpia inyectores y mejora combustión',
    price: 22000,
    image: 'https://via.placeholder.com/300x200/D84315/FFFFFF?text=Aditivo',
  },
  {
    id: 10,
    name: 'Cambio de Batería',
    description: 'Batería original con garantía',
    price: 120000,
    image: 'https://via.placeholder.com/300x200/BF360C/FFFFFF?text=Bateria',
  },
  {
    id: 11,
    name: 'Limpieza de Inyectores',
    description: 'Servicio profesional de limpieza',
    price: 55000,
    image: 'https://via.placeholder.com/300x200/D32F2F/FFFFFF?text=Limpieza',
  },
  {
    id: 12,
    name: 'Recarga de Aire',
    description: 'Sistema de aire acondicionado',
    price: 85000,
    image: 'https://via.placeholder.com/300x200/C62828/FFFFFF?text=Aire',
  },
  {
    id: 13,
    name: 'Inspección Técnica',
    description: 'Revisión completa del vehículo',
    price: 45000,
    image: 'https://via.placeholder.com/300x200/B71C1C/FFFFFF?text=Inspeccion',
  },
  {
    id: 14,
    name: 'Guardapolvo',
    description: 'Protección para tu vehículo',
    price: 32000,
    image: 'https://via.placeholder.com/300x200/AD1457/FFFFFF?text=Guardapolvo',
  },
  {
    id: 15,
    name: 'Kit Mantenimiento',
    description: 'Paquete completo de servicios',
    price: 150000,
    image: 'https://via.placeholder.com/300x200/880E4F/FFFFFF?text=Kit',
  },
];
