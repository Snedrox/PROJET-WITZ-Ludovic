import { Client } from '../models/client';

export class CreateUser {
  static readonly type = '[Client] Create';
  constructor(public payload: Client) {}
}
