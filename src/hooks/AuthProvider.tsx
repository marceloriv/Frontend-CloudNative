import { useState, useMemo, type ReactNode } from "react";
import { AuthContext, USERS } from "./useAuth";
import type { Role } from "../types";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>("residente");
  const user = USERS[role];
  const value = useMemo(() => ({ user, role, setRole }), [user, role]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
