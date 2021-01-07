import { Component, OnInit } from '@angular/core';
import { Client } from '../../shared/models/client';
import { ClientManagerService } from '../../shared/services/client-manager.service';
import { Observable } from 'rxjs';
import {Store} from '@ngxs/store';
import {UserState} from '../../shared/states/user-state';

@Component({
  selector: 'app-recap',
  templateUrl: './recap.component.html',
  styleUrls: ['./recap.component.scss']
})
export class RecapComponent implements OnInit {

  client: Observable<Client>;

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.client = this.store.select(UserState.getClient);
  }

}
