import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {ChatService} from '../../services/chat.service';
import {Router} from '@angular/router';

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
  chatAuth: any;

  constructor(private chatService: ChatService, private router: Router) {
  }

  ngOnInit(): void {
    this.chats = this.chatService.chats;
    this._chatSub = this.chatService.chatCurrent.subscribe(
      chat => ((this.currentChat = chat.id), (this.chatAuth = chat))
    );
  }

  ngOnDestroy() {
    this._chatSub.unsubscribe();
  }

  // readChat(id: string) {
  //   this.chatService.readChat(id);
  // }

  readChat = async (id: string) => {
    this.chatService.readChat(id);

    const roomName = prompt('Nombre de acceso');

    if (this.chatAuth.roomName === roomName) {
      const roomPassword = prompt('Contraseña');
      if (this.chatAuth.roomPassword === roomPassword) {
        this.chatService.readChat(id);
        await this.router.navigate(['/docs/doc']);
      } else {
        alert('La contraseña es incorrecta');
      }
    } else {
      alert('El nombre de la sala es incorrecta');
    }
  }

  newChat() {
    const roomName = prompt('Ingrese el nombre de la sala');
    const roomPassword = prompt('Ingrese la contraseña de la sala');

    this.chatService.newChat({
      id: '',
      doc: '',
      userName: '',
      roomName,
      roomPassword,
    });
  }
}
