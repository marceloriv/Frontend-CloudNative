/* eslint-disable react/forbid-dom-props */
import React, { useState, useEffect, useRef } from "react";
import { Outlet, NavLink, useLocation, Link } from "react-router";
import {
  IconHome,
  IconDollar,
  IconMessage,
  IconCamera,
  IconShield,
  IconCalendar,
  IconMenu,
  IconX,
  IconTrendingUp,
  IconPhone,
  IconAlertTriangle,
} from "./icons/Icons";
import { useAuth } from "../hooks/useAuth";
import type { Role } from "../types";

// ─────────────────────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────────────────────

const RIBBON_ITEMS = [
  {
    text: "📢 Asamblea de copropietarios — 22 agosto, 19:00 hrs · Sala de Juegos",
    path: "/tablon",
  },
  {
    text: "💧 Corte de agua programado Torres A y B — 25 agosto 09:00 hrs",
    path: "/tablon",
  },
  {
    text: "🎟️ Rifa solidaria — Bazar Comunidad · Boletos en conserjería",
    path: "/tablon",
  },
  {
    text: "📸 Nuevo registro fotográfico: renovación jardín central",
    path: "/registro",
  },
];

const NAV_LINKS_BY_ROLE: Record<
  Role,
  {
    label: string;
    path: string;
    icon: React.ReactElement;
  }[]
> = {
  residente: [
    {
      label: "Mi panel",
      path: "/mi-dashboard",
      icon: <IconHome className="w-[15px] h-[15px]" />,
    },
    {
      label: "Reservas",
      path: "/reservas",
      icon: <IconCalendar className="w-[15px] h-[15px]" />,
    },
    {
      label: "Gastos",
      path: "/gastos",
      icon: <IconDollar className="w-[15px] h-[15px]" />,
    },
    {
      label: "Visitas",
      path: "/visitas",
      icon: <IconShield className="w-[15px] h-[15px]" />,
    },
    {
      label: "Incidentes",
      path: "/incidentes",
      icon: <IconAlertTriangle className="w-[15px] h-[15px]" />,
    },
    {
      label: "Tablón",
      path: "/tablon",
      icon: <IconMessage className="w-[15px] h-[15px]" />,
    },
    {
      label: "Canales",
      path: "/canales",
      icon: <IconPhone className="w-[15px] h-[15px]" />,
    },
  ],
  conserje: [
    {
      label: "Visitas",
      path: "/visitas",
      icon: <IconShield className="w-[15px] h-[15px]" />,
    },
    {
      label: "Incidentes",
      path: "/incidentes",
      icon: <IconAlertTriangle className="w-[15px] h-[15px]" />,
    },
    {
      label: "Tablón",
      path: "/tablon",
      icon: <IconMessage className="w-[15px] h-[15px]" />,
    },
    {
      label: "Registro",
      path: "/registro",
      icon: <IconCamera className="w-[15px] h-[15px]" />,
    },
    {
      label: "Canales",
      path: "/canales",
      icon: <IconPhone className="w-[15px] h-[15px]" />,
    },
  ],
  admin: [
    {
      label: "Dashboard",
      path: "/dashboard",
      icon: <IconTrendingUp className="w-[15px] h-[15px]" />,
    },
    {
      label: "Visitas",
      path: "/visitas",
      icon: <IconShield className="w-[15px] h-[15px]" />,
    },
    {
      label: "Incidentes",
      path: "/incidentes",
      icon: <IconAlertTriangle className="w-[15px] h-[15px]" />,
    },
    {
      label: "Registro",
      path: "/registro",
      icon: <IconCamera className="w-[15px] h-[15px]" />,
    },
    {
      label: "Tablón",
      path: "/tablon",
      icon: <IconMessage className="w-[15px] h-[15px]" />,
    },
    {
      label: "Canales",
      path: "/canales",
      icon: <IconPhone className="w-[15px] h-[15px]" />,
    },
    {
      label: "Precios",
      path: "/precios",
      icon: <IconDollar className="w-[15px] h-[15px]" />,
    },
  ],
  comite: [
    {
      label: "Gastos",
      path: "/gastos",
      icon: <IconDollar className="w-[15px] h-[15px]" />,
    },
    {
      label: "Tablón",
      path: "/tablon",
      icon: <IconMessage className="w-[15px] h-[15px]" />,
    },
    {
      label: "Espacios",
      path: "/espacios",
      icon: <IconHome className="w-[15px] h-[15px]" />,
    },
    {
      label: "Incidentes",
      path: "/incidentes",
      icon: <IconAlertTriangle className="w-[15px] h-[15px]" />,
    },
    {
      label: "Canales",
      path: "/canales",
      icon: <IconPhone className="w-[15px] h-[15px]" />,
    },
  ],
};

const FLOATING_SIDEBAR_ITEMS = [
  {
    id: "reservar",
    icon: <IconCalendar className="w-[17px] h-[17px]" />,
    label: "Reservar",
    path: "/reservas",
    bg: "#0D9488",
  },
  {
    id: "gastos",
    icon: <IconDollar className="w-[17px] h-[17px]" />,
    label: "Mis gastos",
    path: "/gastos",
    bg: "#005047",
  },
  {
    id: "emergencia",
    icon: <IconPhone className="w-[17px] h-[17px]" />,
    label: "Emergencia",
    path: "/canales",
    bg: "#E11D48",
  },
  {
    id: "tablon",
    icon: <IconMessage className="w-[17px] h-[17px]" />,
    label: "Tablón",
    path: "/tablon",
    bg: "#0D9488",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// AnnouncementRibbon — declared before Layout to avoid hoisting issues
// ─────────────────────────────────────────────────────────────────────────────

function AnnouncementRibbon({ onDismiss }: { onDismiss: () => void }) {
  const [idx, setIdx] = useState(0);
  const [fading, setFading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const rotate = () => {
    setFading(true);
    fadeTimerRef.current = setTimeout(() => {
      setIdx((i) => (i + 1) % RIBBON_ITEMS.length);
      setFading(false);
    }, 250);
  };

  useEffect(() => {
    if (RIBBON_ITEMS.length < 2) return;
    timerRef.current = setInterval(rotate, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current);
    };
  }, []);

  const item = RIBBON_ITEMS[idx];

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 60,
        height: 32,
        background: "#005047",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 16px",
          display: "flex",
          alignItems: "center",
          gap: 12,
          width: "100%",
        }}
      >
        {/* Label badge */}
        <div
          style={{
            flexShrink: 0,
            background: "#0D9488",
            borderRadius: 3,
            padding: "1px 8px",
            display: "flex",
            alignItems: "center",
            gap: 5,
          }}
        >
          <span
            style={{
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: "#4ADE80",
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              color: "#fff",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Tablón
          </span>
        </div>

        {/* Rotating text */}
        <Link
          to={item.path}
          style={{
            flex: 1,
            fontSize: 12,
            color: "rgba(255,255,255,0.88)",
            textDecoration: "none",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            opacity: fading ? 0 : 1,
            transition: "opacity 0.25s",
          }}
        >
          {item.text}
        </Link>

        {/* Dot indicators */}
        <div className="flex gap-[4px] shrink-0 ribbon-dots">
          {RIBBON_ITEMS.map((item, i) => (
            <button
              key={item.text}
              aria-label={`Ver aviso ${i + 1} de ${RIBBON_ITEMS.length}`}
              onClick={() => {
                setIdx(i);
                setFading(false);
              }}
              style={{
                width: i === idx ? 14 : 5,
                height: 5,
                borderRadius: 3,
                background: i === idx ? "#5EEAD4" : "rgba(255,255,255,0.3)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "width 0.3s, background 0.3s",
              }}
            />
          ))}
        </div>

        {/* Dismiss */}
        <button
          onClick={onDismiss}
          aria-label="Cerrar aviso"
          style={{
            flexShrink: 0,
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "rgba(255,255,255,0.6)",
            padding: "2px 4px",
            lineHeight: 1,
            fontSize: 14,
            transition: "color 0.15s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
        >
          ✕
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// FloatingSidebar — declared before Layout
// ─────────────────────────────────────────────────────────────────────────────

function FloatingSidebar() {
  const [hovered, setHovered] = useState<string | null>(null);
  const items = FLOATING_SIDEBAR_ITEMS;

  return (
    <div
      className="float-sidebar"
      style={{
        position: "fixed",
        right: 0,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 45,
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}
    >
      {items.map((item) => (
        <Link
          key={item.id}
          to={item.path}
          onMouseEnter={() => setHovered(item.id)}
          onMouseLeave={() => setHovered(null)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            textDecoration: "none",
          }}
        >
          {/* Expanding label */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              background: item.bg,
              height: 40,
              maxWidth: hovered === item.id ? 120 : 0,
              overflow: "hidden",
              whiteSpace: "nowrap",
              borderRadius: "6px 0 0 6px",
              paddingLeft: hovered === item.id ? 12 : 0,
              opacity: hovered === item.id ? 1 : 0,
              transition: "max-width 0.22s ease, opacity 0.18s ease, padding-left 0.22s ease",
            }}
          >
            <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{item.label}</span>
          </div>

          {/* Icon button */}
          <div
            style={{
              width: 40,
              height: 40,
              flexShrink: 0,
              background: item.bg,
              borderRadius: hovered === item.id ? "0 6px 6px 0" : "6px 0 0 6px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              boxShadow: "0 2px 12px rgba(0,0,0,0.22)",
              transition: "border-radius 0.22s ease",
            }}
          >
            {item.icon}
          </div>
        </Link>
      ))}

      {/* Scroll-to-top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{
          width: 40,
          height: 40,
          borderRadius: "6px 0 0 6px",
          background: "#fff",
          border: "1px solid #E2E8F0",
          borderRight: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "#64748B",
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          transition: "background 0.15s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#F0FDFA")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
        title="Ir arriba"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-[14px] h-[14px]"
        >
          <polyline points="18 15 12 9 6 15" />
        </svg>
      </button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Layout
// ─────────────────────────────────────────────────────────────────────────────

const ROLE_LABELS: Record<Role, string> = {
  residente: "Residente",
  conserje: "Conserje",
  admin: "Admin",
  comite: "Comité",
};
const ROLE_COLORS: Record<Role, string> = {
  residente: "#0D9488",
  conserje: "#3B82F6",
  admin: "#7C3AED",
  comite: "#D97706",
};

export default function Layout() {
  const { role, setRole, user } = useAuth();
  const [ribbonVisible, setRibbonVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const [prevPathname, setPrevPathname] = useState(location.pathname);
  if (location.pathname !== prevPathname) {
    setPrevPathname(location.pathname);
    setMobileOpen(false);
  }

  const navLinks = NAV_LINKS_BY_ROLE[role];

  const RIBBON_H = ribbonVisible ? 32 : 0;
  const NAV_H = 64;
  const TOP_OFFSET = RIBBON_H + NAV_H;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  const navBg = isHome
    ? scrolled
      ? "rgba(255,255,255,0.96)"
      : "transparent"
    : "rgba(255,255,255,0.97)";
  const navBorder = (isHome ? scrolled : true) ? "1px solid #E2E8F0" : "1px solid transparent";

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Ribbon */}
      {ribbonVisible && <AnnouncementRibbon onDismiss={() => setRibbonVisible(false)} />}

      {/* Nav */}
      <nav
        style={{
          position: "fixed",
          top: RIBBON_H,
          left: 0,
          right: 0,
          zIndex: 50,
          height: NAV_H,
          background: navBg,
          backdropFilter: "blur(14px)",
          borderBottom: navBorder,
          transition: "background 0.3s, border-color 0.3s, top 0.3s",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            padding: "0 24px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <NavLink
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              textDecoration: "none",
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 9,
                background: "linear-gradient(135deg,#0D9488,#005047)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconHome style={{ color: "#fff", width: 17, height: 17 }} />
            </div>
            <div>
              <div
                style={{
                  fontFamily: "Gloock,Georgia,serif",
                  fontSize: 19,
                  color: "#00201B",
                  lineHeight: 1.1,
                }}
              >
                Convivo
              </div>
              <div
                style={{
                  fontSize: 9,
                  color: "#94A3B8",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              >
                Gestión Simple
              </div>
            </div>
          </NavLink>

          {/* Desktop links */}
          <div className="nav-desktop" style={{ display: "flex", alignItems: "center", gap: 2 }}>
            {navLinks.map((l) => (
              <NavLink
                key={l.path}
                to={l.path}
                style={({ isActive }) => ({
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  fontSize: 13,
                  fontWeight: 500,
                  textDecoration: "none",
                  padding: "6px 11px",
                  borderRadius: 7,
                  color: isActive ? "#0D9488" : "#64748B",
                  background: isActive ? "#F0FDFA" : "transparent",
                  transition: "all 0.15s",
                })}
                onMouseEnter={(e) => {
                  if (!(e.currentTarget as HTMLElement).classList.contains("active"))
                    (e.currentTarget as HTMLElement).style.color = "#00201B";
                }}
                onMouseLeave={(e) => {
                  if (!(e.currentTarget as HTMLElement).classList.contains("active"))
                    (e.currentTarget as HTMLElement).style.color = "#64748B";
                }}
              >
                {l.icon} {l.label}
              </NavLink>
            ))}
            <div
              style={{
                width: 1,
                height: 20,
                background: "#E2E8F0",
                margin: "0 6px",
              }}
            />

            {/* Role switcher (demo) */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setRoleSwitcherOpen((o) => !o)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#fff",
                  background: ROLE_COLORS[role],
                  padding: "7px 12px",
                  borderRadius: 7,
                  border: "none",
                  cursor: "pointer",
                  transition: "opacity 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                title="Cambiar rol (demo)"
              >
                <span style={{ fontSize: 10, opacity: 0.75, fontWeight: 600 }}>ROL:</span>
                {ROLE_LABELS[role]}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  style={{ width: 10, height: 10, opacity: 0.7 }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {roleSwitcherOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 6px)",
                    right: 0,
                    background: "#fff",
                    border: "1px solid #E2E8F0",
                    borderRadius: 10,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                    padding: "4px",
                    zIndex: 100,
                    minWidth: 160,
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: "#94A3B8",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      padding: "6px 12px 4px",
                    }}
                  >
                    Demo · Cambiar rol
                  </div>
                  {(["residente", "conserje", "admin", "comite"] as Role[]).map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        setRole(r);
                        setRoleSwitcherOpen(false);
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        width: "100%",
                        padding: "8px 12px",
                        border: "none",
                        background: r === role ? "#F0FDFA" : "none",
                        cursor: "pointer",
                        borderRadius: 7,
                        fontSize: 13,
                        fontWeight: r === role ? 700 : 500,
                        color: r === role ? ROLE_COLORS[r] : "#00201B",
                        transition: "background 0.12s",
                      }}
                      onMouseEnter={(e) => {
                        if (r !== role)
                          (e.currentTarget as HTMLElement).style.background = "#F8FAFB";
                      }}
                      onMouseLeave={(e) => {
                        if (r !== role) (e.currentTarget as HTMLElement).style.background = "none";
                      }}
                    >
                      <span
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: "50%",
                          background: ROLE_COLORS[r],
                          flexShrink: 0,
                        }}
                      />
                      {ROLE_LABELS[r]}
                    </button>
                  ))}
                  <div
                    style={{
                      borderTop: "1px solid #F1F5F9",
                      margin: "4px 0",
                      padding: "4px 12px 6px",
                    }}
                  >
                    <p
                      style={{
                        fontSize: 11,
                        color: "#94A3B8",
                        lineHeight: 1.4,
                      }}
                    >
                      {user.nombre}
                      <br />
                      {user.unidad}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/login"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 5,
                fontSize: 12,
                fontWeight: 600,
                color: "#64748B",
                background: "none",
                padding: "7px 12px",
                borderRadius: 7,
                textDecoration: "none",
                border: "1px solid #E2E8F0",
                transition: "color 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#00201B";
                (e.currentTarget as HTMLElement).style.borderColor = "#CBD5E1";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#64748B";
                (e.currentTarget as HTMLElement).style.borderColor = "#E2E8F0";
              }}
              data-cuelume-press="whisper"
              aria-label="Cerrar sesión"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-[13px] h-[13px]"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Salir
            </Link>
          </div>

          {/* Mobile burger */}
          <button
            className="nav-burger"
            onClick={() => setMobileOpen((o) => !o)}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 4,
              color: "#00201B",
              display: "none",
            }}
          >
            {mobileOpen ? (
              <IconX className="w-[22px] h-[22px]" />
            ) : (
              <IconMenu className="w-[22px] h-[22px]" />
            )}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              background: "#fff",
              borderBottom: "1px solid #E2E8F0",
              padding: "8px 16px 16px",
              zIndex: 49,
            }}
          >
            {navLinks.map((l) => (
              <NavLink
                key={l.path}
                to={l.path}
                style={({ isActive }) => ({
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "11px 8px",
                  fontSize: 14,
                  fontWeight: 500,
                  color: isActive ? "#0D9488" : "#00201B",
                  textDecoration: "none",
                  borderBottom: "1px solid #F1F5F9",
                })}
              >
                {l.icon} {l.label}
              </NavLink>
            ))}
            <div style={{ marginTop: 8, display: "flex", gap: 8 }}>
              {(["residente", "conserje", "admin", "comite"] as Role[]).map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    setRole(r);
                    setMobileOpen(false);
                  }}
                  style={{
                    flex: 1,
                    padding: "8px 4px",
                    fontSize: 12,
                    fontWeight: 700,
                    borderRadius: 8,
                    border: "none",
                    background: r === role ? ROLE_COLORS[r] : "#F1F5F9",
                    color: r === role ? "#fff" : "#64748B",
                    cursor: "pointer",
                  }}
                >
                  {ROLE_LABELS[r]}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Page content */}
      <main style={{ flex: 1, paddingTop: isHome ? 0 : TOP_OFFSET }}>
        <Outlet />
      </main>

      {/* Floating sidebar */}
      <FloatingSidebar />

      {/* Footer */}
      <footer
        style={{
          background: "#00201B",
          color: "rgba(255,255,255,0.55)",
          padding: "52px 24px 28px",
        }}
      >
        <div className="max-w-[1280px] mx-auto">
          <div
            className="footer-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr 1fr 1fr",
              gap: 40,
              marginBottom: 40,
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: "#0D9488",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IconHome style={{ color: "#fff", width: 16, height: 16 }} />
                </div>
                <span
                  style={{
                    fontFamily: "Gloock,Georgia,serif",
                    fontSize: 18,
                    color: "#fff",
                  }}
                >
                  Convivo
                </span>
              </div>
              <p
                style={{
                  fontSize: 13,
                  lineHeight: 1.7,
                  maxWidth: 260,
                  margin: "0 0 16px",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                Plataforma digital para la gestión de condominios en Chile. Tranquilidad, comunidad
                y confianza.
              </p>
              <div style={{ display: "flex", gap: 16 }}>
                {["Privacidad", "Términos", "Contacto"].map((l) => (
                  <span
                    key={l}
                    style={{
                      fontSize: 12,
                      color: "rgba(255,255,255,0.35)",
                      cursor: "pointer",
                      transition: "color 0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#5EEAD4")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.35)")}
                  >
                    {l}
                  </span>
                ))}
              </div>
            </div>
            {[
              {
                title: "Plataforma",
                links: [
                  "Reservas",
                  "Gastos comunes",
                  "Tablón de avisos",
                  "Dashboard",
                  "Registro fotográfico",
                ],
              },
              {
                title: "Empresa",
                links: ["Precios", "Sobre Convivo", "Blog", "Prensa"],
              },
              {
                title: "Emergencias",
                links: ["Carabineros 133", "Bomberos 132", "SAMU 131", "Conserjería Interno 100"],
              },
            ].map((col) => (
              <div key={col.title}>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#5EEAD4",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 16,
                  }}
                >
                  {col.title}
                </div>
                {col.links.map((l) => (
                  <div
                    key={l}
                    style={{
                      fontSize: 13,
                      color: "rgba(255,255,255,0.45)",
                      marginBottom: 10,
                      cursor: "pointer",
                      transition: "color 0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
                  >
                    {l}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div
            style={{
              borderTop: "1px solid rgba(255,255,255,0.07)",
              paddingTop: 20,
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            <p style={{ fontSize: 12, margin: 0 }}>
              © 2026 Convivo SpA. Todos los derechos reservados.
            </p>
            <p style={{ fontSize: 12, margin: 0 }}>Hecho con ♥ para condominios chilenos</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
