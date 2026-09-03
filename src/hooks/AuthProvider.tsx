import { useState, useMemo, type ReactNode } from "react";
import { AuthContext, USERS } from "./useAuth";
import type { Role, User } from "../types";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(USERS.residente);
  const role = user.role;
  const setRole = (r: Role) => setUser(USERS[r]);
  const value = useMemo(() => ({ user, role, setRole, setUser }), [user, role]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
