/* eslint-disable react/forbid-dom-props */
import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";

// ─── TypeScript interfaces ───────────────────────────────────────────────────

type EstadoVisita = "pendiente_qr" | "confirmada" | "en_progreso" | "rechazada" | "completada";

interface Visita {
  id: string;
  nombre: string;
  documento: string;
  fecha: string;
  fechaDisplay: string;
  hora: string;
  motivo: string;
  estado: EstadoVisita;
  codigo: string;
  unidad: string;
}

interface RegistroForm {
  nombre: string;
  documento: string;
  fecha: string;
  hora: string;
  motivo: string;
  observaciones: string;
}

interface LogEntry {
  hora: string;
  visitante: string;
  unidad: string;
  accion: string;
  estado: EstadoVisita;
}

// ─── QRCode component ────────────────────────────────────────────────────────

interface QRCodeProps {
  code: string;
  size?: number;
}

// Regions to skip (finder + quiet + timing + alignment)
function isReserved(r: number, c: number) {
  // Top-left finder + separator
  if (r <= 7 && c <= 7) return true;
  // Top-right finder + separator
  if (r <= 7 && c >= 13) return true;
  // Bottom-left finder + separator
  if (r >= 13 && c <= 7) return true;
  // Timing
  if (r === 6 || c === 6) return true;
  // Alignment
  if (r >= 14 && r <= 18 && c >= 14 && c <= 18) return true;
  return false;
}

function QRCode({ code, size = 200 }: QRCodeProps) {
  const GRID = 21;
  const QUIET = 4;
  const TOTAL = GRID + QUIET * 2;
  const CELL = 240 / TOTAL;

  // Generate deterministic grid
  const grid: boolean[][] = Array.from({ length: GRID }, () => Array(GRID).fill(false));

  // Finder pattern helper: 7×7 square with hollow center
  const setFinder = (row: number, col: number) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        const onBorder = r === 0 || r === 6 || c === 0 || c === 6;
        const onInner = r >= 2 && r <= 4 && c >= 2 && c <= 4;
        if (row + r < GRID && col + c < GRID) {
          grid[row + r][col + c] = onBorder || onInner;
        }
      }
    }
  };

  // Three finder patterns
  setFinder(0, 0); // top-left
  setFinder(0, 14); // top-right
  setFinder(14, 0); // bottom-left

  // Separator rows/cols (light) — already false by default

  // Timing patterns (row 6 and col 6, from 8 to 12)
  for (let i = 8; i <= 12; i++) {
    grid[6][i] = i % 2 === 0;
    grid[i][6] = i % 2 === 0;
  }

  // Alignment pattern (col 16, row 16) — 5×5
  for (let r = 14; r <= 18; r++) {
    for (let c = 14; c <= 18; c++) {
      const onBorder = r === 14 || r === 18 || c === 14 || c === 18;
      const isCenter = r === 16 && c === 16;
      grid[r][c] = onBorder || isCenter;
    }
  }

  // Data region: fill with bits derived from code charCodes
  const charCodes = Array.from(code).map((ch) => ch.charCodeAt(0));
  let bitIdx = 0;
  const nextBit = () => {
    const idx = bitIdx % charCodes.length;
    const bitPos = Math.floor(bitIdx / charCodes.length) % 8;
    bitIdx++;
    return ((charCodes[idx] >> bitPos) & 1) === 1;
  };

  for (let r = 0; r < GRID; r++) {
    for (let c = 0; c < GRID; c++) {
      if (!isReserved(r, c)) {
        grid[r][c] = nextBit();
      }
    }
  }

  const cells: React.ReactElement[] = [];
  for (let r = 0; r < GRID; r++) {
    for (let c = 0; c < GRID; c++) {
      cells.push(
        <rect
          key={`${r}-${c}`}
          x={(c + QUIET) * CELL}
          y={(r + QUIET) * CELL}
          width={CELL}
          height={CELL}
          fill={grid[r][c] ? "#00201B" : "white"}
        />,
      );
    }
  }

  return (
    <svg
      viewBox="0 0 240 240"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
    >
      <rect width="240" height="240" fill="white" />
      {cells}
    </svg>
  );
}

// ─── QRModal ─────────────────────────────────────────────────────────────────

interface QRModalProps {
  visita: Visita;
  onClose: () => void;
}

function QRModal({ visita, onClose }: QRModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 flex flex-col items-center gap-4">
        <h2 className="font-display text-2xl text-text">Código de acceso</h2>
        <p className="text-muted text-sm text-center">
          {visita.nombre} · {visita.fechaDisplay} · {visita.hora}
        </p>
        <div className="border-4 border-text rounded-xl p-2">
          <QRCode code={visita.codigo} size={200} />
        </div>
        <p className="font-mono text-lg font-bold text-text tracking-widest">{visita.codigo}</p>
        <p className="text-muted text-xs text-center">
          Comparte este código con tu visita. La conserjería lo validará en el acceso.
        </p>
        <div className="flex gap-3 w-full mt-2">
          <button
            onClick={onClose}
            className="flex-1 border border-border rounded-lg py-2 text-text font-semibold hover:bg-gray-50 transition-colors"
          >
            Descargar
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-primary text-white rounded-lg py-2 font-semibold hover:opacity-90 transition-opacity"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── PreRegistroModal ─────────────────────────────────────────────────────────

interface PreRegistroModalProps {
  onClose: () => void;
  onCreated: (v: Visita) => void;
}

const HORAS = Array.from({ length: 15 }, (_, i) => {
  const h = i + 8;
  return `${String(h).padStart(2, "0")}:00`;
});

const MOTIVOS = [
  "Visita personal",
  "Delivery / Encomienda",
  "Técnico / Servicio",
  "Mudanza",
  "Otro",
];

function todayStr() {
  return new Date().toISOString().split("T")[0];
}

function generateCode(fecha: string) {
  const compact = fecha.replace(/-/g, "");
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let seed = fecha.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0) + Date.now();
  const rand = (n: number) => {
    seed = (seed * 1664525 + 1013904223) & 0xffffffff;
    return Math.abs(seed) % n;
  };
  const suffix = Array.from({ length: 4 }, () => chars[rand(chars.length)]).join("");
  return `CONV-VIS-${compact}-${suffix}`;
}

function displayFecha(fecha: string) {
  const [y, m, d] = fecha.split("-");
  const meses = [
    "ene",
    "feb",
    "mar",
    "abr",
    "may",
    "jun",
    "jul",
    "ago",
    "sep",
    "oct",
    "nov",
    "dic",
  ];
  return `${d} ${meses[parseInt(m) - 1]} ${y}`;
}

function PreRegistroModal({ onClose, onCreated }: PreRegistroModalProps) {
  const [step, setStep] = useState<"form" | "qr">("form");
  const [createdVisita, setCreatedVisita] = useState<Visita | null>(null);
  const [charCount, setCharCount] = useState(0);
  const [form, setForm] = useState<RegistroForm>({
    nombre: "",
    documento: "",
    fecha: todayStr(),
    hora: "12:00",
    motivo: "Visita personal",
    observaciones: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const codigo = generateCode(form.fecha);
    const visita: Visita = {
      id: Date.now().toString(),
      nombre: form.nombre,
      documento: form.documento,
      fecha: form.fecha,
      fechaDisplay: displayFecha(form.fecha),
      hora: form.hora,
      motivo: form.motivo,
      estado: "pendiente_qr",
      codigo,
      unidad: "Torre A · Piso 12 · Unidad 1204",
    };
    setCreatedVisita(visita);
    setStep("qr");
    onCreated(visita);
  };

  if (step === "qr" && createdVisita) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <svg
              className="w-6 h-6 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-display text-2xl text-text">¡Visita registrada!</h2>
          <p className="text-muted text-sm text-center">
            {createdVisita.nombre} · {createdVisita.fechaDisplay} · {createdVisita.hora}
          </p>
          <div className="border-4 border-text rounded-xl p-2">
            <QRCode code={createdVisita.codigo} size={200} />
          </div>
          <p className="font-mono text-base font-bold text-text tracking-widest">
            {createdVisita.codigo}
          </p>
          <p className="text-muted text-xs text-center">
            Comparte este código con tu visita. La conserjería lo validará en el acceso.
          </p>
          <div className="flex gap-3 w-full mt-2">
            <button
              onClick={onClose}
              className="flex-1 border border-border rounded-lg py-2 text-text font-semibold hover:bg-gray-50 transition-colors"
            >
              Descargar
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-primary text-white rounded-lg py-2 font-semibold hover:opacity-90 transition-opacity"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="font-display text-xl text-text">Registrar visita</h2>
          <button
            onClick={onClose}
            className="text-muted hover:text-text transition-colors"
            aria-label="Cerrar"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          {/* Unidad destino (read-only) */}
          <div>
            <p className="block text-sm font-semibold text-text mb-1">Unidad destino</p>
            <div className="rounded-lg border border-border bg-gray-50 px-3 py-2 text-muted text-sm">
              Torre A · Piso 12 · Unidad 1204
            </div>
          </div>

          {/* Nombre */}
          <div>
            <label htmlFor="visita-nombre" className="block text-sm font-semibold text-text mb-1">
              Nombre del visitante <span className="text-alert-red">*</span>
            </label>
            <input
              id="visita-nombre"
              type="text"
              required
              value={form.nombre}
              onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              className="w-full rounded-lg border border-border px-3 py-2 text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="Nombre completo"
            />
          </div>

          {/* RUT */}
          <div>
            <label
              htmlFor="visita-documento"
              className="block text-sm font-semibold text-text mb-1"
            >
              RUT / Documento
            </label>
            <input
              id="visita-documento"
              type="text"
              value={form.documento}
              onChange={(e) => setForm({ ...form, documento: e.target.value })}
              className="w-full rounded-lg border border-border px-3 py-2 text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/40"
              placeholder="12.345.678-9"
            />
          </div>

          {/* Fecha */}
          <div>
            <label htmlFor="visita-fecha" className="block text-sm font-semibold text-text mb-1">
              Fecha de visita <span className="text-alert-red">*</span>
            </label>
            <input
              id="visita-fecha"
              type="date"
              required
              min={todayStr()}
              value={form.fecha}
              onChange={(e) => setForm({ ...form, fecha: e.target.value })}
              className="w-full rounded-lg border border-border px-3 py-2 text-text focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>

          {/* Hora */}
          <div>
            <label htmlFor="visita-hora" className="block text-sm font-semibold text-text mb-1">
              Hora estimada de llegada
            </label>
            <select
              id="visita-hora"
              value={form.hora}
              onChange={(e) => setForm({ ...form, hora: e.target.value })}
              className="w-full rounded-lg border border-border px-3 py-2 text-text focus:outline-none focus:ring-2 focus:ring-primary/40 bg-white"
            >
              {HORAS.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>
          </div>

          {/* Motivo */}
          <div>
            <label htmlFor="visita-motivo" className="block text-sm font-semibold text-text mb-1">
              Motivo
            </label>
            <select
              id="visita-motivo"
              value={form.motivo}
              onChange={(e) => setForm({ ...form, motivo: e.target.value })}
              className="w-full rounded-lg border border-border px-3 py-2 text-text focus:outline-none focus:ring-2 focus:ring-primary/40 bg-white"
            >
              {MOTIVOS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* Observaciones */}
          <div>
            <label
              htmlFor="visita-observaciones"
              className="block text-sm font-semibold text-text mb-1"
            >
              Observaciones
              <span className="text-muted font-normal ml-1">(opcional)</span>
            </label>
            <textarea
              id="visita-observaciones"
              value={form.observaciones}
              onChange={(e) => {
                if (e.target.value.length <= 200) {
                  setForm({ ...form, observaciones: e.target.value });
                  setCharCount(e.target.value.length);
                }
              }}
              rows={3}
              className="w-full rounded-lg border border-border px-3 py-2 text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
              placeholder="Información adicional para conserjería..."
            />
            <p className="text-muted text-xs text-right mt-0.5">{charCount}/200</p>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-border rounded-lg py-2.5 text-text font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-primary text-white rounded-lg py-2.5 font-semibold hover:opacity-90 transition-opacity"
            >
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── StatusBadge ──────────────────────────────────────────────────────────────

const STATUS_BADGE_MAP: Record<
  EstadoVisita,
  {
    label: string;
    icon: string;
    className: string;
  }
> = {
  pendiente_qr: {
    label: "Pendiente QR",
    icon: "⏳",
    className: "bg-alert-yellow text-text",
  },
  confirmada: {
    label: "Confirmada",
    icon: "✓",
    className: "bg-green-100 text-green-800",
  },
  en_progreso: {
    label: "En condominio",
    icon: "📍",
    className: "bg-blue-100 text-blue-800",
  },
  rechazada: {
    label: "Rechazada",
    icon: "✗",
    className: "bg-alert-red text-white",
  },
  completada: {
    label: "Completada",
    icon: "",
    className: "bg-gray-100 text-muted",
  },
};

function StatusBadge({ estado }: { estado: EstadoVisita }) {
  const { label, icon, className } = STATUS_BADGE_MAP[estado];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${className}`}
    >
      {icon && <span>{icon}</span>}
      {label}
    </span>
  );
}

// ─── VisitaCard ───────────────────────────────────────────────────────────────

interface VisitaCardProps {
  visita: Visita;
  onVerQR: (v: Visita) => void;
}

function VisitaCard({ visita, onVerQR }: VisitaCardProps) {
  return (
    <div className="bg-white rounded-xl border border-border p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-semibold text-text">{visita.nombre}</p>
          {visita.documento && <p className="text-muted text-sm">{visita.documento}</p>}
        </div>
        <StatusBadge estado={visita.estado} />
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
        <span>📅 {visita.fechaDisplay}</span>
        <span>🕐 {visita.hora}</span>
        <span>📋 {visita.motivo}</span>
      </div>
      {(visita.estado === "pendiente_qr" || visita.estado === "confirmada") && (
        <button
          onClick={() => onVerQR(visita)}
          className="self-start text-sm font-semibold text-primary border border-primary/30 rounded-lg px-3 py-1.5 hover:bg-primary/5 transition-colors"
        >
          Ver QR
        </button>
      )}
    </div>
  );
}

// ─── RechazoModal ─────────────────────────────────────────────────────────────

interface RechazoModalProps {
  onConfirm: (motivo: string) => void;
  onCancel: () => void;
}

function RechazoModal({ onConfirm, onCancel }: RechazoModalProps) {
  const [motivo, setMotivo] = useState("");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 flex flex-col gap-4">
        <h3 className="font-display text-xl text-text">Motivo de rechazo</h3>
        <textarea
          aria-label="Motivo de rechazo"
          value={motivo}
          onChange={(e) => setMotivo(e.target.value)}
          rows={3}
          required
          className="w-full rounded-lg border border-border px-3 py-2 text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-alert-red/40 resize-none"
          placeholder="Describe el motivo del rechazo..."
        />
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 border border-border rounded-lg py-2 text-text font-semibold hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => motivo.trim() && onConfirm(motivo)}
            disabled={!motivo.trim()}
            className="flex-1 bg-alert-red text-white rounded-lg py-2 font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            Confirmar rechazo
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── ConserjeriaPanel ────────────────────────────────────────────────────────

interface ConserjeriaPanelProps {
  visitas: Visita[];
  onUpdateEstado: (id: string, estado: EstadoVisita) => void;
}

const LOG_ENTRIES: LogEntry[] = [
  {
    hora: "08:32",
    visitante: "María González",
    unidad: "Torre B · 304",
    accion: "Entrada",
    estado: "en_progreso",
  },
  {
    hora: "09:15",
    visitante: "Delivery Cornershop",
    unidad: "Torre A · 802",
    accion: "Entrada",
    estado: "completada",
  },
  {
    hora: "09:47",
    visitante: "Delivery Cornershop",
    unidad: "Torre A · 802",
    accion: "Salida",
    estado: "completada",
  },
  {
    hora: "10:03",
    visitante: "Pedro Soto",
    unidad: "Torre C · 101",
    accion: "Entrada",
    estado: "en_progreso",
  },
  {
    hora: "11:22",
    visitante: "Técnico VTR",
    unidad: "Torre A · 1204",
    accion: "Entrada",
    estado: "en_progreso",
  },
];

function ConserjeriaPanel({ visitas, onUpdateEstado }: ConserjeriaPanelProps) {
  const [searchCode, setSearchCode] = useState("");
  const [foundVisita, setFoundVisita] = useState<Visita | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [showRechazo, setShowRechazo] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const code = searchCode.trim().toUpperCase();
    const match = visitas.find((v) => v.codigo === code);
    if (match) {
      setFoundVisita(match);
      setNotFound(false);
    } else {
      setFoundVisita(null);
      setNotFound(true);
    }
  };

  // Keep foundVisita in sync when visitas update (estado changes)
  const currentFound = foundVisita ? (visitas.find((v) => v.id === foundVisita.id) ?? null) : null;

  const handleEntrada = () => {
    if (currentFound) {
      onUpdateEstado(currentFound.id, "en_progreso");
      setFoundVisita({ ...currentFound, estado: "en_progreso" });
    }
  };

  const handleSalida = () => {
    if (currentFound) {
      onUpdateEstado(currentFound.id, "completada");
      setFoundVisita({ ...currentFound, estado: "completada" });
    }
  };

  const handleRechazo = (_motivo: string) => {
    if (currentFound) {
      onUpdateEstado(currentFound.id, "rechazada");
      setFoundVisita({ ...currentFound, estado: "rechazada" });
    }
    setShowRechazo(false);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Validator card */}
      <div className="max-w-md mx-auto w-full bg-white rounded-2xl border border-border p-6 flex flex-col gap-4">
        <h2 className="font-display text-2xl text-text">Validar acceso</h2>
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            aria-label="Código de acceso"
            value={searchCode}
            onChange={(e) => {
              setSearchCode(e.target.value);
              setNotFound(false);
            }}
            placeholder="CONV-VIS-..."
            className="flex-1 rounded-lg border border-border px-3 py-2 text-text placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-primary/40 font-mono text-sm"
          />
          <button
            type="submit"
            className="bg-primary text-white rounded-lg px-4 py-2 font-semibold hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            Buscar
          </button>
        </form>

        {notFound && (
          <div className="rounded-lg bg-red-50 border border-alert-red/20 px-4 py-3 text-alert-red text-sm font-medium">
            Código no encontrado. Verifica con el residente.
          </div>
        )}

        {currentFound && (
          <div className="flex flex-col gap-4 pt-2 border-t border-border">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-text text-lg">{currentFound.nombre}</p>
                {currentFound.documento && (
                  <p className="text-muted text-sm">{currentFound.documento}</p>
                )}
              </div>
              <StatusBadge estado={currentFound.estado} />
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-muted text-xs uppercase tracking-wide">Unidad</p>
                <p className="text-text font-medium">{currentFound.unidad}</p>
              </div>
              <div>
                <p className="text-muted text-xs uppercase tracking-wide">Fecha</p>
                <p className="text-text font-medium">{currentFound.fechaDisplay}</p>
              </div>
              <div>
                <p className="text-muted text-xs uppercase tracking-wide">Hora</p>
                <p className="text-text font-medium">{currentFound.hora}</p>
              </div>
              <div>
                <p className="text-muted text-xs uppercase tracking-wide">Motivo</p>
                <p className="text-text font-medium">{currentFound.motivo}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {currentFound.estado !== "en_progreso" &&
                currentFound.estado !== "rechazada" &&
                currentFound.estado !== "completada" && (
                  <button
                    onClick={handleEntrada}
                    className="w-full bg-primary text-white rounded-lg py-2.5 font-semibold hover:opacity-90 transition-opacity"
                  >
                    Registrar entrada
                  </button>
                )}
              {currentFound.estado === "en_progreso" && (
                <button
                  onClick={handleSalida}
                  className="w-full bg-accent text-white rounded-lg py-2.5 font-semibold hover:opacity-90 transition-opacity"
                >
                  Registrar salida
                </button>
              )}
              {currentFound.estado !== "rechazada" && currentFound.estado !== "completada" && (
                <button
                  onClick={() => setShowRechazo(true)}
                  className="w-full bg-alert-red text-white rounded-lg py-2.5 font-semibold hover:opacity-90 transition-opacity"
                >
                  Rechazar
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Recent entries log */}
      <div className="bg-white rounded-2xl border border-border overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="font-display text-lg text-text">Últimos registros de hoy</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-border">
              <tr>
                {["Hora", "Visitante", "Unidad", "Acción", "Estado"].map((col) => (
                  <th
                    key={col}
                    className="text-left px-4 py-3 text-muted font-semibold text-xs uppercase tracking-wide"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {LOG_ENTRIES.map((entry) => (
                <tr
                  key={`${entry.hora}-${entry.visitante}-${entry.accion}`}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 font-mono text-text">{entry.hora}</td>
                  <td className="px-4 py-3 text-text font-medium">{entry.visitante}</td>
                  <td className="px-4 py-3 text-muted">{entry.unidad}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`font-semibold ${
                        entry.accion === "Entrada" ? "text-primary" : "text-muted"
                      }`}
                    >
                      {entry.accion === "Entrada" ? "↓ Entrada" : "↑ Salida"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge estado={entry.estado} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showRechazo && (
        <RechazoModal onConfirm={handleRechazo} onCancel={() => setShowRechazo(false)} />
      )}
    </div>
  );
}

// ─── Seed data ────────────────────────────────────────────────────────────────

const SEED_VISITAS: Visita[] = [
  {
    id: "1",
    nombre: "Carlos Rodríguez",
    documento: "19.456.789-2",
    fecha: "2026-08-25",
    fechaDisplay: "25 ago 2026",
    hora: "15:00",
    motivo: "Visita personal",
    estado: "confirmada",
    codigo: "CONV-VIS-20260825-B3X2",
    unidad: "Torre A · Piso 12 · Unidad 1204",
  },
  {
    id: "2",
    nombre: "Delivery Rappi",
    documento: "(empresa)",
    fecha: "2026-08-19",
    fechaDisplay: "19 ago 2026",
    hora: "11:00",
    motivo: "Delivery / Encomienda",
    estado: "completada",
    codigo: "CONV-VIS-20260819-D5M7",
    unidad: "Torre A · Piso 12 · Unidad 1204",
  },
  {
    id: "3",
    nombre: "Técnico Claro",
    documento: "20.123.456-7",
    fecha: "2026-08-22",
    fechaDisplay: "22 ago 2026",
    hora: "10:00",
    motivo: "Técnico / Servicio",
    estado: "pendiente_qr",
    codigo: "CONV-VIS-20260822-A7K9",
    unidad: "Torre A · Piso 12 · Unidad 1204",
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

type ActiveTab = "mis-visitas" | "conserjeria";

export default function Visitas() {
  const { role } = useAuth();

  // Admin can switch between both views; residente and conserje only see their own
  const canSeeConserjeria = role === "conserje" || role === "admin";
  const canSeeResidente = role === "residente" || role === "admin";

  const defaultTab: ActiveTab = canSeeResidente ? "mis-visitas" : "conserjeria";
  const [activeTab, setActiveTab] = useState<ActiveTab>(defaultTab);

  const [prevRole, setPrevRole] = useState(role);
  if (role !== prevRole) {
    setPrevRole(role);
    setActiveTab(canSeeResidente ? "mis-visitas" : "conserjeria");
  }

  const [visitas, setVisitas] = useState<Visita[]>(SEED_VISITAS);
  const [showPreRegistro, setShowPreRegistro] = useState(false);
  const [qrVisita, setQrVisita] = useState<Visita | null>(null);

  const handleCreated = (v: Visita) => setVisitas((prev) => [v, ...prev]);
  const handleUpdateEstado = (id: string, estado: EstadoVisita) =>
    setVisitas((prev) => prev.map((v) => (v.id === id ? { ...v, estado } : v)));

  const showingResidente = activeTab === "mis-visitas";

  return (
    <div className="min-h-screen bg-gray-50 font-body">
      {/* Dark header */}
      <header className="bg-text px-4 pt-8 pb-6">
        <div className="max-w-2xl mx-auto flex items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-4xl text-white">Visitas</h1>
            <p className="text-white/60 mt-1 text-sm">
              {role === "residente"
                ? "Pre-registra y gestiona las visitas a tu unidad"
                : role === "conserje"
                  ? "Valida accesos y registra entradas y salidas"
                  : "Gestión completa de visitas del condominio"}
            </p>
          </div>
          {showingResidente && role !== "conserje" && (
            <button
              onClick={() => setShowPreRegistro(true)}
              className="bg-primary text-white rounded-xl px-4 py-2.5 font-semibold text-sm hover:opacity-90 transition-opacity whitespace-nowrap mt-1"
              data-cuelume-press="tick"
            >
              + Registrar visita
            </button>
          )}
        </div>
      </header>

      {/* Tab bar — only show if admin (who can access both) */}
      {role === "admin" && (
        <div className="bg-white border-b border-border sticky top-0 z-10">
          <div className="max-w-2xl mx-auto flex">
            {(
              [
                { key: "mis-visitas", label: "Mis visitas" },
                { key: "conserjeria", label: "Conserjería" },
              ] as { key: ActiveTab; label: string }[]
            ).map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-6 py-4 text-sm font-semibold border-b-2 transition-colors ${
                  activeTab === key
                    ? "border-primary text-primary"
                    : "border-transparent text-muted hover:text-text"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <main className="max-w-2xl mx-auto px-4 py-6">
        {canSeeConserjeria && !showingResidente ? (
          <ConserjeriaPanel visitas={visitas} onUpdateEstado={handleUpdateEstado} />
        ) : (
          <div className="flex flex-col gap-4">
            {visitas.length === 0 ? (
              <div className="text-center py-16 text-muted">
                <p className="text-lg font-semibold">Sin visitas registradas</p>
                <p className="text-sm mt-1">Registra tu primera visita con el botón de arriba.</p>
              </div>
            ) : (
              visitas.map((v) => <VisitaCard key={v.id} visita={v} onVerQR={setQrVisita} />)
            )}
          </div>
        )}
      </main>

      {/* Modals */}
      {showPreRegistro && (
        <PreRegistroModal onClose={() => setShowPreRegistro(false)} onCreated={handleCreated} />
      )}
      {qrVisita && <QRModal visita={qrVisita} onClose={() => setQrVisita(null)} />}
    </div>
  );
}
