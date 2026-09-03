import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-6 text-center bg-surface">
      <span className="font-display text-primary text-6xl leading-none">404</span>
      <h1 className="font-display text-2xl text-text">Página no encontrada</h1>
      <p className="text-muted max-w-md">La página que buscas no existe o fue movida.</p>
      <Link to="/" className="text-primary font-semibold hover:underline">
        Volver al inicio
      </Link>
    </div>
  );
}
