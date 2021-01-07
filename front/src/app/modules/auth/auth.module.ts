import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthComponentRoutingModule } from './auth-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    AuthComponentRoutingModule
  ],
  providers: [AuthService],
})
export class AuthModule { }
