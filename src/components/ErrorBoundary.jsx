import React from 'react';

/**
 * Error Boundary — catches any runtime React error and shows a readable
 * message instead of a completely blank white screen.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('Arrivio UI crashed:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          background: '#070B11',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '16px',
          color: '#fff',
          fontFamily: 'monospace',
          padding: '40px',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '2rem' }}>⚠️</div>
          <h2 style={{ color: '#00F5D4', margin: 0 }}>Arrivio UI Error</h2>
          <p style={{ color: '#94A3B8', maxWidth: '600px', lineHeight: 1.6 }}>
            {this.state.error?.message || 'An unexpected error occurred.'}
          </p>
          <pre style={{
            background: '#0F1923',
            border: '1px solid #1A2433',
            borderRadius: '8px',
            padding: '16px',
            color: '#FF6B6B',
            fontSize: '0.75rem',
            maxWidth: '700px',
            overflow: 'auto',
            textAlign: 'left'
          }}>
            {this.state.error?.stack}
          </pre>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: '#00F5D4',
              color: '#070B11',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 24px',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            Reload App
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
