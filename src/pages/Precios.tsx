import { Fragment, useState } from 'react'
import { IconCheck, IconX } from '../components/icons/Icons'

// ─── Types ────────────────────────────────────────────────────────────────────

interface PlanTier {
  id: string
  name: string
  monthlyPrice: number | null
  annualPrice: number | null
  badge?: string
  highlight: boolean
  desc: string
  cta: string
}

interface FeatureRow {
  category: string
  features: {
    label: string
    basico: boolean | string
    comunidad: boolean | string
    enterprise: boolean | string
  }[]
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const PLANS: PlanTier[] = [
  {
    id: 'basico', name: 'Básico',
    monthlyPrice: 0, annualPrice: 0,
    highlight: false,
    desc: 'Para comunidades pequeñas que quieren digitalizar sin inversión.',
    cta: 'Comenzar gratis',
  },
  {
    id: 'comunidad', name: 'Comunidad',
    monthlyPrice: 19900, annualPrice: 14900,
    badge: 'Más popular',
    highlight: true,
    desc: 'Todo lo que necesita un condominio moderno. Sin límites.',
    cta: 'Comenzar ahora',
  },
  {
    id: 'enterprise', name: 'Enterprise',
    monthlyPrice: null, annualPrice: null,
    highlight: false,
    desc: 'Para conjuntos multi-torre con miles de residentes.',
    cta: 'Hablar con ventas',
  },
]

const FEATURE_ROWS: FeatureRow[] = [
  {
    category: 'Unidades y acceso',
    features: [
      { label: 'Unidades incluidas', basico: 'Hasta 30', comunidad: 'Hasta 150', enterprise: 'Ilimitadas' },
      { label: 'Multi-torre / multi-edificio', basico: false, comunidad: false, enterprise: true },
      { label: 'Acceso por roles', basico: true, comunidad: true, enterprise: true },
      { label: 'SSO (inicio de sesión único)', basico: false, comunidad: false, enterprise: true },
    ],
  },
  {
    category: 'Reservas',
    features: [
      { label: 'Espacios para reservar', basico: '2 espacios', comunidad: 'Ilimitados', enterprise: 'Ilimitados' },
      { label: 'Reservas por mes', basico: '50', comunidad: 'Sin límite', enterprise: 'Sin límite' },
      { label: 'Pago en línea (WebPay)', basico: false, comunidad: true, enterprise: true },
      { label: 'Código QR de confirmación', basico: false, comunidad: true, enterprise: true },
    ],
  },
  {
    category: 'Gastos comunes',
    features: [
      { label: 'Emisión mensual de gastos', basico: 'Manual', comunidad: 'Automatizada', enterprise: 'Automatizada' },
      { label: 'Desglose por categoría', basico: true, comunidad: true, enterprise: true },
      { label: 'Pago en línea (WebPay)', basico: false, comunidad: true, enterprise: true },
      { label: 'Alertas de vencimiento', basico: false, comunidad: true, enterprise: true },
      { label: 'Historial exportable PDF', basico: false, comunidad: true, enterprise: true },
    ],
  },
  {
    category: 'Tablón y comunicación',
    features: [
      { label: 'Tablón digital de avisos', basico: true, comunidad: true, enterprise: true },
      { label: 'Notificaciones push', basico: false, comunidad: true, enterprise: true },
      { label: 'Segmentación por torre', basico: false, comunidad: true, enterprise: true },
      { label: 'Confirmación de asistencia', basico: false, comunidad: true, enterprise: true },
      { label: 'Historial ilimitado', basico: '3 meses', comunidad: true, enterprise: true },
    ],
  },
  {
    category: 'Dashboard y transparencia',
    features: [
      { label: 'Dashboard de transparencia', basico: false, comunidad: true, enterprise: true },
      { label: 'Boleta adjunta por gasto', basico: false, comunidad: true, enterprise: true },
      { label: 'Exportación PDF para asambleas', basico: false, comunidad: true, enterprise: true },
      { label: 'API e integraciones externas', basico: false, comunidad: false, enterprise: true },
    ],
  },
  {
    category: 'Canales de seguridad',
    features: [
      { label: 'Directorio de contactos', basico: true, comunidad: true, enterprise: true },
      { label: 'Llamada directa a conserjería', basico: true, comunidad: true, enterprise: true },
      { label: 'Banner de emergencias activo', basico: true, comunidad: true, enterprise: true },
    ],
  },
  {
    category: 'Registro fotográfico',
    features: [
      { label: 'Bitácora fotográfica', basico: false, comunidad: true, enterprise: true },
      { label: 'Foto antes/después', basico: false, comunidad: true, enterprise: true },
      { label: 'Vinculado al dashboard', basico: false, comunidad: true, enterprise: true },
      { label: 'Almacenamiento', basico: '—', comunidad: '10 GB', enterprise: 'Ilimitado' },
    ],
  },
  {
    category: 'Soporte',
    features: [
      { label: 'Soporte por correo', basico: true, comunidad: true, enterprise: true },
      { label: 'Soporte prioritario 24/7', basico: false, comunidad: true, enterprise: true },
      { label: 'Administrador asignado', basico: false, comunidad: false, enterprise: true },
      { label: 'Onboarding dedicado', basico: false, comunidad: false, enterprise: true },
      { label: 'SLA garantizado', basico: false, comunidad: false, enterprise: true },
    ],
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function FeatureCell({ value }: { value: boolean | string }) {
  if (value === true) return (
    <td style={{ padding: '12px 20px', textAlign: 'center' }}>
      <div style={{ display: 'inline-flex', width: 22, height: 22, borderRadius: '50%', background: '#CCFBF1', alignItems: 'center', justifyContent: 'center' }}>
        <IconCheck style={{ width: 12, height: 12, color: '#005047' }} />
      </div>
    </td>
  )
  if (value === false) return (
    <td style={{ padding: '12px 20px', textAlign: 'center' }}>
      <div style={{ display: 'inline-flex', width: 22, height: 22, borderRadius: '50%', background: '#F1F5F9', alignItems: 'center', justifyContent: 'center' }}>
        <IconX style={{ width: 12, height: 12, color: '#CBD5E1' }} />
      </div>
    </td>
  )
  return <td style={{ padding: '12px 20px', textAlign: 'center', fontSize: 13, color: '#64748B', fontWeight: 500 }}>{value}</td>
}

function formatPrice(p: number | null, isAnnual: boolean) {
  if (p === null) return 'A medida'
  if (p === 0) return 'Gratis'
  const val = isAnnual ? p - 5000 : p
  return `$${val.toLocaleString('es-CL')}`
}

// ─── Main page ─────────────────────────────────────────────────────────────────

export default function Precios() {
  const [annual, setAnnual] = useState(false)

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFB' }}>
      {/* Hero */}
      <div style={{ background: '#00201B', padding: '80px 24px 72px', textAlign: 'center' }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(94,234,212,0.7)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 16 }}>Planes y precios</p>
        <h1 style={{ fontFamily: 'Gloock, Georgia, serif', fontSize: 'clamp(34px,5vw,60px)', color: '#fff', lineHeight: 1.1, margin: '0 0 16px', fontWeight: 400 }}>Simple y sin sorpresas</h1>
        <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.62)', lineHeight: 1.7, margin: '0 auto 36px', maxWidth: 480 }}>
          Sin costos ocultos ni instalaciones. Empieza gratis y escala cuando tu comunidad lo necesite.
        </p>

        {/* Toggle mensual/anual */}
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 14, background: 'rgba(255,255,255,0.07)', borderRadius: 100, padding: '8px 16px', border: '1px solid rgba(255,255,255,0.12)' }}>
          <span style={{ fontSize: 13, color: annual ? 'rgba(255,255,255,0.45)' : '#fff', fontWeight: annual ? 400 : 600, transition: 'color 0.2s' }}>Mensual</span>
          <button onClick={() => setAnnual(!annual)} aria-label="Cambiar entre plan mensual y anual" aria-pressed={annual} style={{
            width: 44, height: 24, borderRadius: 12, cursor: 'pointer', border: 'none', position: 'relative',
            background: annual ? '#0D9488' : 'rgba(255,255,255,0.2)', transition: 'background 0.25s',
          }}>
            <span style={{ position: 'absolute', top: 2, left: annual ? 22 : 2, width: 20, height: 20, borderRadius: '50%', background: '#fff', transition: 'left 0.25s', display: 'block' }} />
          </button>
          <span style={{ fontSize: 13, color: annual ? '#fff' : 'rgba(255,255,255,0.45)', fontWeight: annual ? 600 : 400, transition: 'color 0.2s' }}>
            Anual <span style={{ fontSize: 11, color: '#5EEAD4', fontWeight: 700, marginLeft: 4 }}>–25%</span>
          </span>
        </div>
      </div>

      {/* Tier cards */}
      <div style={{ maxWidth: 1200, margin: '-48px auto 0', padding: '0 24px 72px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20, alignItems: 'stretch' }} className="price-cards">
          {PLANS.map(plan => {
            const price = formatPrice(plan.monthlyPrice, annual)
            const period = plan.monthlyPrice === null ? '' : plan.monthlyPrice === 0 ? '' : annual ? '/mes facturado anual' : '/mes'
            return (
              <div key={plan.id} style={{
                background: plan.highlight ? '#0D9488' : '#fff',
                border: `1px solid ${plan.highlight ? '#0D9488' : '#E2E8F0'}`,
                borderRadius: 20,
                padding: plan.highlight ? '40px 32px' : '32px',
                position: 'relative',
                boxShadow: plan.highlight ? '0 24px 72px rgba(13,148,136,0.3)' : '0 2px 20px rgba(0,0,0,0.05)',
                transform: plan.highlight ? 'translateY(-8px)' : 'none',
              }}>
                {plan.badge && (
                  <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: '#fff', color: '#005047', fontSize: 11, fontWeight: 800, padding: '4px 14px', borderRadius: 100, border: '1px solid #CCFBF1', whiteSpace: 'nowrap', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                    {plan.badge}
                  </div>
                )}

                <div style={{ fontSize: 13, fontWeight: 700, color: plan.highlight ? 'rgba(255,255,255,0.75)' : '#94A3B8', marginBottom: 8, letterSpacing: '0.04em' }}>{plan.name}</div>
                <div style={{ marginBottom: 8 }}>
                  <span style={{ fontFamily: 'Gloock, Georgia, serif', fontSize: 46, color: plan.highlight ? '#fff' : '#00201B', lineHeight: 1 }}>{price}</span>
                  {period && <span style={{ fontSize: 13, color: plan.highlight ? 'rgba(255,255,255,0.55)' : '#94A3B8', marginLeft: 4 }}>{period}</span>}
                </div>
                <p style={{ fontSize: 13, color: plan.highlight ? 'rgba(255,255,255,0.6)' : '#64748B', lineHeight: 1.6, margin: '0 0 28px' }}>{plan.desc}</p>

                <button style={{
                  width: '100%', padding: '13px', fontSize: 14, fontWeight: 700, borderRadius: 10, cursor: 'pointer', transition: 'opacity 0.2s',
                  background: plan.highlight ? '#fff' : '#00201B',
                  color: plan.highlight ? '#0D9488' : '#fff',
                  border: 'none',
                }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.87')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                  {plan.cta}
                </button>
              </div>
            )
          })}
        </div>
      </div>

      {/* Feature comparison table */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px 100px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'Gloock, Georgia, serif', fontSize: 'clamp(26px,3vw,38px)', color: '#00201B', lineHeight: 1.2, margin: '0 0 10px', fontWeight: 400 }}>Comparación completa</h2>
          <p style={{ fontSize: 15, color: '#64748B', margin: 0 }}>Todo lo que incluye cada plan, sin letras chicas.</p>
        </div>

        <div style={{ background: '#fff', borderRadius: 20, border: '1px solid #E2E8F0', overflow: 'hidden', boxShadow: '0 4px 30px rgba(0,0,0,0.06)' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #E2E8F0' }}>
                  <th style={{ textAlign: 'left', padding: '20px 24px', fontSize: 12, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Funcionalidad</th>
                  {PLANS.map(p => (
                    <th key={p.id} style={{ textAlign: 'center', padding: '20px', fontSize: 14, fontWeight: 700, color: p.highlight ? '#0D9488' : '#00201B', width: 160 }}>{p.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {FEATURE_ROWS.map((group, gi) => (
                  <Fragment key={`group-${gi}`}>
                    <tr>
                      <td colSpan={4} style={{ padding: '16px 24px 8px', fontSize: 11, fontWeight: 800, color: '#0D9488', textTransform: 'uppercase', letterSpacing: '0.1em', background: '#F8FAFB', borderTop: gi > 0 ? '1px solid #E2E8F0' : 'none' }}>
                        {group.category}
                      </td>
                    </tr>
                    {group.features.map((feat, fi) => (
                      <tr key={`${gi}-${fi}`} style={{ borderBottom: '1px solid #F1F5F9', background: fi % 2 === 0 ? '#fff' : '#FAFBFC' }}>
                        <td style={{ padding: '12px 24px', fontSize: 13, color: '#00201B' }}>{feat.label}</td>
                        <FeatureCell value={feat.basico} />
                        <FeatureCell value={feat.comunidad} />
                        <FeatureCell value={feat.enterprise} />
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* CTA banner */}
      <section style={{ background: 'linear-gradient(135deg,#0D9488,#005047)', padding: '72px 24px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Gloock, Georgia, serif', fontSize: 'clamp(26px,3.5vw,42px)', color: '#fff', margin: '0 0 14px', fontWeight: 400 }}>¿Tienes dudas sobre qué plan elegir?</h2>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.72)', margin: '0 0 32px' }}>Nuestro equipo te ayuda a elegir el plan ideal para tu condominio — sin compromiso.</p>
        <button style={{ background: '#fff', color: '#005047', fontWeight: 700, fontSize: 15, padding: '14px 36px', borderRadius: 10, border: 'none', cursor: 'pointer', transition: 'transform 0.15s, box-shadow 0.15s' }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none' }}>
          Hablar con ventas
        </button>
      </section>

      <style>{`
        @media(max-width:820px){.price-cards{grid-template-columns:1fr !important}.price-cards>div{transform:none !important}}
      `}</style>
    </div>
  )
}
