import { useState } from "react";
import { gastos } from "../lib/data";
import { useAuth } from "../hooks/useAuth";
import {
  IconDownload,
  IconCheck,
  IconDollar,
  IconBell,
  IconShield,
  IconHome,
  IconChevronRight,
} from "../components/icons/Icons";
import { FlipCard } from "../components/FlipCard";

const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto"];

interface HistorialEntry {
  mes: string;
  total: string;
  estado: string;
  colorClass: string;
}

interface UnidadEntry {
  unidad: string;
  estado: string;
  monto: string;
  colorClass: string;
  bgClass: string;
}

interface AlternatingSection {
  title: string;
  body: string;
  imgUrl: string;
  imgRight: boolean;
}

const historial: HistorialEntry[] = [
  {
    mes: "Agosto 2026",
    total: "$600.000",
    estado: "Al día",
    colorClass: "text-teal-600 bg-teal-600/10",
  },
  {
    mes: "Julio 2026",
    total: "$600.000",
    estado: "Al día",
    colorClass: "text-teal-600 bg-teal-600/10",
  },
  {
    mes: "Junio 2026",
    total: "$595.000",
    estado: "Al día",
    colorClass: "text-teal-600 bg-teal-600/10",
  },
  {
    mes: "Mayo 2026",
    total: "$595.000",
    estado: "Pagado",
    colorClass: "text-teal-600 bg-teal-600/10",
  },
  {
    mes: "Abril 2026",
    total: "$590.000",
    estado: "Pagado",
    colorClass: "text-teal-600 bg-teal-600/10",
  },
  {
    mes: "Marzo 2026",
    total: "$590.000",
    estado: "Pagado",
    colorClass: "text-teal-600 bg-teal-600/10",
  },
];

const unidades: UnidadEntry[] = [
  {
    unidad: "Apto 301 — Torre A",
    estado: "Al día",
    monto: "$0",
    colorClass: "text-teal-600 border-teal-600/20",
    bgClass: "bg-teal-50",
  },
  {
    unidad: "Apto 502 — Torre A",
    estado: "Pendiente",
    monto: "$600.000",
    colorClass: "text-yellow-500 border-yellow-500/20",
    bgClass: "bg-yellow-50",
  },
  {
    unidad: "Apto 108 — Torre B",
    estado: "Moroso",
    monto: "$1.800.000",
    colorClass: "text-rose-600 border-rose-600/20",
    bgClass: "bg-rose-50",
  },
  {
    unidad: "Apto 710 — Torre B",
    estado: "Al día",
    monto: "$0",
    colorClass: "text-teal-600 border-teal-600/20",
    bgClass: "bg-teal-50",
  },
  {
    unidad: "Apto 204 — Torre C",
    estado: "Al día",
    monto: "$0",
    colorClass: "text-teal-600 border-teal-600/20",
    bgClass: "bg-teal-50",
  },
];

const FLIP_CARD_DATA = [
  {
    title: "Desglose mensual",
    description: "Cada peso desglosado por categoría — portería, limpieza, jardín y más.",
    Icon: IconDollar,
  },
  {
    title: "Pago seguro",
    description: "WebPay, transferencia o tarjeta. Pagos procesados en segundos.",
    Icon: IconShield,
  },
  {
    title: "Alertas automáticas",
    description: "Notificación 5 días antes del vencimiento para nunca atrasarte.",
    Icon: IconBell,
  },
  {
    title: "Historial PDF",
    description: "Descarga tu historial de pagos en PDF en cualquier momento.",
    Icon: IconDownload,
  },
];

const alternatingSections: AlternatingSection[] = [
  {
    title: "Transparencia",
    body: "Cada gasto común se desglosa en categorías claras: portería, limpieza, jardín, mantenimiento y más. Sin letra chica ni cobros sorpresa. Tú y el comité tienen acceso a los mismos datos en tiempo real.",
    imgUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=700&h=500&fit=crop",
    imgRight: true,
  },
  {
    title: "Sin morosidad",
    body: "Recibe alertas automáticas antes del vencimiento y paga en segundos desde tu teléfono o computador. Historial de pagos siempre disponible para descargar en PDF. Mantente al día sin esfuerzo.",
    imgUrl: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=700&h=500&fit=crop",
    imgRight: false,
  },
];

export default function Gastos() {
  const { role } = useAuth();
  const isAdmin = role === "admin";

  const [selectedMes, setSelectedMes] = useState("Agosto");
  const [showPayModal, setShowPayModal] = useState(false);
  const [paid, setPaid] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8FAFB]">
      {/* Hero Header */}
      <div className="bg-[#00201B] px-6 pt-[56px] pb-12">
        <div className="max-w-[1280px] mx-auto">
          <p className="text-[11px] font-bold text-teal-300/70 tracking-[0.12em] uppercase mb-2.5">
            Finanzas del condominio
          </p>
          <h1 className="font-serif text-[clamp(32px,4vw,52px)] text-white leading-[1.1] mb-3 font-normal">
            Gastos comunes
          </h1>
          <p className="text-[17px] text-white/65 m-0 max-w-[540px] leading-[1.65]">
            {isAdmin
              ? "Gestiona los gastos comunes de todas las unidades. Edita montos, categorías y revisa el estado de deuda del condominio."
              : "Revisa y paga tus gastos comunes en línea. Desglose mensual transparente, historial completo y alertas automáticas."}
          </p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto p-[40px_24px_80px]">
        {/* Mi situación — solo residente */}
        {!isAdmin && (
          <div className="bg-white border border-slate-200 rounded-2xl p-7 mb-7">
            <div className="flex justify-between items-start flex-wrap gap-5">
              <div>
                <p className="text-[12px] text-slate-400 font-semibold uppercase tracking-[0.08em] mb-1">
                  Unidad 301 — Torre A
                </p>
                <h2 className="font-serif text-[28px] text-[#00201B] mb-2 font-normal">
                  Mi situación
                </h2>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-2 h-2 rounded-full ${paid ? "bg-teal-600" : "bg-yellow-500"}`}
                  />
                  <span
                    className={`text-[14px] font-semibold ${paid ? "text-teal-600" : "text-yellow-500"}`}
                  >
                    {paid ? "Al día" : "Pago pendiente"}
                  </span>
                </div>
              </div>
              <div className="flex gap-4 flex-wrap items-center">
                <div className="text-right">
                  <div className="text-[12px] text-slate-400 mb-0.5">Mes de agosto</div>
                  <div className="font-serif text-[32px] text-[#00201B]">$600.000</div>
                  <div className="text-[12px] text-[#94A3B8]">CLP · Vence el 15 sep 2026</div>
                </div>
                {!paid && (
                  <button
                    onClick={() => setShowPayModal(true)}
                    className="bg-teal-600 hover:bg-teal-800 text-white border-none rounded-xl px-6 py-[13px] text-[14px] font-bold cursor-pointer flex items-center gap-2 transition-colors duration-200"
                  >
                    <IconDollar className="w-[16px] h-[16px]" /> Pagar ahora
                  </button>
                )}
                {paid && (
                  <div className="flex items-center gap-2 text-teal-600 font-semibold text-[14px]">
                    <IconCheck className="w-[18px] h-[18px]" /> Pagado
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-6 mb-7">
          {/* Desglose */}
          <div className="bg-white border border-slate-200 rounded-2xl p-7">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-serif text-[20px] text-[#00201B] m-0 font-normal">
                Desglose mensual
              </h3>
              <select
                aria-label="Filtrar por mes"
                value={selectedMes}
                onChange={(e) => setSelectedMes(e.target.value)}
                className="text-[13px] border border-slate-200 rounded-lg py-[7px] px-3 text-[#00201B] bg-white outline-none"
              >
                {meses.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-[18px]">
              {gastos.map((g) => (
                <div key={g.item}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-[13px] text-[#00201B] font-medium">{g.item}</span>
                    <span className="text-[13px] font-bold text-[#00201B]">{g.mensual}</span>
                  </div>
                  <div className="bg-slate-100 rounded-[4px] h-[7px]">
                    <div
                      className="h-full rounded-[4px]"
                      style={{ width: `${g.pct}%`, backgroundColor: g.color }} // eslint-disable-line react/forbid-dom-props
                    />
                  </div>
                  <div className="text-[11px] text-slate-400 mt-[3px]">
                    {g.pct}% del total · Anual: {g.anual}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-[18px] border-t border-slate-200 flex justify-between">
              <span className="text-[14px] text-slate-500 font-medium">Total mensual</span>
              <span className="font-serif text-[20px] text-[#00201B]">$600.000 CLP</span>
            </div>
          </div>

          {/* Estado por unidad — solo admin */}
          {isAdmin && (
            <div className="bg-white border border-slate-200 rounded-2xl p-7">
              <h3 className="font-serif text-[20px] text-[#00201B] m-0 mb-6 font-normal">
                Estado por unidad
              </h3>
              <div className="flex flex-col gap-2.5">
                {unidades.map((u) => (
                  <div
                    key={u.unidad}
                    className={`flex justify-between items-center py-3 px-3.5 rounded-[10px] border ${u.bgClass} ${u.colorClass.split(" ")[1]}`}
                  >
                    <div>
                      <div className="text-[13px] font-semibold text-[#00201B]">{u.unidad}</div>
                      <div className="text-[12px] text-[#94A3B8]">
                        {u.estado === "Al día" ? "Sin deuda" : `Deuda: ${u.monto}`}
                      </div>
                    </div>
                    <span
                      className={`text-[12px] font-bold py-1 px-2.5 rounded-full ${u.colorClass.split(" ")[0]} ${u.bgClass}`}
                    >
                      {u.estado}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Historial */}
        <div className="bg-white border border-slate-200 rounded-2xl p-7">
          <div className="flex justify-between items-center mb-5">
            <h3 className="font-serif text-[20px] text-[#00201B] m-0 font-normal">
              Historial de pagos
            </h3>
            <button className="flex items-center gap-1.5 text-[13px] font-semibold text-teal-600 bg-transparent border border-teal-600 rounded-lg py-2 px-3.5 cursor-pointer hover:bg-teal-50 transition-colors">
              <IconDownload className="w-[14px] h-[14px]" /> Exportar PDF
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-max border-collapse">
              <thead>
                <tr className="border-b border-slate-200">
                  {["Período", "Total", "Estado", "Acciones"].map((h) => (
                    <th
                      key={h}
                      className="text-left pb-3 text-[11px] font-bold text-slate-400 uppercase tracking-[0.08em]"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {historial.map((h, i) => (
                  <tr
                    key={h.mes}
                    className={i < historial.length - 1 ? "border-b border-slate-100" : ""}
                  >
                    <td className="py-3.5 text-[14px] text-[#00201B] font-medium">{h.mes}</td>
                    <td className="py-3.5 text-[14px] font-bold text-[#00201B]">{h.total}</td>
                    <td className="py-[14px]">
                      <span
                        className={`text-[12px] font-semibold py-1 px-2.5 rounded-full ${h.colorClass}`}
                      >
                        {h.estado}
                      </span>
                    </td>
                    <td className="py-[14px]">
                      <button className="text-[12px] text-teal-600 bg-transparent border-none cursor-pointer flex items-center gap-1 font-medium hover:text-teal-800 transition-colors">
                        <IconDownload className="w-[12px] h-[12px]" /> Descargar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Sub-features: Flip Cards */}
      <div className="bg-white py-[72px] px-6">
        <div className="max-w-[1280px] mx-auto">
          <p className="text-[11px] font-bold text-teal-600 tracking-[0.12em] uppercase mb-2.5">
            Funcionalidades
          </p>
          <h2 className="font-serif text-[clamp(24px,3vw,38px)] text-[#00201B] m-0 mb-10 font-normal">
            Todo bajo control
          </h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-5">
            {FLIP_CARD_DATA.map(({ title, description, Icon }) => (
              <FlipCard
                key={title}
                height={200}
                front={
                  <div className="bg-slate-50 rounded-xl border border-slate-200 h-full flex flex-col items-center justify-center gap-3.5 py-6 px-5 box-border">
                    <Icon className="w-8 h-8 text-teal-600" />
                    <span className="text-[15px] font-semibold text-[#00201B] text-center leading-[1.3]">
                      {title}
                    </span>
                  </div>
                }
                back={
                  <div className="bg-teal-600 rounded-xl h-full flex items-center justify-center py-6 px-5 box-border">
                    <p className="text-white text-[14px] leading-[1.6] m-0 text-center">
                      {description}
                    </p>
                  </div>
                }
              />
            ))}
          </div>
        </div>
      </div>

      {/* Alternating image+text sections */}
      {alternatingSections.map((section, i) => (
        <div
          key={section.title}
          className={`py-20 px-6 ${i % 2 === 0 ? "bg-[#F8FAFB]" : "bg-white"}`}
        >
          <div
            className={`max-w-[1280px] mx-auto flex flex-wrap gap-12 items-center ${
              section.imgRight ? "flex-row" : "flex-row-reverse"
            }`}
          >
            <div className="flex-[1_1_360px]">
              <p className="text-[11px] font-bold text-teal-600 tracking-[0.12em] uppercase mb-3">
                Gastos comunes
              </p>
              <h2 className="font-serif text-[clamp(26px,3vw,40px)] text-[#00201B] m-0 mb-[18px] font-normal leading-[1.15]">
                {section.title}
              </h2>
              <p className="text-[16px] text-slate-500 leading-[1.75] m-0">{section.body}</p>
            </div>
            <div className="flex-[1_1_360px]">
              <img
                src={section.imgUrl}
                alt={section.title}
                className="w-full rounded-[18px] block shadow-[0_16px_48px_rgba(0,0,0,0.1)]"
              />
            </div>
          </div>
        </div>
      ))}

      {/* Role-based CTA strip */}
      <div className="bg-[#00201B] py-14 px-6">
        <div className="max-w-[1280px] mx-auto flex flex-wrap gap-6 justify-center">
          <a
            href="/gastos"
            className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl py-6 px-9 no-underline flex-[1_1_260px] max-w-[380px] transition-colors duration-200 hover:bg-white/10"
          >
            <IconHome className="w-7 h-7 text-teal-300 shrink-0" />
            <div>
              <div className="text-[13px] text-white/50 mb-1">¿Eres residente?</div>
              <div className="text-[16px] font-bold text-white">Paga tus gastos</div>
            </div>
            <IconChevronRight className="w-[18px] h-[18px] text-white/40 ml-auto" />
          </a>
          <a
            href="/dashboard"
            className="flex items-center gap-3 bg-teal-600/15 border border-teal-600/35 rounded-xl py-6 px-9 no-underline flex-[1_1_260px] max-w-[380px] transition-colors duration-200 hover:bg-teal-600/25"
          >
            <IconShield className="w-7 h-7 text-teal-300 shrink-0" />
            <div>
              <div className="text-[13px] text-white/50 mb-1">¿Eres del comité?</div>
              <div className="text-[16px] font-bold text-white">Ir al dashboard</div>
            </div>
            <IconChevronRight className="w-[18px] h-[18px] text-white/40 ml-auto" />
          </a>
        </div>
      </div>

      {/* Pay modal */}
      {showPayModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-5">
          <button
            type="button"
            aria-label="Cerrar"
            onClick={() => setShowPayModal(false)}
            className="absolute inset-0 bg-[#00201B]/60 backdrop-blur-[4px] border-none p-0 cursor-default"
          />
          <div className="relative bg-white rounded-[20px] w-full max-w-[440px] py-8 px-7 shadow-[0_24px_80px_rgba(0,0,0,0.2)]">
            <h3 className="font-serif text-[22px] text-[#00201B] m-0 mb-1.5 font-normal">
              Pagar gasto común
            </h3>
            <p className="text-[13px] text-slate-500 m-0 mb-6">Agosto 2026 · Unidad 301 Torre A</p>
            <div className="bg-[#F8FAFB] rounded-xl py-4 px-[18px] mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-[14px] text-slate-500">Total a pagar</span>
                <span className="text-[18px] font-bold text-[#00201B]">$600.000 CLP</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[13px] text-slate-400">Vence el</span>
                <span className="text-[13px] text-slate-400">15 sep 2026</span>
              </div>
            </div>
            <div className="mb-5">
              <div className="text-[13px] font-semibold text-[#00201B] mb-3">Método de pago</div>
              {["Tarjeta de crédito/débito", "Transferencia bancaria", "WebPay"].map((m) => (
                <label
                  key={m}
                  className="flex items-center gap-2.5 py-2.5 cursor-pointer border-b border-slate-100 text-[14px] text-[#00201B]"
                >
                  <input
                    type="radio"
                    name="pago"
                    defaultChecked={m === "WebPay"}
                    className="accent-teal-600"
                  />{" "}
                  {m}
                </label>
              ))}
            </div>
            <button
              onClick={() => {
                setPaid(true);
                setShowPayModal(false);
              }}
              className="w-full p-3.5 text-[15px] font-bold rounded-[10px] border-none bg-teal-600 text-white cursor-pointer transition-colors duration-200 hover:bg-teal-800"
              data-cuelume-press="tick"
              data-cuelume-release="chime"
            >
              Confirmar pago
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
