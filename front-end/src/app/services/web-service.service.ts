import {Injectable} from '@angular/core';
import {PermissionsService} from './permissions.service';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebServiceService {

  constructor(private permissionsService: PermissionsService) {
  }

  obtainHeaders(): object {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json', // utf8,
        Authorization: this.permissionsService.obtainToken()
      })
    };
  }
}
