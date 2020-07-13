import {Component, OnInit, OnDestroy} from '@angular/core';
import {ChatModel} from '../../models/chat.model';
import {ChatService} from '../../services/chat.service';
import {Subscription} from 'rxjs';
import {startWith} from 'rxjs/operators';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  chat: ChatModel;
  // tslint:disable-next-line:variable-name
  private _chatSub: Subscription;

  constructor(private chatService: ChatService) {
  }

  ngOnInit(): void {
    this._chatSub = this.chatService.chatCurrent.pipe(
      startWith({id: '', chat: 'Chat here..'})
    ).subscribe(chat => this.chat = chat);
  }

  ngOnDestroy() {
    this._chatSub.unsubscribe();
  }

  editChat() {
    this.chatService.editChat(this.chat);
  }
}
