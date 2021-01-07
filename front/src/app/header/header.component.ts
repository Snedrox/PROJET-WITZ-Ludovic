import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ProductState } from '../../shared/states/product-state';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import {Client} from '../../shared/models/client';
import {UserState} from '../../shared/states/user-state';
import {CreateJwt} from '../../shared/actions/jwt-action';
import {Router} from '@angular/router';
import {CreateUser} from '../../shared/actions/user-action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  faShoppingCart = faShoppingCart;

  nbProducts: Observable<number>;
  userLogin: Observable<string>;

  constructor(private router: Router,
              private store: Store) { }

  ngOnInit(): void {
    this.nbProducts = this.store.select(ProductState.getNbProducts);
    this.userLogin = this.store.select(UserState.getLogin);
  }

  Disconnection(): void {
    this.store.dispatch(new CreateUser({name: '', login: '', civility: '', address: '', password: '', city: '', cp: '', email: '', phone: '', surname: ''}));
    this.store.dispatch(new CreateJwt({'token': ''}));
    this.router.navigate(['/']);
  }

}
