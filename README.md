# 📱 Terpel Club App – Prueba Técnica Frontend

Aplicación móvil desarrollada como parte de la **prueba técnica Frontend** para el proceso de **Desarrollador Especializado – Terpel**.

La app simula funcionalidades del programa **Terpel Club**, incluyendo autenticación, consulta de puntos, catálogo, movimientos y pagos, utilizando **React Native** y datos **mock**.

---

## 🧱 Stack tecnológico

- **React Native** 0.76 with TypeScript 5.0.4
- **Redux Toolkit** - Estado global (autenticación)
- **React Navigation** - Stack + Bottom Tabs
- **Axios** - HTTP client con interceptores
- **React Native Vector Icons** - Iconografía profesional
- **Jest** - Testing (27 tests passing)
- **StyleSheet** - Estilos nativa
- **API Integration** - OAuth 2.0 + Basic Auth

---

## 🚀 Instalación y ejecución

### Requisitos
- Node.js ≥ 18
- Android Studio (emulador configurado)
- JDK configurado correctamente

### Pasos

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales API (opcional para desarrollo local)

# 3. Ejecutar en Android
npx react-native run-android

# 4. En otra terminal: iniciar Metro bundler
npm start
```

### Variables de Entorno (Opcional)

Si necesitas conectar con un servidor real, crea un archivo `.env.local`:

```env
TERPEL_API_BASE_URL=https://tu-api-url.com
TERPEL_CLIENT_ID=your_client_id
TERPEL_CLIENT_SECRET=your_client_secret
```

Ver `.env.example` para referencia completa.

---

## 📂 Estructura del proyecto

```
src/
├── api/
│   ├── config.ts           # Configuración API Terpel (credenciales)
│   ├── http.ts             # Instancia Axios con interceptores
│   ├── tokenStore.ts       # Caché de OAuth tokens
│   ├── terpelApi.ts        # Servicios públicos (fetchClientInfo, fetchMovements, fetchCatalog)
│   └── types/
│       ├── index.ts        # Exports centralizados
│       ├── catalog.ts      # Tipos: CatalogProduct, CatalogResponse
│       ├── client.ts       # Tipos: ClientInfo, Top10Response
│       ├── errors.ts       # Tipo: ApiError
│       └── movements.ts    # Tipos: Movement, TransaccionesResponse
├── components/             # Componentes reutilizables
├── config/
│   └── colors.ts           # Paleta de colores
├── hooks/
│   └── useApiCall.ts       # Hook reutilizable para API calls
├── mocks/
│   ├── catalog.mock.ts
│   └── movements.mock.ts
├── navigation/
│   ├── AppTabs.tsx         # Navegación con tab bar
│   ├── AuthStack.tsx       # Stack de autenticación
│   └── RootNavigator.tsx   # Coordinador de navegación
├── screens/
│   ├── Catalog/
│   │   ├── CatalogScreen.tsx
│   │   └── CatalogScreen.styles.ts
│   ├── Home/
│   │   ├── HomeScreen.tsx       # Header mejorado con documento legible
│   │   └── HomeScreen.styles.ts
│   ├── Login/
│   │   ├── LoginScreen.tsx
│   │   └── LoginScreen.styles.ts
│   ├── Movements/
│   │   ├── MovementsScreen.tsx
│   │   └── MovementsScreen.styles.ts
│   └── Payments/
│       ├── PaymentsScreen.tsx
│       └── PaymentsScreen.styles.ts
├── store/
│   ├── store.ts            # Redux store
│   └── slices/
│       └── authSlice.ts    # Auth slice + documentEncoded
├── types/
│   └── auth.types.ts       # Tipos de autenticación
└── utils/
```

**Puntos clave:**
- ✅ Tipos separados en `src/api/types/` (catalog, client, movements, errors)
- ✅ API centralizador en `src/api/` con servicios e interceptores
- ✅ Redux para estado global de autenticación
- ✅ Hook `useApiCall` para manejo de API calls reutilizable
- ✅ Estilos separados de componentes (`*.styles.ts`)
- ✅ Navegación centralizada

---

## 🧭 Flujo de la aplicación

1. Login
   - Selección de tipo de documento
   - Ingreso de número de documento
   - Validación básica
2. Home
   - Información del usuario
   - Puntos disponibles
   - Acceso al historial de movimientos
3. Catálogo
   - Lista de productos y servicios
   - Buscador local en tiempo real
4. Movimientos
   - Historial de movimientos del usuario
   - Paginación de 4 registros por página
5. Pagos
   - Selección de método de pago (Tarjeta / PSE)
   - Validaciones de monto y referencia
   - Confirmación de pago simulada
6. Salir
   - Cierre de sesión
   - Retorno al Login

---

## 🧪 Tests

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar en watch mode
npm test -- --watch

# Ver cobertura
npm test -- --coverage
```

**Estado:** ✅ 27 tests pasando

---

## 🔌 Integración API

### Autenticación OAuth 2.0
```typescript
// 1. Se obtiene token OAuth con client_credentials
POST /oauth/accesstoken?grant-type=client_credentials
Authorization: Basic <clientId>:<clientSecret>

// 2. Se guarda en tokenStore para reutilización
// 3. Se usa en llamadas posteriores: Authorization: Bearer <token>
```

### Endpoints Integrados
- **Top 10 Points**: `GET /appterpel-pruebatecnica-temp/info/cliente/top10` (Bearer)
- **Movements**: `GET /appterpel-pruebatecnica-temp/movimientos/movimento/v1.0/movimientos` (Bearer)
- **Catalog**: `GET /appterpel-pruebatecnica-temp/catalogo/catalogoDatalake/v1.0/catalogoproductos` (Basic Auth)

### Credenciales de Desarrollo
Las credenciales están en `src/api/config.ts`. Para cambiarlas:

```typescript
// src/api/config.ts
export const TERPEL = {
  token: {
    clientId: 'YOUR_CLIENT_ID',
    clientSecret: 'YOUR_CLIENT_SECRET',
  },
  catalog: {
    username: 'YOUR_USERNAME',
    password: 'YOUR_PASSWORD',
  }
};
```

⚠️ **Nota**: Para ambiente de producción, usar variables de entorno con `react-native-config`.

---

## ✅ Arquitectura y Patrones

### API Services Pattern
```typescript
// Servicios centralizados con tipos específicos
export async function fetchClientInfo(docEncoded: string): Promise<Top10Response>
export async function fetchMovements(docEncoded: string): Promise<TransaccionesResponse>
export async function fetchCatalog(): Promise<CatalogResponse>
```

### Redux State Management
```typescript
// authSlice contiene:
- isAuthenticated: boolean
- user: { documentType, documentNumber, documentEncoded }
- loading: boolean
- error: string | null
```

### Reusable Hooks
```typescript
// Hook useApiCall para manejo de API calls
const { data, loading, error } = useApiCall(
  () => fetchCatalog(),
  [dependencies]
);
```

### Type Safety
- Tipos separados por dominio (catalog, client, movements, errors)
- Respuestas API tipadas completamente
- Error handling con ApiError type
- TypeScript strict mode

---

## 🎨 Mejoras UI/UX

- ✅ **HomeScreen Header**: Documento número ahora en línea separada (legible)
- ✅ **Icons Profesionales**: Reemplazados emojis con MaterialCommunityIcons
- ✅ **Tipografía Clara**: Jerarquía visual mejorada
- ✅ **Estados de Carga**: Loading states consistentes en todas las pantallas

---

## 📚 Documentación Adicional

- [SECRETS_GUIDE.md](./SECRETS_GUIDE.md) - Manejo de credenciales y variables de entorno
- [TESTING.md](./TESTING.md) - Guía de testing
- [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) - Referencia rápida del código
- [IMPROVEMENTS_SUMMARY.md](./IMPROVEMENTS_SUMMARY.md) - Cambios realizados

---

## 📌 Consideraciones finales

La aplicación fue desarrollada priorizando:
- ✅ Claridad del flujo de autenticación y datos
- ✅ Experiencia de usuario profesional
- ✅ Facilidad de mantenimiento y testing
- ✅ Seguridad (credenciales en config.ts)
- ✅ Type safety con TypeScript strict
- ✅ Reutilización de código con hooks y servicios

Todos los 27 tests pasan exitosamente. La app está lista para desarrollo y mejoras futuras.
