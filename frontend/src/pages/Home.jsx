import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Welcome to ZCoder</h1>
      <p style={styles.subtitle}>
        ZCoder is your collaborative platform to solve coding challenges, work with peers, and grow as a developer.
      </p>

      <div style={styles.featuresContainer}>
        <div style={styles.featureBox}>
          <h3 style={styles.featureTitle}>🧠 Solve Challenges</h3>
          <p style={styles.featureText}>
            Sharpen your skills with real-world problems and get instant feedback.
          </p>
        </div>
        <div style={styles.featureBox}>
          <h3 style={styles.featureTitle}>🧑‍💻 Collaborate Live</h3>
          <p style={styles.featureText}>
            Code together in real-time rooms and learn by doing with peers.
          </p>
        </div>
        <div style={styles.featureBox}>
          <h3 style={styles.featureTitle}>📌 Bookmark Problems</h3>
          <p style={styles.featureText}>
            Save interesting problems and track your journey.
          </p>
        </div>
      </div>

      {!user && (
        <Link to="/Auth">
          <button style={styles.button}>Get Started</button>
        </Link>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '960px',
    margin: '0 auto',
    padding: '2rem',
    textAlign: 'center',
  },
  title: {
    fontSize: '3rem',
    color: '#2b6cb0',
    marginBottom: '1rem',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#444',
    marginBottom: '2.5rem',
  },
  featuresContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: '1.5rem',
    marginBottom: '3rem',
  },
  featureBox: {
    flex: '1 1 28%',
    backgroundColor: '#6699cc',
    border: '1px solid #d0d7de',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
    minWidth: '250px',
  },
  featureTitle: {
    fontSize: '1.25rem',
    color: '#2c5282',
    marginBottom: '0.5rem',
  },
  featureText: {
    fontSize: '1rem',
    color: '#555',
  },
  button: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    backgroundColor: '#2b6cb0',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
};

export default Home;
