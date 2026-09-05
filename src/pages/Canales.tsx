/* eslint-disable react/forbid-dom-props */
import React from "react";
import { Link } from "react-router";
import { channels } from "../lib/data";
import { FlipCard } from "../components/FlipCard";
import {
  IconPhone,
  IconMail,
  IconShield,
  IconAlertTriangle,
  IconBell,
  IconHome,
  IconDollar,
  IconUsers,
  IconChevronRight,
} from "../components/icons/Icons";

const urgenciaBadge: Record<
  string,
  {
    label: string;
    color: string;
    bg: string;
  }
> = {
  alta: { label: "Prioridad alta", color: "#EAB308", bg: "#FEFCE8" },
  media: { label: "Prioridad media", color: "#0D9488", bg: "#F0FDFA" },
  critica: { label: "Emergencia", color: "#E11D48", bg: "#FFF1F2" },
};

const iconMap: Record<string, React.ReactNode> = {
  Conserjería: <IconBell className="w-[22px] h-[22px]" />,
  "Comité de administración": <IconHome className="w-[22px] h-[22px]" />,
  Administración: <IconDollar className="w-[22px] h-[22px]" />,
  "Seguridad del sector": <IconShield className="w-[22px] h-[22px]" />,
  Emergencias: <IconAlertTriangle className="w-[22px] h-[22px]" />,
};

interface FlipCardData {
  title: string;
  desc: string;
  icon: React.ReactNode;
}

const flipCards: FlipCardData[] = [
  {
    title: "Conserjería 24/7",
    desc: "Llama directamente desde la plataforma — interno 100.",
    icon: <IconBell className="w-[28px] h-[28px] text-[#0D9488]" />,
  },
  {
    title: "Comité",
    desc: "Contacta al presidente o cualquier miembro del comité.",
    icon: <IconUsers className="w-[28px] h-[28px] text-[#0D9488]" />,
  },
  {
    title: "Plan Cuadrante",
    desc: "Solicita patrulla directamente al Plan Cuadrante de tu sector.",
    icon: <IconShield className="w-[28px] h-[28px] text-[#0D9488]" />,
  },
  {
    title: "Bomberos y SAMU",
    desc: "Botones de acceso rápido: 133, 132 y 131.",
    icon: <IconAlertTriangle className="w-[28px] h-[28px] text-[#0D9488]" />,
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
    title: "Respuesta rápida",
    body: "En situaciones de emergencia, cada segundo cuenta. Los canales integrados de la plataforma permiten contactar a conserjería, comité o servicios de emergencia con un solo clic, sin buscar números guardados.",
    imgUrl: "https://images.unsplash.com/photo-1651514645933-c26e0eb4ace3?w=700&h=500&fit=crop",
    imgLeft: true,
  },
  {
    title: "Red de contactos",
    body: "Toda la información de contacto del condominio centralizada y siempre actualizada: conserjería, comité, administración, Plan Cuadrante y servicios de emergencia. Sin papel, sin listas desactualizadas.",
    imgUrl: "https://images.unsplash.com/photo-1584467735867-4297ae2ebcee?w=700&h=500&fit=crop",
    imgLeft: false,
  },
];

export default function Canales() {
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
            Contacto directo
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
            Canales de seguridad
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
            Todo el condominio, un clic para cada emergencia
          </p>
        </div>
      </div>

      {/* Existing header strip */}
      <div
        style={{
          background: "linear-gradient(135deg, #0D9488 0%, #005047 100%)",
          padding: "40px 24px 36px",
        }}
      >
        <div className="max-w-[1280px] mx-auto">
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
            Contacto directo
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
            Canales de Seguridad
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
            Toda la información de contacto del condominio en un solo lugar, siempre actualizada. Un
            clic para emergencias.
          </p>
        </div>
      </div>

      {/* Main channel content */}
      <div className="max-w-[1280px] mx-auto p-[40px_24px_80px]">
        {/* Emergency banner */}
        <div
          style={{
            background: "#FFF1F2",
            border: "1px solid #FECDD3",
            borderRadius: 14,
            padding: "20px 24px",
            marginBottom: 32,
            display: "flex",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <div style={{ color: "#E11D48", flexShrink: 0 }}>
            <IconAlertTriangle style={{ width: 28, height: 28 }} />
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 15,
                fontWeight: 700,
                color: "#E11D48",
                marginBottom: 2,
              }}
            >
              ¿Es una emergencia?
            </div>
            <div style={{ fontSize: 13, color: "#9F1239" }}>
              Llama directamente a Carabineros (133), Bomberos (132) o Ambulancia SAMU (131)
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {[
              { num: "133", label: "Carabineros" },
              { num: "132", label: "Bomberos" },
              { num: "131", label: "SAMU" },
            ].map((e) => (
              <a
                key={e.num}
                href={`tel:${e.num}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  background: "#E11D48",
                  color: "#fff",
                  borderRadius: 10,
                  padding: "10px 18px",
                  textDecoration: "none",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(el) => (el.currentTarget.style.background = "#9F1239")}
                onMouseLeave={(el) => (el.currentTarget.style.background = "#E11D48")}
              >
                <span
                  style={{
                    fontFamily: "Gloock, Georgia, serif",
                    fontSize: 20,
                    lineHeight: 1,
                  }}
                >
                  {e.num}
                </span>
                <span style={{ fontSize: 11, opacity: 0.85, marginTop: 2 }}>{e.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Channel cards */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            marginBottom: 40,
          }}
        >
          {channels.map((c) => {
            const badge = urgenciaBadge[c.urgencia];
            return (
              <div
                key={c.area}
                style={{
                  background: "#fff",
                  border: "1px solid #E2E8F0",
                  borderRadius: 16,
                  padding: "24px 28px",
                  display: "grid",
                  gridTemplateColumns: "56px 1fr auto",
                  gap: 20,
                  alignItems: "center",
                  transition: "box-shadow 0.2s, border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,0,0,0.07)";
                  e.currentTarget.style.borderColor = "#CBD5E1";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "#E2E8F0";
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    background:
                      c.urgencia === "critica"
                        ? "#FFF1F2"
                        : "linear-gradient(135deg, #CCFBF1, #99F6E4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: c.urgencia === "critica" ? "#E11D48" : "#005047",
                    flexShrink: 0,
                  }}
                >
                  {iconMap[c.area]}
                </div>
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: 4,
                      flexWrap: "wrap",
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "Gloock, Georgia, serif",
                        fontSize: 18,
                        color: "#00201B",
                        margin: 0,
                        fontWeight: 400,
                      }}
                    >
                      {c.area}
                    </h3>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: badge.color,
                        background: badge.bg,
                        padding: "3px 10px",
                        borderRadius: 100,
                      }}
                    >
                      {badge.label}
                    </span>
                  </div>
                  <div style={{ fontSize: 13, color: "#64748B", marginBottom: 10 }}>{c.resp}</div>
                  <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        fontSize: 14,
                        color: "#00201B",
                        fontWeight: 600,
                      }}
                    >
                      <IconPhone className="w-[14px] h-[14px] text-[#0D9488]" /> {c.contacto}
                    </div>
                    {c.email && (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          fontSize: 13,
                          color: "#0D9488",
                        }}
                      >
                        <IconMail className="w-[14px] h-[14px]" />
                        <a
                          href={`mailto:${c.email}`}
                          style={{ color: "#0D9488", textDecoration: "none" }}
                        >
                          {c.email}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: 12, color: "#94A3B8", marginBottom: 10 }}>
                    {c.horario}
                  </div>
                  {c.contacto.match(/\d{3}/) && (
                    <a
                      href={`tel:${c.contacto.split("/")[0].trim().replace(/\s/g, "")}`}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        background: c.urgencia === "critica" ? "#E11D48" : "#0D9488",
                        color: "#fff",
                        borderRadius: 8,
                        padding: "9px 16px",
                        textDecoration: "none",
                        fontSize: 13,
                        fontWeight: 600,
                        transition: "opacity 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                    >
                      <IconPhone className="w-[13px] h-[13px]" /> Llamar
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Security info */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
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
                alignItems: "center",
                gap: 12,
                marginBottom: 20,
              }}
            >
              <div style={{ color: "#0D9488" }}>
                <IconShield className="w-[24px] h-[24px]" />
              </div>
              <h3
                style={{
                  fontFamily: "Gloock, Georgia, serif",
                  fontSize: 20,
                  color: "#00201B",
                  margin: 0,
                  fontWeight: 400,
                }}
              >
                Plan Cuadrante
              </h3>
            </div>
            <p
              style={{
                fontSize: 14,
                color: "#64748B",
                lineHeight: 1.7,
                margin: "0 0 16px",
              }}
            >
              Ficha del sector con el cuadrante de seguridad vigente y el contacto del funcionario a
              cargo, mantenida por el comité.
            </p>
            <div style={{ fontSize: 14, color: "#00201B", fontWeight: 500 }}>
              Comisaría 12a — Las Condes
            </div>
            <div
              style={{
                marginTop: 8,
                fontSize: 14,
                color: "#00201B",
                fontWeight: 500,
              }}
            >
              Cuadrante N° 4 — Sector Norte
            </div>
          </div>

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
                alignItems: "center",
                gap: 12,
                marginBottom: 20,
              }}
            >
              <div style={{ color: "#0D9488" }}>
                <IconBell className="w-[24px] h-[24px]" />
              </div>
              <h3
                style={{
                  fontFamily: "Gloock, Georgia, serif",
                  fontSize: 20,
                  color: "#00201B",
                  margin: 0,
                  fontWeight: 400,
                }}
              >
                Notificaciones push
              </h3>
            </div>
            <p
              style={{
                fontSize: 14,
                color: "#64748B",
                lineHeight: 1.7,
                margin: "0 0 20px",
              }}
            >
              Activa las notificaciones para recibir alertas de seguridad, mantenimientos
              programados y avisos urgentes directamente en tu dispositivo.
            </p>
            <button
              style={{
                background: "#0D9488",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                padding: "10px 20px",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#005047")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#0D9488")}
            >
              Activar notificaciones
            </button>
          </div>
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
            Cada canal, a un clic de distancia
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
                    <span className="text-[14px] text-[#fff] leading-[1.6]">
                      {card.desc}
                    </span>
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
            to="/canales"
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
            Ver canales <IconChevronRight className="w-[16px] h-[16px]" />
          </Link>
          <Link
            to="/dashboard"
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
              textDecoration: "none",
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
            Dashboard <IconChevronRight className="w-[16px] h-[16px]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
