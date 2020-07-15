import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {WebServiceService} from './web-service.service';
import {PermissionsService} from './permissions.service';
import {Observable} from 'rxjs';
import {DataRx} from '../models/data-rx';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private server: WebServiceService,
    private permissions: PermissionsService
  ) {
  }

  login(dataLogin): Observable<DataRx> {
    return this.http.post<DataRx>(`${environment.API_URL}/login`, dataLogin);
  }
}
