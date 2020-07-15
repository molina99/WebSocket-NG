import {Injectable} from '@angular/core';
import {User} from '../models/user';
import {DataRx} from '../models/data-rx';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  dataRx: DataRx;
  private token: string;
  private userLogin: User;

  constructor() {
    this.token = null;
    this.userLogin = null;
  }

  decodeToken(token: string): boolean {
    const decoded = jwt_decode(token);
    if (decoded) {
      this.token = token || null;
      this.userLogin = decoded.data || null;
      // delete this.userLogin.password;
      return true;
    } else {
      return false;
    }
  }

  obtainToken(): string {
    return this.token;
  }

  destroyToken(): void {
    this.token = null;
  }

  obtainUserLogin(): object {
    return this.userLogin;
  }
}
