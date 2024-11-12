import { io } from 'socket.io-client';

const initSocket = () => {
  const options = {
    'force new connection': true,
    reconnectionAttempts: 'Infinity',
    timeout: 10000,
    transports: ['websocket'],
  };

  const backendUrl = 'http://localhost:5000'; // Directly defining the URL with the port

  return io(backendUrl, options);
};

export default initSocket;
