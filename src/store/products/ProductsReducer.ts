import { getRandomAmount } from '../../utils';

import cokeImg from '../../assets/products/coke.webp';
import doritosImg from '../../assets/products/doritos.webp';
import drPepperImg from '../../assets/products/dr-pepper.webp';
import fantaImg from '../../assets/products/fanta.webp';
import juiceImg from '../../assets/products/juice.webp';
import kinderImg from '../../assets/products/kinder.webp';
import snickersImg from '../../assets/products/snickers.webp';
import waterImg from '../../assets/products/water.webp';

type Product = {
  id: string;
  name: string;
  price: number;
  img: string;
  amount: number;
};

const products: Array<Product> = [
  {
    id: '0',
    name: 'Coca Cola 0.33',
    price: 55,
    img: cokeImg,
    amount: getRandomAmount(10),
  },
  {
    id: '1',
    name: 'Doritos',
    price: 120,
    img: doritosImg,
    amount: getRandomAmount(10),
  },
  {
    id: '2',
    name: 'Dr Pepper 0.33',
    price: 95,
    img: drPepperImg,
    amount: getRandomAmount(10),
  },
  {
    id: '3',
    name: 'Fanta 0.33',
    price: 60,
    img: fantaImg,
    amount: getRandomAmount(10),
  },
  {
    id: '4',
    name: 'Juicy Juice',
    price: 45,
    img: juiceImg,
    amount: getRandomAmount(10),
  },
  {
    id: '5',
    name: 'Kinder Bueno White',
    price: 90,
    img: kinderImg,
    amount: getRandomAmount(10),
  },
  {
    id: '6',
    name: 'Snickers',
    price: 50,
    img: snickersImg,
    amount: getRandomAmount(10),
  },
  {
    id: '7',
    name: 'Вода 0.5',
    price: 50,
    img: waterImg,
    amount: getRandomAmount(10),
  },
];

export const productBalance = products.reduce(
  (acc, { amount, price }) => (acc += amount * price),
  0
);

type ProductActionType = 'DECREASE_AMOUNT';

export type ProductAction = {
  type: ProductActionType;
  payload: string;
};

export type ProductsInitialState = {
  products: Array<Product>;
};

const INITIAL_STATE: ProductsInitialState = {
  products,
};

export const ProductsReducer = (
  state = INITIAL_STATE,
  action: ProductAction
) => {
  const { type, payload } = action;

  switch (type) {
    case 'DECREASE_AMOUNT':
      const newProducts = state.products.map((product) =>
        product.id === payload
          ? { ...product, amount: product.amount - 1 }
          : { ...product }
      );
      return { products: newProducts };
    default:
      return state;
  }
};
