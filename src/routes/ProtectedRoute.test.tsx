import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router";
import { describe, expect, it } from "vitest";
import { AuthContext } from "../hooks/useAuth";
import type { Role } from "../types";
import ProtectedRoute from "./ProtectedRoute";

function renderConRol(role: Role, allowedRoles: Role[]) {
  return render(
    <AuthContext.Provider
      value={{
        user: { nombre: "Test", unidad: "Unidad de prueba", role },
        role,
        setRole: () => {},
      }}
    >
      <MemoryRouter initialEntries={["/privado"]}>
        <Routes>
          <Route path="/" element={<p>inicio</p>} />
          <Route element={<ProtectedRoute allowedRoles={allowedRoles} />}>
            <Route path="/privado" element={<p>contenido protegido</p>} />
          </Route>
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>,
  );
}

describe("ProtectedRoute", () => {
  it("renderiza la ruta cuando el rol está permitido", () => {
    renderConRol("admin", ["admin", "comite"]);
    expect(screen.getByText("contenido protegido")).toBeInTheDocument();
  });

  it("redirige a la raíz cuando el rol no está permitido", () => {
    renderConRol("residente", ["admin"]);
    expect(screen.queryByText("contenido protegido")).not.toBeInTheDocument();
    expect(screen.getByText("inicio")).toBeInTheDocument();
  });
});
