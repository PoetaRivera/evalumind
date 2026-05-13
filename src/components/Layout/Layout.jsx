import { Outlet, Link } from 'react-router-dom';
import './Layout.css';

function Layout() {
  return (
    <div className="app-layout">
      <header className="app-header">
        <div>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h1 style={{ margin: 0 }}>NeuroScreen</h1>
          </Link>
          <span className="app-tagline">Herramienta de screening orientativo</span>
        </div>
        <nav style={{ display: 'flex', gap: '16px', fontSize: '0.85rem' }}>
          <Link to="/perfil" style={{ color: '#6b7280', textDecoration: 'none' }}>Mi perfil</Link>
        </nav>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
      <footer className="app-footer">
        <p>
          NeuroScreen no diagnostica. Solo ofrece información orientativa basada en criterios
          científicos. Consulta siempre con un profesional de la salud mental.
        </p>
      </footer>
    </div>
  );
}

export default Layout;
