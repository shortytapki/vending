import { legacy_createStore, combineReducers } from 'redux';
import { MenuInitialState, MenuReducer } from './menu/MenuReducer';
import {
  ProductsInitialState,
  ProductsReducer,
} from './products/ProductsReducer';

const rootReducer = combineReducers({
  menu: MenuReducer,
  products: ProductsReducer,
});

export type RootState = {
  menu: MenuInitialState;
  products: ProductsInitialState;
};

export const store = legacy_createStore(rootReducer);
