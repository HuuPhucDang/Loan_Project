import io from 'socket.io-client';
const host = import.meta.env.VITE_BE_URL;

const socket = io(host.replace('v1/', ''), {
  transports: ['websocket'],
  autoConnect: true,
});

export default socket;
