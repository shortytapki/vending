import {
  getAvailableChange,
  getChangeStatus,
  getNewChange,
  getRandomAmount,
} from '../../utils';
import { productBalance } from '../products/ProductsReducer';

export type MenuActionType =
  | 'SET_PRODUCT_BALANCE'
  | 'ADD'
  | 'DECREASE_BALANCE'
  | 'ADD_BOUGHT'
  | 'GIVE_CHANGE';

type MenuAction = {
  type: MenuActionType;
  payload: number | string;
};

export type Change = {
  changeOnes: number;
  changeFives: number;
  changeTens: number;
  changeFifties: number;
  changeHundreds: number;
  changeFiveHundreds: number;
};

type Diff = {
  val: number;
  name: string;
  available: number;
  needToGive: number;
};

export type MenuInitialState = {
  balance: number;
  enoughChange: boolean;
  ones: number;
  productsBalance: number;
  fives: number;
  tens: number;
  boughtProducts: Array<string>;
  change: Change;
};

const INITIAL_STATE: MenuInitialState = {
  balance: 0,
  enoughChange: true,
  productsBalance: productBalance,
  ones: 0,
  fives: 0,
  tens: 0,
  boughtProducts: [],
  change: {
    changeOnes: getRandomAmount(10),
    changeFives: getRandomAmount(5),
    changeTens: getRandomAmount(5),
    changeFifties: getRandomAmount(3),
    changeHundreds: getRandomAmount(),
    changeFiveHundreds: getRandomAmount(),
  },
};

export const MenuReducer = (
  state = INITIAL_STATE,
  action: MenuAction
): MenuInitialState => {
  const { type, payload } = action;

  const change = state.change;
  const balance = state.balance;

  if (typeof payload === 'number') {
    switch (type) {
      case 'ADD':
        const { enoughChange } = getChangeStatus(
          change,
          state.productsBalance,
          balance + payload * 2
        );
        return {
          ...state,
          balance: balance + payload,
          change: getNewChange(state.change, payload),
          enoughChange,
        };

      case 'DECREASE_BALANCE':
        return { ...state, balance: state.balance - payload };

      case 'SET_PRODUCT_BALANCE':
        return { ...state, productsBalance: state.productsBalance - payload };
    }
  } else {
    switch (type) {
      case 'ADD_BOUGHT':
        const boughtProducts = [...state.boughtProducts, payload];
        return {
          ...state,
          boughtProducts,
        };

      case 'GIVE_CHANGE':
        let balance = state.balance;
        const available = getAvailableChange(change, balance);

        const {
          changeFifties,
          changeFiveHundreds,
          changeHundreds,
          changeTens,
          changeFives,
          changeOnes,
        } = available;

        const canGiveChange = [
          changeFiveHundreds,
          changeHundreds,
          changeFifties,
          changeTens,
          changeFives,
          changeOnes,
        ].every((item) => item >= 0);

        if (canGiveChange) {
          return {
            ...state,
            balance: 0,
            ones: state.ones + change.changeOnes - changeOnes,
            tens: state.tens + change.changeTens - changeTens,
            fives: state.fives + change.changeFives - changeFives,
            change: { ...available },
          };
        }
    }
  }

  return { ...state };
};
