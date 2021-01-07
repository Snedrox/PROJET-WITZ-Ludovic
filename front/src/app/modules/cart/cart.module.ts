import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { CartComponentRoutingModule } from './cart-routing.module';

@NgModule({
  declarations: [CartComponent],
  imports: [
    CommonModule,
    CartComponentRoutingModule
  ]
})
export class CartModule { }
