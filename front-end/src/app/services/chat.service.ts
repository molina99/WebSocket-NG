import {Injectable} from '@angular/core';
import {SocketJwtService} from './socket-jwt.service';
import {ChatModel} from '../models/chat.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  chatCurrent = this.socket.fromEvent<ChatModel>('manageChat');
  chats = this.socket.fromEvent<string[]>('manageData');

  constructor(private socket: SocketJwtService) {
  }

  readChat(id: string) {
    this.socket.emit('getChat', id);
  }

  newChat(chat) {
    console.log(sessionStorage.getItem('token'));
    if (this.socket.ioSocket.connected) {
      this.socket.emit('addChat', chat);
    } else {
      alert('Token inválido');
    }
  }

  editChat(chat: ChatModel) {
    this.socket.emit('editChat', chat);
  }
}
