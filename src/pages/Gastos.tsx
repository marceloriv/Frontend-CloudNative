/* eslint-disable react/forbid-dom-props */
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
  estadoColor: string;
}

interface UnidadEntry {
  unidad: string;
  estado: string;
  monto: string;
  color: string;
  bg: string;
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
    estadoColor: "#0D9488",
  },
  {
    mes: "Julio 2026",
    total: "$600.000",
    estado: "Al día",
    estadoColor: "#0D9488",
  },
  {
    mes: "Junio 2026",
    total: "$595.000",
    estado: "Al día",
    estadoColor: "#0D9488",
  },
  {
    mes: "Mayo 2026",
    total: "$595.000",
    estado: "Pagado",
    estadoColor: "#0D9488",
  },
  {
    mes: "Abril 2026",
    total: "$590.000",
    estado: "Pagado",
    estadoColor: "#0D9488",
  },
  {
    mes: "Marzo 2026",
    total: "$590.000",
    estado: "Pagado",
    estadoColor: "#0D9488",
  },
];

const unidades: UnidadEntry[] = [
  {
    unidad: "Apto 301 — Torre A",
    estado: "Al día",
    monto: "$0",
    color: "#0D9488",
    bg: "#F0FDFA",
  },
  {
    unidad: "Apto 502 — Torre A",
    estado: "Pendiente",
    monto: "$600.000",
    color: "#EAB308",
    bg: "#FEFCE8",
  },
  {
    unidad: "Apto 108 — Torre B",
    estado: "Moroso",
    monto: "$1.800.000",
    color: "#E11D48",
    bg: "#FFF1F2",
  },
  {
    unidad: "Apto 710 — Torre B",
    estado: "Al día",
    monto: "$0",
    color: "#0D9488",
    bg: "#F0FDFA",
  },
  {
    unidad: "Apto 204 — Torre C",
    estado: "Al día",
    monto: "$0",
    color: "#0D9488",
    bg: "#F0FDFA",
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
      <div style={{ background: "#00201B", padding: "56px 24px 48px" }}>
        <div className="max-w-[1280px] mx-auto">
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "rgba(94,234,212,0.7)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Finanzas del condominio
          </p>
          <h1
            style={{
              fontFamily: "Gloock, Georgia, serif",
              fontSize: "clamp(32px, 4vw, 52px)",
              color: "#fff",
              lineHeight: 1.1,
              margin: "0 0 12px",
              fontWeight: 400,
            }}
          >
            Gastos comunes
          </h1>
          <p
            style={{
              fontSize: 17,
              color: "rgba(255,255,255,0.65)",
              margin: 0,
              maxWidth: 540,
              lineHeight: 1.65,
            }}
          >
            {isAdmin
              ? "Gestiona los gastos comunes de todas las unidades. Edita montos, categorías y revisa el estado de deuda del condominio."
              : "Revisa y paga tus gastos comunes en línea. Desglose mensual transparente, historial completo y alertas automáticas."}
          </p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto p-[40px_24px_80px]">
        {/* Mi situación — solo residente */}
        {!isAdmin && (
          <div
            style={{
              background: "#fff",
              border: "1px solid #E2E8F0",
              borderRadius: 16,
              padding: "28px",
              marginBottom: 28,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                flexWrap: "wrap",
                gap: 20,
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: 12,
                    color: "#94A3B8",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    margin: "0 0 4px",
                  }}
                >
                  Unidad 301 — Torre A
                </p>
                <h2
                  style={{
                    fontFamily: "Gloock, Georgia, serif",
                    fontSize: 28,
                    color: "#00201B",
                    margin: "0 0 8px",
                    fontWeight: 400,
                  }}
                >
                  Mi situación
                </h2>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: paid ? "#0D9488" : "#EAB308",
                    }}
                  />
                  <span
                    style={{
                      fontSize: 14,
                      color: paid ? "#0D9488" : "#EAB308",
                      fontWeight: 600,
                    }}
                  >
                    {paid ? "Al día" : "Pago pendiente"}
                  </span>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 16,
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 12, color: "#94A3B8", marginBottom: 2 }}>
                    Mes de agosto
                  </div>
                  <div
                    style={{
                      fontFamily: "Gloock, Georgia, serif",
                      fontSize: 32,
                      color: "#00201B",
                    }}
                  >
                    $600.000
                  </div>
                  <div className="text-[12px] text-[#94A3B8]">CLP · Vence el 15 sep 2026</div>
                </div>
                {!paid && (
                  <button
                    onClick={() => setShowPayModal(true)}
                    style={{
                      background: "#0D9488",
                      color: "#fff",
                      border: "none",
                      borderRadius: 10,
                      padding: "13px 24px",
                      fontSize: 14,
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#005047")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "#0D9488")}
                  >
                    <IconDollar className="w-[16px] h-[16px]" /> Pagar ahora
                  </button>
                )}
                {paid && (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      color: "#0D9488",
                      fontWeight: 600,
                      fontSize: 14,
                    }}
                  >
                    <IconCheck className="w-[18px] h-[18px]" /> Pagado
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
            marginBottom: 28,
          }}
        >
          {/* Desglose */}
          <div
            style={{
              background: "#fff",
              border: "1px solid #E2E8F0",
              borderRadius: 16,
              padding: "28px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 24,
              }}
            >
              <h3
                style={{
                  fontFamily: "Gloock, Georgia, serif",
                  fontSize: 20,
                  color: "#00201B",
                  margin: 0,
                  fontWeight: 400,
                }}
              >
                Desglose mensual
              </h3>
              <select
                aria-label="Filtrar por mes"
                value={selectedMes}
                onChange={(e) => setSelectedMes(e.target.value)}
                style={{
                  fontSize: 13,
                  border: "1px solid #E2E8F0",
                  borderRadius: 8,
                  padding: "7px 12px",
                  color: "#00201B",
                  background: "#fff",
                  outline: "none",
                }}
              >
                {meses.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {gastos.map((g) => (
                <div key={g.item}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 6,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 13,
                        color: "#00201B",
                        fontWeight: 500,
                      }}
                    >
                      {g.item}
                    </span>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#00201B",
                      }}
                    >
                      {g.mensual}
                    </span>
                  </div>
                  <div
                    style={{
                      background: "#F1F5F9",
                      borderRadius: 4,
                      height: 7,
                    }}
                  >
                    <div
                      style={{
                        width: `${g.pct}%`,
                        height: "100%",
                        borderRadius: 4,
                        background: g.color,
                      }}
                    />
                  </div>
                  <div style={{ fontSize: 11, color: "#94A3B8", marginTop: 3 }}>
                    {g.pct}% del total · Anual: {g.anual}
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: 24,
                paddingTop: 18,
                borderTop: "1px solid #E2E8F0",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span style={{ fontSize: 14, color: "#64748B", fontWeight: 500 }}>Total mensual</span>
              <span
                style={{
                  fontFamily: "Gloock, Georgia, serif",
                  fontSize: 20,
                  color: "#00201B",
                }}
              >
                $600.000 CLP
              </span>
            </div>
          </div>

          {/* Estado por unidad — solo admin */}
          {isAdmin && (
            <div
              style={{
                background: "#fff",
                border: "1px solid #E2E8F0",
                borderRadius: 16,
                padding: "28px",
              }}
            >
              <h3
                style={{
                  fontFamily: "Gloock, Georgia, serif",
                  fontSize: 20,
                  color: "#00201B",
                  margin: "0 0 24px",
                  fontWeight: 400,
                }}
              >
                Estado por unidad
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {unidades.map((u) => (
                  <div
                    key={u.unidad}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "12px 14px",
                      borderRadius: 10,
                      background: u.bg,
                      border: `1px solid ${u.color}22`,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#00201B",
                        }}
                      >
                        {u.unidad}
                      </div>
                      <div className="text-[12px] text-[#94A3B8]">
                        {u.estado === "Al día" ? "Sin deuda" : `Deuda: ${u.monto}`}
                      </div>
                    </div>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: u.color,
                        background: `${u.color}18`,
                        padding: "4px 10px",
                        borderRadius: 100,
                      }}
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
        <div
          style={{
            background: "#fff",
            border: "1px solid #E2E8F0",
            borderRadius: 16,
            padding: "28px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <h3
              style={{
                fontFamily: "Gloock, Georgia, serif",
                fontSize: 20,
                color: "#00201B",
                margin: 0,
                fontWeight: 400,
              }}
            >
              Historial de pagos
            </h3>
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: 13,
                fontWeight: 600,
                color: "#0D9488",
                background: "none",
                border: "1px solid #0D9488",
                borderRadius: 8,
                padding: "8px 14px",
                cursor: "pointer",
              }}
            >
              <IconDownload className="w-[14px] h-[14px]" /> Exportar PDF
            </button>
          </div>
          <div className="overflow-x-auto">
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #E2E8F0" }}>
                  {["Período", "Total", "Estado", "Acciones"].map((h) => (
                    <th
                      key={h}
                      style={{
                        textAlign: "left",
                        padding: "0 0 12px",
                        fontSize: 11,
                        fontWeight: 700,
                        color: "#94A3B8",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                      }}
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
                    style={{
                      borderBottom: i < historial.length - 1 ? "1px solid #F1F5F9" : "none",
                    }}
                  >
                    <td
                      style={{
                        padding: "14px 0",
                        fontSize: 14,
                        color: "#00201B",
                        fontWeight: 500,
                      }}
                    >
                      {h.mes}
                    </td>
                    <td
                      style={{
                        padding: "14px 0",
                        fontSize: 14,
                        fontWeight: 700,
                        color: "#00201B",
                      }}
                    >
                      {h.total}
                    </td>
                    <td className="py-[14px]">
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: h.estadoColor,
                          background: `${h.estadoColor}18`,
                          padding: "4px 10px",
                          borderRadius: 100,
                        }}
                      >
                        {h.estado}
                      </span>
                    </td>
                    <td className="py-[14px]">
                      <button
                        style={{
                          fontSize: 12,
                          color: "#0D9488",
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                          fontWeight: 500,
                        }}
                      >
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
      <div style={{ background: "#fff", padding: "72px 24px" }}>
        <div className="max-w-[1280px] mx-auto">
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#0D9488",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Funcionalidades
          </p>
          <h2
            style={{
              fontFamily: "Gloock, Georgia, serif",
              fontSize: "clamp(24px, 3vw, 38px)",
              color: "#00201B",
              margin: "0 0 40px",
              fontWeight: 400,
            }}
          >
            Todo bajo control
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
              gap: 20,
            }}
          >
            {FLIP_CARD_DATA.map(({ title, description, Icon }) => (
              <FlipCard
                key={title}
                height={200}
                front={
                  <div
                    style={{
                      background: "#F8FAFB",
                      borderRadius: 14,
                      border: "1px solid #E2E8F0",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 14,
                      padding: "24px 20px",
                      boxSizing: "border-box",
                    }}
                  >
                    <Icon style={{ width: 32, height: 32, color: "#0D9488" }} />
                    <span
                      style={{
                        fontSize: 15,
                        fontWeight: 600,
                        color: "#00201B",
                        textAlign: "center",
                        lineHeight: 1.3,
                      }}
                    >
                      {title}
                    </span>
                  </div>
                }
                back={
                  <div
                    style={{
                      background: "#0D9488",
                      borderRadius: 14,
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "24px 20px",
                      boxSizing: "border-box",
                    }}
                  >
                    <p
                      style={{
                        color: "#fff",
                        fontSize: 14,
                        lineHeight: 1.6,
                        margin: 0,
                        textAlign: "center",
                      }}
                    >
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
          style={{
            background: i % 2 === 0 ? "#F8FAFB" : "#fff",
            padding: "80px 24px",
          }}
        >
          <div
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              display: "flex",
              flexWrap: "wrap",
              gap: 48,
              alignItems: "center",
              flexDirection: section.imgRight ? "row" : "row-reverse",
            }}
          >
            <div style={{ flex: "1 1 360px" }}>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#0D9488",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                Gastos comunes
              </p>
              <h2
                style={{
                  fontFamily: "Gloock, Georgia, serif",
                  fontSize: "clamp(26px, 3vw, 40px)",
                  color: "#00201B",
                  margin: "0 0 18px",
                  fontWeight: 400,
                  lineHeight: 1.15,
                }}
              >
                {section.title}
              </h2>
              <p
                style={{
                  fontSize: 16,
                  color: "#64748B",
                  lineHeight: 1.75,
                  margin: 0,
                }}
              >
                {section.body}
              </p>
            </div>
            <div style={{ flex: "1 1 360px" }}>
              <img
                src={section.imgUrl}
                alt={section.title}
                style={{
                  width: "100%",
                  borderRadius: 18,
                  display: "block",
                  boxShadow: "0 16px 48px rgba(0,0,0,0.1)",
                }}
              />
            </div>
          </div>
        </div>
      ))}

      {/* Role-based CTA strip */}
      <div style={{ background: "#00201B", padding: "56px 24px" }}>
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            gap: 24,
            justifyContent: "center",
          }}
        >
          <a
            href="/gastos"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 14,
              padding: "24px 36px",
              textDecoration: "none",
              flex: "1 1 260px",
              maxWidth: 380,
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.10)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.06)")}
          >
            <IconHome style={{ width: 28, height: 28, color: "#5EEAD4", flexShrink: 0 }} />
            <div>
              <div
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.5)",
                  marginBottom: 4,
                }}
              >
                ¿Eres residente?
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>Paga tus gastos</div>
            </div>
            <IconChevronRight
              style={{
                width: 18,
                height: 18,
                color: "rgba(255,255,255,0.4)",
                marginLeft: "auto",
              }}
            />
          </a>
          <a
            href="/dashboard"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: "rgba(13,148,136,0.15)",
              border: "1px solid rgba(13,148,136,0.35)",
              borderRadius: 14,
              padding: "24px 36px",
              textDecoration: "none",
              flex: "1 1 260px",
              maxWidth: 380,
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(13,148,136,0.25)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(13,148,136,0.15)")}
          >
            <IconShield style={{ width: 28, height: 28, color: "#5EEAD4", flexShrink: 0 }} />
            <div>
              <div
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.5)",
                  marginBottom: 4,
                }}
              >
                ¿Eres del comité?
              </div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>Ir al dashboard</div>
            </div>
            <IconChevronRight
              style={{
                width: 18,
                height: 18,
                color: "rgba(255,255,255,0.4)",
                marginLeft: "auto",
              }}
            />
          </a>
        </div>
      </div>

      {/* Pay modal */}
      {showPayModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <button
            type="button"
            aria-label="Cerrar"
            onClick={() => setShowPayModal(false)}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,32,27,0.6)",
              backdropFilter: "blur(4px)",
              border: "none",
              padding: 0,
              cursor: "default",
            }}
          />
          <div
            style={{
              position: "relative",
              background: "#fff",
              borderRadius: 20,
              width: "100%",
              maxWidth: 440,
              padding: "32px 28px",
              boxShadow: "0 24px 80px rgba(0,0,0,0.2)",
            }}
          >
            <h3
              style={{
                fontFamily: "Gloock, Georgia, serif",
                fontSize: 22,
                color: "#00201B",
                margin: "0 0 6px",
              }}
            >
              Pagar gasto común
            </h3>
            <p style={{ fontSize: 13, color: "#64748B", margin: "0 0 24px" }}>
              Agosto 2026 · Unidad 301 Torre A
            </p>
            <div
              style={{
                background: "#F8FAFB",
                borderRadius: 12,
                padding: "16px 18px",
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <span style={{ fontSize: 14, color: "#64748B" }}>Total a pagar</span>
                <span style={{ fontSize: 18, fontWeight: 700, color: "#00201B" }}>
                  $600.000 CLP
                </span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 13, color: "#94A3B8" }}>Vence el</span>
                <span style={{ fontSize: 13, color: "#94A3B8" }}>15 sep 2026</span>
              </div>
            </div>
            <div style={{ marginBottom: 20 }}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#00201B",
                  marginBottom: 12,
                }}
              >
                Método de pago
              </div>
              {["Tarjeta de crédito/débito", "Transferencia bancaria", "WebPay"].map((m) => (
                <label
                  key={m}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "10px 0",
                    cursor: "pointer",
                    borderBottom: "1px solid #F1F5F9",
                    fontSize: 14,
                    color: "#00201B",
                  }}
                >
                  <input
                    type="radio"
                    name="pago"
                    defaultChecked={m === "WebPay"}
                    style={{ accentColor: "#0D9488" }}
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
              style={{
                width: "100%",
                padding: "14px",
                fontSize: 15,
                fontWeight: 700,
                borderRadius: 10,
                border: "none",
                background: "#0D9488",
                color: "#fff",
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#005047")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#0D9488")}
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
