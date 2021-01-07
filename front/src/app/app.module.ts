// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

// Personal Modules
import { AppRoutingModule } from './app-routing/app-routing.module';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';

// Services and others
import { ProductState } from '../shared/states/product-state';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiHttpInterceptor } from '../shared/services/api-http-interceptor';
import {JwtState} from '../shared/states/jwt-state';
import {UserState} from '../shared/states/user-state';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgxsModule.forRoot([ProductState, JwtState, UserState])
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: ApiHttpInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
