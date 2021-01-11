import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Client } from '../models/client';
import {Observable} from 'rxjs';
import { environment } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  auth(client: Client): Observable<Client> {
    let data: string;
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'})};
    data = '&login=' + client.login
      + '&password=' + client.password;
    return this.http.post<Client>(environment.api + '/login', data, httpOptions);
  }
}
