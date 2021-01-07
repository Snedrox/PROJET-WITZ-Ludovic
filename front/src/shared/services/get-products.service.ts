import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Product} from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class GetProductsService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.backEndProduct);
  }
}
