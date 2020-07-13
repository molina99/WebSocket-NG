import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {ChatService} from '../../services/chat.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit, OnDestroy {

  chats: Observable<string[]>;
  currentChat: string;
  // tslint:disable-next-line:variable-name
  private _chatSub: Subscription;

  constructor(private chatService: ChatService) {
  }

  ngOnInit(): void {
    this.chats = this.chatService.chats;
    this._chatSub = this.chatService.chatCurrent.subscribe(chat => this.currentChat = chat.id);
  }

  ngOnDestroy() {
    this._chatSub.unsubscribe();
  }

  readChat(id: string) {
    this.chatService.readChat(id);
  }

  newChat() {
    this.chatService.newChat();
  }
}
