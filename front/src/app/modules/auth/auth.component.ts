import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import {Router} from '@angular/router';
import {Client} from '../../../shared/models/client';
import {Observable} from 'rxjs';
import {Store} from '@ngxs/store';
import {CreateUser} from '../../../shared/actions/user-action';
import {UserStateModel} from '../../../shared/states/user-state-model';
import {UserState} from '../../../shared/states/user-state';
import {CreateJwt} from '../../../shared/actions/jwt-action';
import {JwtState} from '../../../shared/states/jwt-state';

@Component({
  selector: 'app-connection',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authForm = new FormGroup({
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])}
  );

  user: Observable<Client>;

  constructor(private router: Router,
              private authService: AuthService,
              private store: Store) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.authForm.status === 'INVALID') {
      alert('The form is not correct');
      return;
    }
    const client = new Client('', '', '', '', '', '', '', '', this.authForm.value.login, this.authForm.value.password);
    this.authService.auth(client).subscribe(user => this.store.dispatch(new CreateUser(user)));
    this.router.navigate(['']);
  }

}
