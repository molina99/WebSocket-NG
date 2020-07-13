import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {ChatModel} from '../models/chat.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  counter = 0;
  chatCurrent = this.socket.fromEvent<ChatModel>('manageChat');
  chats = this.socket.fromEvent<string[]>('manageData');

  constructor(private socket: Socket) {
  }

  readChat(id: string) {
    this.socket.emit('getChat', id);
  }

  newChat() {
    this.socket.emit('addChat', {id: this.chatId(), chat: ''});
  }

  editChat(chat: ChatModel) {
    this.socket.emit('editChat', chat);
  }

  private chatId() {
    this.counter++;
    const text = `Conversación ${this.counter}`;
    return text;
  }
}
