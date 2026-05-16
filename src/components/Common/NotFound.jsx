import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '80px 20px', maxWidth: '500px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '4rem', color: 'var(--color-task-heading)', marginBottom: '8px' }}>404</h1>
      <h2 style={{ color: 'var(--color-text)', marginBottom: '16px' }}>Página no encontrada</h2>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '32px', lineHeight: 1.6 }}>
        La página que buscas no existe o ha sido movida. Verifica la URL o vuelve al inicio.
      </p>
      <Link to="/" className="btn btn-primary" style={{ textDecoration: 'none' }}>
        Volver al inicio
      </Link>
    </div>
  );
}
