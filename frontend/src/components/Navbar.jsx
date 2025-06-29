import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', saved);
  }, []);

  if (location.pathname === '/auth') return null;
 
  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>ZCoder</Link>
      <div style={styles.right}>
        <Link style={styles.link} to="/problems">Problems</Link>
        <Link style={styles.link} to="/editor">Editor</Link>
        <Link style={styles.link} to="/rooms">Rooms</Link>
        <Link style={styles.link} to="/profile">Profile</Link>
        {user ? (
          <>
            <button onClick={logout} style={styles.logout}>Logout</button>
          </>
        ) : (
          <Link to="/auth" style={styles.authButton}>Log In</Link>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: 'var(--card)',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    color: 'var(--accent)',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textDecoration: 'none',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  link: {
    color: 'var(--text)',
    textDecoration: 'none',
  },
  user: {
    color: 'var(--text)',
    fontSize: '0.9rem',
  },
  logout: {
    background: 'none',
    color: 'var(--accent)',
    border: '1px solid var(--accent)',
    padding: '6px 10px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  authButton: {
    backgroundColor: 'var(--accent)',
    color: '#fff',
    padding: '8px 16px',
    textDecoration: 'none',
    borderRadius: '5px',
    fontWeight: 'bold',
    transition: '0.3s',
    border: 'none',
  },
  toggle: {
    background: 'transparent',
    border: 'none',
    fontSize: '1.2rem',
    cursor: 'pointer',
    color: 'var(--text)',
  }
};

export default Navbar;
