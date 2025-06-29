import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async () => {
    const token = localStorage.getItem('zcoder-user-token');
    if (!token) return;

    try {
      const res = await fetch('https://server-5mcy.onrender.com/api/users/me', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error('Invalid token');

      const profile = await res.json();

      setUser({
  email: profile.email,
  bookmarks: profile.bookmarks
});


    } catch (error) {
      console.error('Login error:', error.message);
      setUser(null);
    }
  };

  const logout = () => {
    localStorage.removeItem('zcoder-user-token');
    setUser(null);
  };

  const toggleBookmark = async (problemId) => {
    const token = localStorage.getItem('zcoder-user-token');
    const res = await fetch(`https://server-5mcy.onrender.com/api/users/bookmark/${problemId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setUser(prev => ({ ...prev, bookmarks: data.bookmarks }));
  };

  const isBookmarked = (id) =>
  user?.bookmarks?.some(b => (typeof b === 'object' ? b._id : b)?.toString() === id?.toString());


  useEffect(() => {
    login();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, toggleBookmark, isBookmarked }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
