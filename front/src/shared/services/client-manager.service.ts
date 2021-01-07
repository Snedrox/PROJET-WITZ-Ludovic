import { Injectable } from '@angular/core';
import { Client } from '../models/client';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientManagerService {

  constructor(private http: HttpClient) { }

  addClient(client: Client): Observable<Client> {
    let data: string;
    const httpOptions = {headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })};
    data = 'name=' + client.name
      + '&surname=' + client.surname
      + '&login=' + client.login
      + '&password=' + client.password
      + '&address=' + client.address
      + '&cp=' + client.cp
      + '&city=' + client.city
      + '&phone=' + client.phone
      + '&email=' + client.email
      + '&civility=' + client.civility;
    return this.http.post<Client>('/api/addClient', data, httpOptions);
  }
}
