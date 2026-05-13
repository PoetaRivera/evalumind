import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ textAlign: 'center', padding: '60px 20px', maxWidth: '500px', margin: '0 auto' }}>
          <h2 style={{ color: '#1a1a2e', marginBottom: '16px' }}>Algo salió mal</h2>
          <p style={{ color: '#6b7280', marginBottom: '24px', lineHeight: 1.6 }}>
            Ocurrió un error inesperado. Puedes intentar volver al inicio o recargar la página.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <a href="/" className="btn btn-primary" style={{ textDecoration: 'none' }}>
              Volver al inicio
            </a>
            <button className="btn btn-secondary" onClick={() => window.location.reload()}>
              Recargar página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
