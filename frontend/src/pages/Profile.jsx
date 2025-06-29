import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return <div style={styles.container}>🔒 Please log in to view your profile.</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>👤 Your Profile</h2>

      <div style={styles.infoBox}>
        <p><strong>Email:</strong> {user.email}</p>
        {user.createdAt && <p><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>}
      </div>

      <h3 style={styles.sectionTitle}>📌 Bookmarked Problems</h3>
      {(!user.bookmarks || user.bookmarks.length === 0) ? (
        <p>You haven’t bookmarked any problems yet.</p>
      ) : (
        <ul style={styles.list}>
          {user.bookmarks.map((problem, i) => (
            problem && problem.title && problem.slug ? (
              <li key={i}>
                <Link to={`/problems/${problem.slug}`} style={styles.link}>
                  {problem.title}
                </Link>
              </li>
            ) : null
          ))}
        </ul>
      )}

      <h3 style={styles.sectionTitle}>🏆 Solved Problems</h3>
      {(!user.solved || user.solved.length === 0) ? (
        <p>You haven’t solved any problems yet.</p>
      ) : (
        <ul style={styles.list}>
          {user.solved.map((title, i) => (
            <li key={i}>✅ {title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '2rem',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
    color: '#2b6cb0',
  },
  sectionTitle: {
    fontSize: '1.5rem',
    marginTop: '2rem',
    marginBottom: '1rem',
    color: '#333',
  },
  infoBox: {
    backgroundColor: '#6699cc',
    border: '1px solid #d0d7de',
    padding: '1rem',
    borderRadius: '10px',
    marginBottom: '2rem',
  },
  list: {
    listStyleType: 'none',
    paddingLeft: 0,
  },
  link: {
    color: '#2b6cb0',
    textDecoration: 'none',
  }
};

export default Profile;
