import { NgxsModule, Action, Selector, State, StateContext } from '@ngxs/store';
import { ProductStateModel } from './product-state-model';
import { AddProduct, DelProduct} from '../actions/product-action';

@State<ProductStateModel>({
  name: 'listProducts',
  defaults: {
    products: []
  }
})
export class ProductState {
  @Selector()
  static getNbProducts(state: ProductStateModel): number {
    return state.products.length;
  }

  @Action(AddProduct)
  add(
    { getState, patchState }: StateContext<ProductStateModel>,
    { payload }: AddProduct
  ) {
    const state = getState();
    patchState({
      // créer un nouveau tableau
      // l'opérateur ... permet de consituer une liste d'élement du tableau
      products: [...state.products, payload]
    });
  }

  @Action(DelProduct)
  del(
    { getState, patchState }: StateContext<ProductStateModel>,
    { payload }: DelProduct
  ) {
    const state = getState();
    patchState({
      // supprimer le payload dans products
      products: state.products.filter(
        item => item.id !== payload.id
      )
    });
  }
}
