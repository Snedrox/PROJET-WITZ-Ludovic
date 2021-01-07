import { NgxsModule, Action, Selector, State, StateContext } from '@ngxs/store';
import { UserStateModel } from './user-state-model';
import { CreateUser } from '../actions/user-action';
import { Client } from '../models/client';

@State<UserStateModel>({
  name: 'client',
  defaults: {
    // user : new Client(null, null, null, null, null, null, null, null, null, null)
    user : {name: '', login: '', civility: '', address: '', password: '', city: '', cp: '', email: '', phone: '', surname: ''}
  }
})
export class UserState {
  @Selector()
  static getLogin(state: UserStateModel): string {
    return state.user.login;
  }
  @Selector()
  static getClient(state: UserStateModel): Client {
    return state.user;
  }

  @Action(CreateUser)
  Create(
    { getState, patchState }: StateContext<UserStateModel>,
    { payload }: CreateUser
  ) {
    const state = getState();
    patchState({
      user : payload
    });
  }
}
