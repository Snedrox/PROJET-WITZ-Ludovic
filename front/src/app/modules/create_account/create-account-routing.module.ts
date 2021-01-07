import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateAccountComponent } from './create-account.component';
import { RecapComponent } from '../../recap/recap.component';

const routes: Routes = [
  {
    path: '',
    component: CreateAccountComponent
  },
  { path: 'recap', component: RecapComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],

  exports: [RouterModule]
})
export class CreateAccountComponentRoutingModule { }
