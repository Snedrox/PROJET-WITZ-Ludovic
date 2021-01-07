import { Component, OnInit } from '@angular/core';
import { GetProductsService } from '../../../shared/services/get-products.service';
import { Observable } from 'rxjs';
import { Product } from '../../../shared/models/product';
import { map } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { AddProduct } from '../../../shared/actions/product-action';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {

  products: Observable<Product[]>;

  filterCategory = new FormControl('');
  filterName = new FormControl('');

  constructor(private productService: GetProductsService,
              private store: Store) { }

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }

  filter(): void {
    this.products = this.productService.getProducts();
    if (this.filterCategory.value) {
      this.products = this.products.pipe(map(products => products.filter(product => product.category.toLowerCase() === this.filterCategory.value.toLowerCase())));
    }
    if (this.filterName.value) {
      this.products = this.products.pipe(map(products => products.filter(product => product.name.toLowerCase().includes(this.filterName.value.toLowerCase()))));
    }
  }

  onClickAdd(product: Product): void {
    this.addProduct(product.id, product.name, product.category, product.price, product.details);
  }

  addProduct(id, name, category, price, details): void {
    this.store.dispatch(new AddProduct({id, name, category, price, details}));
  }
}
