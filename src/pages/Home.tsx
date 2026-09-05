/* eslint-disable react/forbid-dom-props */
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import {
  IconCalendar,
  IconDollar,
  IconMessage,
  IconHome,
  IconShield,
  IconCamera,
  IconChevronRight,
  IconTrendingUp,
  IconCheck,
} from "../components/icons/Icons";

// ─── Types ────────────────────────────────────────────────────────────────────

interface StatItem {
  target: number;
  suffix: string;
  label: string;
}

interface ModuloTab {
  label: string;
  icon: React.ReactNode;
  path: string;
  headline: string;
  body: string;
  points: string[];
  img: string;
}

interface Paso {
  titulo: string;
  desc: string;
}

interface Testimonio {
  nombre: string;
  rol: string;
  iniciales: string;
  cita: string;
}

interface PricingTier {
  name: string;
  price: string;
  period: string;
  highlight: boolean;
  badge?: string;
  desc: string;
  features: string[];
  cta: string;
}

interface TrustBadge {
  icon: React.ReactNode;
  text: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATS: StatItem[] = [
  { target: 2400, suffix: "+", label: "Residentes activos" },
  { target: 98, suffix: "%", label: "Satisfacción" },
  { target: 150, suffix: "+", label: "Comunidades" },
  { target: 7, suffix: "", label: "Espacios gestionados" },
];

const MODULOS: ModuloTab[] = [
  {
    label: "Reservas",
    icon: <IconCalendar className="w-[17px] h-[17px]" />,
    path: "/reservas",
    img: "https://images.unsplash.com/photo-1763479142280-675629f6db27?w=800&h=560&fit=crop&auto=format",
    headline: "Reserva espacios comunes en segundos",
    body: "Filtra por categoría, revisa disponibilidad en tiempo real y paga con tarjeta, transferencia o WebPay. Sin llamadas, sin papeles.",
    points: [
      "7 espacios: quinchos, piscina, gimnasio y más",
      "Confirmación instantánea con código QR",
      "Cancelación online hasta 24 hrs antes",
    ],
  },
  {
    label: "Gastos",
    icon: <IconDollar className="w-[17px] h-[17px]" />,
    path: "/gastos",
    img: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=560&fit=crop&auto=format",
    headline: "Paga tus gastos comunes en línea",
    body: "Desglose mensual por ítem, historial PDF y alertas automáticas antes del vencimiento. Estado de pago visible para residentes y comité.",
    points: [
      "Emisión mensual desglosada por categoría",
      "Pago con tarjeta, transferencia y WebPay",
      "Alertas automáticas de vencimiento",
    ],
  },
  {
    label: "Tablón",
    icon: <IconMessage className="w-[17px] h-[17px]" />,
    path: "/tablon",
    img: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&h=560&fit=crop&auto=format",
    headline: "Mantente informado en tiempo real",
    body: "Cartelera digital con avisos del comité, asambleas, mantenciones y publicaciones de residentes. Reemplaza el diario mural físico.",
    points: [
      "Notificaciones push automáticas por torre",
      "Confirmación de asistencia para eventos",
      "Historial consultable de todos los avisos",
    ],
  },
  {
    label: "Dashboard",
    icon: <IconTrendingUp className="w-[17px] h-[17px]" />,
    path: "/dashboard",
    img: "https://images.unsplash.com/photo-1609921141835-710b7fa6e438?w=800&h=560&fit=crop&auto=format",
    headline: "Transparencia total en cada peso",
    body: "Panel centralizado con todos los gastos del condominio. Cada ítem respaldado con boleta o factura adjunta, visible para todos.",
    points: [
      "Gráfico de evolución mensual",
      "Boleta o factura adjunta por gasto",
      "Exportación a PDF para asambleas",
    ],
  },
  {
    label: "Canales",
    icon: <IconShield className="w-[17px] h-[17px]" />,
    path: "/canales",
    img: "https://images.unsplash.com/photo-1651514645933-c26e0eb4ace3?w=800&h=560&fit=crop&auto=format",
    headline: "Un clic para cualquier emergencia",
    body: "Contacto directo con conserjería, comité, administración y seguridad del sector. Todo centralizado y siempre actualizado.",
    points: [
      "Conserjería 24/7 con llamada directa",
      "Plan Cuadrante y patrulla del sector",
      "Emergencias: 133 / 132 / 131",
    ],
  },
  {
    label: "Registro",
    icon: <IconCamera className="w-[17px] h-[17px]" />,
    path: "/registro",
    img: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&h=560&fit=crop&auto=format",
    headline: "Control de calidad verificable",
    body: "Bitácora fotográfica de cada mantención. Antes y después, con fecha, responsable y boleta adjunta — visible para todos los residentes.",
    points: [
      "Fotos antes/después por intervención",
      "Vinculado al gasto en el dashboard",
      "Categorizado por tipo de trabajo",
    ],
  },
];

const PASOS: Paso[] = [
  {
    titulo: "Regístrate con tu unidad",
    desc: "Ingresa correo y valida torre, piso y número. El comité aprueba tu cuenta en 24 hrs.",
  },
  {
    titulo: "Explora y reserva espacios",
    desc: "Filtra por categoría y disponibilidad. Paga en segundos desde la plataforma.",
  },
  {
    titulo: "Revisa tus gastos",
    desc: "Accede al desglose mensual y paga antes del vencimiento — sin colas ni cheques.",
  },
  {
    titulo: "Mantente conectado",
    desc: "Recibe avisos, accede al dashboard de transparencia y contacta a conserjería.",
  },
];

const TESTIMONIOS: Testimonio[] = [
  {
    nombre: "Valentina Morales",
    rol: "Residente",
    iniciales: "VM",
    cita: "Antes tenía que llamar para reservar el quincho. Ahora lo hago en 30 segundos desde el teléfono. Increíble.",
  },
  {
    nombre: "Jorge Sepúlveda",
    rol: "Presidente de comité",
    iniciales: "JS",
    cita: "El dashboard de transparencia cambió todo. Los residentes confían más porque pueden ver cada boleta adjunta.",
  },
  {
    nombre: "María Inés Fuentes",
    rol: "Administradora",
    iniciales: "MF",
    cita: "Los gastos comunes se pagan a tiempo porque los recordatorios llegan automáticos. Cero morosidad este mes.",
  },
];

const PRICING: PricingTier[] = [
  {
    name: "Básico",
    price: "Gratis",
    period: "",
    highlight: false,
    desc: "Para comunidades pequeñas que quieren dar el primer paso digital.",
    features: [
      "Hasta 30 unidades",
      "Tablón de avisos",
      "2 espacios para reservar",
      "Gastos manuales",
    ],
    cta: "Comenzar gratis",
  },
  {
    name: "Comunidad",
    price: "$19.900",
    period: "/mes",
    highlight: true,
    badge: "Recomendado",
    desc: "Todo lo que necesita un condominio moderno. El más elegido.",
    features: [
      "Hasta 150 unidades",
      "Todos los módulos",
      "Reservas ilimitadas",
      "Pagos WebPay integrados",
      "Dashboard de transparencia",
      "Soporte prioritario 24/7",
    ],
    cta: "Comenzar ahora",
  },
  {
    name: "Enterprise",
    price: "A medida",
    period: "",
    highlight: false,
    desc: "Para conjuntos residenciales grandes con múltiples torres.",
    features: [
      "Unidades ilimitadas",
      "Multi-torre y multi-edificio",
      "API e integraciones",
      "Onboarding dedicado",
      "SLA garantizado",
      "Administrador asignado",
    ],
    cta: "Contactar equipo",
  },
];

const TRUST_BADGES: TrustBadge[] = [
  {
    icon: <IconShield className="w-[18px] h-[18px]" />,
    text: "Datos seguros y cifrados",
  },
  {
    icon: <IconCheck className="w-[18px] h-[18px]" />,
    text: "Pagos con WebPay",
  },
  {
    icon: <IconCalendar className="w-[18px] h-[18px]" />,
    text: "Sin contratos mínimos",
  },
  {
    icon: <IconHome className="w-[18px] h-[18px]" />,
    text: "Soporte en español",
  },
];

// ─── Sub-components (all before Home) ─────────────────────────────────────────

function Counter({ target, suffix }: StatItem) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            setVal(target);
            clearInterval(timer);
          } else {
            setVal(Math.floor(current));
          }
        }, 25);
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {val.toLocaleString("es-CL")}
      {suffix}
    </span>
  );
}

const HERO_QUICK_LINKS = [
  {
    icon: <IconCalendar className="w-[18px] h-[18px]" />,
    label: "Reservar espacio",
    path: "/espacios",
    color: "#0D9488",
  },
  {
    icon: <IconDollar className="w-[18px] h-[18px]" />,
    label: "Pagar gastos",
    path: "/gastos",
    color: "#005047",
  },
  {
    icon: <IconMessage className="w-[18px] h-[18px]" />,
    label: "Ver tablón",
    path: "/tablon",
    color: "#0D9488",
  },
  {
    icon: <IconShield className="w-[18px] h-[18px]" />,
    label: "Emergencias",
    path: "/canales",
    color: "#E11D48",
  },
  {
    icon: <IconTrendingUp className="w-[18px] h-[18px]" />,
    label: "Dashboard",
    path: "/dashboard",
    color: "#14B8A6",
  },
  {
    icon: <IconCamera className="w-[18px] h-[18px]" />,
    label: "Registro fotos",
    path: "/registro",
    color: "#0D9488",
  },
];

function HeroSection() {
  const quickLinks = HERO_QUICK_LINKS;

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Background photo */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url(https://images.unsplash.com/photo-1624204386084-dd8c05e32226?w=1800&h=1100&fit=crop&auto=format)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Dark gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(110deg,rgba(0,32,27,0.93) 0%,rgba(13,148,136,0.35) 55%,rgba(0,0,0,0.15) 100%)",
        }}
      />

      {/* ── Animated blobs (subtle, behind text) ── */}
      <div
        className="cv-blob"
        style={
          {
            position: "absolute",
            borderRadius: "50%",
            pointerEvents: "none",
            width: 520,
            height: 520,
            top: "-80px",
            left: "-120px",
            background: "radial-gradient(circle, rgba(13,148,136,0.18) 0%, transparent 70%)",
            filter: "blur(40px)",
            "--drift-dur": "14s",
          } as React.CSSProperties
        }
      />
      <div
        className="cv-blob"
        style={
          {
            position: "absolute",
            borderRadius: "50%",
            pointerEvents: "none",
            width: 380,
            height: 380,
            bottom: "60px",
            left: "38%",
            background: "radial-gradient(circle, rgba(0,80,71,0.22) 0%, transparent 70%)",
            filter: "blur(50px)",
            "--drift-dur": "18s",
            animationDelay: "-6s",
          } as React.CSSProperties
        }
      />
      <div
        className="cv-blob"
        style={
          {
            position: "absolute",
            borderRadius: "50%",
            pointerEvents: "none",
            width: 260,
            height: 260,
            top: "30%",
            right: "8%",
            background: "radial-gradient(circle, rgba(94,234,212,0.10) 0%, transparent 70%)",
            filter: "blur(32px)",
            "--drift-dur": "11s",
            animationDelay: "-3s",
          } as React.CSSProperties
        }
      />

      {/* ── Content ── */}
      <div
        style={{
          position: "relative",
          maxWidth: 1280,
          margin: "0 auto",
          padding: "clamp(96px,10vw,140px) 24px 80px",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 420px",
            gap: 56,
            alignItems: "center",
          }}
          className="hero-grid"
        >
          {/* Left col — staggered entrance */}
          <div>
            {/* Badge */}
            <div
              className="cv-hero-badge"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "rgba(13,148,136,0.22)",
                border: "1px solid rgba(13,148,136,0.45)",
                borderRadius: 100,
                padding: "5px 14px",
                marginBottom: 28,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#4ADE80",
                  display: "inline-block",
                }}
              />
              <span
                style={{
                  fontSize: 12,
                  color: "#fff",
                  fontWeight: 500,
                  letterSpacing: "0.05em",
                }}
              >
                Torres del Parque · Plataforma activa
              </span>
            </div>

            {/* H1 */}
            <h1
              className="cv-hero-h1"
              style={{
                fontFamily: "Gloock,Georgia,serif",
                fontSize: "clamp(38px,5.2vw,68px)",
                lineHeight: 1.07,
                color: "#fff",
                margin: "0 0 22px",
                fontWeight: 400,
              }}
            >
              Gestión simple.
              <br />
              <span style={{ color: "#5EEAD4" }}>
                Comunidad
                <br />
                conectada.
              </span>
            </h1>

            {/* Subtitle */}
            <p
              className="cv-hero-subtitle"
              style={{
                fontSize: 17,
                lineHeight: 1.72,
                color: "rgba(255,255,255,0.78)",
                margin: "0 0 36px",
                fontWeight: 300,
                maxWidth: 520,
              }}
            >
              Plataforma digital para condominios en Chile. Reservas, gastos, avisos y seguridad —
              todo en un lugar.
            </p>

            {/* CTAs */}
            <div
              className="cv-hero-ctas"
              style={{
                display: "flex",
                gap: 12,
                flexWrap: "wrap",
                marginBottom: 36,
              }}
            >
              <Link
                to="/crear-cuenta"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#0D9488",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 14,
                  padding: "13px 26px",
                  borderRadius: 10,
                  textDecoration: "none",
                  transition: "background 0.2s, transform 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#005047";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#0D9488";
                  e.currentTarget.style.transform = "none";
                }}
              >
                Crear cuenta <IconChevronRight className="w-[14px] h-[14px]" />
              </Link>
              <Link
                to="/login"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "rgba(255,255,255,0.12)",
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: 14,
                  padding: "13px 26px",
                  borderRadius: 10,
                  textDecoration: "none",
                  border: "1px solid rgba(255,255,255,0.28)",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.22)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
              >
                Iniciar sesión
              </Link>
            </div>

            {/* Trust badges */}
            <div className="cv-hero-badges" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              {TRUST_BADGES.map((b) => (
                <span
                  key={b.text}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 12,
                    color: "rgba(255,255,255,0.7)",
                    background: "rgba(255,255,255,0.08)",
                    borderRadius: 100,
                    padding: "6px 12px",
                    border: "1px solid rgba(255,255,255,0.14)",
                  }}
                >
                  {b.icon} {b.text}
                </span>
              ))}
            </div>
          </div>

          {/* Right: glassmorphism quick-access card */}
          <div
            className="cv-hero-card"
            style={{
              background: "rgba(255,255,255,0.07)",
              backdropFilter: "blur(18px)",
              borderRadius: 20,
              border: "1px solid rgba(255,255,255,0.14)",
              padding: "28px",
            }}
          >
            <p
              style={{
                fontSize: 11,
                fontWeight: 700,
                color: "rgba(255,255,255,0.55)",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                margin: "0 0 18px",
              }}
            >
              Acceso rápido
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
              }}
            >
              {quickLinks.map((item) => (
                <Link key={item.label} to={item.path} style={{ textDecoration: "none" }}>
                  <div
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      borderRadius: 12,
                      padding: "15px 12px",
                      border: "1px solid rgba(255,255,255,0.09)",
                      transition: "background 0.2s, transform 0.15s",
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                      e.currentTarget.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                      e.currentTarget.style.transform = "none";
                    }}
                  >
                    <div style={{ color: item.color, marginBottom: 8 }}>{item.icon}</div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#fff",
                        lineHeight: 1.2,
                      }}
                    >
                      {item.label}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            <div
              style={{
                marginTop: 18,
                paddingTop: 14,
                borderTop: "1px solid rgba(255,255,255,0.1)",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#4ADE80",
                  display: "inline-block",
                }}
              />
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.55)" }}>
                Conserjería en línea · Interno 100
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  return (
    <section style={{ background: "#00201B", padding: "52px 24px" }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 32,
          textAlign: "center",
        }}
        className="stats-grid"
      >
        {STATS.map((s) => (
          <div key={s.label}>
            <div
              style={{
                fontFamily: "Gloock,Georgia,serif",
                fontSize: "clamp(36px,4vw,52px)",
                color: "#5EEAD4",
                lineHeight: 1,
              }}
            >
              <Counter target={s.target} suffix={s.suffix} label={s.label} />
            </div>
            <div
              style={{
                fontSize: 13,
                color: "rgba(255,255,255,0.5)",
                marginTop: 8,
                fontWeight: 500,
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ModuleTabs() {
  const [active, setActive] = useState(0);
  const m = MODULOS[active];

  return (
    <section style={{ background: "#fff", padding: "100px 24px" }}>
      <div className="max-w-[1280px] mx-auto">
        <div style={{ textAlign: "center", maxWidth: 520, margin: "0 auto 48px" }}>
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
            Plataforma completa
          </p>
          <h2
            style={{
              fontFamily: "Gloock,Georgia,serif",
              fontSize: "clamp(28px,3.5vw,44px)",
              color: "#00201B",
              lineHeight: 1.15,
              margin: 0,
              fontWeight: 400,
            }}
          >
            Un ecosistema para tu condominio
          </h2>
        </div>

        {/* Tab bar */}
        <div
          style={{
            display: "flex",
            gap: 6,
            justifyContent: "center",
            flexWrap: "wrap",
            marginBottom: 48,
          }}
        >
          {MODULOS.map((mod, i) => (
            <button
              key={mod.label}
              onClick={() => setActive(i)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                padding: "9px 18px",
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                border: "1.5px solid",
                borderColor: active === i ? "#0D9488" : "#E2E8F0",
                background: active === i ? "#0D9488" : "#fff",
                color: active === i ? "#fff" : "#64748B",
                transition: "border-color 0.18s, background 0.18s, color 0.18s",
              }}
            >
              {mod.icon} {mod.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div
          key={active}
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 64,
            alignItems: "center",
          }}
          className="tab-content-grid"
        >
          <div
            style={{
              borderRadius: 20,
              overflow: "hidden",
              height: 380,
              background: "#E2E8F0",
              boxShadow: "0 20px 60px rgba(0,0,0,0.11)",
            }}
          >
            <img
              src={m.img}
              alt={m.label}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#F0FDFA",
                borderRadius: 8,
                padding: "5px 14px",
                marginBottom: 20,
                color: "#005047",
              }}
            >
              {m.icon}
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                }}
              >
                {m.label}
              </span>
            </div>
            <h3
              style={{
                fontFamily: "Gloock,Georgia,serif",
                fontSize: "clamp(22px,2.8vw,34px)",
                color: "#00201B",
                lineHeight: 1.2,
                margin: "0 0 16px",
                fontWeight: 400,
              }}
            >
              {m.headline}
            </h3>
            <p
              style={{
                fontSize: 15,
                color: "#64748B",
                lineHeight: 1.75,
                margin: "0 0 28px",
              }}
            >
              {m.body}
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 12,
                marginBottom: 32,
              }}
            >
              {m.points.map((p) => (
                <div
                  key={p}
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "flex-start",
                    fontSize: 14,
                    color: "#00201B",
                  }}
                >
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      background: "#CCFBF1",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      marginTop: 1,
                    }}
                  >
                    <IconCheck style={{ width: 11, height: 11, color: "#005047" }} />
                  </div>
                  {p}
                </div>
              ))}
            </div>
            <Link
              to={m.path}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#0D9488",
                color: "#fff",
                fontWeight: 700,
                fontSize: 14,
                padding: "12px 24px",
                borderRadius: 10,
                textDecoration: "none",
                transition: "background 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#005047")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#0D9488")}
            >
              Ir a {m.label} <IconChevronRight className="w-[14px] h-[14px]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section style={{ background: "#F8FAFB", padding: "100px 24px" }}>
      <div className="max-w-[1280px] mx-auto">
        <div style={{ textAlign: "center", maxWidth: 440, margin: "0 auto 72px" }}>
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
            Así funciona
          </p>
          <h2
            style={{
              fontFamily: "Gloock,Georgia,serif",
              fontSize: "clamp(28px,3.5vw,42px)",
              color: "#00201B",
              lineHeight: 1.2,
              margin: 0,
              fontWeight: 400,
            }}
          >
            En 4 pasos ya formas parte
          </h2>
        </div>

        {/* Steps with CSS connector line */}
        <div style={{ position: "relative" }}>
          {/* Connector */}
          <div
            style={{
              position: "absolute",
              top: 36,
              left: "12.5%",
              right: "12.5%",
              height: 2,
              background:
                "linear-gradient(90deg,transparent,#CCFBF1 10%,#0D9488 50%,#CCFBF1 90%,transparent)",
              zIndex: 0,
            }}
            className="steps-line"
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: 8,
            }}
            className="steps-grid"
          >
            {PASOS.map((p, i) => (
              <div
                key={p.titulo}
                style={{
                  textAlign: "center",
                  padding: "0 16px",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    margin: "0 auto 24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: i === 0 ? "#0D9488" : "#fff",
                    border: `3px solid ${i === 0 ? "#0D9488" : "#CCFBF1"}`,
                    boxShadow: "0 4px 20px rgba(13,148,136,0.14)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Gloock,Georgia,serif",
                      fontSize: 24,
                      color: i === 0 ? "#fff" : "#0D9488",
                      fontWeight: 400,
                    }}
                  >
                    {i + 1}
                  </span>
                </div>
                <h4
                  style={{
                    fontFamily: "Gloock,Georgia,serif",
                    fontSize: 17,
                    color: "#00201B",
                    margin: "0 0 10px",
                    fontWeight: 400,
                  }}
                >
                  {p.titulo}
                </h4>
                <p
                  style={{
                    fontSize: 13,
                    color: "#64748B",
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const FEATURE_SECTIONS = [
  {
    imgLeft: false,
    img: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=560&fit=crop&auto=format",
    label: "Transparencia de gastos",
    headline: "Cada peso del condominio, visible para todos",
    body: "El Dashboard de Transparencia centraliza todos los gastos con su respectiva boleta adjunta. Ningún residente tiene que confiar a ciegas.",
    stats: [
      { val: "$7.2M", sub: "Acumulado 2026" },
      { val: "100%", sub: "Con boleta adjunta" },
    ],
    cta: { label: "Ver dashboard", path: "/dashboard" },
  },
  {
    imgLeft: true,
    img: "https://images.unsplash.com/photo-1763479142280-675629f6db27?w=800&h=560&fit=crop&auto=format",
    label: "Espacios comunes",
    headline: "7 espacios disponibles para reservar hoy",
    body: "Desde el Quincho Los Aromos hasta la Sala de Juegos / Cowork. Filtra, reserva y paga en segundos con tu método preferido.",
    stats: [
      { val: "7", sub: "Espacios disponibles" },
      { val: "3", sub: "Métodos de pago" },
    ],
    cta: { label: "Ver espacios", path: "/reservas" },
  },
];

function FeatureSections() {
  const sections = FEATURE_SECTIONS;

  return (
    <section style={{ background: "#fff", padding: "100px 24px" }}>
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: 96,
        }}
      >
        {sections.map((s) => (
          <div
            key={s.label}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 64,
              alignItems: "center",
              direction: s.imgLeft ? "rtl" : "ltr",
            }}
            className="alt-grid"
          >
            <div
              style={{
                borderRadius: 20,
                overflow: "hidden",
                height: 360,
                background: "#E2E8F0",
                boxShadow: "0 20px 60px rgba(0,0,0,0.1)",
                direction: "ltr",
              }}
            >
              <img
                src={s.img}
                alt={s.label}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            <div style={{ direction: "ltr" }}>
              <p
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: "#0D9488",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  marginBottom: 14,
                }}
              >
                {s.label}
              </p>
              <h2
                style={{
                  fontFamily: "Gloock,Georgia,serif",
                  fontSize: "clamp(24px,3vw,38px)",
                  color: "#00201B",
                  lineHeight: 1.2,
                  margin: "0 0 16px",
                  fontWeight: 400,
                }}
              >
                {s.headline}
              </h2>
              <p
                style={{
                  fontSize: 15,
                  color: "#64748B",
                  lineHeight: 1.75,
                  margin: "0 0 28px",
                }}
              >
                {s.body}
              </p>
              <div style={{ display: "flex", gap: 36, marginBottom: 32 }}>
                {s.stats.map((st) => (
                  <div key={st.sub}>
                    <div
                      style={{
                        fontFamily: "Gloock,Georgia,serif",
                        fontSize: 32,
                        color: "#0D9488",
                      }}
                    >
                      {st.val}
                    </div>
                    <div style={{ fontSize: 12, color: "#94A3B8", marginTop: 2 }}>{st.sub}</div>
                  </div>
                ))}
              </div>
              <Link
                to={s.cta.path}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  border: "2px solid #0D9488",
                  color: "#0D9488",
                  fontWeight: 700,
                  fontSize: 14,
                  padding: "11px 22px",
                  borderRadius: 10,
                  textDecoration: "none",
                  transition: "background 0.2s, color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#0D9488";
                  e.currentTarget.style.color = "#fff";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "#0D9488";
                }}
              >
                {s.cta.label} <IconChevronRight className="w-[14px] h-[14px]" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section style={{ background: "#F8FAFB", padding: "100px 24px" }}>
      <div className="max-w-[1280px] mx-auto">
        <div style={{ textAlign: "center", maxWidth: 440, margin: "0 auto 56px" }}>
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
            Lo que dicen
          </p>
          <h2
            style={{
              fontFamily: "Gloock,Georgia,serif",
              fontSize: "clamp(28px,3.5vw,42px)",
              color: "#00201B",
              lineHeight: 1.2,
              margin: 0,
              fontWeight: 400,
            }}
          >
            La comunidad habla
          </h2>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 22,
          }}
          className="testi-grid"
        >
          {TESTIMONIOS.map((t) => (
            <div
              key={t.nombre}
              style={{
                background: "#fff",
                border: "1px solid #E2E8F0",
                borderRadius: 18,
                padding: "32px 28px",
                transition: "box-shadow 0.2s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 12px 40px rgba(13,148,136,0.09)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "none";
                e.currentTarget.style.transform = "none";
              }}
            >
              <div
                style={{
                  fontSize: 48,
                  color: "#CCFBF1",
                  fontFamily: "Georgia,serif",
                  lineHeight: 1,
                  marginBottom: 16,
                }}
              >
                "
              </div>
              <p
                style={{
                  fontSize: 15,
                  color: "#00201B",
                  lineHeight: 1.75,
                  margin: "0 0 24px",
                  fontStyle: "italic",
                }}
              >
                {t.cita}
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div
                  style={{
                    width: 42,
                    height: 42,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg,#CCFBF1,#0D9488)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontFamily: "Gloock,Georgia,serif",
                    fontSize: 15,
                  }}
                >
                  {t.iniciales}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#00201B" }}>{t.nombre}</div>
                  <div className="text-[12px] text-[#94A3B8]">{t.rol}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section style={{ background: "#00201B", padding: "100px 24px" }}>
      <div className="max-w-[1280px] mx-auto">
        <div style={{ textAlign: "center", maxWidth: 440, margin: "0 auto 56px" }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 700,
              color: "#5EEAD4",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >
            Planes y precios
          </p>
          <h2
            style={{
              fontFamily: "Gloock,Georgia,serif",
              fontSize: "clamp(28px,3.5vw,42px)",
              color: "#fff",
              lineHeight: 1.2,
              margin: "0 0 14px",
              fontWeight: 400,
            }}
          >
            Simple y transparente
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.55)", margin: 0 }}>
            Sin costos ocultos ni letras chicas.{" "}
            <Link
              to="/precios"
              style={{
                color: "#5EEAD4",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              Ver comparación completa →
            </Link>
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3,1fr)",
            gap: 20,
            alignItems: "stretch",
          }}
          className="pricing-grid"
        >
          {PRICING.map((plan) => (
            <div
              key={plan.name}
              style={{
                borderRadius: 20,
                padding: plan.highlight ? "40px 28px" : "32px 28px",
                background: plan.highlight ? "#0D9488" : "rgba(255,255,255,0.05)",
                border: `1px solid ${plan.highlight ? "#0D9488" : "rgba(255,255,255,0.1)"}`,
                position: "relative",
                overflow: "hidden",
                transform: plan.highlight ? "scale(1.03)" : "scale(1)",
                boxShadow: plan.highlight ? "0 24px 64px rgba(13,148,136,0.35)" : "none",
              }}
            >
              {plan.badge && (
                <div
                  style={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    background: "#fff",
                    color: "#005047",
                    fontSize: 10,
                    fontWeight: 800,
                    padding: "3px 10px",
                    borderRadius: 100,
                    letterSpacing: "0.06em",
                  }}
                >
                  {plan.badge}
                </div>
              )}
              <div
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: plan.highlight ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.55)",
                  marginBottom: 8,
                }}
              >
                {plan.name}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: 4,
                  marginBottom: 8,
                }}
              >
                <span
                  style={{
                    fontFamily: "Gloock,Georgia,serif",
                    fontSize: 38,
                    color: "#fff",
                    lineHeight: 1,
                  }}
                >
                  {plan.price}
                </span>
                <span
                  style={{
                    fontSize: 14,
                    color: "rgba(255,255,255,0.45)",
                    marginBottom: 4,
                  }}
                >
                  {plan.period}
                </span>
              </div>
              <p
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.55)",
                  lineHeight: 1.6,
                  margin: "0 0 24px",
                }}
              >
                {plan.desc}
              </p>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  marginBottom: 28,
                }}
              >
                {plan.features.map((f) => (
                  <div
                    key={f}
                    style={{
                      display: "flex",
                      gap: 8,
                      alignItems: "flex-start",
                      fontSize: 13,
                      color: plan.highlight ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.65)",
                    }}
                  >
                    <IconCheck
                      style={{
                        width: 13,
                        height: 13,
                        color: plan.highlight ? "#fff" : "#5EEAD4",
                        flexShrink: 0,
                        marginTop: 1,
                      }}
                    />
                    {f}
                  </div>
                ))}
              </div>
              <button
                style={{
                  width: "100%",
                  padding: "13px",
                  fontSize: 14,
                  fontWeight: 700,
                  borderRadius: 10,
                  cursor: "pointer",
                  transition: "opacity 0.2s",
                  background: plan.highlight ? "#fff" : "rgba(255,255,255,0.1)",
                  color: plan.highlight ? "#0D9488" : "#fff",
                  border: plan.highlight ? "none" : "1px solid rgba(255,255,255,0.2)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section
      style={{
        background: "linear-gradient(135deg,#0D9488 0%,#005047 100%)",
        padding: "88px 24px",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <h2
          style={{
            fontFamily: "Gloock,Georgia,serif",
            fontSize: "clamp(28px,4vw,48px)",
            color: "#fff",
            lineHeight: 1.12,
            margin: "0 0 16px",
            fontWeight: 400,
          }}
        >
          Tu condominio, conectado hoy
        </h2>
        <p
          style={{
            fontSize: 16,
            color: "rgba(255,255,255,0.75)",
            lineHeight: 1.7,
            margin: "0 0 36px",
          }}
        >
          Sin instalaciones, sin contratos mínimos. Empieza a gestionar en minutos.
        </p>
        <div
          style={{
            display: "flex",
            gap: 12,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <Link
            to="/reservas"
            style={{
              background: "#fff",
              color: "#005047",
              fontWeight: 700,
              fontSize: 15,
              padding: "14px 32px",
              borderRadius: 10,
              textDecoration: "none",
              transition: "transform 0.15s, box-shadow 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "none";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Comenzar como residente
          </Link>
          <Link
            to="/precios"
            style={{
              background: "rgba(255,255,255,0.14)",
              color: "#fff",
              fontWeight: 600,
              fontSize: 15,
              padding: "14px 32px",
              borderRadius: 10,
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.32)",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.24)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.14)")}
          >
            Ver planes del comité
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div>
      <HeroSection />
      <StatsBar />
      <ModuleTabs />
      <HowItWorks />
      <FeatureSections />
      <TestimonialsSection />
      <PricingSection />
      <FinalCTA />
    </div>
  );
}
