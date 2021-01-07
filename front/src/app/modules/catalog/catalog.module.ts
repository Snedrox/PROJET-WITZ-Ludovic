import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog.component';
import { HttpClientModule } from '@angular/common/http';
import { CatalogComponentRoutingModule } from './catalog-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { GetProductsService } from '../../../shared/services/get-products.service';

@NgModule({
  declarations: [CatalogComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    CatalogComponentRoutingModule
  ],
  providers: [GetProductsService],
})
export class CatalogModule { }
