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
        <nav style={{ display: 'flex', gap: '16px', fontSize: '0.85rem', flexWrap: 'wrap' }}>
          <NavLink
            to="/perfil"
            style={({ isActive }) => ({
              color: isActive ? '#4a90d9' : '#9ca3af',
              textDecoration: 'none',
              fontWeight: isActive ? 600 : 400,
            })}
          >
            Mi perfil
          </NavLink>
          <NavLink
            to="/historias"
            style={({ isActive }) => ({
              color: isActive ? '#4a90d9' : '#9ca3af',
              textDecoration: 'none',
              fontWeight: isActive ? 600 : 400,
            })}
          >
            Historias
          </NavLink>
          <NavLink
            to="/recursos"
            style={({ isActive }) => ({
              color: isActive ? '#4a90d9' : '#9ca3af',
              textDecoration: 'none',
              fontWeight: isActive ? 600 : 400,
            })}
          >
            Recursos
          </NavLink>
        </nav>
      </header>
      <main className="app-main">
        <Outlet />
      </main>
      <footer className="app-footer">
        <nav style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginBottom: '8px', flexWrap: 'wrap' }}>
          <NavLink to="/" style={{ color: '#6b7280', fontSize: '0.8rem' }}>Inicio</NavLink>
          <NavLink to="/perfil" style={{ color: '#6b7280', fontSize: '0.8rem' }}>Mi perfil</NavLink>
          <NavLink to="/historias" style={{ color: '#6b7280', fontSize: '0.8rem' }}>Historias</NavLink>
          <NavLink to="/recursos" style={{ color: '#6b7280', fontSize: '0.8rem' }}>Recursos</NavLink>
        </nav>
        <p>
          NeuroScreen no diagnostica. Solo ofrece información orientativa basada en criterios
          científicos. Consulta siempre con un profesional de la salud mental.
        </p>
      </footer>
    </div>
  );
}

export default Layout;
