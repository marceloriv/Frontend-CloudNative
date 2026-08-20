export type Role = 'residente' | 'conserje' | 'admin' | 'comite'

export interface User {
  nombre: string
  unidad: string
  role: Role
}
