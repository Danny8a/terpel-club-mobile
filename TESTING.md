# Pruebas Unitarias - TerpelClub

Documentación de la suite de pruebas unitarias para la aplicación TerpelClub.

## 📋 Descripción General

El proyecto tiene una suite completa de pruebas unitarias usando Jest y React Native Testing Library. Las pruebas cubren:

- **Redux State Management** (authSlice)
- **Componentes de Pantalla** (LoginScreen)
- **Tipos y Tipos** (Auth Types)
- **Integración del Store**

## 🚀 Ejecutar las Pruebas

### Ejecutar todas las pruebas
```bash
npm test
```

### Ejecutar pruebas en modo watch
```bash
npm test -- --watch
```

### Ejecutar pruebas de un archivo específico
```bash
npm test -- --testPathPattern="authSlice.test"
npm test -- --testPathPattern="LoginScreen.test"
```

### Ver cobertura de código
```bash
npm test -- --coverage
```

### Ejecutar pruebas en modo verbose
```bash
npm test -- --verbose
```

## 📁 Estructura de Pruebas

```
__tests__/
├── App.test.tsx                      # Pruebas del componente principal
├── screens/
│   └── LoginScreen.test.tsx          # Pruebas de pantalla de login (8 tests)
├── store/
│   ├── authSlice.test.ts             # Pruebas del reducer auth (10 tests)
│   └── store.integration.test.ts     # Pruebas de integración del store (4 tests)
├── types/
│   └── auth.types.test.ts            # Pruebas de tipos (3 tests)
├── helpers/
│   └── testHelpers.ts                # Funciones auxiliares para pruebas
└── mocks/
    └── mockStore.ts                  # Factory para crear stores de prueba
```

## ✅ Cobertura de Pruebas

### authSlice.test.ts (10 pruebas)
- ✅ Estado inicial correcto
- ✅ Login con credenciales válidas
- ✅ Actualización de tipo de documento
- ✅ Manejo de todos los tipos de documento (CC, CE, PA)
- ✅ Preservación de propiedades del estado en login
- ✅ Logout correctamente
- ✅ Reset de datos en logout
- ✅ Logout en estado ya cerrado
- ✅ Login seguido de logout
- ✅ Logins consecutivos con diferentes documentos

### store.integration.test.ts (4 pruebas)
- ✅ Creación del store con estado inicial
- ✅ Dispatch de acción login
- ✅ Dispatch de acción logout
- ✅ Persistencia del estado y reset en logout

### LoginScreen.test.tsx (8 pruebas)
- ✅ Renderizado correcto
- ✅ Renderizado del subtítulo
- ✅ Renderizado del label de tipo de documento
- ✅ Renderizado de todas las opciones de documento
- ✅ Selección de diferentes tipos de documento
- ✅ Renderizado del botón de login
- ✅ Estructura de pantalla correcta
- ✅ Renderizado de texto de crédito demo

### auth.types.test.ts (3 pruebas)
- ✅ Validación de tipos de documento válidos
- ✅ Cantidad correcta de tipos
- ✅ Significados de tipos de documento

## 🔧 Configuración de Jest

El archivo `jest.config.js` contiene la configuración:

- **Preset**: react-native
- **Setup**: jest.setup.js
- **Transform Ignore Patterns**: Incluye react-redux, @reduxjs/toolkit e immer
- **Coverage Thresholds**: 50% en líneas, funciones, branches y statements
- **Exclusiones**: android/, ios/, node_modules/, helpers/, mocks/

### jest.setup.js
- Configura testing-library/jest-native
- Mockea React Navigation
- Suprime advertencias de consola irrelevantes

## 📊 Métricas de Prueba

- **Test Suites**: 5 passed, 5 total
- **Tests**: 27 passed, 27 total
- **Snapshots**: 0 total
- **Tiempo de ejecución**: ~2 segundos

## 🛠️ Utilidades de Prueba

### testHelpers.ts
Funciones auxiliares para crear datos de prueba:
- `createMockAuthState()` - Crea estado mock con sobrescrituras
- `createMockStore()` - Crea un store mock para pruebas
- `validDocumentNumbers` - Conjunto de números válidos
- `invalidDocumentNumbers` - Conjunto de números inválidos

### mockStore.ts
Factory para crear stores de prueba con configuración correcta:
- `createTestStore()` - Crea un store completo para pruebas

## 🎯 Mejores Prácticas

### Estructura de pruebas
```typescript
describe('Feature', () => {
  it('should do something specific', () => {
    // Arrange - Preparar datos
    const mockStore = createMockStore();
    
    // Act - Ejecutar acción
    render(<Component store={mockStore} />);
    
    // Assert - Verificar resultado
    expect(screen.getByText('Text')).toBeTruthy();
  });
});
```

### Mockear Redux
```typescript
const createMockStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
  });
};
```

### Pruebas de componentes con Provider
```typescript
<Provider store={mockStore}>
  <LoginScreen />
</Provider>
```

## 🐛 Solución de Problemas

### Error: "Cannot find module"
Asegúrate de que `transformIgnorePatterns` en `jest.config.js` incluye las librerías necesarias.

### Error: "No reducer provided for key"
Verifica que estés usando `authReducer` (el export por defecto) en lugar de `authSlice`.

### Test timeout
Si las pruebas se agoten, aumenta el timeout:
```typescript
jest.setTimeout(10000);
```

## 📈 Próximas Mejoras

- [ ] Agregar pruebas para pantallas adicionales (HomeScreen, CatalogScreen, etc.)
- [ ] Crear pruebas de servicios y API calls
- [ ] Agregar pruebas de navegación
- [ ] Aumentar cobertura de código a 80%+
- [ ] Agregar pruebas de integración E2E con Detox
- [ ] Pruebas de validación de formularios

## 📚 Referencias

- [Jest Documentation](https://jestjs.io/)
- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)
- [Redux Testing](https://redux.js.org/usage/writing-tests)
- [Redux Toolkit Testing](https://redux-toolkit.js.org/usage/usage-guide#testing)

## 👨‍💻 Autor

Generado automáticamente por el sistema de pruebas de TerpelClub.
Fecha: 2026-01-19
