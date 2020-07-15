import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DataRx} from '../models/data-rx';
import {environment} from '../../environments/environment';
import {WebServiceService} from './web-service.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string;

  constructor(
    private http: HttpClient,
    private server: WebServiceService
  ) {
    this.url = server.obtainUrl();
  }

  login(dataLogin): Observable<DataRx> {
    return this.http.post<DataRx>(`${this.url}/login`, dataLogin);
  }
}
