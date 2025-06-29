import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();
  const [bookmarkedProblems, setBookmarkedProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookmarks = async () => {
      if (!user) return;
      try {
        const token = localStorage.getItem('zcoder-user-token');
        const res = await fetch('https://server-5mcy.onrender.com/api/bookmarks', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setBookmarkedProblems(data);
      } catch (err) {
        setError('Failed to load bookmarks.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [user]);

  return (
    <div className="container">
      <h2>Your Profile</h2>

      {user ? (
        <>
          <p>Email: <strong>{user.email || 'N/A'}</strong></p>

          <h3 style={{ marginTop: '2rem' }}>🔖 Bookmarked Problems</h3>
          {loading ? (
            <p>Loading bookmarks...</p>
          ) : error ? (
            <p>{error}</p>
          ) : bookmarkedProblems.length === 0 ? (
            <p>No bookmarks yet.</p>
          ) : (
            <ul>
              {bookmarkedProblems.map(problem => (
                <li key={problem._id}>
                  <a href={`/problems/${problem._id}`}>{problem.title}</a>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <p>Please log in to view your profile.</p>
      )}
    </div>
  );
};

export default Profile;
