import {Component, OnInit, OnDestroy} from '@angular/core';
import {ChatModel} from '../../models/chat.model';
import {ChatService} from '../../services/chat.service';
import {Subscription, Observable} from 'rxjs';
import {startWith} from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import {Router} from '@angular/router';
import {PermissionsService} from '../../services/permissions.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  currentUserName: Observable<string>;
  chat: ChatModel;
  // tslint:disable-next-line:variable-name
  private _chatSub: Subscription;

  constructor(private chatService: ChatService, permissionsService: PermissionsService, private router: Router) {
  }

  ngOnInit(): void {
    this._chatSub = this.chatService.chatCurrent.pipe(
      startWith({
        id: '',
        chat: '',
        userName: '',
        roomName: '',
        roomPassword: ''
      })
    ).subscribe(chat => this.chat = chat);
  }

  ngOnDestroy() {
    this._chatSub.unsubscribe();
  }


  private getUser() {
    const decoded = jwt_decode(sessionStorage.getItem('token'));
    this.chat.userName = decoded.user.name; // TODO: = decoded.data.name
  }

  editChat() {
    this.getUser();
    this.chatService.editChat(this.chat);
  }

  // goChatList() {
  //   this.router.navigate(['/docs/docs_list']);
  // }
}
