/* eslint-disable react/forbid-dom-props */
import { useState } from "react";
import { Link } from "react-router";
import { registroFotos } from "../lib/data";
import { FlipCard } from "../components/FlipCard";
import {
  IconCamera,
  IconEye,
  IconDownload,
  IconCheck,
  IconDollar,
  IconCalendar,
  IconUsers,
  IconChevronRight,
} from "../components/icons/Icons";

const categorias = [
  "Todos",
  "Jardinería",
  "Pintura",
  "Mantención eléctrica",
  "Limpieza de fachada",
];

interface RegistroItem {
  id: string;
  titulo: string;
  categoria: string;
  fecha: string;
  responsable: string;
  monto: string;
  estado: string;
  boleta: string;
  antes: string;
  despues: string;
}

interface RegistroCardProps {
  registro: RegistroItem;
  onOpen: () => void;
}

interface FlipCardData {
  title: string;
  desc: string;
  icon: React.ReactNode;
}

interface AltSection {
  title: string;
  body: string;
  imgUrl: string;
  imgLeft: boolean;
}

const flipCards: FlipCardData[] = [
  {
    title: "Antes y después",
    desc: "Cada intervención documentada con foto de inicio y resultado.",
    icon: <IconCamera className="w-[28px] h-[28px] text-[#0D9488]" />,
  },
  {
    title: "Vinculado al gasto",
    desc: "El registro está enlazado al gasto del dashboard. Todo conectado.",
    icon: <IconDollar className="w-[28px] h-[28px] text-[#0D9488]" />,
  },
  {
    title: "Historial completo",
    desc: "Accede a toda la bitácora histórica, ordenada por fecha y tipo.",
    icon: <IconCalendar className="w-[28px] h-[28px] text-[#0D9488]" />,
  },
  {
    title: "Con responsable",
    desc: "Cada trabajo muestra el proveedor, monto y boleta adjunta.",
    icon: <IconUsers className="w-[28px] h-[28px] text-[#0D9488]" />,
  },
];

const altSections: AltSection[] = [
  {
    title: "Transparencia visual",
    body: "El registro fotográfico permite que cualquier residente pueda verificar el estado real del trabajo realizado. Antes y después, con fecha exacta y responsable identificado. La rendición de cuentas nunca fue tan clara.",
    imgUrl: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=700&h=500&fit=crop",
    imgLeft: true,
  },
  {
    title: "Para el comité",
    body: "El comité cuenta con una bitácora completa de todas las intervenciones del condominio. Cada gasto respaldado con fotografía y boleta adjunta, accesible desde el dashboard en cualquier momento.",
    imgUrl: "https://images.unsplash.com/photo-1609921141835-710b7fa6e438?w=700&h=500&fit=crop",
    imgLeft: false,
  },
];

function RegistroCard({ registro, onOpen }: RegistroCardProps) {
  const [hovered, setHovered] = useState(false);
  const [showBefore, setShowBefore] = useState(true);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 16,
        overflow: "hidden",
        border: "1px solid #E2E8F0",
        background: "#fff",
        boxShadow: hovered ? "0 12px 40px rgba(0,0,0,0.09)" : "0 2px 8px rgba(0,0,0,0.04)",
        transform: hovered ? "translateY(-3px)" : "none",
        transition: "box-shadow 0.25s ease, transform 0.25s ease",
      }}
    >
      <div
        style={{
          position: "relative",
          height: 200,
          background: "#E2E8F0",
          overflow: "hidden",
        }}
      >
        <img
          src={showBefore ? registro.antes : registro.despues}
          alt={showBefore ? "Antes" : "Después"}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "opacity 0.3s",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 12,
            left: 12,
            display: "flex",
            gap: 4,
          }}
        >
          {["Antes", "Después"].map((label, i) => (
            <button
              key={label}
              onClick={(e) => {
                e.stopPropagation();
                setShowBefore(i === 0);
              }}
              style={{
                padding: "4px 10px",
                borderRadius: 100,
                fontSize: 11,
                fontWeight: 600,
                cursor: "pointer",
                border: "none",
                background:
                  (showBefore && i === 0) || (!showBefore && i === 1)
                    ? "#fff"
                    : "rgba(255,255,255,0.5)",
                color: "#00201B",
                transition: "background 0.15s",
              }}
            >
              {label}
            </button>
          ))}
        </div>
        <div
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)",
            color: "#fff",
            fontSize: 11,
            fontWeight: 500,
            padding: "4px 10px",
            borderRadius: 100,
          }}
        >
          {registro.categoria}
        </div>
      </div>

      <div style={{ padding: "18px 18px 20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 6,
          }}
        >
          <span style={{ fontSize: 11, color: "#94A3B8" }}>{registro.fecha}</span>
          <span style={{ fontSize: 11, color: "#94A3B8" }}>{registro.id}</span>
        </div>
        <h3
          style={{
            fontFamily: "Gloock, Georgia, serif",
            fontSize: 16,
            color: "#00201B",
            margin: "0 0 6px",
            fontWeight: 400,
            lineHeight: 1.3,
          }}
        >
          {registro.titulo}
        </h3>
        <div style={{ fontSize: 13, color: "#64748B", marginBottom: 4 }}>
          {registro.responsable}
        </div>
        <div
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: "#00201B",
            marginBottom: 14,
          }}
        >
          {registro.monto}
        </div>

        <div
          style={{
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
              color: "#0D9488",
              fontWeight: 500,
            }}
          >
            <IconCheck className="w-[12px] h-[12px]" /> {registro.boleta}
          </div>
          <button
            onClick={onOpen}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "#F0FDFA",
              border: "1px solid #CCFBF1",
              color: "#005047",
              borderRadius: 8,
              padding: "8px 14px",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#CCFBF1")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#F0FDFA")}
          >
            <IconEye className="w-[14px] h-[14px]" /> Ver detalle
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Registro() {
  const [activeCat, setActiveCat] = useState("Todos");
  const [selected, setSelected] = useState<RegistroItem | null>(null);
  const [showBefore, setShowBefore] = useState(true);

  const filtered = registroFotos.filter((r) => activeCat === "Todos" || r.categoria === activeCat);

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
            Bitácora fotográfica
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
            Registro fotográfico
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
            Control de calidad verificable
          </p>
        </div>
      </div>

      {/* Existing gradient header strip */}
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
            Bitácora fotográfica
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
            Registro Fotográfico
          </h2>
          <p
            style={{
              fontSize: 15,
              color: "rgba(255,255,255,0.72)",
              margin: 0,
              maxWidth: 560,
              lineHeight: 1.65,
            }}
          >
            Control de calidad verificable por todos los residentes. Cada intervención documentada
            con fotos de antes y después, fecha, responsable y boleta adjunta.
          </p>
        </div>
      </div>

      {/* Main registro content */}
      <div className="max-w-[1280px] mx-auto p-[40px_24px_80px]">
        {/* Stats */}
        <div
          style={{
            display: "flex",
            gap: 16,
            marginBottom: 28,
            flexWrap: "wrap",
          }}
        >
          {[
            {
              val: registroFotos.length,
              label: "Trabajos registrados",
              color: "#0D9488",
            },
            {
              val: registroFotos.filter((r) => r.estado === "Completado").length,
              label: "Completados",
              color: "#005047",
            },
            { val: "100%", label: "Con boleta adjunta", color: "#14B8A6" },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                background: "#fff",
                border: "1px solid #E2E8F0",
                borderRadius: 12,
                padding: "16px 22px",
                display: "flex",
                alignItems: "center",
                gap: 12,
              }}
            >
              <span
                style={{
                  fontFamily: "Gloock, Georgia, serif",
                  fontSize: 28,
                  color: s.color,
                }}
              >
                {s.val}
              </span>
              <span
                style={{
                  fontSize: 13,
                  color: "#64748B",
                  maxWidth: 100,
                  lineHeight: 1.3,
                }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            marginBottom: 28,
          }}
        >
          {categorias.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCat(c)}
              style={{
                padding: "8px 16px",
                borderRadius: 100,
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
                border: "1px solid",
                borderColor: activeCat === c ? "#0D9488" : "#E2E8F0",
                background: activeCat === c ? "#0D9488" : "#fff",
                color: activeCat === c ? "#fff" : "#64748B",
                transition: "border-color 0.15s, background 0.15s, color 0.15s",
              }}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: 22,
          }}
        >
          {filtered.map((r) => (
            <RegistroCard
              key={r.id}
              registro={r}
              onOpen={() => {
                setSelected(r);
                setShowBefore(true);
              }}
            />
          ))}
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
            Cada trabajo, completamente documentado
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
            to="/registro"
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
            Ver registros <IconChevronRight className="w-[16px] h-[16px]" />
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

      {/* Detail modal */}
      {selected && (
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
            onClick={() => setSelected(null)}
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(0,32,27,0.65)",
              backdropFilter: "blur(6px)",
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
              maxWidth: 680,
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 32px 80px rgba(0,0,0,0.25)",
            }}
          >
            <div
              style={{
                position: "relative",
                height: 320,
                background: "#E2E8F0",
                overflow: "hidden",
                borderRadius: "20px 20px 0 0",
              }}
            >
              <img
                src={showBefore ? selected.antes : selected.despues}
                alt={showBefore ? "Antes" : "Después"}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "opacity 0.3s",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 16,
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  gap: 8,
                }}
              >
                {["Antes", "Después"].map((label, i) => (
                  <button
                    key={label}
                    onClick={() => setShowBefore(i === 0)}
                    style={{
                      padding: "8px 20px",
                      borderRadius: 100,
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                      border: "none",
                      background:
                        (showBefore && i === 0) || (!showBefore && i === 1)
                          ? "#fff"
                          : "rgba(255,255,255,0.4)",
                      color:
                        (showBefore && i === 0) || (!showBefore && i === 1) ? "#00201B" : "#fff",
                      transition: "background 0.2s, color 0.2s",
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setSelected(null)}
                aria-label="Cerrar"
                style={{
                  position: "absolute",
                  top: 16,
                  right: 16,
                  background: "rgba(0,0,0,0.5)",
                  border: "none",
                  borderRadius: "50%",
                  width: 36,
                  height: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "#fff",
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ padding: "28px 28px 32px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 12,
                  marginBottom: 16,
                }}
              >
                <div>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#005047",
                      background: "#CCFBF1",
                      padding: "3px 10px",
                      borderRadius: 6,
                      display: "inline-block",
                      marginBottom: 8,
                    }}
                  >
                    {selected.categoria}
                  </span>
                  <h2
                    style={{
                      fontFamily: "Gloock, Georgia, serif",
                      fontSize: 22,
                      color: "#00201B",
                      margin: 0,
                      fontWeight: 400,
                      lineHeight: 1.25,
                    }}
                  >
                    {selected.titulo}
                  </h2>
                </div>
                <span
                  style={{
                    fontSize: 11,
                    color: "#94A3B8",
                    whiteSpace: "nowrap",
                    marginTop: 4,
                  }}
                >
                  {selected.id}
                </span>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 16,
                  marginBottom: 20,
                }}
              >
                {[
                  { label: "Fecha", val: selected.fecha },
                  { label: "Responsable", val: selected.responsable },
                  { label: "Monto", val: selected.monto },
                  { label: "Estado", val: selected.estado },
                ].map((f) => (
                  <div key={f.label}>
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: "#94A3B8",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        marginBottom: 4,
                      }}
                    >
                      {f.label}
                    </div>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#00201B",
                      }}
                    >
                      {f.val}
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  background: "#F0FDFA",
                  borderRadius: 10,
                  padding: "14px 16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 13,
                    color: "#005047",
                    fontWeight: 600,
                  }}
                >
                  <IconCheck className="w-[16px] h-[16px]" /> Boleta adjunta: {selected.boleta}
                </div>
                <button
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    background: "none",
                    border: "none",
                    color: "#0D9488",
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  <IconDownload className="w-[14px] h-[14px]" /> Descargar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
