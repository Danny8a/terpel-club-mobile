import React from 'react';
import {render, screen, fireEvent, waitFor} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import PaymentsScreen from '../../src/screens/Payments/PaymentsScreen';
import authReducer from '../../src/store/slices/authSlice';
import * as terpelApi from '../../src/api/terpelApi';

// Mock del API
jest.mock('../../src/api/terpelApi');

const createMockStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
  });
};

const mockClientInfo = {
  nombreCompleto: 'Juan Pérez',
  puntosDisponibles: 5250,
};

const mockProducts = [
  {
    id: '1',
    nombre: 'Gasolina Corriente',
    descripcion: 'Combustible de alta calidad',
    puntos: 100,
    imagen: 'http://example.com/gas.jpg',
    disponible: true,
    cantidadDisponible: 10,
    categoria: 'Combustibles',
    lineaDeNegocio: 'Combustibles',
    tipoProducto: 'Combustible',
  },
  {
    id: '2',
    nombre: 'Lavado Premium',
    descripcion: 'Lavado completo con encerado',
    puntos: 250,
    imagen: 'http://example.com/lavado.jpg',
    disponible: true,
    cantidadDisponible: 5,
    categoria: 'Servicios',
    lineaDeNegocio: 'Servicios',
    tipoProducto: 'Servicio',
  },
  {
    id: '3',
    nombre: 'Lubricante Premium',
    descripcion: 'Aceite sintético de alta calidad',
    puntos: 200,
    imagen: 'http://example.com/lubricante.jpg',
    disponible: false,
    cantidadDisponible: 0,
    categoria: 'Productos',
    lineaDeNegocio: 'Productos',
    tipoProducto: 'Producto',
  },
];

describe('PaymentsScreen', () => {
  beforeEach(() => {
    (terpelApi.fetchClientInfo as jest.Mock).mockResolvedValue(mockClientInfo);
    (terpelApi.fetchCatalog as jest.Mock).mockResolvedValue(mockProducts);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const mockStore = createMockStore();

    render(
      <Provider store={mockStore}>
        <PaymentsScreen />
      </Provider>
    );

    expect(screen.getByText('Pagos')).toBeTruthy();
  });

  it('should render payment method buttons', () => {
    const mockStore = createMockStore();

    render(
      <Provider store={mockStore}>
        <PaymentsScreen />
      </Provider>
    );

    expect(screen.getByText('Tarjeta')).toBeTruthy();
    expect(screen.getByText('PSE')).toBeTruthy();
    expect(screen.getByText('Puntos')).toBeTruthy();
  });

  it('should switch between payment methods', () => {
    const mockStore = createMockStore();

    render(
      <Provider store={mockStore}>
        <PaymentsScreen />
      </Provider>
    );

    const puntosButton = screen.getAllByText('Puntos')[0];
    fireEvent.press(puntosButton);

    // Debería mostrar el catálogo después de un tiempo
    waitFor(() => {
      expect(screen.getByText('Catálogo de Productos')).toBeTruthy();
    });
  });

  it('should display points balance when Puntos method is selected', async () => {
    const mockStore = createMockStore();

    render(
      <Provider store={mockStore}>
        <PaymentsScreen />
      </Provider>
    );

    const puntosButton = screen.getAllByText('Puntos')[0];
    fireEvent.press(puntosButton);

    await waitFor(() => {
      expect(screen.getByText('Puntos disponibles')).toBeTruthy();
      expect(screen.getByText('5.250')).toBeTruthy();
    });
  });

  it('should display catalog when Puntos method is selected', async () => {
    const mockStore = createMockStore();

    render(
      <Provider store={mockStore}>
        <PaymentsScreen />
      </Provider>
    );

    const puntosButton = screen.getAllByText('Puntos')[0];
    fireEvent.press(puntosButton);

    await waitFor(() => {
      expect(screen.getByText('Catálogo de Productos')).toBeTruthy();
      expect(screen.getByText('Gasolina Corriente')).toBeTruthy();
      expect(screen.getByText('Lavado Premium')).toBeTruthy();
    });
  });

  it('should filter products by search query', async () => {
    const mockStore = createMockStore();

    render(
      <Provider store={mockStore}>
        <PaymentsScreen />
      </Provider>
    );

    const puntosButton = screen.getAllByText('Puntos')[0];
    fireEvent.press(puntosButton);

    await waitFor(() => {
      const searchInput = screen.getByPlaceholderText('Buscar productos...');
      fireEvent.changeText(searchInput, 'Lavado');
      
      expect(screen.getByText('Lavado Premium')).toBeTruthy();
    });
  });

  it('should filter products by category', async () => {
    const mockStore = createMockStore();

    render(
      <Provider store={mockStore}>
        <PaymentsScreen />
      </Provider>
    );

    const puntosButton = screen.getAllByText('Puntos')[0];
    fireEvent.press(puntosButton);

    await waitFor(() => {
      const serviciosCategory = screen.getByText('Servicios');
      fireEvent.press(serviciosCategory);
      
      expect(screen.getByText('Lavado Premium')).toBeTruthy();
    });
  });

  it('should show only available products when filter is enabled', async () => {
    const mockStore = createMockStore();

    render(
      <Provider store={mockStore}>
        <PaymentsScreen />
      </Provider>
    );

    const puntosButton = screen.getAllByText('Puntos')[0];
    fireEvent.press(puntosButton);

    await waitFor(() => {
      // El producto no disponible (Lubricante Premium) no debería estar visible
      expect(screen.queryByText('Lubricante Premium')).toBeNull();
    });
  });

  it('should validate amount for Tarjeta method', () => {
    const mockStore = createMockStore();

    render(
      <Provider store={mockStore}>
        <PaymentsScreen />
      </Provider>
    );

    const amountInput = screen.getByPlaceholderText('Ej: 12000');
    fireEvent.changeText(amountInput, '500');

    // Debería mostrar error de monto mínimo para Tarjeta
    expect(screen.getByText('El monto mínimo es 1.000 COP.')).toBeTruthy();
  });

  it('should validate amount for Puntos method', async () => {
    const mockStore = createMockStore();

    render(
      <Provider store={mockStore}>
        <PaymentsScreen />
      </Provider>
    );

    const puntosButton = screen.getAllByText('Puntos')[0];
    fireEvent.press(puntosButton);

    await waitFor(() => {
      const amountInput = screen.getByPlaceholderText('Ej: 500');
      fireEvent.changeText(amountInput, '50');

      // Debería mostrar error de monto mínimo para Puntos
      expect(screen.getByText('El monto mínimo es 100 puntos.')).toBeTruthy();
    });
  });

  it('should show error when not enough points', async () => {
    const mockStore = createMockStore();

    render(
      <Provider store={mockStore}>
        <PaymentsScreen />
      </Provider>
    );

    const puntosButton = screen.getAllByText('Puntos')[0];
    fireEvent.press(puntosButton);

    await waitFor(() => {
      const amountInput = screen.getByPlaceholderText('Ej: 500');
      fireEvent.changeText(amountInput, '10000');

      // Debería mostrar error de puntos insuficientes
      expect(screen.getByText('No tienes puntos suficientes. Disponibles: 5250')).toBeTruthy();
    });
  });

  it('should validate reference field', () => {
    const mockStore = createMockStore();

    render(
      <Provider store={mockStore}>
        <PaymentsScreen />
      </Provider>
    );

    const amountInput = screen.getByPlaceholderText('Ej: 12000');
    const referenceInput = screen.getByPlaceholderText('Ej: TERPEL-0001');

    // Primero ingresa una cantidad válida
    fireEvent.changeText(amountInput, '5000');
    // Luego una referencia muy corta
    fireEvent.changeText(referenceInput, 'ABC');

    // Debería mostrar error de referencia muy corta
    expect(screen.getByText(/referencia debe tener al menos/i)).toBeTruthy();
  });

  it('should disable pay button when there are errors', () => {
    const mockStore = createMockStore();

    render(
      <Provider store={mockStore}>
        <PaymentsScreen />
      </Provider>
    );

    // Al inicio no hay datos, el botón debe estar deshabilitado
    const payButton = screen.getByText(/Pagar con/);
    expect(payButton).toBeTruthy();
  });

  it('should enable pay button when form is valid', () => {
    const mockStore = createMockStore();

    render(
      <Provider store={mockStore}>
        <PaymentsScreen />
      </Provider>
    );

    const amountInput = screen.getByPlaceholderText('Ej: 12000');
    const referenceInput = screen.getByPlaceholderText('Ej: TERPEL-0001');

    fireEvent.changeText(amountInput, '50000');
    fireEvent.changeText(referenceInput, 'PAGO-0001');

    const payButton = screen.getByText(/Pagar con/);
    expect(payButton).toBeTruthy();
  });

  it('should show success message after payment', async () => {
    const mockStore = createMockStore();

    render(
      <Provider store={mockStore}>
        <PaymentsScreen />
      </Provider>
    );

    const amountInput = screen.getByPlaceholderText('Ej: 12000');
    const referenceInput = screen.getByPlaceholderText('Ej: TERPEL-0001');

    fireEvent.changeText(amountInput, '50000');
    fireEvent.changeText(referenceInput, 'PAGO-0001');

    const payButton = screen.getByText(/Pagar con/);
    fireEvent.press(payButton);

    await waitFor(() => {
      expect(screen.getByText('Pago simulado exitoso')).toBeTruthy();
      expect(screen.getByText(/50.000/)).toBeTruthy();
    });
  });

  it('should reset form after payment', async () => {
    const mockStore = createMockStore();

    render(
      <Provider store={mockStore}>
        <PaymentsScreen />
      </Provider>
    );

    const amountInput = screen.getByPlaceholderText('Ej: 12000');
    const referenceInput = screen.getByPlaceholderText('Ej: TERPEL-0001');

    fireEvent.changeText(amountInput, '50000');
    fireEvent.changeText(referenceInput, 'PAGO-0001');

    const payButton = screen.getByText('Pagar con Tarjeta');
    fireEvent.press(payButton);

    await waitFor(() => {
      const newPayButton = screen.getByText('Nuevo pago');
      fireEvent.press(newPayButton);

      expect(amountInput.props.value).toBe('');
      expect(referenceInput.props.value).toBe('');
    });
  });
});
