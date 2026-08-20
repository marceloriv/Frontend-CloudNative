# Convivo — AGENTS.md

Guía de referencia para agentes de código que trabajen en este repositorio.
Describe el estado **real y actual** del código. Las secciones marcadas **PENDIENTE** reflejan deuda documentada, no funcionalidad implementada.

---

## 1. Jerarquía de reglas

1. **Seguridad y corrección** — nunca introducir XSS, injection, race conditions, o lógica de autenticación rota. Un bug de seguridad cancela cualquier otra prioridad.
2. **Convenciones del proyecto** — respetar la estructura de carpetas, el sistema de diseño (tokens, fuentes), la API de react-router v8, y los patrones de roles/guards ya establecidos.
3. **Minimalismo (Ponytail)** — no agregar abstracciones, dependencias, ni carpetas que el código no necesite hoy. Tres líneas similares son preferibles a una abstracción prematura.

Secciones no aplicables a este proyecto: N/A (todas son relevantes).

---

## 2. Resumen del proyecto

**Convivo** es una plataforma web de gestión para condominios residenciales en Chile. Permite a residentes, conserjes y administradores gestionar reservas de espacios, gastos comunes, visitas, incidentes y comunicación interna.

### Pantallas implementadas

| Ruta | Componente | Roles con acceso |
|---|---|---|
| `/` | `Home` | público |
| `/login` | `Login` | público |
| `/crear-cuenta` | `RegistroCuenta` | público |
| `/precios` | `Precios` | público |
| `/tablon` | `Tablon` | todos |
| `/canales` | `Canales` | todos |
| `/visitas` | `Visitas` | todos (vista adapta por rol) |
| `/incidentes` | `Incidentes` | todos (acciones adaptan por rol) |
| `/mi-dashboard` | `ResidenteDashboard` | residente |
| `/espacios` | `EspaciosComunes` | residente |
| `/reservas` | `Reservas` | residente |
| `/gastos` | `Gastos` | residente |
| `/registro` | `Registro` | conserje, admin |
| `/dashboard` | `Dashboard` | admin |

---

## 3. Stack técnico

### Entorno

- **Node** 24 (Active LTS; fijado en `.github/workflows/deploy.yml`)
- **npm** (`"type": "module"`)
- **TypeScript** ^5.9.3 (devDep). El export de Figma Make traía 7.0.2, pero `typescript-eslint` todavía no lo soporta como peer dependency — se bajó a la última 5.x estable. Revisar si se puede volver a subir cuando `typescript-eslint` agregue soporte para TS7.

### Dependencias de runtime

| Paquete | Versión | Uso |
|---|---|---|
| `react` | ^19.0.0 | UI |
| `react-dom` | ^19.0.0 | Renderer |
| `react-router` | ^8.3.0 | Routing (Data Mode) |
| `recharts` | ^3.10.1 | Gráficos (BarChart en Dashboard, AreaChart sparklines en ResidenteDashboard) |
| `cuelume` | ^0.2.2 | Feedback sonoro en botones clave |

### Dependencias de desarrollo

| Paquete | Uso |
|---|---|
| `vite` | Bundler / dev server |
| `@vitejs/plugin-react` | Fast Refresh + JSX |
| `tailwindcss` + `@tailwindcss/vite` | CSS utility framework (sin PostCSS) |
| `oxfmt` | Formatter (sustituye Prettier) |
| `eslint` + `typescript-eslint` + `eslint-plugin-react-hooks` + `eslint-plugin-react-refresh` | Lint |
| `@types/react`, `@types/react-dom`, `@types/node` | Tipos TS |

### Lo que deliberadamente NO hay

- Sin librería de animación — CSS keyframes puro en `src/index.css`
- Sin librería de íconos — SVG inline a mano en `src/components/icons/Icons.tsx`
- Sin librería de formularios — `useState` + validación propia por componente
- Sin generador de QR externo — SVG algorítmico implementado en `src/pages/Visitas.tsx`
- Sin `tailwind.config.js` ni `postcss.config.js` — Tailwind v4 se configura enteramente vía `@theme inline` en `src/index.css`
- Sin React Router `BrowserRouter`/`Routes` — se usa exclusivamente la API Data Mode

---

## 4. Estructura de carpetas

```
/
├── src/
│   ├── App.tsx                    # thin: AuthProvider + RouterProvider
│   ├── main.tsx                   # entrypoint: bind() de cuelume + ReactDOM.createRoot
│   ├── index.css                  # Tailwind import + @theme inline tokens + keyframes CSS
│   ├── vite-env.d.ts
│   │
│   ├── pages/                     # un archivo por ruta
│   │   ├── Home.tsx
│   │   ├── Login.tsx
│   │   ├── RegistroCuenta.tsx
│   │   ├── ResidenteDashboard.tsx
│   │   ├── EspaciosComunes.tsx
│   │   ├── Reservas.tsx
│   │   ├── Gastos.tsx
│   │   ├── Visitas.tsx
│   │   ├── Incidentes.tsx
│   │   ├── Tablon.tsx
│   │   ├── Canales.tsx
│   │   ├── Registro.tsx
│   │   ├── Dashboard.tsx
│   │   └── Precios.tsx
│   │
│   ├── components/                # componentes reutilizables entre pantallas
│   │   ├── Layout.tsx             # shell con nav, ribbon, footer, FloatingSidebar
│   │   ├── FlipCard.tsx           # tarjeta con animación flip CSS
│   │   └── icons/
│   │       └── Icons.tsx          # todos los SVG exportados como IconXxx
│   │
│   ├── routes/                    # definición de rutas y guards
│   │   ├── router.tsx             # createBrowserRouter con guards por rol
│   │   └── ProtectedRoute.tsx     # componente guard: valida rol o redirige
│   │
│   ├── hooks/
│   │   ├── useAuth.ts              # AuthContext, USERS, hook useAuth() — sin JSX
│   │   └── AuthProvider.tsx        # solo el componente AuthProvider (separado para no romper fast refresh)
│   │
│   ├── types/
│   │   └── index.ts               # Role, User (tipos compartidos)
│   │
│   └── lib/
│       └── data.ts                # datos estáticos compartidos (gastos, avisos, channels, registroFotos)
│
├── index.html
├── vite.config.ts
├── tsconfig.json
├── package.json
├── CHANGELOG.md                   # Keep a Changelog — se actualiza en cada PR a main (ver §10)
└── .github/workflows/
    ├── deploy.yml                  # protegido, ver §11
    ├── react-doctor.yml            # protegido, ver §11
    └── ci-develop.yml              # lint + typecheck + build en push/PR a develop
```

---

## 5. Estilo de código

### TypeScript

- Componentes funcionales con tipado explícito. Props siempre via `interface`, nunca `type` inline en el parámetro ni `PropTypes`.
- Un componente de export default por archivo. Sub-componentes de apoyo se definen en el mismo archivo si solo los usa esa página.
- Sin `any`. Sin `as unknown as X` a menos que sea inevitable y comentado.
- JSX en archivos `.tsx`. Hooks sin JSX en `.ts` (excepción: `useAuth.tsx` usa JSX para el Provider).

### Sistema de diseño

Fuentes cargadas vía Google Fonts CSS2 `@import` al tope de `src/index.css`:

| Token CSS | Familia | Uso |
|---|---|---|
| `--font-display` | Gloock (serif) | Headings, display |
| `--font-body` | Inter (sans) | Cuerpo, UI, labels |

Clases Tailwind: `font-display` y `font-body` (mapeadas desde los tokens vía `@theme inline`).

Paleta de colores (tokens en `@theme inline`, usar **clases Tailwind** — nunca hex sueltos en JSX):

| Token | Valor | Clase Tailwind | Uso |
|---|---|---|---|
| `--color-primary` | `#0D9488` | `text-primary`, `bg-primary` | Acción principal, énfasis |
| `--color-accent` | `#005047` | `text-accent`, `bg-accent` | Hover sobre primary, acento oscuro |
| `--color-text` | `#00201B` | `text-text` | Texto base |
| `--color-muted` | `#64748B` | `text-muted` | Labels, metadata |
| `--color-border` | `#E2E8F0` | `border-border` | Bordes de cards y separadores |
| `--color-surface` | `#FFFFFF` | `bg-surface` | Fondo de cards |
| `--color-alert-red` | `#E11D48` | `text-alert-red`, `bg-alert-red` | Error, peligro |
| `--color-alert-yellow` | `#EAB308` | `bg-alert-yellow` | Advertencia — siempre con `text-text`, **nunca `text-white`** |

> **Regla de contraste para advertencias:** los badges amarillos (`bg-alert-yellow`) deben usar `text-text` (#00201B). El texto blanco sobre amarillo falla WCAG AA.

### Animaciones CSS

Definidas en `src/index.css` con `@keyframes`. Clases utilitarias: `.cv-hero-badge`, `.cv-hero-h1`, `.cv-blob`, etc. Todas respetan `@media (prefers-reduced-motion: reduce)`.

---

## 6. Roles y permisos

### Modelo de roles

Definido en `src/types/index.ts`:

```ts
type Role = 'residente' | 'conserje' | 'admin'
```

> **Nota:** el ERS menciona un cuarto rol `committee` (comité) y un rol `Propietario` detectado en el ERS funcional de la compañera (ver `../ers-funcional-companera.md`). Ninguno está implementado todavía en el frontend. `admin` cubre parcialmente las responsabilidades de comité mientras tanto.

### Estado de sesión

**No hay autenticación real implementada.** El rol vive en React state dentro de `AuthProvider` (`src/hooks/useAuth.tsx`), se inicializa como `'residente'` y no persiste entre recargas. En producción esto debe reemplazarse por sesión real vía **Azure Entra ID** (OIDC, ver `../ERS.md` §4.6 y `../mvp.md` §7) — Authorization Code + PKCE, JWT devuelto directo al frontend.

Para demo/desarrollo, el Layout expone un **role switcher** en la barra de navegación que permite cambiar entre `residente`, `conserje` y `admin` en tiempo real.

### Route guards

`src/routes/ProtectedRoute.tsx` — componente de layout de react-router que recibe `allowedRoles: Role[]`. Si el rol activo no está en la lista, redirige a `/` (configurable con `redirectTo`).

```tsx
<ProtectedRoute allowedRoles={['admin']} />
<ProtectedRoute allowedRoles={['conserje', 'admin']} />
```

Usado en `src/routes/router.tsx` como elemento de layout intermedio (sin path propio).

### Vista adaptativa por rol

Algunas rutas son accesibles a todos los roles pero renderizan contenido diferente según el rol activo:

- `/visitas` — residente ve sus visitas + pre-registro; conserje ve panel de validación QR; admin ve ambas vistas con tab selector.
- `/incidentes` — todos pueden crear; conserje/admin pueden cambiar estado; solo admin puede asignar responsable.

---

## 7. Pruebas

**No hay testing configurado en este repositorio.**

El entorno no tiene Vitest, React Testing Library, ni ningún runner de tests instalado. No hay archivos `*.test.ts`, `*.spec.ts`, ni carpeta `__tests__`.

**Deuda pendiente (según ERS):**
- Configurar Vitest + React Testing Library
- Cobertura mínima requerida: 60% de líneas
- Prioridad de cobertura: guards de roles, lógica de validación de formularios, generación de código QR

**CI evaluado y pospuesto** (no urgente, requiere decisión de alcance/costo del equipo): bundle size / Lighthouse CI (necesita definir umbrales/baseline), CodeQL (minutos de CI extra). Ningún workflow de tests todavía — no tiene sentido antes de configurar Vitest arriba.

---

## 8. Comandos de setup

```bash
npm install           # instalar
npm run dev           # servidor de desarrollo (HMR)
npm run build         # build de producción a dist/
npm run preview       # preview del build
npm run lint          # eslint .
npm run format        # oxfmt
npm run typecheck     # tsc --noEmit
```

---

## 9. Gotchas del proyecto

### Tailwind v4 sin archivo de configuración
No existe `tailwind.config.js` ni `postcss.config.js`. Tailwind se carga como plugin de Vite (`@tailwindcss/vite`). Los tokens de color y tipografía se definen en el bloque `@theme inline` dentro de `src/index.css`. Agregar tokens nuevos ahí, no en un archivo de config separado.

### react-router v8 Data Mode (no la API clásica)
Este proyecto usa `createBrowserRouter` + `RouterProvider` + `Outlet`. **No usar** `BrowserRouter`, `Routes`, ni `<Route>` JSX clásico. Los guards de rol se implementan como elementos de layout con `Outlet`, no como wrappers ad-hoc. Ver `src/routes/router.tsx`.

### El QR de Visitas no es escaneable
El componente `QRCode` en `src/pages/Visitas.tsx` genera un SVG con estética de QR pero **no es un QR válido**. Es un mockup visual. Los patrones finder y datos son algorítmicos pero no siguen ISO 18004. No reemplazar sin evaluar una librería real (ej. `qrcode`, `qr-code-styling`).

### recharts: forzar pre-bundling en Vite
`recharts` está en `optimizeDeps.include` en `vite.config.ts`. Sin esto, Vite puede fallar al importarlo dinámicamente. Ya está configurado — no remover esa entrada.

### cuelume: sin equivalente a reduced-motion
`cuelume` llama a `bind()` globalmente en `src/main.tsx` y no expone integración con `prefers-reduced-motion`. Los usuarios con esa preferencia activa seguirán escuchando sonidos. **Deuda de accesibilidad pendiente:** detectar `prefers-reduced-motion` y llamar a `setEnabled(false)` de cuelume si está activa.

### Autenticación es mock — sin persistencia
El rol se guarda solo en React state. Una recarga devuelve al usuario a `'residente'`. Reemplazar por Entra ID (ver §6) es deuda pendiente, no solo "agregar backend".

### `AuthProvider` separado de `useAuth`
`src/hooks/useAuth.ts` (sin JSX: `AuthContext`, `USERS`, hook `useAuth`) y `src/hooks/AuthProvider.tsx` (solo el componente `AuthProvider`) están en archivos separados — evita el error `react-refresh/only-export-components` de mezclar un componente con valores no-componente en el mismo archivo.

### `.codegraph/` NO existe
Usar herramientas de archivos normales (Read/Grep/Glob), no codegraph.

### `public/` (`favicon.svg`, `icons.svg`) se referencia por URL absoluta
`/favicon.svg`, no ruta relativa.

### Skills locales versionadas en git
`.claude/skills/` y `.agents/skills/` (react-best-practices, composition-patterns, frontend-design, vite, accessibility, seo, nodejs-backend-patterns, nodejs-best-practices; instaladas en ambas rutas). El equipo comparte las mismas skills; `skills-lock.json` garantiza instalación reproducible. Cargar con `skill`.

---

## 10. Commits y PR

Conventional Commits v1.0.0. Formato: `:emoji: <tipo>(<alcance>)?(!)?: <sujeto>`

- **Idioma**: mensajes en español. El tipo en inglés (estándar); sujeto, cuerpo y footer en español.
- **Gitmoji**: todo commit inicia con un emoji que describa el cambio. Prioridad (de menor a mayor):
  1. Gitmoji por defecto según tipo (`gitmoji.dev`):
     `feat` → ✨, `fix` → 🐛, `docs` → 📝, `style` → 🎨, `refactor` → ♻️, `perf` → ⚡️, `test` → ✅, `build` → 📦️, `ci` → 👷, `chore` → 🔧, `revert` → ⏪️.
  2. Gitmoji específico del catálogo si encaja mejor: 💥 breaking, 🎉 inicio de proyecto, 🔥 quitar código, 💫 animaciones/transiciones, 💄 UI, 🙈 gitignore, 🔒 seguridad, 🚀 deploy.
  3. Emoji personalizado libre si el significado no es obvio.
- **Tipos** (enum commitlint config-conventional): `feat` (→MINOR), `fix` (→PATCH), `docs`, `style` (formato, NO visual), `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`. Cualquier tipo con breaking → MAJOR.
- **Sujeto**: imperativo presente, minúsculas, sin punto final, ≤72 chars (ideal ≤50).
- **Alcance** (opcional): sustantivo kebab-case del área — `login`, `home`, `navbar`, `data` — o ninguno si es transversal.
- **Cuerpo**: tras línea en blanco; explica qué y por qué, no cómo.
- **Footer**: tras línea en blanco; issues `Closes #N`/`Fixes #N`; breaking con `BREAKING CHANGE:` o sufijo `!`.
- **Rama**: `tipo/descripcion-corta` (ej. `feat/login`).

### Ramas: Git Flow Lite, no enterprise (nada de release/support)

- `main`: estable/deployable. Solo merge desde `develop` o `hotfix/*`. Nunca commitear directo.
- `develop`: integración. Recibe merges de `feature/*`. Punto de partida para features.
- `feature/*`: crea desde `develop`, merge a `develop`, se borra. `feature/descripcion-corta`.
- `hotfix/*`: crea desde `main`, merge a `main` + `develop`, se borra. `hotfix/descripcion-corta`.
- Tags: `vMAJOR.MINOR.PATCH` en commits de `main`. Mantener `develop` sincronizada con `main` tras cada merge.
- Branch protection (cuando se pushee a GitHub): `main` requires PR + 1 approval + status checks, no force push; `develop` requires PR, no force push; `feature/*` allow force push.
- **Merge de `develop` a `main`: merge commit (`--no-ff`), nunca squash ni rebase.** Squash o rebase generan commits en `main` que no existen en `develop`, desincronizando las ramas y complicando futuros `hotfix/*` (que mergean a ambas). En GitHub, dejar habilitado solo "Create a merge commit" para PRs hacia `main`.
- **`CHANGELOG.md`**: se actualiza en cada PR hacia `main` (no en cada commit a `develop`, no solo en tags) — una entrada nueva por versión, agrupando los commits del PR. Formato Keep a Changelog, español.

## 11. Límites del agente (nunca tocar sin aprobación explícita)

- `.github/workflows/react-doctor.yml` — React Doctor en CI (advisory; no bloquea PRs).
- `.github/workflows/deploy.yml` — build + lint + deploy a GitHub Pages en push a `main`. Requiere Settings → Pages → Source: GitHub Actions. `vite.config.ts` usa `base` dinámico vía `GITHUB_REPOSITORY` — no hardcodear el nombre del repo.
- `.github/workflows/ci-develop.yml` — **no está protegido**, se puede editar libremente. Corre lint + typecheck + build en push/PR a `develop`.
- N/A: resto de workflows (lighthouse/bundle-size/CodeQL — evaluados y descartados por ahora, ver Deuda pendiente §7), DB y `.env`.

## 12. Enforcement

Orientativo, no forzado mecánicamente. Gate real del agente: `npm run lint` + `npm run typecheck`. El CI refuerza en dos puntos: `ci-develop.yml` (lint + typecheck + build en cada push/PR a `develop`) y `deploy.yml` (lint + build en `main`, más `react-doctor` advisory en PRs) — no hay pre-commit hooks.

## 13. Mantenimiento

Tratar como código. Empezar corto; añadir sección solo tras fallos repetidos; quitar cuando cambie la convención.
