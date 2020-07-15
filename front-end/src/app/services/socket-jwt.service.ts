import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {PermissionsService} from './permissions.service';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketJwtService extends Socket {

  constructor(private permissionsService: PermissionsService) {
    super({
      url: environment.SOCKET_URL, options: {
        query: `token=${sessionStorage.getItem('token')}`
      }
    });
  }
}
