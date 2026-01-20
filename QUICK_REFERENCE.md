# ⚡ Referencia Rápida - Pruebas

## 🚀 Comandos Rápidos

```bash
# Ejecutar todas las pruebas
npm test

# Watch mode - re-ejecuta al guardar
npm test -- --watch

# Mostrar cobertura
npm test -- --coverage

# Prueba específica
npm test -- --testNamePattern="login"

# Archivo específico
npm test authSlice.test

# Verbose output
npm test -- --verbose

# Detener después del primer error
npm test -- --bail

# Solo pruebas fallidas
npm test -- --onlyChanged

# Modo debug
node --inspect-brk node_modules/.bin/jest --runInBand
```

---

## 📊 Estado de las Pruebas

| Suite | Pruebas | Estado |
|-------|---------|--------|
| authSlice.test.ts | 10 | ✅ PASS |
| store.integration.test.ts | 4 | ✅ PASS |
| LoginScreen.test.tsx | 8 | ✅ PASS |
| auth.types.test.ts | 3 | ✅ PASS |
| App.test.tsx | 1 | ✅ PASS |
| **TOTAL** | **27** | **✅ 100%** |

---

## 🔍 Búsqueda Rápida de Tests

```bash
# Pruebas que contienen "login"
npm test -- --testNamePattern="login"

# Pruebas del archivo authSlice
npm test -- authSlice.test

# Pruebas del store
npm test -- store

# Pruebas de componentes
npm test -- screens
```

---

## 📁 Archivos Importantes

```
__tests__/
├── App.test.tsx                    # Prueba App (1)
├── screens/LoginScreen.test.tsx    # Pruebas UI (8)
├── store/
│   ├── authSlice.test.ts           # Pruebas reducers (10)
│   └── store.integration.test.ts   # Integración (4)
├── types/auth.types.test.ts        # Pruebas tipos (3)
├── helpers/testHelpers.ts          # Utilidades
└── mocks/mockStore.ts              # Factory
```

---

## 🛠️ Imports Comunes

```typescript
// Testing Library
import {render, screen, fireEvent, waitFor} from '@testing-library/react-native';

// Redux
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';

// App imports
import authReducer, {login, logout} from '../../src/store/slices/authSlice';
import LoginScreen from '../../src/screens/Login/LoginScreen';

// Types
import type {DocumentType} from '../../src/types/auth.types';
```

---

## 🎯 Queries Comunes

```typescript
// Por texto
screen.getByText('Terpel Club')
screen.queryByText(/bienvenido/i)
screen.getAllByText('Login')

// Por placeholder
screen.getByPlaceholderText('Email')

// Por testID
screen.getByTestId('login-button')

// Por display value
screen.getByDisplayValue('')

// Query sin lanzar error
screen.queryByText('Text') // null si no existe
```

---

## 🎬 Acciones Comunes

```typescript
// Press button
fireEvent.press(button)

// Change text input
fireEvent.changeText(input, 'new value')

// Scroll
fireEvent.scroll(scrollView, {y: 100})

// Focus
fireEvent.focus(input)

// Blur
fireEvent.blur(input)
```

---

## ⏱️ Async Patterns

```typescript
// Esperar cambio
await waitFor(() => {
  expect(element).toBeTruthy();
});

// Timeout personalizado
await waitFor(
  () => expect(element).toBeTruthy(),
  {timeout: 2000}
);

// Multiple checks
await waitFor(() => {
  expect(screen.getByText('Ready')).toBeTruthy();
  expect(state.isLoaded).toBe(true);
});
```

---

## 📋 Assertions Comunes

```typescript
// Existence
expect(element).toBeTruthy()
expect(element).toBeDefined()
expect(element).not.toBeNull()

// Value checks
expect(value).toBe('expected')
expect(value).toEqual({...})
expect(value).toMatch(/pattern/)
expect(array).toContain(item)

// Array/Object
expect(array).toHaveLength(3)
expect(object).toHaveProperty('key')
expect(object).toHaveProperty('key', 'value')

// Exceptions
expect(() => fn()).toThrow()
expect(() => fn()).toThrow(Error)

// Mock calls
expect(mock).toHaveBeenCalled()
expect(mock).toHaveBeenCalledWith(arg)
expect(mock).toHaveBeenCalledTimes(2)
```

---

## 🏗️ Setup Store

```typescript
const createMockStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
  });
};

// Con usuario loggeado
const store = createMockStore();
store.dispatch(login({
  documentType: 'CC',
  documentNumber: '1234567',
}));

// Obtener estado
const state = store.getState();
console.log(state.auth.isLoggedIn); // true
```

---

## 🐛 Debug

```typescript
// Imprimir estructura renderizada
screen.debug()

// Imprimir elemento específico
screen.debug(element)

// Logging
console.log(store.getState())

// Breakpoint en Jest
debugger; // y ejecutar con --inspect-brk

// Ver qué está disponible
screen.logTestingPlaygroundURL()
```

---

## ⚙️ Configuración

```js
// jest.config.js
module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testPathIgnorePatterns: ['/node_modules/', '/helpers/', '/mocks/'],
  testMatch: ['**/__tests__/**/*.test.{ts,tsx}'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|react-redux|@reduxjs)/)',
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: 50,
    },
  },
};
```

---

## 📞 Necesitas Ayuda?

1. Lee [TESTING.md](TESTING.md) - Guía completa
2. Mira [TESTING_EXAMPLES.md](TESTING_EXAMPLES.md) - Ejemplos
3. Revisa tests existentes en `__tests__/`
4. Consulta [Testing Library Docs](https://testing-library.com/)

---

**¡Ahora estás listo para escribir y ejecutar pruebas! 🎉**
