import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Rooms = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [rooms] = useState([
    { name: 'DP Discussions', slug: 'dp-discussions' },
    { name: 'Graph Theory', slug: 'graph-theory' },
    { name: 'Beginner Room', slug: 'beginner-room' },
    { name: 'JavaScript Coders', slug: 'javascript-coders' },
    { name: 'System Design', slug: 'system-design' }
  ]);
  const currentRoom = rooms.find(room => room.slug === slug);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const socketRef = useRef(null);

  useEffect(() => {
    if (!slug) return;

    socketRef.current = new WebSocket('https://socket-dzk3.onrender.com');

    socketRef.current.onopen = () => {
      socketRef.current.send(JSON.stringify({ type: 'join', room: slug }));
    };

    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'message') {
        setMessages(prev => [...prev, data]);
      }
    };

    return () => {
      socketRef.current.close();
    };
  }, [slug]);

  const sendMessage = () => {
    if (input.trim()) {
      socketRef.current.send(JSON.stringify({
        type: 'message',
        room: slug,
        text: input
      }));
      setInput('');
    }
  };

  if (!slug) {
    return (
      <div className="container">
        <h2>💬 Interactive Rooms</h2>
        <div style={styles.roomList}>
          {rooms.map((room, i) => (
            <div key={i} style={styles.roomCard}>
              <h3 style={styles.roomTitle}>{room.name}</h3>
              <p style={styles.roomDesc}>
                Join the conversation on {room.name}.
              </p>
              <button
                style={styles.joinBtn}
                onClick={() => navigate(`/rooms/${room.slug}`)}
              >
                Enter
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>💬 Room: {currentRoom ? currentRoom.name : 'Unknown Room'}</h2>

      <div style={styles.chatBox}>
        {messages.map((msg, i) => (
          <div key={i} style={styles.message}>{msg.text}</div>
        ))}
      </div>

      <div style={styles.inputBox}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          style={styles.input}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} style={styles.sendBtn}>Send</button>
      </div>
    </div>
  );
};

const styles = {
  roomList: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '1rem'
  },
  roomCard: {
    flex: '1 1 250px',
    backgroundColor: 'var(--card)',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 0 6px rgba(0,0,0,0.15)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  roomTitle: {
    fontSize: '1.25rem',
    color: 'var(--accent)',
    marginBottom: '0.5rem'
  },
  roomDesc: {
    flex: 1,
    fontSize: '0.95rem',
    color: 'var(--text)'
  },
  joinBtn: {
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    backgroundColor: 'var(--accent)',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  chatBox: {
    background: 'var(--card)',
    padding: '1rem',
    height: '300px',
    overflowY: 'auto',
    marginBottom: '1rem',
    borderRadius: '6px'
  },
  message: {
    marginBottom: '0.5rem',
    padding: '0.5rem',
    borderRadius: '4px'
  },
  inputBox: {
    display: 'flex',
    gap: '0.5rem'
  },
  input: {
    flex: 1,
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },
  sendBtn: {
    padding: '0.5rem 1rem',
    background: 'var(--accent)',
    border: 'none',
    color: '#fff',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default Rooms;
