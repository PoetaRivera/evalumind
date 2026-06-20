import { Outlet, NavLink, useLocation } from 'react-router-dom';
import FontToggle from '../Common/FontToggle';
import './Layout.css';

const NAV_LINKS = [
  { to: '/', label: 'Inicio' },
  { to: '/perfil', label: 'Mi perfil' },
  { to: '/historias', label: 'Historias' },
  { to: '/recursos', label: 'Recursos' },
];

function Layout() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="app-layout">
      <header className="app-header">
        <NavLink to="/" className="app-logo" aria-label="EvaluMind — Ir al inicio">
          EvaluMind
        </NavLink>
        <nav className="app-nav" role="navigation" aria-label="Navegación principal">
          {NAV_LINKS.filter((l) => l.to !== '/').map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `app-nav-link${isActive ? ' app-nav-link--active' : ''}`}
              end
            >
              {link.label}
            </NavLink>
          ))}
          <FontToggle />
        </nav>
      </header>

      <main className={`app-main${isHome ? ' app-main--home' : ''}`}>
        <Outlet />
      </main>

      <footer className="app-footer">
        <div className="app-footer-content">
          <div className="app-footer-brand">
            <span className="app-footer-name">EvaluMind</span>
            <span className="app-footer-tagline">Herramienta de autoobservación educativa</span>
          </div>
          <nav className="app-footer-nav">
            {NAV_LINKS.map((link) => (
              <NavLink key={link.to} to={link.to} className="app-footer-link" end={link.to === '/'}>
                {link.label}
              </NavLink>
            ))}
          </nav>
          <p className="app-footer-disclaimer">
            EvaluMind no diagnostica, confirma ni descarta TDA/TDAH u otra condición. Ofrece información educativa para autoobservación.
          </p>
          <p className="app-footer-privacy">
            No pedimos datos personales. El historial vive en este navegador; el envío remoto está desactivado salvo configuración explícita.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
