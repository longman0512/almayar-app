import io from 'socket.io-client';
let socket = null;

export const setSocket = () => {
  socket = io("http://192.168.110.121:9090");
  console.log(socket)
}

// export const socketClient = io("http://127.0.0.1:4001");

export const onWelcome = (callback) => {
  socket.on('welcome', (data) => callback(data));
}


export const offEvent= (socketListenId) => {
  socket.off(socketListenId);
}



export const onMessageReceived = (socketListenId, callback) => {
  socket.on(socketListenId, (data) => callback(data));
}

export const emitEvent = (event, data) => {
  console.log(event)
    socket.emit(event, data);
}

export const disconnect = () => {
    socket.disconnect()
}