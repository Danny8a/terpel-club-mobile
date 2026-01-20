# 📱 Terpel Club App – Prueba Técnica Frontend

Aplicación móvil desarrollada como parte de la **prueba técnica Frontend** para el proceso de **Desarrollador Especializado – Terpel**.

La app simula funcionalidades del programa **Terpel Club**, incluyendo autenticación, consulta de puntos, catálogo, movimientos y pagos, utilizando **React Native** y datos **mock**.

---

## 🧱 Stack tecnológico

- React Native 0.76
- TypeScript
- React Navigation (Stack + Bottom Tabs)
- Hooks (useState, useEffect, useMemo)
- StyleSheet
- Datos mock en memoria

---

## 🚀 Instalación y ejecución

### Requisitos
- Node.js ≥ 18
- Android Studio (emulador configurado)
- JDK configurado correctamente

### Pasos

```bash
npm install
npx react-native run-android
```

> Nota: durante el desarrollo se presentaron inconsistencias temporales con los servicios QA, por lo que la app funciona completamente con **datos mock**.

---

## 📂 Estructura del proyecto

```
src/
├── assets/
├── config/
│   └── colors.ts
├── mocks/
│   ├── catalog.mock.ts
│   └── movements.mock.ts
├── navigation/
│   ├── AppTabs.tsx
│   └── RootNavigator.tsx
├── screens/
│   ├── LoginScreen.tsx
│   ├── HomeScreen.tsx
│   ├── CatalogScreen.tsx
│   ├── MovementsScreen.tsx
│   ├── PaymentsScreen.tsx
│   └── *.styles.ts
└── types/
```

- Separación de lógica y estilos
- Mocks desacoplados de las pantallas
- Navegación centralizada

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

## 🧪 Datos mock y servicios

Debido a la indisponibilidad temporal de los servicios durante el desarrollo, se implementaron **datos mock locales** que simulan:

- Catálogo de productos
- Movimientos del usuario
- Flujo de pagos

La arquitectura permite reemplazar fácilmente los mocks por servicios reales.

---

## ✅ Buenas prácticas aplicadas

- Componentes funcionales
- Separación de responsabilidades
- Manejo de estados UI (empty, error, success)
- Código legible y mantenible
- Diseño sobrio alineado a una app corporativa

---

## 📌 Consideraciones finales

La aplicación fue desarrollada priorizando claridad del flujo, experiencia de usuario y facilidad de mantenimiento, cumpliendo con los requerimientos funcionales de la prueba técnica.

Quedo atento a cualquier ajuste o ampliación que se requiera.
