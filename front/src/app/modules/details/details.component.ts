import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetProductsService } from '../../../shared/services/get-products.service';
import { Observable } from 'rxjs';
import { Product } from '../../../shared/models/product';
import { map } from 'rxjs/operators';
import { AddProduct } from '../../../shared/actions/product-action';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  id: string = '';
  products: Observable<Product[]>;

  constructor(private productService: GetProductsService,
              private route: ActivatedRoute,
              private store: Store) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.products = this.productService.getProducts();
    this.products = this.products.pipe(map(products => products.filter(product => product.id === this.id)));
  }

  onClickAdd(product: Product): void {
    this.addProduct(product.id, product.name, product.category, product.price, product.details);
  }

  addProduct(id, name, category, price, details): void {
    this.store.dispatch(new AddProduct({id, name, category, price, details}));
  }
}
