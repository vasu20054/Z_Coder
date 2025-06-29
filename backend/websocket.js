const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 6000 });
const rooms = {};

wss.on('connection', (socket) => {
  let currentRoom = null;

  socket.on('message', (message) => {
    try {
      const data = JSON.parse(message);

      if (data.type === 'join') {
        currentRoom = data.room;
        if (!rooms[currentRoom]) rooms[currentRoom] = new Set();
        rooms[currentRoom].add(socket);
      }

      if (data.type === 'message' && currentRoom) {
        const payload = JSON.stringify({ type: 'message', text: data.text });
        rooms[currentRoom].forEach(client => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(payload);
          }
        });
      }
    } catch (err) {
      console.error('Invalid message received:', err);
    }
  });

  socket.on('close', () => {
    if (currentRoom && rooms[currentRoom]) {
      rooms[currentRoom].delete(socket);
      if (rooms[currentRoom].size === 0) {
        delete rooms[currentRoom];
      }
    }
  });
});

console.log('WebSocket server running on ws://localhost:6000');
