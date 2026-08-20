import { useState } from 'react'
import { Link } from 'react-router'

// ─── Types ────────────────────────────────────────────────────────────────────

interface StepUnitForm {
  torre: string
  piso: string
  numero: string
}

interface StepAccountForm {
  nombre: string
  email: string
  password: string
  confirmPassword: string
}

type Step = 1 | 2 | 3
type StepErrors = Partial<Record<string, string>>

// ─── Validation ───────────────────────────────────────────────────────────────

function validateUnit(f: StepUnitForm): StepErrors {
  const e: StepErrors = {}
  if (!f.torre) e.torre = 'Selecciona una torre.'
  if (!f.piso) e.piso = 'Selecciona un piso.'
  if (!f.numero.trim()) e.numero = 'Ingresa el número de unidad.'
  return e
}

function validateAccount(f: StepAccountForm): StepErrors {
  const e: StepErrors = {}
  if (!f.nombre.trim()) e.nombre = 'El nombre es obligatorio.'
  if (!f.email.trim()) e.email = 'El correo es obligatorio.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = 'Correo no válido.'
  if (!f.password) e.password = 'La contraseña es obligatoria.'
  else if (f.password.length < 8) e.password = 'Mínimo 8 caracteres.'
  if (f.confirmPassword !== f.password) e.confirmPassword = 'Las contraseñas no coinciden.'
  return e
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface StepIndicatorProps {
  current: Step
  labels: string[]
}

function StepIndicator({ current, labels }: StepIndicatorProps) {
  return (
    <div className="flex items-center mb-8" aria-label="Pasos del registro">
      {labels.map((label, i) => {
        const s = (i + 1) as Step
        const done = current > s
        const active = current === s
        return (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1 shrink-0">
              <div
                aria-current={active ? 'step' : undefined}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${done ? 'bg-primary text-white' : active ? 'bg-primary text-white' : 'bg-border text-muted'}`}>
                {done ? '✓' : s}
              </div>
              <span className={`text-[10px] font-semibold hidden sm:block whitespace-nowrap ${active ? 'text-primary' : done ? 'text-primary' : 'text-muted'}`}>
                {label}
              </span>
            </div>
            {i < labels.length - 1 && (
              <div className={`flex-1 h-0.5 mx-2 ${done ? 'bg-primary' : 'bg-border'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

interface FieldProps {
  label: string
  id: string
  error?: string
  children: React.ReactNode
}

function Field({ label, id, error, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-text mb-1.5">{label}</label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-alert-red flex items-center gap-1">
          <span aria-hidden="true">⚠</span> {error}
        </p>
      )}
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

function inputClass(err?: string) {
  return `w-full px-3.5 py-2.5 rounded-lg border text-sm text-text placeholder:text-muted/60 outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 ${err ? 'border-alert-red bg-red-50' : 'border-border bg-white'}`
}

export default function RegistroCuenta() {
  const [step, setStep] = useState<Step>(1)
  const [unitForm, setUnitForm] = useState<StepUnitForm>({ torre: '', piso: '', numero: '' })
  const [accountForm, setAccountForm] = useState<StepAccountForm>({ nombre: '', email: '', password: '', confirmPassword: '' })
  const [accepted, setAccepted] = useState(false)
  const [errors, setErrors] = useState<StepErrors>({})
  const [reglamentoError, setReglamentoError] = useState('')
  const [done, setDone] = useState(false)

  function handleUnit(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setUnitForm(p => ({ ...p, [e.target.name]: e.target.value }))
  }

  function handleAccount(e: React.ChangeEvent<HTMLInputElement>) {
    setAccountForm(p => ({ ...p, [e.target.name]: e.target.value }))
  }

  function goNext() {
    if (step === 1) {
      const e = validateUnit(unitForm)
      setErrors(e)
      if (!Object.keys(e).length) { setErrors({}); setStep(2) }
    } else if (step === 2) {
      const e = validateAccount(accountForm)
      setErrors(e)
      if (!Object.keys(e).length) { setErrors({}); setStep(3) }
    } else {
      if (!accepted) { setReglamentoError('Debes aceptar el Reglamento Interno para continuar.'); return }
      setDone(true)
    }
  }

  if (done) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white p-6">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5 text-2xl text-primary">✓</div>
          <h2 className="font-display text-text text-2xl mb-2">¡Cuenta creada!</h2>
          <p className="text-muted text-sm leading-relaxed mb-6">
            Tu solicitud está en revisión. El comité la aprobará en las próximas 24 horas hábiles.
          </p>
          <Link to="/login" className="inline-flex bg-primary hover:bg-accent text-white font-bold text-sm px-6 py-3 rounded-lg transition-colors">
            Ir al inicio de sesión
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex">
      {/* Brand panel */}
      <div className="hidden lg:flex flex-col justify-between w-[420px] shrink-0 bg-text p-12">
        <span className="text-primary font-display text-2xl">Convivo</span>
        <div>
          <h1 className="font-display text-white text-4xl leading-tight mb-4">
            Únete a tu<br />comunidad.
          </h1>
          <p className="text-white/60 text-base leading-relaxed">
            En 3 pasos tu cuenta queda lista. El comité la aprueba en 24 horas.
          </p>
        </div>
        <ul className="space-y-3">
          {[
            'Valida tu unidad en el edificio',
            'Crea tu cuenta con correo y contraseña',
            'Acepta el Reglamento Interno digitalmente',
          ].map((t, i) => (
            <li key={t} className="flex gap-3 items-start">
              <div className="w-5 h-5 rounded-full bg-primary/25 text-primary text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                {i + 1}
              </div>
              <span className="text-white/65 text-sm leading-snug">{t}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Form panel */}
      <div className="flex-1 flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-6 text-center">
            <span className="text-primary font-display text-2xl">Convivo</span>
          </div>

          <h2 className="font-display text-text text-3xl mb-1">Crear cuenta</h2>
          <p className="text-muted text-sm mb-6">Registro de residente — Torres del Parque</p>

          <StepIndicator current={step} labels={['Unidad', 'Cuenta', 'Reglamento']} />

          {/* ── Step 1: Unit validation ── */}
          {step === 1 && (
            <div className="space-y-4">
              <Field label="Torre" id="torre" error={errors.torre}>
                <select id="torre" name="torre" value={unitForm.torre} onChange={handleUnit}
                  aria-invalid={!!errors.torre} aria-describedby={errors.torre ? 'torre-error' : undefined}
                  className={inputClass(errors.torre)}>
                  <option value="">Selecciona torre</option>
                  {['Torre A', 'Torre B', 'Torre C'].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </Field>
              <Field label="Piso" id="piso" error={errors.piso}>
                <select id="piso" name="piso" value={unitForm.piso} onChange={handleUnit}
                  aria-invalid={!!errors.piso} aria-describedby={errors.piso ? 'piso-error' : undefined}
                  className={inputClass(errors.piso)}>
                  <option value="">Selecciona piso</option>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map(p => (
                    <option key={p} value={String(p)}>{p}°</option>
                  ))}
                </select>
              </Field>
              <Field label="Número de unidad" id="numero" error={errors.numero}>
                <input id="numero" name="numero" type="text" value={unitForm.numero} onChange={handleUnit}
                  placeholder="Ej: 1204"
                  aria-invalid={!!errors.numero} aria-describedby={errors.numero ? 'numero-error' : undefined}
                  className={inputClass(errors.numero)}
                />
              </Field>
            </div>
          )}

          {/* ── Step 2: Account ── */}
          {step === 2 && (
            <div className="space-y-4">
              <Field label="Nombre completo" id="nombre" error={errors.nombre}>
                <input id="nombre" name="nombre" type="text" value={accountForm.nombre} onChange={handleAccount}
                  placeholder="María González" autoComplete="name"
                  aria-invalid={!!errors.nombre} aria-describedby={errors.nombre ? 'nombre-error' : undefined}
                  className={inputClass(errors.nombre)}
                />
              </Field>
              <Field label="Correo electrónico" id="email" error={errors.email}>
                <input id="email" name="email" type="email" value={accountForm.email} onChange={handleAccount}
                  placeholder="nombre@correo.cl" autoComplete="email"
                  aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined}
                  className={inputClass(errors.email)}
                />
              </Field>
              <Field label="Contraseña" id="password" error={errors.password}>
                <input id="password" name="password" type="password" value={accountForm.password} onChange={handleAccount}
                  placeholder="Mínimo 8 caracteres" autoComplete="new-password"
                  aria-invalid={!!errors.password} aria-describedby={errors.password ? 'password-error' : undefined}
                  className={inputClass(errors.password)}
                />
              </Field>
              <Field label="Confirmar contraseña" id="confirmPassword" error={errors.confirmPassword}>
                <input id="confirmPassword" name="confirmPassword" type="password" value={accountForm.confirmPassword} onChange={handleAccount}
                  placeholder="Repite la contraseña" autoComplete="new-password"
                  aria-invalid={!!errors.confirmPassword} aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
                  className={inputClass(errors.confirmPassword)}
                />
              </Field>
            </div>
          )}

          {/* ── Step 3: Reglamento ── */}
          {step === 3 && (
            <div>
              <div className="border border-border rounded-xl p-4 h-52 overflow-y-auto text-sm text-muted leading-relaxed mb-4 bg-gray-50/60" tabIndex={0} aria-label="Reglamento interno">
                <p className="font-semibold text-text mb-2">Reglamento Interno — Torres del Parque</p>
                {[
                  ['1. Horarios de silencio.', 'Entre 22:00 y 08:00 hrs no se permitirán ruidos que perturben el descanso de los residentes.'],
                  ['2. Espacios comunes.', 'Deben reservarse con anticipación en la plataforma. El uso sin reserva vigente está prohibido.'],
                  ['3. Mascotas.', 'Deben transitar con correa en áreas comunes. Los dueños son responsables en todo momento.'],
                  ['4. Estacionamientos.', 'Cada unidad tiene asignado su estacionamiento. Prohibido ocupar los de visitas permanentemente.'],
                  ['5. Basura.', 'Solo en contenedores designados y en los horarios establecidos.'],
                  ['6. Visitas.', 'Deben pre-registrarse con al menos 30 minutos de anticipación.'],
                  ['7. Sanciones.', 'El incumplimiento puede resultar en amonestaciones y multas según el Acta de Asamblea 2024.'],
                ].map(([title, body]) => (
                  <p key={title} className="mb-2"><strong>{title}</strong> {body}</p>
                ))}
              </div>

              <label className={`flex gap-3 items-start cursor-pointer p-3 rounded-lg border transition-colors ${accepted ? 'border-[#16A34A] bg-green-50' : reglamentoError ? 'border-alert-red bg-red-50' : 'border-border'}`}>
                <input type="checkbox" checked={accepted}
                  onChange={e => { setAccepted(e.target.checked); if (e.target.checked) setReglamentoError('') }}
                  className="mt-0.5 w-4 h-4 accent-primary"
                  aria-describedby={reglamentoError ? 'reg-error' : undefined}
                />
                <span className="text-sm text-text leading-snug">
                  He leído y acepto el <strong>Reglamento Interno</strong> del condominio Torres del Parque.
                </span>
              </label>
              {reglamentoError && (
                <p id="reg-error" role="alert" className="mt-1.5 text-xs text-alert-red flex items-center gap-1">
                  <span aria-hidden="true">⚠</span> {reglamentoError}
                </p>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-3 mt-6">
            {step > 1 && (
              <button onClick={() => setStep(s => (s - 1) as Step)}
                className="flex-1 border border-border text-text font-semibold text-sm py-3 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30">
                Atrás
              </button>
            )}
            <button onClick={goNext}
              className="flex-1 bg-primary hover:bg-accent text-white font-bold text-sm py-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
              {step === 3 ? 'Crear cuenta' : 'Continuar'}
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-muted">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-primary font-semibold hover:text-accent transition-colors">
              Ingresar
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
