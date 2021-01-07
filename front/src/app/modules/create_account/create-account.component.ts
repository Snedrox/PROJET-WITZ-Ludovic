import { Component, OnInit } from '@angular/core';
import { Client } from '../../../shared/models/client';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { ClientManagerService } from '../../../shared/services/client-manager.service';

@Component({
  selector: 'app-form',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  clientForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    surname: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    cp: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required,
      Validators.email]),
    civility: new FormControl('', [Validators.required]),
    login: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });


  passwordValidation: string = '';
  client: Client;

  constructor(private router: Router,
              private clientManager: ClientManagerService) { }

  ngOnInit(): void {
  }

  // tslint:disable-next-line:typedef
  onSubmit(): void {
    if (this.clientForm.status === 'INVALID') {
      alert('This create_account is not correct');
      return;
    }
    this.client = new Client(
      this.clientForm.value.name,
      this.clientForm.value.surname,
      this.clientForm.value.address,
      this.clientForm.value.cp,
      this.clientForm.value.city,
      this.clientForm.value.phone,
      this.clientForm.value.email,
      this.clientForm.value.civility,
      this.clientForm.value.login,
      this.clientForm.value.password,
    );
    this.clientManager.addClient(this.client).subscribe(user => console.log(user), error => console.log(error));
    this.router.navigate(['/']);
  }

  checkPassword(): Boolean {
    return this.passwordValidation === this.clientForm.value.password;
  }

}




