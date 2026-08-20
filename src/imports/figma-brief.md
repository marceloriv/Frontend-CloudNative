# Convivo — Brief para generación de UI (Figma AI)

Plataforma web responsive de gestión de condominios. Roles: **Administrador, Residente, Conserje, Comité**. Cada pantalla debe adaptarse por rol (mostrar/ocultar acciones según permiso).

## Stack técnico (para que el código generado calce con el repo)

React 19 + **TypeScript** (componentes `.tsx`, tipado de props/estado), Vite, sin CSS-in-JS — CSS plano o CSS Modules. Iconos estilo Lucide (outline). Responsive: celular, tablet, escritorio.

## Sistema de diseño

**Tipografía**
- Headline: **Gloock** (serif) — títulos de página, encabezados de sección. H1 32px, H2 24px, ambos regular.
- Body: **Inter** (sans-serif) — texto, formularios, componentes UI. H3 18px semibold, Body 16px regular, Small/caption 13px.

**Color (tokens)**
| Token | Hex | Uso |
|---|---|---|
| Background | `#FFFFFF` | Fondo general |
| Text | `#00201B` | Texto principal |
| Primary | `#0D9488` | Botones, links activos |
| Accent | `#005047` | Hover/pressed, énfasis secundario |
| Surface | `#FFFFFF` | Tarjetas, paneles, modales |
| Border | `#E2E8F0` | Bordes, separadores |
| Alerta | `#E11D48` | Incidentes urgentes, morosidad |
| Advertencia | `#EAB308` | Estados pendientes/parciales |
| Éxito | `#16A34A` | Confirmado, al día |

**Reglas de contraste (WCAG AA, ya validadas)**
- Texto blanco sobre Primary/Éxito: solo negrita ≥14pt o regular ≥18pt; en texto pequeño usar Text (`#00201B`) sobre esos fondos.
- Badges de Advertencia: texto siempre Text (`#00201B`), nunca blanco (falla contraste).
- Accent y Alerta: texto blanco válido en cualquier tamaño.
- Estados de interfaz siempre con texto/ícono además de color (no depender solo del color).

**Iconografía** — set outline uniforme (estilo Lucide), color por defecto Text, color activo/seleccionado Primary. No mezclar filled con outline.
`home` dashboard · `dollar-sign` gastos comunes · `message-square` tablón · `camera` registro fotográfico · `bell` notificaciones · `search` búsqueda espacios · `plus` nueva reserva/publicación · `trash` cancelar/eliminar · `settings` cuenta/perfil · `check` confirmación · `target` incidentes · `pencil` editar · `x` cerrar · `chevron-right` navegación/detalle · `menu` nav mobile · `columns` disponibilidad · `more-vertical` acciones adicionales.

## Pantallas / módulos a diseñar

1. **Auth** — Login, registro (correo + validación de unidad: torre/piso/número), aceptación digital del reglamento interno (obligatoria en registro).
2. **Dashboard residente** — perfil, próxima reserva, visitas próximas, incidentes reportados, notificaciones no leídas, pagos pendientes, últimas publicaciones del tablón, correspondencia pendiente de retiro, accesos rápidos.
3. **Espacios comunes** — catálogo con filtros (categoría, capacidad, tarifa, disponibilidad horaria), detalle de espacio (horarios, reglas, tarifa/depósito), vista de disponibilidad.
4. **Reservas** — crear reserva, historial, cancelar (según anticipación mínima), estado (pendiente/confirmada/cancelada).
5. **Visitas** — pre-registro con generación de código QR, historial de visitas, (conserjería: validar QR / check-in, registrar entrada/salida/rechazo).
6. **Correspondencia** (conserjería) — registrar llegada, marcar retiro, estado pendiente/retirado.
7. **Turnos de personal / calendario de aseo** — consulta (todos los roles), edición (Admin/Comité).
8. **Incidentes** — crear (categoría, prioridad, ubicación), listado con estado (abierto/revisión/progreso/resuelto/cerrado), asignación de responsable (Admin).
9. **Pagos** — iniciar pago (tarjeta/transferencia/WebPay) de reserva o gasto común, estado del pago, comprobante.
10. **Gastos comunes** — detalle mensual por unidad desglosado por ítem, estado (al día/pendiente/moroso), histórico descargable PDF, edición de montos (Admin/Comité).
11. **Dashboard de transparencia** — solo lectura: total por categoría, evolución mensual, detalle de gasto con boleta/factura y registro fotográfico asociado.
12. **Registro fotográfico** — foto antes/después por intervención, categoría de trabajo, visible a todos en solo lectura.
13. **Tablón de avisos** — publicar (Comité/Admin directo, Residente sujeto a aprobación), listado/historial, imagen opcional, confirmación de asistencia.
14. **Reglamento interno** — vista consultable (horarios/aforo, normas, política de reservas, sanciones).
15. **Canales de comunicación** — página estática de contacto/emergencia.
16. **Notificaciones** — centro de notificaciones, no leídas destacadas.

## Notas de UX transversales

- Todo estado (pendiente/moroso/urgente/etc.) se comunica con color + texto/ícono.
- Vistas de solo lectura claramente diferenciadas de vistas editables (rol-dependiente).
- Formularios con etiquetas explícitas, validación inline, mensajes de error comprensibles.
- Navegación por teclado soportada.
