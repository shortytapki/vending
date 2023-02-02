import { createAction } from '../../utils';
import { MenuActionType } from './MenuReducer';

export const add = (payload: number) =>
  createAction<MenuActionType, typeof payload>('ADD', payload);

export const decreaseBalance = (payload: number) =>
  createAction<MenuActionType, number>('DECREASE_BALANCE', payload);

export const addBoughtProduct = (payload: string) =>
  createAction<MenuActionType, typeof payload>('ADD_BOUGHT', payload);

export const giveChange = () =>
  createAction<MenuActionType, null>('GIVE_CHANGE', null);

export const setProductBalance = (payload: number) =>
  createAction<MenuActionType, typeof payload>('SET_PRODUCT_BALANCE', payload);
