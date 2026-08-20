# Convivo — Design System

Sistema de diseño de la plataforma Convivo (gestión de condominios). Referencia de tipografía, color, iconografía y accesibilidad para diseño e implementación frontend.

---

## 1. Tipografía

| Rol | Fuente | Estilo | Uso |
|---|---|---|---|
| Headline | **Gloock** | Serif, alto impacto | Títulos de página, encabezados de sección |
| Body | **Inter** | Sans-serif, legible | Texto de cuerpo, formularios, componentes UI, labels |

### Escala sugerida

| Elemento | Fuente | Tamaño | Peso |
|---|---|---|---|
| H1 | Gloock | 32px / 2rem | Regular |
| H2 | Gloock | 24px / 1.5rem | Regular |
| H3 | Inter | 18px / 1.125rem | Semibold |
| Body | Inter | 16px / 1rem | Regular |
| Small / caption | Inter | 13px / 0.8125rem | Regular |

---

## 2. Color

### 2.1 Tokens base

| Token | Hex | RGB | CMYK | Uso |
|---|---|---|---|---|
| Background | `#FFFFFF` | 255, 255, 255 | 0, 0, 0, 0 | Fondo general de la aplicación |
| Text | `#00201B` | 0, 32, 27 | 100, 0, 16, 87 | Texto principal sobre fondos claros |
| Primary | `#0D9488` | 13, 148, 136 | 91, 0, 8, 42 | Acciones principales, botones, enlaces activos |
| Accent | `#005047` | 0, 80, 71 | 100, 0, 11, 69 | Estados hover/presionado, énfasis secundario |
| Surface | `#FFFFFF` | 255, 255, 255 | 0, 0, 0, 0 | Tarjetas, paneles, modales |
| Border | `#E2E8F0` | 226, 232, 240 | 6, 3, 0, 6 | Bordes, separadores, líneas divisorias |

### 2.2 Colores de estado (semánticos)

Heredados del ERS de Convivo, para estados de reservas, visitas e incidentes.

| Token | Hex | Uso |
|---|---|---|
| Alerta | `#E11D48` | Incidentes urgentes, estados críticos, unidades morosas |
| Advertencia | `#EAB308` | Estados pendientes o parciales |
| Éxito | `#16A34A` | Estados confirmados, al día, "OK" |

### 2.3 Contraste (WCAG 2.1)

Ratios calculados sobre las combinaciones reales de uso más frecuente:

| Combinación | Ratio | Texto normal | Texto grande / negrita | AAA |
|---|---|---|---|---|
| Text sobre Background | 17.18:1 | ✅ AA | ✅ | ✅ AAA |
| Text sobre Border | 13.94:1 | ✅ AA | ✅ | ✅ AAA |
| Blanco sobre Primary | 3.74:1 | ❌ | ✅ AA (≥18pt regular o ≥14pt bold) | — |
| Text sobre Primary | 4.59:1 | ✅ AA | ✅ | — |
| Blanco sobre Accent | 9.38:1 | ✅ AA | ✅ | ✅ AAA |
| Blanco sobre Alerta | 4.70:1 | ✅ AA | ✅ | — |
| Text sobre Advertencia | 8.96:1 | ✅ AA | ✅ | ✅ AAA |
| Blanco sobre Advertencia | 1.92:1 | ❌ | ❌ | — |
| Blanco sobre Éxito | 3.30:1 | ❌ | ✅ AA (grande/negrita) | — |

**Reglas derivadas:**

- Botones con fondo **Primary**: texto blanco solo en negrita ≥14pt (o regular ≥18pt); en botones pequeños o texto secundario, usar **Text** (`#00201B`) sobre Primary.
- Badges de **Advertencia**: usar siempre **Text** (`#00201B`) como color de texto — el blanco falla el contraste (1.92:1).
- **Accent** y **Alerta** admiten texto blanco en cualquier tamaño.
- **Éxito** (`#16A34A`), igual que Primary: texto blanco solo en tamaño grande/negrita.

---

## 3. Iconografía

Set de iconos de línea (outline, trazo uniforme), estilo consistente con librerías tipo Lucide.

- Color por defecto: **Text** (`#00201B`).
- Estado activo / seleccionado: **Primary** (`#0D9488`).
- No mezclar con iconos de relleno (filled) ni con otros grosores de trazo dentro de la misma vista.

### 3.1 Mapeo de iconos a funcionalidades de Convivo

| Icono | Funcionalidad |
|---|---|
| `home` | Inicio / Dashboard de transparencia de gastos |
| `dollar-sign` | Gastos comunes |
| `message-square` | Tablón de eventos y avisos |
| `camera` | Registro fotográfico de control de calidad |
| `bell` (mute) | Centro de notificaciones |
| `search` | Búsqueda avanzada de espacios comunes |
| `plus` | Nueva reserva / nueva publicación en el tablón |
| `trash` | Cancelar reserva / eliminar publicación |
| `settings` (gear) | Configuración de cuenta y perfil |
| `check` | Confirmación de reserva o pago |
| `target` | Prioridad y seguimiento de incidentes |
| `pencil` | Editar reserva / editar perfil |
| `skip-back` / `skip-forward` | Navegación de historial (reservas, visitas) |
| `volume` | Preferencias de notificaciones sonoras |
| `cloud` | Estado de sincronización / disponibilidad |
| `menu` | Navegación principal (mobile) |
| `columns` | Vista de disponibilidad por espacio |
| `minus` | Reducir cantidad / colapsar sección |
| `x` | Cerrar modal / cancelar acción |
| `chevron-right` | Navegación entre pasos / ver detalle |
| `more-vertical` | Acciones adicionales por ítem |
| `sun` | Modo de visualización / brillo |

---

## 4. Aplicación por módulo (ERS Convivo)

| Módulo | Color dominante | Ícono principal |
|---|---|---|
| MSResidentes (Perfil) | Primary | `home` / `settings` |
| MSEspaciosComunes | Primary / Border | `search` / `columns` |
| MSReservas | Primary → Éxito al confirmar | `check` |
| MSVisitas | Accent | `bell` |
| MSIncidentes | Alerta / Advertencia según estado | `target` |
| MSNotificaciones | Text (neutral) | `bell` / `message-square` |
| Gastos comunes / Dashboard | Primary + Accent (gráficos) | `dollar-sign` |
| Tablón de eventos | Accent | `message-square` |
| Registro fotográfico | Border (marco de galería) | `camera` |

---

## 5. Referencias

- Tokens de color y tipografía: especificación de diseño de referencia (captura, agosto 2026).
- Paleta de estado (Alerta / Advertencia / Éxito): heredada de `ERS_Convivo.docx`, secciones 3.3 y 7.
- Documento relacionado: `Propuesta_Pagina_Web_Convivo.docx`.
