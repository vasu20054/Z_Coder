import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleAuth = async () => {
    const endpoint = isLogin ? 'login' : 'signup';
    const res = await fetch(`https://server-5mcy.onrender.com/api/users/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('zcoder-user-token', data.token);
      await login();
      navigate('/profile');
    } else {
      alert(data.message || 'Authentication failed');
    }
  };

  return (
    <>
      <style>{`
        .container {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background-color: var(--background-color);
          color: var(--text-color);
          padding: 1rem;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .container h2 {
          margin-bottom: 1.5rem;
          font-weight: 700;
        }

        input[type="email"],
        input[type="password"] {
          width: 280px;
          padding: 10px 12px;
          margin-bottom: 1rem;
          border: 1px solid var(--input-border);
          border-radius: 6px;
          font-size: 1rem;
          background-color: var(--input-background);
          color: var(--input-text);
          transition: border-color 0.3s ease;
        }

        input[type="email"]:focus,
        input[type="password"]:focus {
          outline: none;
          border-color: #00bcd4;
        }

        button {
          background-color: #00bcd4;
          color: #000;
          border: none;
          padding: 10px 18px;
          margin-top: 0.5rem;
          margin-bottom: 1rem;
          border-radius: 6px;
          font-weight: 700;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        button:hover {
          background-color: #0097a7;
        }

        p button {
          background: none;
          border: none;
          color: #00bcd4;
          cursor: pointer;
          font-weight: 700;
          text-decoration: underline;
          padding: 0;
          font-size: 1rem;
        }

        :root {
          --background-color: #121212;
          --text-color: #eee;
          --input-border: #555;
          --input-background: #2c2c2c;
          --input-text: #eee;
        }
      `}</style>

      <div className="container">
        <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        /><br />
        <button onClick={handleAuth}>{isLogin ? 'Login' : 'Sign Up'}</button>
        <p>
          {isLogin ? 'No account?' : 'Already have an account?'}{' '}
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </>
  );
};

export default Auth;
