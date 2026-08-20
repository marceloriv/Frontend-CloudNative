import { createContext, useContext, useState, type ReactNode } from 'react'
import type { Role, User } from '../types'

interface AuthContextValue {
  user: User
  role: Role
  setRole: (r: Role) => void
}

const USERS: Record<Role, User> = {
  residente: { nombre: 'María González', unidad: 'Torre A · Piso 12 · Unidad 1204', role: 'residente' },
  conserje:  { nombre: 'Jorge Pizarro',  unidad: 'Conserjería Principal',            role: 'conserje'  },
  admin:     { nombre: 'Ana Vidal',      unidad: 'Administración Convivo',           role: 'admin'     },
  comite:    { nombre: 'Luis Herrera',   unidad: 'Comité de Administración',         role: 'comite'    },
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>('residente')
  const user = USERS[role]
  return (
    <AuthContext.Provider value={{ user, role, setRole }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
