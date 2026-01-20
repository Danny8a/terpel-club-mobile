# 📖 Guía de Ejemplos - Escribir Más Pruebas

Esta guía te muestra cómo crear más pruebas siguiendo los patrones ya establecidos.

## 🏗️ Estructura General de una Prueba

```typescript
describe('Feature Name', () => {
  it('should do something specific', () => {
    // Arrange - Preparar datos y mock
    const mockStore = createMockStore();
    
    // Act - Ejecutar la acción
    render(
      <Provider store={mockStore}>
        <Component />
      </Provider>
    );
    
    // Assert - Verificar el resultado
    expect(screen.getByText('Expected Text')).toBeTruthy();
  });
});
```

---

## 📝 Ejemplos Prácticos

### 1. Prueba de Redux Action

```typescript
import authReducer, {login} from '../../src/store/slices/authSlice';
import type {DocumentType} from '../../src/types/auth.types';

describe('Redux Action - Login', () => {
  it('should update auth state when login is dispatched', () => {
    const payload = {
      documentType: 'CC' as DocumentType,
      documentNumber: '1234567890',
    };

    const state = authReducer(undefined, login(payload));

    expect(state.isLoggedIn).toBe(true);
    expect(state.documentNumber).toBe('1234567890');
  });

  it('should not allow login with invalid document type', () => {
    // Este test verifica comportamiento de validación
    const payload = {
      documentType: 'XX' as any, // Type error intencional
      documentNumber: 'ABC',
    };

    // El reducer debe manejar esto gracefully
    expect(() => {
      authReducer(undefined, login(payload));
    }).not.toThrow();
  });
});
```

### 2. Prueba de Componente Screen

```typescript
import React from 'react';
import {render, screen, fireEvent} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import HomeScreen from '../../src/screens/Home/HomeScreen';
import authReducer from '../../src/store/slices/authSlice';

const createMockStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
  });
};

describe('HomeScreen', () => {
  it('should render welcome message to logged in user', () => {
    const mockStore = createMockStore();
    
    // Login primero
    mockStore.dispatch(login({
      documentType: 'CC',
      documentNumber: '1234567',
    }));

    render(
      <Provider store={mockStore}>
        <HomeScreen />
      </Provider>
    );

    expect(screen.getByText(/bienvenido/i)).toBeTruthy();
  });

  it('should display user document number', () => {
    const mockStore = createMockStore();
    const docNumber = '1234567890';

    mockStore.dispatch(login({
      documentType: 'CC',
      documentNumber: docNumber,
    }));

    render(
      <Provider store={mockStore}>
        <HomeScreen />
      </Provider>
    );

    expect(screen.getByText(docNumber)).toBeTruthy();
  });
});
```

### 3. Prueba de Interacción de Usuario

```typescript
describe('LoginScreen - User Interactions', () => {
  it('should update selected document type when user taps button', () => {
    const mockStore = createMockStore();
    const {getByText} = render(
      <Provider store={mockStore}>
        <LoginScreen />
      </Provider>
    );

    // Simular que el usuario toca el botón CE
    fireEvent.press(getByText('CE'));

    // Verificar que el estado cambió
    const state = mockStore.getState();
    expect(state.auth.documentType).toBe('CE');
  });

  it('should enable login button when document number is valid', async () => {
    const mockStore = createMockStore();
    const {getByPlaceholderText, getByText} = render(
      <Provider store={mockStore}>
        <LoginScreen />
      </Provider>
    );

    const input = getByPlaceholderText('Número de documento');
    fireEvent.changeText(input, '12345');

    // Buscar botón de login
    await waitFor(() => {
      const loginButton = getByText('Ingresar');
      expect(loginButton).toBeTruthy();
    });
  });
});
```

### 4. Prueba de Validación

```typescript
describe('Form Validation', () => {
  it('should not submit empty document number', () => {
    const mockStore = createMockStore();
    const mockDispatch = jest.fn();

    const {getByText} = render(
      <Provider store={mockStore}>
        <LoginScreen />
      </Provider>
    );

    const loginButton = getByText('Ingresar');
    fireEvent.press(loginButton);

    // El state no debe cambiar
    expect(mockStore.getState().auth.isLoggedIn).toBe(false);
  });

  it('should validate document number length', () => {
    const mockStore = createMockStore();
    const {getByPlaceholderText} = render(
      <Provider store={mockStore}>
        <LoginScreen />
      </Provider>
    );

    const input = getByPlaceholderText('Número de documento');
    
    // Probar valores demasiado cortos
    fireEvent.changeText(input, '123');
    expect(input.props.value).toBe('123');

    // Probar valor válido
    fireEvent.changeText(input, '12345');
    expect(input.props.value).toBe('12345');
  });
});
```

### 5. Prueba de Store Integration

```typescript
describe('Full User Flow', () => {
  it('should complete login flow correctly', () => {
    const store = configureStore({
      reducer: {
        auth: authReducer,
      },
    });

    // Step 1: Initial state
    expect(store.getState().auth.isLoggedIn).toBe(false);

    // Step 2: User logs in
    store.dispatch(login({
      documentType: 'CC',
      documentNumber: '1234567890',
    }));

    expect(store.getState().auth.isLoggedIn).toBe(true);

    // Step 3: Navigate to another screen (in real app)
    // ...

    // Step 4: User logs out
    store.dispatch(logout());

    expect(store.getState().auth.isLoggedIn).toBe(false);
    expect(store.getState().auth.documentNumber).toBe('');
  });
});
```

### 6. Prueba con Async/Await

```typescript
describe('Async Operations', () => {
  it('should handle async operations correctly', async () => {
    const mockStore = createMockStore();
    const {getByPlaceholderText, getByText} = render(
      <Provider store={mockStore}>
        <LoginScreen />
      </Provider>
    );

    const input = getByPlaceholderText('Número de documento');

    // Cambiar valor y esperar actualización
    fireEvent.changeText(input, '1234567');

    await waitFor(() => {
      expect(input.props.value).toBe('1234567');
    });

    // Presionar botón
    fireEvent.press(getByText('Ingresar'));

    // Esperar cambio de estado
    await waitFor(() => {
      expect(mockStore.getState().auth.isLoggedIn).toBe(true);
    });
  });
});
```

---

## 🎨 Patrones Comunes

### Pattern 1: Crear Mock Store Personalizado
```typescript
const createMockStoreWithAuth = (isLoggedIn: boolean) => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
    },
  });

  if (isLoggedIn) {
    store.dispatch(login({
      documentType: 'CC',
      documentNumber: '1234567',
    }));
  }

  return store;
};

// Uso
const store = createMockStoreWithAuth(true);
```

### Pattern 2: Test De Múltiples Escenarios
```typescript
describe.each([
  ['CC', '1234567890'],
  ['CE', '123456'],
  ['PA', 'AB123456'],
])('Login with document type %s', (docType, docNumber) => {
  it('should login successfully', () => {
    // Test para cada documento type
  });
});
```

### Pattern 3: Snapshots (cuando sea apropiado)
```typescript
it('should match snapshot', () => {
  const mockStore = createMockStore();
  const {container} = render(
    <Provider store={mockStore}>
      <LoginScreen />
    </Provider>
  );

  expect(container).toMatchSnapshot();
});
```

---

## ✅ Checklist para Nuevas Pruebas

- [ ] ¿Tienen nombre descriptivo? (`should...`)
- [ ] ¿Siguen patrón Arrange-Act-Assert?
- [ ] ¿Están agrupadas en `describe`?
- [ ] ¿Usan mocks adecuados?
- [ ] ¿Verifican un solo comportamiento?
- [ ] ¿Son independientes entre sí?
- [ ] ¿Usan helpers de testHelpers.ts?
- [ ] ¿Incluyen casos edge?

---

## 🚨 Errores Comunes

### ❌ Mal: Dos assertions diferentes
```typescript
it('should do two things', () => {
  // NO HAGAS ESTO
  const state = authReducer(...);
  expect(state.isLoggedIn).toBe(true);
  expect(state.documentType).toBe('CC'); // Segunda cosa
});
```

### ✅ Bien: Una thing per test
```typescript
it('should set isLoggedIn to true', () => {
  const state = authReducer(...);
  expect(state.isLoggedIn).toBe(true);
});

it('should set documentType correctly', () => {
  const state = authReducer(...);
  expect(state.documentType).toBe('CC');
});
```

---

## 📚 Recursos Adicionales

- [Testing Library Best Practices](https://testing-library.com/docs/queries/about)
- [Jest API Reference](https://jestjs.io/docs/api)
- [Redux Testing Patterns](https://redux.js.org/usage/writing-tests)
- [React Native Testing Guide](https://reactnative.dev/docs/testing-overview)

---

**¡Ahora estás listo para escribir más pruebas! 🚀**
