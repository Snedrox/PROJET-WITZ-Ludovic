import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponentRoutingModule} from './details-routing.module';
import { DetailsComponent } from './details.component';
import { HttpClientModule } from '@angular/common/http';
import { GetProductsService } from '../../../shared/services/get-products.service';

@NgModule({
  declarations: [DetailsComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    DetailsComponentRoutingModule
  ],
  providers: [GetProductsService],
})
export class DetailsModule { }
