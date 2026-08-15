# AGENTS.md

## 0. Jerarquía de reglas

Cuando dos reglas de este archivo entran en conflicto, se resuelven en este orden:
1. Seguridad y corrección — nunca se sacrifican por ninguna otra regla.
2. Convenciones del proyecto (stack, estilo, arquitectura) — se siguen salvo instrucción explícita en contrario.
3. Minimalismo (sección 5, disciplina Ponytail) — se aplica solo después de satisfacer 1 y 2.

Las secciones que no aplican al repo están marcadas N/A — no inventar contenido.

## 1. Resumen del proyecto

SPA personal `frontend-cloudnative` (Vite 8 + React 19). Aún template stock de Vite: sin router, sin librería de estado, sin API client, sin páginas propias — el nombre "Cloud Native" es aspiracional. Entrada: `src/main.jsx` → `src/App.jsx`.

**Paleta de diseño del proyecto:**

| Rol | Valor |
|-----|-------|
| Primario | `#0D9488` (teal) |
| Secundario | `#134E4A` (verde oscuro) |
| Fondo | `#F0FDFA` |
| Alerta | `#E11D48` |
| Advertencia | `#EAB308` |

Nota: el CSS del template (`src/index.css`, `src/App.css`) todavía usa acento púrpura — aún no está adaptado a esta paleta.

## 2. Stack técnico

- Lenguaje: JavaScript (JSX), sin TypeScript, sin typecheck
- Node: 24 (Active LTS Krypton; fijado en `.github/workflows/deploy.yml`; sin campo `engines` en `package.json`)
- Framework: React 19 (`react@^19.2.8`, `react-dom@^19.2.8`) + Vite 8 (`vite@^8.2.0`) vía `@vitejs/plugin-react@^6.0.4`
- Gestor: npm (`"type": "module"`)
- **React Compiler habilitado** vía `@rolldown/plugin-babel` + `reactCompilerPreset` en `vite.config.js`
- CSS: plano, importado por componente (`index.css`, `App.css`); sin CSS modules
- Lint: ESLint 10 (`eslint@^10.8.0`), flat config `eslint.config.js` (react-hooks + react-refresh)

## 3. Comandos de setup

```bash
npm install          # instalar
npm run dev          # levantar entorno local (HMR)
npm run build        # build producción a dist/
npm run preview      # servir el build
npm run lint         # eslint . (config flat)
npx -y react-doctor@latest --verbose   # chequeo de calidad React (perf/bugs/a11y)
```

Tests: NO existe runner ni script de test, ni typecheck (ver §6). Para react-doctor, verificar con `--verbose` y confirmar que el diagnóstico puntual desapareció.

## 4. Estilo de código

Regla: componentes funcionales con hooks, nunca clases. Un componente por archivo, `export default`. JSX plano; sin PropTypes ni TS. CSS por componente; colores de la paleta (§1) cuando se adapten, no hex sueltos.

```jsx
function App() {
  const [count, setCount] = useState(0)
  return (
    <button type="button" onClick={() => setCount((count) => count + 1)}>
      Count is {count}
    </button>
  )
}
export default App
```

**Reglas React Compiler** (el compilador memoiza solo): no añadir `useMemo`/`useCallback`/`React.memo` a mano; nunca mutar props ni objetos de estado; hooks estables. `react-doctor` valida. StrictMode on en `src/main.jsx`.

## 5. Disciplina anti-sobreingeniería (Ponytail)

Escalera de decisión antes de escribir código nuevo:
1. ¿Es necesario construir esto? (YAGNI)
2. ¿La librería estándar ya lo resuelve? Úsala.
3. ¿Una función nativa de la plataforma lo cubre? Úsala.
4. ¿Una dependencia ya instalada lo resuelve? Úsala.
5. ¿Se puede resolver en una línea? Hazlo en una línea.
6. Solo entonces: escribe el mínimo código funcional.

No aplicar pereza en: comprensión completa del problema, validación de inputs en fronteras de confianza, manejo de errores que previene pérdida de datos, seguridad, accesibilidad, y cualquier cosa explícitamente solicitada.

Toda lógica no trivial deja una verificación ejecutable mínima (assert o test pequeño).

No crear carpetas standby (`api/`, `services/`, `context/`, `utils/`) — YAGNI.

## 6. Pruebas unitarias

N/A — no existe runner ni script de test en este repo. No agregar uno para esta SPA. Gates de verificación: `npm run lint` + `npx react-doctor@latest --verbose` + `npm run build`.

## 7. Métricas de claridad

| Métrica | Umbral | Cómo medir |
|---|---|---|
| Longitud de función | ≤ 40 líneas | revisión manual |
| Nesting | ≤ 3 niveles | revisión manual |
| Complejidad ciclomática | N/A (sin herramienta instalada) | — |

## 8. Procedimientos QA

Checklist pre-entrega: `npm run lint` limpio, `npm run build` sin errores, `react-doctor` sin diagnósticos confirmados, sin secrets hardcodeados, documentación al día.

| Severidad | Acción |
|---|---|
| Crítico | bloquea el cambio (build roto, secrets expuestos) |
| Mayor | corregir antes de dar por hecho el cambio |
| Menor | nota post-merge |

## 9. Seguridad

SPA estático, sin backend. Nunca commitear secrets/tokens. Validar inputs solo si aparece una frontera de confianza (hoy no hay backend ni entradas de usuario).

## 10. Commits y PR (git inicializado — branch `main`, sin commits aún; aplicar al primer commit)

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

## 11. Límites del agente (nunca tocar sin aprobación explícita)

- `.github/workflows/react-doctor.yml` — React Doctor en CI (advisory; no bloquea PRs). Existe hoy; listo para cuando se pushee a GitHub.
- `.github/workflows/deploy.yml` — build + lint + deploy a GitHub Pages en push a `main`. Requiere Settings → Pages → Source: GitHub Actions. `vite.config.js` usa `base` dinámico vía `GITHUB_REPOSITORY` — no hardcodear el nombre del repo.
- N/A: resto de workflows (CI/lighthouse/bundle-size), DB y `.env`.

## 12. Enforcement

Orientativo, no forzado mecánicamente. Gate real del agente: `npm run lint`. El CI refuerza (react-doctor advisory en PRs; deploy corre lint + build en `main`) — no hay pre-commit hooks.

## 13. Mantenimiento

Tratar como código. Empezar corto; añadir sección solo tras fallos repetidos; quitar cuando cambie la convención.

## Gotchas del repo

- `.codegraph/` NO existe — usar herramientas de archivos normales (Read/Grep/Glob), no codegraph.
- `public/` (`favicon.svg`, `icons.svg`) se referencia por URL absoluta (`/favicon.svg`).
- Skills locales en `.claude/skills/` y `.agents/skills/` (react-best-practices, composition-patterns, frontend-design, vite, accessibility, seo, nodejs-backend-patterns, nodejs-best-practices; instaladas en ambas rutas). **Versionadas en git** — el equipo comparte las mismas skills; `skills-lock.json` garantiza instalación reproducible. Cargar con `skill`.
- `src/App.jsx` aún es el template: texto "Get started" y assets de ejemplo (`src/assets/`).
