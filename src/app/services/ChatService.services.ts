import {Injectable} from '@angular/core';
import * as io from 'socket.io-client';
import {Observable} from 'rxjs/Observable';

@Injectable()

export class ChatService {
  private url = 'http://localhost:3000';
  private socket;

  constructor() {
    this.socket = io(this.url);
  }

  public sendMessage(message) {
    this.socket.emit('new-message', message);
  }

  public insertMember(joinmember) {
    this.socket.emit('join', joinmember);
  }

  public getMessages = () => {
    return Observable.create((observer) => {
      this.socket.on('user_list', (message) => {
        observer.next(message);
      });
    });
  };
  public shareDataSocketio = (action) => {
    return Observable.create((observer) => {
      this.socket.on(action, (message) => {
        observer.next(message);
      });
    });
  };
}
