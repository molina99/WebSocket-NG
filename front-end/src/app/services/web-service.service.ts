import {Injectable} from '@angular/core';
import {PermissionsService} from './permissions.service';
import {HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WebServiceService {

  private url: string;

  constructor(private permissionsService: PermissionsService) {
    this.url = 'https://localhost:3500/server';
  }

  obtainUrl(): string {
    return this.url;
  }

  obtainHeaders(): object {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.permissionsService.obtainToken()
      })
    };
  }
}
