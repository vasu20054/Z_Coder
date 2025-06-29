import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProblemDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { toggleBookmark, isBookmarked } = useAuth();
  const [problem, setProblem] = useState(null);

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const res = await fetch(`https://server-5mcy.onrender.com/api/problems/${slug}`);
        if (!res.ok) throw new Error('Problem not found');
        const data = await res.json();
        setProblem(data);
      } catch (err) {
        console.error(err);
        setProblem(null);
      }
    };

    fetchProblem();
  }, [slug]);


  if (!problem) return <div className="container">Problem not found.</div>;

  return (
    <div className="container">
      <h2>{problem.title}</h2>
      <p style={styles.text}><strong>Description:</strong> {problem.description}</p>
      <p style={styles.text}><strong>Input:</strong> {problem.input}</p>
      <p style={styles.text}><strong>Output:</strong> {problem.output}</p>
      <p style={styles.text}><strong>Constraints:</strong></p>
      <ul>
        {(problem.constraints || []).map((line, i) => (
          <li key={i} style={styles.text}>{line}</li>
        ))}
      </ul>
      <p style={styles.text}><strong>Tags:</strong> {(problem.tags || []).join(', ')}</p>
      <div style={styles.actions}>
        <button
          onClick={() => navigate(`/editor?slug=${problem.slug}`)}
          style={styles.solveBtn}
        >
          Solve
        </button>
        <button
          onClick={() => toggleBookmark(problem._id)}
          style={styles.bookmarkBtn}
        >
          {isBookmarked(problem._id) ? '🔖 Bookmarked' : '📑 Bookmark'}
        </button>
      </div>
    </div>
  );
};

const styles = {
  text: {
    margin: '0.5rem 0',
    color: 'var(--text)'
  },
  actions: {
    marginTop: '1.5rem',
    display: 'flex',
    gap: '1rem'
  },
  solveBtn: {
    backgroundColor: '#00bcd4',
    color: '#000',
    padding: '0.6rem 1.2rem',
    borderRadius: '5px',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer'
  },
  bookmarkBtn: {
    backgroundColor: 'transparent',
    color: 'var(--text)',
    fontSize: '1rem',
    border: '1px solid #888',
    borderRadius: '5px',
    padding: '0.6rem 1rem',
    cursor: 'pointer'
  }
};

export default ProblemDetails;