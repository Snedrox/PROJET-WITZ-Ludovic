import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'createAccount',
    loadChildren: () =>
      import('../modules/create_account/create-account.module').then(
        m => m.CreateAccountModule
      )
  },
  { path: 'catalog',
    loadChildren: () =>
      import('../modules/catalog/catalog.module').then(
        m => m.CatalogModule
      )
  },
  { path: 'details/:id',
    loadChildren: () =>
      import('../modules/details/details.module').then(
        m => m.DetailsModule
      )
  },
  { path: 'cart',
    loadChildren: () =>
      import('../modules/cart/cart.module').then(
        m => m.CartModule
      )
  },
  { path: 'auth',
    loadChildren: () =>
      import('../modules/auth/auth.module').then(
        m => m.AuthModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
