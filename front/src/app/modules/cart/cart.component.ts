import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../../../shared/models/product';
import {Store} from '@ngxs/store';
import {AddProduct, DelProduct} from '../../../shared/actions/product-action';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  products: Observable<Product[]>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.products = this.store.select(state => state.listProducts.products);
  }

  onClick(product: Product): void {
    this.delProduct(product.id, product.name, product.category, product.price, product.details);
  }

  delProduct(id, name, category, price, details): void {
    this.store.dispatch(new DelProduct({id, name, category, price, details}));
  }
}
