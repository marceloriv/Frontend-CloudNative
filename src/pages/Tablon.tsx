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
      <div className="bg-[#00201B] px-6 pb-16 pt-[72px]">
        <div className="max-w-[1280px] mx-auto">
          <p className="text-[11px] font-bold text-white/45 tracking-[0.14em] uppercase mb-4">
            Cartelera digital
          </p>
          <h1 className="font-display text-[clamp(36px,5vw,64px)] text-white leading-[1.08] mb-[18px] font-normal">
            Tablón de avisos
          </h1>
          <p className="text-[19px] text-white/65 m-0 max-w-[540px] leading-[1.65]">
            Información del condominio, siempre al día
          </p>
        </div>
      </div>

      {/* Existing header strip (gradient) */}
      <div className="bg-gradient-to-br from-[#0D9488] to-[#005047] px-6 pb-9 pt-10">
        <div className="max-w-[1280px] mx-auto flex justify-between items-end flex-wrap gap-5">
          <div>
            <p className="text-[11px] font-bold text-white/60 tracking-[0.12em] uppercase mb-2.5">
              Cartelera digital
            </p>
            <h2 className="font-display text-[clamp(24px,3vw,36px)] text-white leading-[1.1] mb-2.5 font-normal">
              Tablón de Eventos y Avisos
            </h2>
            <p className="text-[15px] text-white/72 m-0 max-w-[520px] leading-[1.65]">
              Cartelera digital comunitaria con avisos, asambleas y comunicados del comité — en
              tiempo real.
            </p>
          </div>
          <button
            onClick={() => setShowNew(true)}
            className="flex items-center gap-2 bg-white text-[#005047] border-none rounded-[10px] px-5 py-3 text-[14px] font-bold cursor-pointer transition-opacity duration-200 whitespace-nowrap hover:opacity-90"
          >
            <IconPlus className="w-4 h-4" />
            {canPublishDirect ? "Publicar aviso" : "Solicitar publicación"}
          </button>
        </div>
      </div>

      {/* Main notices content */}
      <div className="max-w-[1280px] mx-auto px-6 pb-20 pt-10">
        {/* Filters & stats */}
        <div className="flex justify-between items-center flex-wrap gap-4 mb-8">
          <div className="flex gap-2">
            {tipos.map((t) => (
              <button
                key={t}
                onClick={() => setActiveTipo(t)}
                className={`px-4 py-2 rounded-full text-[13px] font-medium cursor-pointer border transition-colors duration-150 ${
                  activeTipo === t
                    ? "border-[#0D9488] bg-[#0D9488] text-white"
                    : "border-border bg-white text-text-muted hover:border-[#0D9488]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="text-[13px] text-text-muted">{filtered.length} publicaciones</div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] gap-5">
          {filtered.map((a) => {
            const idx = avisos.indexOf(a);
            const yaConfirmado = confirmados[idx];
            const bc = badgeClasses[a.badge as BadgeKey] ?? badgeClasses.primary;
            return (
              <div
                key={a.titulo}
                className={`bg-surface border border-border border-l-4 ${bc.border} rounded-2xl overflow-hidden transition-[box-shadow,transform] duration-200 hover:shadow-lg hover:-translate-y-0.5`}
              >
                <div className="px-[22px] pt-[22px]">
                  <div className="flex justify-between items-center mb-3">
                    <span
                      className={`text-[11px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full ${bc.label}`}
                    >
                      {a.tipo}
                    </span>
                    <span className="text-[12px] text-text-muted">{a.fecha}</span>
                  </div>
                  <h3 className="font-display text-[17px] text-[#00201B] m-0 mb-2.5 font-normal leading-[1.3]">
                    {a.titulo}
                  </h3>
                  <p className="text-[13px] text-text-muted leading-[1.65] m-0 mb-4">{a.desc}</p>
                  <div className="flex items-center gap-1.5 text-[12px] text-text-muted mb-4">
                    <IconBell className="w-3 h-3" /> Publicado por:{" "}
                    <strong className="text-text-muted font-bold">{a.autor}</strong>
                  </div>
                </div>
                {a.confirmacion && (
                  <div className="border-t border-[#F1F5F9] px-[22px] py-[14px] flex justify-between items-center">
                    <div className="flex items-center gap-1.5 text-[12px] text-text-muted">
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
                      className={`flex items-center gap-1.5 text-[12px] font-semibold px-3.5 py-[7px] rounded-lg border cursor-pointer transition-colors duration-150 ${
                        yaConfirmado
                          ? "border-[#0D9488] bg-[#F0FDFA] text-[#0D9488]"
                          : "border-border bg-white text-text-muted hover:border-[#0D9488]"
                      }`}
                    >
                      <IconCheck className="w-3 h-3" />
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
      <div className="bg-white px-6 py-20">
        <div className="max-w-[1280px] mx-auto">
          <p className="text-[11px] font-bold text-[#0D9488] tracking-[0.14em] uppercase mb-3">
            Funcionalidades
          </p>
          <h2 className="font-display text-[clamp(28px,3.5vw,44px)] text-[#00201B] m-0 mb-12 font-normal">
            Todo lo que necesitas en un tablón
          </h2>
          <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-5">
            {flipCards.map((card) => (
              <FlipCard
                key={card.title}
                height={200}
                front={
                  <div className="h-full bg-[#F8FAFB] rounded-2xl border border-border flex flex-col items-center justify-center p-6 text-center gap-3.5">
                    {card.icon}
                    <span className="text-[15px] font-bold text-[#00201B] leading-[1.3]">
                      {card.title}
                    </span>
                  </div>
                }
                back={
                  <div className="h-full bg-[#0D9488] rounded-2xl flex items-center justify-center p-6 text-center">
                    <span className="text-[14px] text-white leading-[1.6]">{card.desc}</span>
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
          className={`px-6 py-20 ${section.imgLeft ? "bg-[#F8FAFB]" : "bg-white"}`}
        >
          <div className="max-w-[1280px] mx-auto grid grid-cols-2 gap-16 items-center max-md:grid-cols-1">
            {section.imgLeft ? (
              <>
                <img
                  src={section.imgUrl}
                  alt={section.title}
                  className="w-full h-[380px] object-cover rounded-[20px] shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
                />
                <div>
                  <h2 className="font-display text-[clamp(26px,3vw,40px)] text-[#00201B] m-0 mb-5 font-normal leading-[1.2]">
                    {section.title}
                  </h2>
                  <p className="text-[16px] text-text-muted leading-[1.75] m-0">{section.body}</p>
                </div>
              </>
            ) : (
              <>
                <div>
                  <h2 className="font-display text-[clamp(26px,3vw,40px)] text-[#00201B] m-0 mb-5 font-normal leading-[1.2]">
                    {section.title}
                  </h2>
                  <p className="text-[16px] text-text-muted leading-[1.75] m-0">{section.body}</p>
                </div>
                <img
                  src={section.imgUrl}
                  alt={section.title}
                  className="w-full h-[380px] object-cover rounded-[20px] shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
                />
              </>
            )}
          </div>
        </div>
      ))}

      {/* CTA strip */}
      <div className="bg-[#00201B] px-6 py-16">
        <div className="max-w-[1280px] mx-auto flex items-center justify-center gap-6 flex-wrap">
          <Link
            to="/tablon"
            className="inline-flex items-center gap-2 bg-[#0D9488] hover:bg-[#005047] text-white rounded-xl px-8 py-4 text-[15px] font-bold no-underline transition-colors duration-200"
          >
            Ver los avisos <IconChevronRight className="w-4 h-4" />
          </Link>
          <button
            onClick={() => setShowNew(true)}
            className="inline-flex items-center gap-2 bg-transparent hover:bg-white/5 text-white rounded-xl border border-white/30 hover:border-white px-8 py-4 text-[15px] font-bold cursor-pointer transition-colors duration-200"
          >
            {canPublishDirect ? "Publicar aviso" : "Solicitar publicación"}{" "}
            <IconChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* New post modal */}
      {showNew && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-5">
          <button
            type="button"
            aria-label="Cerrar"
            onClick={() => setShowNew(false)}
            className="absolute inset-0 bg-[#00201B]/60 backdrop-blur-sm border-none p-0 cursor-default"
          />
          <div className="relative bg-white rounded-[20px] w-full max-w-[480px] px-7 py-8 shadow-[0_24px_80px_rgba(0,0,0,0.2)]">
            <h3 className="font-display text-[22px] text-[#00201B] m-0 mb-1.5">
              {canPublishDirect ? "Publicar aviso" : "Solicitar publicación"}
            </h3>
            <p className="text-[13px] text-text-muted m-0 mb-6">
              {canPublishDirect
                ? "El aviso quedará publicado de inmediato en el tablón comunitario."
                : "Tu solicitud será revisada por el comité antes de publicarse."}
            </p>
            <div className="flex flex-col gap-3.5">
              <div>
                <label
                  htmlFor="nuevo-aviso-tipo"
                  className="text-[12px] font-semibold text-text-muted block mb-1.5"
                >
                  Tipo
                </label>
                <select
                  id="nuevo-aviso-tipo"
                  className="w-full px-3 py-2.5 border border-border rounded-lg text-[14px] text-[#00201B] bg-white outline-none focus:border-[#0D9488]"
                >
                  <option>Aviso de interés comunitario</option>
                  <option>Rifa / bazar</option>
                  <option>Venta</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="nuevo-aviso-titulo"
                  className="text-[12px] font-semibold text-text-muted block mb-1.5"
                >
                  Título
                </label>
                <input
                  id="nuevo-aviso-titulo"
                  type="text"
                  placeholder="Título del aviso"
                  className="w-full px-3 py-2.5 border border-border rounded-lg text-[14px] text-[#00201B] outline-none box-border focus:border-[#0D9488]"
                />
              </div>
              <div>
                <label
                  htmlFor="nuevo-aviso-desc"
                  className="text-[12px] font-semibold text-text-muted block mb-1.5"
                >
                  Descripción
                </label>
                <textarea
                  id="nuevo-aviso-desc"
                  rows={4}
                  placeholder="Descripción detallada..."
                  className="w-full px-3 py-2.5 border border-border rounded-lg text-[14px] text-[#00201B] outline-none resize-y font-sans box-border focus:border-[#0D9488]"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowNew(false)}
                className="flex-1 p-3 text-[14px] font-semibold rounded-[10px] border border-border bg-white text-text-muted cursor-pointer hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={() => setShowNew(false)}
                className="flex-[2] p-3 text-[14px] font-bold rounded-[10px] border-none bg-[#0D9488] text-white cursor-pointer hover:bg-[#005047]"
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
