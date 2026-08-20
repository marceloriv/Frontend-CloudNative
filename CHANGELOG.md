# Changelog

Todas las modificaciones notables de este proyecto se documentan en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/),
y este proyecto sigue [Versionado Semántico](https://semver.org/lang/es/).

## [0.1.0] - 2026-08-20

### Added

- Frontend real de Convivo (export de Figma Make): 14 pantallas, layout con
  selector de rol y guards por ruta, reemplazando el scaffold vacío de Vite.
- Scripts `lint` y `typecheck` en `package.json`, requeridos por el workflow
  de deploy.
- CI para la rama `develop`: corre lint, typecheck y build en PRs hacia
  `develop` y en cada push directo (sin deploy, sin secrets).

### Changed

- `vite.config.ts` reescrito para no depender del entorno de Figma Make
  (`.figma/make/site.json` y plugins de su propio preview).
- TypeScript bajado de 7.0.2 a 5.9.3 por soporte de `typescript-eslint` como
  peer dependency.
- Gestor de paquetes cambiado de pnpm a npm para alinear con el workflow de
  deploy existente (`npm ci`).
- `useAuth.tsx` separado en dos archivos (contexto/hook y componente
  `AuthProvider`) para no romper el fast refresh.
- README reemplazado: ya no describe el template genérico de create-vite,
  ahora documenta Convivo y enlaza a `AGENTS.md`/`DESIGN.md`.

### Fixed

- Errores de lint del export original: imports sin usar, `setState` llamados
  directo dentro de `useEffect` (cierre del menú móvil y cambio de tab activo
  movidos a render).

### Removed

- Código muerto: `spaces` y `navLinks` sin uso en `data.ts`, `public/icons.svg`
  del scaffold viejo, y opciones de `tsconfig` (`resolveJsonModule`,
  `allowImportingTsExtensions`, path comodín `*`) que solo existían para el
  import ya eliminado de `.figma/make/site.json`.
- `src/imports/` (PDF y `figma-brief.md` sin uso, ~320K).
