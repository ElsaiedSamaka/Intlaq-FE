import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  socket: Socket;

  constructor() {
    this.socket = io(environment.api_url, {
      autoConnect: true,
    });
  }
  // testConnection(payload) {
  //   this.socket.on('testrespond', (mssg) => {
  //     console.log('mssg', mssg);
  //   });
  //   setInterval(() => {
  //     this.socket.emit('testevent', payload);
  //   }, 5000);
  // }
}
