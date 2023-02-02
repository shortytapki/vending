import { Change } from './store/menu/MenuReducer';

export const getRandomAmount = (ceil = 3) => Math.floor(Math.random() * ceil);

export const createAction = <T, PayloadType>(
  type: T,
  payload: PayloadType
) => ({ type, payload });

export const getChangeStatus = (
  change: Change,
  productsBalance: number,
  debt: number
) => {
  let enoughChange = false;
  let changeBalance = countChange(change);

  if (changeBalance + productsBalance >= debt) enoughChange = true;

  return { enoughChange };
};

export const countChange = (change: Change) => {
  let {
    changeFiveHundreds,
    changeHundreds,
    changeFifties,
    changeTens,
    changeFives,
    changeOnes,
  } = change;
  return (
    changeFiveHundreds * 500 +
    changeHundreds * 100 +
    changeFifties * 50 +
    changeTens * 10 +
    changeFives * 5 +
    changeOnes
  );
};

export const getAvailableChange = (change: Change, debt: number) => {
  let pivot = debt;

  let {
    changeFiveHundreds,
    changeHundreds,
    changeFifties,
    changeTens,
    changeFives,
    changeOnes,
  } = change;

  while (pivot > 0) {
    if (pivot / 500 >= 1) {
      pivot -= 500;
      if (changeFiveHundreds) changeFiveHundreds--;
    }

    if (pivot / 100 >= 1) {
      pivot -= 100;
      if (changeFiveHundreds) changeHundreds--;
    }

    if (pivot / 50 >= 1) {
      pivot -= 50;
      if (changeFifties) changeFifties--;
    }

    if (pivot / 10 >= 1) {
      pivot -= 10;
      if (changeTens) changeTens--;
    }

    if (pivot / 5 === 1 && changeFives) {
      pivot -= 5;
      changeFives--;
    } else if (pivot) {
      pivot--;
      if (changeOnes) changeOnes--;
    }

    if (pivot <= 0) break;
  }
  return {
    changeFiveHundreds,
    changeHundreds,
    changeFifties,
    changeTens,
    changeFives,
    changeOnes,
  };
};

export const getNewChange = (change: Change, val: number) => {
  switch (val) {
    case 500:
      change.changeFiveHundreds += 1;

    case 100:
      change.changeHundreds += 1;

    case 50:
      change.changeFifties += 1;
  }
  return change;
};
