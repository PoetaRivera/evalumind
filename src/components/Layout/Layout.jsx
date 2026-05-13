import { Outlet, NavLink } from 'react-router-dom';
import './Layout.css';

function Layout() {
  return (
    <div className="app-layout">
      <header className="app-header">
        <div>
          <h1 style={{ margin: 0 }}>
            <NavLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
              NeuroScreen
            </NavLink>
          </h1>
          <span className="app-tagline">Herramienta de screening orientativo</span>
        </div>
        <nav style={{ display: 'flex', gap: '16px', fontSize: '0.85rem' }}>
          <NavLink
            to="/perfil"
            style={({ isActive }) => ({
              color: isActive ? '#4a90d9' : '#6b7280',
              textDecoration: 'none',
              fontWeight: isActive ? 600 : 400,
            })}
          >
            Mi perfil
          </NavLink>
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
