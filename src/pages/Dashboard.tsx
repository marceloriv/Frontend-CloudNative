import { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from 'recharts'
import { gastos } from '../lib/data'
import { IconDownload, IconTrendingUp, IconEye, IconTag } from '../components/icons/Icons'

const evolucionMensual = [
  { mes: 'Ene', gasto: 540 },
  { mes: 'Feb', gasto: 540 },
  { mes: 'Mar', gasto: 560 },
  { mes: 'Abr', gasto: 560 },
  { mes: 'May', gasto: 580 },
  { mes: 'Jun', gasto: 590 },
  { mes: 'Jul', gasto: 595 },
  { mes: 'Ago', gasto: 600 },
]

interface TooltipPayload {
  value: number
}
interface CustomTooltipProps {
  active?: boolean
  payload?: TooltipPayload[]
  label?: string
}

function ChartTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: '#00201B', borderRadius: 8, padding: '8px 12px',
      fontSize: 12, fontFamily: 'Inter, system-ui, sans-serif', color: '#fff',
      boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
    }}>
      <div style={{ color: 'rgba(255,255,255,0.55)', marginBottom: 2 }}>{label} 2026</div>
      <div style={{ fontWeight: 700, color: '#5EEAD4' }}>${payload[0].value.toLocaleString('es-CL')} k</div>
    </div>
  )
}

const registros = [
  { fecha: '12 ago 2026', categoria: 'Jardinería', descripcion: 'Renovación sistema de riego — Jardín Central', proveedor: 'Verde Total SpA', monto: '$450.000', boleta: 'BOL-2026-0812', estado: 'Verificado' },
  { fecha: '05 ago 2026', categoria: 'Pintura', descripcion: 'Pintura de pasillos Torre A (pisos 1–5)', proveedor: 'Pinturas del Norte Ltda.', monto: '$280.000', boleta: 'BOL-2026-0805', estado: 'Verificado' },
  { fecha: '28 jul 2026', categoria: 'Eléctrico', descripcion: 'Mantención sala de máquinas', proveedor: 'ElectroPro Chile', monto: '$195.000', boleta: 'BOL-2026-0728', estado: 'Verificado' },
  { fecha: '20 jul 2026', categoria: 'Limpieza', descripcion: 'Limpieza fachada principal', proveedor: 'Clean Masters SpA', monto: '$320.000', boleta: 'BOL-2026-0720', estado: 'Verificado' },
  { fecha: '10 jul 2026', categoria: 'Seguridad', descripcion: 'Instalación cámara acceso subterráneo', proveedor: 'SecureTech Chile', monto: '$380.000', boleta: 'BOL-2026-0710', estado: 'Verificado' },
  { fecha: '02 jul 2026', categoria: 'Gasfitería', descripcion: 'Reparación red de aguas lluvia', proveedor: 'Gasfitería Central', monto: '$145.000', boleta: 'BOL-2026-0702', estado: 'Verificado' },
]

const categorias = ['Todos', 'Jardinería', 'Pintura', 'Eléctrico', 'Limpieza', 'Seguridad', 'Gasfitería']

export default function Dashboard() {
  const [activeCategoria, setActiveCategoria] = useState('Todos')
  const filtered = registros.filter(r => activeCategoria === 'Todos' || r.categoria === activeCategoria)

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFB' }}>
      {/* Header */}
      <div style={{ background: '#00201B', padding: '56px 24px 48px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(94,234,212,0.7)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 10 }}>Transparencia total</p>
          <h1 style={{ fontFamily: 'Gloock, Georgia, serif', fontSize: 'clamp(32px, 4vw, 52px)', color: '#fff', lineHeight: 1.1, margin: '0 0 12px', fontWeight: 400 }}>Dashboard de Transparencia</h1>
          <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.65)', margin: 0, maxWidth: 560, lineHeight: 1.65 }}>
            Panel centralizado de todos los gastos del condominio. Cada peso documentado con boleta o factura adjunta.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '40px 24px 80px' }}>
        {/* KPI cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 18, marginBottom: 28 }}>
          {[
            { label: 'Gasto del mes (ago)', val: '$600.000', sub: 'CLP · 4 ítems', icon: <IconTrendingUp style={{ width: 20, height: 20 }} />, color: '#0D9488' },
            { label: 'Acumulado anual', val: '$7.200.000', sub: 'CLP · 2026', icon: <IconTag style={{ width: 20, height: 20 }} />, color: '#005047' },
            { label: 'Mejoras implementadas', val: '$1.770.000', sub: 'CLP · 2026', icon: <IconEye style={{ width: 20, height: 20 }} />, color: '#14B8A6' },
            { label: 'Registros con boleta', val: `${registros.length} / ${registros.length}`, sub: '100% verificados', icon: <IconDownload style={{ width: 20, height: 20 }} />, color: '#0D9488' },
          ].map((k, i) => (
            <div key={i} style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 14, padding: '22px 20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ fontSize: 12, color: '#94A3B8', fontWeight: 600, letterSpacing: '0.04em', maxWidth: 140, lineHeight: 1.3 }}>{k.label}</div>
                <div style={{ color: k.color }}>{k.icon}</div>
              </div>
              <div style={{ fontFamily: 'Gloock, Georgia, serif', fontSize: 26, color: '#00201B', marginBottom: 4 }}>{k.val}</div>
              <div style={{ fontSize: 12, color: '#94A3B8' }}>{k.sub}</div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24, marginBottom: 28 }}>
          {/* Recharts bar chart — Evolución mensual */}
          <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 16, padding: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h3 style={{ fontFamily: 'Gloock, Georgia, serif', fontSize: 20, color: '#00201B', margin: 0, fontWeight: 400 }}>Evolución mensual</h3>
              <span style={{ fontSize: 12, color: '#94A3B8' }}>2026 · miles CLP</span>
            </div>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={evolucionMensual} barCategoryGap="28%" margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis
                  dataKey="mes"
                  tick={{ fontSize: 11, fontFamily: 'Inter, system-ui, sans-serif', fill: '#94A3B8' }}
                  axisLine={false} tickLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fontFamily: 'Inter, system-ui, sans-serif', fill: '#94A3B8' }}
                  axisLine={false} tickLine={false}
                  domain={[500, 620]}
                />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: '#F0FDFA' }} />
                <Bar dataKey="gasto" radius={[5, 5, 0, 0]}>
                  {evolucionMensual.map((_, i) => (
                    <Cell
                      key={i}
                      fill={i === evolucionMensual.length - 1 ? '#0D9488' : '#CCFBF1'}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Desglose por categoría */}
          <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 16, padding: '28px' }}>
            <h3 style={{ fontFamily: 'Gloock, Georgia, serif', fontSize: 20, color: '#00201B', margin: '0 0 24px', fontWeight: 400 }}>Por categoría</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {gastos.map(g => (
                <div key={g.item}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 13, color: '#00201B', fontWeight: 500 }}>{g.item}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#00201B' }}>{g.mensual}</span>
                  </div>
                  <div style={{ background: '#F1F5F9', borderRadius: 4, height: 6 }}>
                    <div style={{ width: `${g.pct}%`, height: '100%', borderRadius: 4, background: g.color }} />
                  </div>
                  <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 3 }}>{g.pct}% · Anual: {g.anual}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detalle de gastos */}
        <div style={{ background: '#fff', border: '1px solid #E2E8F0', borderRadius: 16, padding: '28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, marginBottom: 20 }}>
            <h3 style={{ fontFamily: 'Gloock, Georgia, serif', fontSize: 20, color: '#00201B', margin: 0, fontWeight: 400 }}>Detalle de gastos</h3>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
              <select value={activeCategoria} onChange={e => setActiveCategoria(e.target.value)} style={{ fontSize: 13, border: '1px solid #E2E8F0', borderRadius: 8, padding: '7px 12px', color: '#00201B', background: '#fff', outline: 'none' }}>
                {categorias.map(c => <option key={c}>{c}</option>)}
              </select>
              <button style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: '#0D9488', background: 'none', border: '1px solid #0D9488', borderRadius: 8, padding: '7px 14px', cursor: 'pointer' }}>
                <IconDownload style={{ width: 13, height: 13 }} /> Exportar PDF
              </button>
            </div>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #E2E8F0' }}>
                  {['Fecha', 'Categoría', 'Descripción', 'Proveedor', 'Monto', 'Boleta', 'Estado'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '0 12px 12px 0', fontSize: 11, fontWeight: 700, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((r, i) => (
                  <tr key={i} style={{ borderBottom: i < filtered.length - 1 ? '1px solid #F1F5F9' : 'none' }}>
                    <td style={{ padding: '14px 12px 14px 0', fontSize: 13, color: '#64748B', whiteSpace: 'nowrap' }}>{r.fecha}</td>
                    <td style={{ padding: '14px 12px 14px 0', fontSize: 13 }}>
                      <span style={{ background: '#F0FDFA', color: '#005047', fontSize: 11, fontWeight: 600, padding: '3px 8px', borderRadius: 6 }}>{r.categoria}</span>
                    </td>
                    <td style={{ padding: '14px 12px 14px 0', fontSize: 13, color: '#00201B', maxWidth: 220 }}>{r.descripcion}</td>
                    <td style={{ padding: '14px 12px 14px 0', fontSize: 13, color: '#64748B', whiteSpace: 'nowrap' }}>{r.proveedor}</td>
                    <td style={{ padding: '14px 12px 14px 0', fontSize: 13, fontWeight: 700, color: '#00201B', whiteSpace: 'nowrap' }}>{r.monto}</td>
                    <td style={{ padding: '14px 12px 14px 0', fontSize: 12, color: '#0D9488', fontFamily: 'monospace', whiteSpace: 'nowrap' }}>{r.boleta}</td>
                    <td style={{ padding: '14px 0' }}>
                      <span style={{ fontSize: 11, fontWeight: 600, color: '#0D9488', background: '#F0FDFA', padding: '3px 8px', borderRadius: 6 }}>{r.estado}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr style={{ borderTop: '2px solid #E2E8F0' }}>
                  <td colSpan={4} style={{ padding: '14px 12px 0 0', fontSize: 13, fontWeight: 600, color: '#64748B' }}>Total mostrado</td>
                  <td style={{ padding: '14px 12px 0 0', fontSize: 15, fontWeight: 700, color: '#00201B' }}>
                    ${filtered.reduce((acc, r) => acc + parseInt(r.monto.replace(/\D/g, '')), 0).toLocaleString('es-CL')}
                  </td>
                  <td colSpan={2} />
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          #dash-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
