# Uso de Inteligencia Artificial en la Prueba Técnica

## Objetivo del uso de IA

El uso de Inteligencia Artificial fue un requisito obligatorio dentro de la prueba técnica.  
La IA se utilizó como un agente de apoyo y validación técnica, con el objetivo de reforzar la calidad de la arquitectura y del código.

El propósito principal fue:
- Validar la arquitectura propuesta.
- Reforzar buenas prácticas de diseño y organización del código.
- Identificar oportunidades de mejora en mantenibilidad, desacoplamiento y claridad.

---

## Herramientas de IA utilizadas

Durante el desarrollo de la prueba se utilizaron las siguientes herramientas de Inteligencia Artificial:

- **GitHub Copilot**: utilizado como asistente de revisión de código y apoyo en buenas prácticas.
- **Agente de IA conversacional**: utilizado para validación de arquitectura, revisión de flujos y análisis de diseño.

---

## Alcance del uso de IA

La Inteligencia Artificial se utilizó de forma puntual y controlada, específicamente en las siguientes etapas:

### 1. Validación de la arquitectura
- Revisión del enfoque de **Clean Architecture**.
- Validación de la separación de responsabilidades entre capas (Presentación, Dominio y Datos).
- Evaluación del uso de un **Backend for Frontend (BFF)** como punto de orquestación.
- Identificación de posibles acoplamientos innecesarios entre la UI y la lógica de negocio.

### 2. Revisión de código (GitHub Copilot)
- Apoyo en la revisión de la estructura general del proyecto.
- Detección de posibles duplicaciones de lógica.
- Sugerencias para mejorar legibilidad y consistencia del código.
- Refuerzo de buenas prácticas como:
  - Separación de responsabilidades.
  - Evitar código repetido.
  - Manejo claro de estados y errores.
- Validación de patrones comunes en React Native y consumo de APIs.

> GitHub Copilot fue utilizado como asistente de revisión y apoyo.

### 3. Apoyo en buenas prácticas
- Sugerencias para mejorar la organización de carpetas y módulos.
- Validación del manejo de errores de forma centralizada.
- Revisión de patrones de consumo de servicios y manejo de estados.
- Refuerzo de principios como *Single Responsibility* y *Dependency Inversion*.

---

## Recomendaciones entregadas por el agente de IA

Entre las principales recomendaciones realizadas por los agentes de IA se encuentran:

- Incorporar una capa intermedia (ViewModels o hooks) entre la UI y los casos de uso.
- Reforzar el aislamiento del dominio frente a frameworks y librerías externas.
- Separar explícitamente DTOs de transporte y entidades de dominio.
- Centralizar el manejo de errores y configuración en componentes compartidos.
- Mantener contratos claros entre capas para facilitar testabilidad y evolución.

---

## Aplicación de las recomendaciones

Las recomendaciones entregadas por la IA fueron evaluadas de forma crítica y aplicadas únicamente cuando aportaban valor real a la solución.

En particular:
- Se fortaleció la separación entre UI y dominio.
- Se reforzó el uso de casos de uso como punto único de acceso a la lógica de negocio.
- Se mejoró la claridad del flujo de datos y manejo de errores.
- Se mantuvo el control total sobre las decisiones técnicas y de diseño.

---

## Conclusión

La Inteligencia Artificial fue utilizada como una **herramienta de validación, revisión y acompañamiento técnico**, no como un sustituto del conocimiento ni del criterio profesional.

Su uso permitió:
- Reforzar la calidad de la arquitectura.
- Mejorar la legibilidad y mantenibilidad del código.
- Confirmar que la solución propuesta está alineada con buenas prácticas y preparada para evolución productiva.
