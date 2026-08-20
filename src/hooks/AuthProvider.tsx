import { useState, type ReactNode } from 'react'
import { AuthContext, USERS } from './useAuth'
import type { Role } from '../types'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>('residente')
  const user = USERS[role]
  return (
    <AuthContext.Provider value={{ user, role, setRole }}>
      {children}
    </AuthContext.Provider>
  )
}
