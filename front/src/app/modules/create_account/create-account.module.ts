import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateAccountComponent } from './create-account.component';
import { CreateAccountComponentRoutingModule } from './create-account-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientManagerService } from '../../../shared/services/client-manager.service';
import { RecapComponent } from '../../recap/recap.component';
import { PhoneNumberPipe } from '../../phone-number.pipe';
import { CheckPasswordDirective } from '../../check-password.directive';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    CreateAccountComponent,
    RecapComponent,
    PhoneNumberPipe,
    CheckPasswordDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CreateAccountComponentRoutingModule
  ],
  providers: [ClientManagerService],
})
export class CreateAccountModule { }
