/* eslint-disable react/forbid-dom-props */
import { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { avisos } from "../lib/data";
import { FlipCard } from "../components/FlipCard";
import {
  IconPlus,
  IconBell,
  IconCheck,
  IconUsers,
  IconCalendar,
  IconMessage,
  IconHome,
  IconChevronRight,
} from "../components/icons/Icons";

const tipos = ["Todos", "Asamblea", "Mantención", "Aviso"];

type BadgeKey = "primary" | "accent" | "warning";
const badgeClasses: Record<
  BadgeKey,
  {
    border: string;
    label: string;
    text: string;
  }
> = {
  primary: {
    border: "border-l-primary",
    label: "bg-primary/10 text-primary",
    text: "text-primary",
  },
  accent: {
    border: "border-l-accent",
    label: "bg-accent/10 text-accent",
    text: "text-accent",
  },
  warning: {
    border: "border-l-alert-yellow",
    label: "bg-alert-yellow/20 text-text",
    text: "text-text",
  },
};

interface FlipCardData {
  title: string;
  desc: string;
  icon: React.ReactNode;
}

const flipCards: FlipCardData[] = [
  {
    title: "Avisos del comité",
    desc: "Comunicados oficiales, mantenciones y cambios de reglamento.",
    icon: <IconBell className="w-[28px] h-[28px] text-[#0D9488]" />,
  },
  {
    title: "Asambleas",
    desc: "Convocatorias con confirmación de asistencia directa desde la plataforma.",
    icon: <IconCalendar className="w-[28px] h-[28px] text-[#0D9488]" />,
  },
  {
    title: "Publicaciones de residentes",
    desc: "Pérdidas, arriendos y noticias de la comunidad.",
    icon: <IconMessage className="w-[28px] h-[28px] text-[#0D9488]" />,
  },
  {
    title: "Notificaciones push",
    desc: "Cada aviso nuevo llega a tu teléfono automáticamente.",
    icon: <IconHome className="w-[28px] h-[28px] text-[#0D9488]" />,
  },
];

interface AltSection {
  title: string;
  body: string;
  imgUrl: string;
  imgLeft: boolean;
}

const altSections: AltSection[] = [
  {
    title: "Comunicación efectiva",
    body: "El tablón digital garantiza que cada aviso llegue a todos los residentes al mismo tiempo. Sin carteles deteriorados, sin información desactualizada. La comunidad siempre informada.",
    imgUrl: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=700&h=500&fit=crop",
    imgLeft: true,
  },
  {
    title: "Sin papel",
    body: "Adiós a las impresiones y las hojas pegadas en el ascensor. Cada publicación queda almacenada con fecha, autor y tipo, disponible para consultar en cualquier momento desde cualquier dispositivo.",
    imgUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=700&h=500&fit=crop",
    imgLeft: false,
  },
];

export default function Tablon() {
  const { role } = useAuth();
  const canPublishDirect = role === "admin" || role === "comite";

  const [activeTipo, setActiveTipo] = useState("Todos");
  const [confirmados, setConfirmados] = useState<Record<number, boolean>>({});
  const [showNew, setShowNew] = useState(false);

  const filtered = avisos.filter((a) => activeTipo === "Todos" || a.tipo === activeTipo);

  return (
    <div className="min-h-screen bg-[#F8FAFB]">
      {/* Dark hero header */}
      <div className="bg-[#00201B] p-[72px_24px_64px]">
        <div className="max-w-[1280px] mx-auto">
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "rgba(255,255,255,0.45)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            Cartelera digital
          </p>
          <h1
            style={{
              fontFamily: "Gloock, Georgia, serif",
              fontSize: "clamp(36px, 5vw, 64px)",
              color: "#fff",
              lineHeight: 1.08,
              margin: "0 0 18px",
              fontWeight: 400,
            }}
          >
            Tablón de avisos
          </h1>
          <p
            style={{
              fontSize: 19,
              color: "rgba(255,255,255,0.65)",
              margin: 0,
              maxWidth: 540,
              lineHeight: 1.65,
            }}
          >
            Información del condominio, siempre al día
          </p>
        </div>
      </div>

      {/* Existing header strip (gradient) */}
      <div
        style={{
          background: "linear-gradient(135deg, #0D9488 0%, #005047 100%)",
          padding: "40px 24px 36px",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          <div>
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "rgba(255,255,255,0.6)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: 10,
              }}
            >
              Cartelera digital
            </p>
            <h2
              style={{
                fontFamily: "Gloock, Georgia, serif",
                fontSize: "clamp(24px, 3vw, 36px)",
                color: "#fff",
                lineHeight: 1.1,
                margin: "0 0 10px",
                fontWeight: 400,
              }}
            >
              Tablón de Eventos y Avisos
            </h2>
            <p
              style={{
                fontSize: 15,
                color: "rgba(255,255,255,0.72)",
                margin: 0,
                maxWidth: 520,
                lineHeight: 1.65,
              }}
            >
              Cartelera digital comunitaria con avisos, asambleas y comunicados del comité — en
              tiempo real.
            </p>
          </div>
          <button
            onClick={() => setShowNew(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              background: "#fff",
              color: "#005047",
              border: "none",
              borderRadius: 10,
              padding: "12px 20px",
              fontSize: 14,
              fontWeight: 700,
              cursor: "pointer",
              transition: "opacity 0.2s",
              whiteSpace: "nowrap",
            }}
          >
            <IconPlus className="w-[16px] h-[16px]" />
            {canPublishDirect ? "Publicar aviso" : "Solicitar publicación"}
          </button>
        </div>
      </div>

      {/* Main notices content */}
      <div className="max-w-[1280px] mx-auto p-[40px_24px_80px]">
        {/* Filters & stats */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
            marginBottom: 32,
          }}
        >
          <div style={{ display: "flex", gap: 8 }}>
            {tipos.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTipo(t)}
                style={{
                  padding: "8px 16px",
                  borderRadius: 100,
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: "pointer",
                  border: "1px solid",
                  borderColor: activeTipo === t ? "#0D9488" : "#E2E8F0",
                  background: activeTipo === t ? "#0D9488" : "#fff",
                  color: activeTipo === t ? "#fff" : "#64748B",
                  transition: "border-color 0.15s, background 0.15s, color 0.15s",
                }}
              >
                {t}
              </button>
            ))}
          </div>
          <div style={{ fontSize: 13, color: "#94A3B8" }}>{filtered.length} publicaciones</div>
        </div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: 20,
          }}
        >
          {filtered.map((a) => {
            const idx = avisos.indexOf(a);
            const yaConfirmado = confirmados[idx];
            const bc = badgeClasses[a.badge as BadgeKey] ?? badgeClasses.primary;
            return (
              <div
                key={a.titulo}
                className={`bg-surface border border-border border-l-4 ${bc.border} rounded-2xl overflow-hidden transition-[box-shadow,transform] duration-200 hover:shadow-lg hover:-translate-y-0.5`}
              >
                <div style={{ padding: "22px 22px 0" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 12,
                    }}
                  >
                    <span
                      className={`text-[11px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full ${bc.label}`}
                    >
                      {a.tipo}
                    </span>
                    <span className="text-[12px] text-[#94A3B8]">{a.fecha}</span>
                  </div>
                  <h3
                    style={{
                      fontFamily: "Gloock, Georgia, serif",
                      fontSize: 17,
                      color: "#00201B",
                      margin: "0 0 10px",
                      fontWeight: 400,
                      lineHeight: 1.3,
                    }}
                  >
                    {a.titulo}
                  </h3>
                  <p
                    style={{
                      fontSize: 13,
                      color: "#64748B",
                      lineHeight: 1.65,
                      margin: "0 0 16px",
                    }}
                  >
                    {a.desc}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: 12,
                      color: "#94A3B8",
                      marginBottom: 16,
                    }}
                  >
                    <IconBell className="w-[12px] h-[12px]" /> Publicado por:{" "}
                    <strong style={{ color: "#64748B" }}>{a.autor}</strong>
                  </div>
                </div>
                {a.confirmacion && (
                  <div
                    style={{
                      borderTop: "1px solid #F1F5F9",
                      padding: "14px 22px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 12,
                        color: "#64748B",
                      }}
                    >
                      <IconUsers className="w-[13px] h-[13px]" />
                      {a.confirmados + (yaConfirmado ? 1 : 0)} confirmados
                    </div>
                    <button
                      onClick={() =>
                        setConfirmados((prev) => ({
                          ...prev,
                          [idx]: !prev[idx],
                        }))
                      }
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 12,
                        fontWeight: 600,
                        padding: "7px 14px",
                        borderRadius: 8,
                        border: "1px solid",
                        cursor: "pointer",
                        transition: "border-color 0.15s, background 0.15s, color 0.15s",
                        borderColor: yaConfirmado ? "#0D9488" : "#E2E8F0",
                        background: yaConfirmado ? "#F0FDFA" : "#fff",
                        color: yaConfirmado ? "#0D9488" : "#64748B",
                      }}
                    >
                      <IconCheck className="w-[12px] h-[12px]" />
                      {yaConfirmado ? "Confirmado" : "Confirmar asistencia"}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Sub-features flip cards */}
      <div className="bg-[#fff] p-[80px_24px]">
        <div className="max-w-[1280px] mx-auto">
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#0D9488",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Funcionalidades
          </p>
          <h2
            style={{
              fontFamily: "Gloock, Georgia, serif",
              fontSize: "clamp(28px, 3.5vw, 44px)",
              color: "#00201B",
              margin: "0 0 48px",
              fontWeight: 400,
            }}
          >
            Todo lo que necesitas en un tablón
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: 20,
            }}
          >
            {flipCards.map((card) => (
              <FlipCard
                key={card.title}
                height={200}
                front={
                  <div
                    style={{
                      height: "100%",
                      background: "#F8FAFB",
                      borderRadius: 16,
                      border: "1px solid #E2E8F0",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "24px",
                      textAlign: "center",
                      gap: 14,
                    }}
                  >
                    {card.icon}
                    <span
                      style={{
                        fontSize: 15,
                        fontWeight: 700,
                        color: "#00201B",
                        lineHeight: 1.3,
                      }}
                    >
                      {card.title}
                    </span>
                  </div>
                }
                back={
                  <div
                    style={{
                      height: "100%",
                      background: "#0D9488",
                      borderRadius: 16,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "24px",
                      textAlign: "center",
                    }}
                  >
                    <span className="text-[14px] text-[#fff] leading-[1.6]">{card.desc}</span>
                  </div>
                }
              />
            ))}
          </div>
        </div>
      </div>

      {/* Alternating image+text sections */}
      {altSections.map((section) => (
        <div
          key={section.title}
          style={{
            padding: "80px 24px",
            background: section.imgLeft ? "#F8FAFB" : "#fff",
          }}
        >
          <div
            style={{
              maxWidth: 1280,
              margin: "0 auto",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 64,
              alignItems: "center",
            }}
          >
            {section.imgLeft ? (
              <>
                <img
                  src={section.imgUrl}
                  alt={section.title}
                  style={{
                    width: "100%",
                    height: 380,
                    objectFit: "cover",
                    borderRadius: 20,
                    boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
                  }}
                />
                <div>
                  <h2
                    style={{
                      fontFamily: "Gloock, Georgia, serif",
                      fontSize: "clamp(26px, 3vw, 40px)",
                      color: "#00201B",
                      margin: "0 0 20px",
                      fontWeight: 400,
                      lineHeight: 1.2,
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
              </>
            ) : (
              <>
                <div>
                  <h2
                    style={{
                      fontFamily: "Gloock, Georgia, serif",
                      fontSize: "clamp(26px, 3vw, 40px)",
                      color: "#00201B",
                      margin: "0 0 20px",
                      fontWeight: 400,
                      lineHeight: 1.2,
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
                <img
                  src={section.imgUrl}
                  alt={section.title}
                  style={{
                    width: "100%",
                    height: 380,
                    objectFit: "cover",
                    borderRadius: 20,
                    boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
                  }}
                />
              </>
            )}
          </div>
        </div>
      ))}

      {/* CTA strip */}
      <div className="bg-[#00201B] p-[64px_24px]">
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <Link
            to="/tablon"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#0D9488",
              color: "#fff",
              borderRadius: 12,
              padding: "16px 32px",
              fontSize: 15,
              fontWeight: 700,
              textDecoration: "none",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#005047")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#0D9488")}
          >
            Ver los avisos <IconChevronRight className="w-[16px] h-[16px]" />
          </Link>
          <button
            onClick={() => setShowNew(true)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "transparent",
              color: "#fff",
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.3)",
              padding: "16px 32px",
              fontSize: 15,
              fontWeight: 700,
              cursor: "pointer",
              transition: "border-color 0.2s, background 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "#fff";
              e.currentTarget.style.background = "rgba(255,255,255,0.06)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            {canPublishDirect ? "Publicar aviso" : "Solicitar publicación"}{" "}
            <IconChevronRight className="w-[16px] h-[16px]" />
          </button>
        </div>
      </div>

      {/* New post modal */}
      {showNew && (
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
            onClick={() => setShowNew(false)}
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
              maxWidth: 480,
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
              {canPublishDirect ? "Publicar aviso" : "Solicitar publicación"}
            </h3>
            <p style={{ fontSize: 13, color: "#64748B", margin: "0 0 24px" }}>
              {canPublishDirect
                ? "El aviso quedará publicado de inmediato en el tablón comunitario."
                : "Tu solicitud será revisada por el comité antes de publicarse."}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <div>
                <label
                  htmlFor="nuevo-aviso-tipo"
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#64748B",
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  Tipo
                </label>
                <select
                  id="nuevo-aviso-tipo"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1px solid #E2E8F0",
                    borderRadius: 8,
                    fontSize: 14,
                    color: "#00201B",
                    background: "#fff",
                    outline: "none",
                  }}
                >
                  <option>Aviso de interés comunitario</option>
                  <option>Rifa / bazar</option>
                  <option>Venta</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="nuevo-aviso-titulo"
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#64748B",
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  Título
                </label>
                <input
                  id="nuevo-aviso-titulo"
                  type="text"
                  placeholder="Título del aviso"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1px solid #E2E8F0",
                    borderRadius: 8,
                    fontSize: 14,
                    color: "#00201B",
                    outline: "none",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#0D9488")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#E2E8F0")}
                />
              </div>
              <div>
                <label
                  htmlFor="nuevo-aviso-desc"
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#64748B",
                    display: "block",
                    marginBottom: 6,
                  }}
                >
                  Descripción
                </label>
                <textarea
                  id="nuevo-aviso-desc"
                  rows={4}
                  placeholder="Descripción detallada..."
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    border: "1px solid #E2E8F0",
                    borderRadius: 8,
                    fontSize: 14,
                    color: "#00201B",
                    outline: "none",
                    resize: "vertical",
                    fontFamily: "inherit",
                    boxSizing: "border-box",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#0D9488")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#E2E8F0")}
                />
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 24 }}>
              <button
                onClick={() => setShowNew(false)}
                style={{
                  flex: 1,
                  padding: "12px",
                  fontSize: 14,
                  fontWeight: 600,
                  borderRadius: 10,
                  border: "1px solid #E2E8F0",
                  background: "#fff",
                  color: "#64748B",
                  cursor: "pointer",
                }}
              >
                Cancelar
              </button>
              <button
                onClick={() => setShowNew(false)}
                style={{
                  flex: 2,
                  padding: "12px",
                  fontSize: 14,
                  fontWeight: 700,
                  borderRadius: 10,
                  border: "none",
                  background: "#0D9488",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                {canPublishDirect ? "Publicar" : "Enviar solicitud"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
