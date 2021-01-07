import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Client } from '../models/client';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  auth(client: Client): Observable<Client> {
    let data: string;
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })};
    data = '&login=' + client.login
      + '&password=' + client.password;
    return this.http.post<Client>('/api/login', data, httpOptions);
  }
}
