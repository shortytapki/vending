import fiftyRubImg from '../assets/money/50rub.webp';
import hundredRubImg from '../assets/money/100rub.webp';
import fiveHundredRubImg from '../assets/money/500rub.webp';
import thousandRubImg from '../assets/money/1000rub.webp';
import oneRubImg from '../assets/money/1rub.webp';
import fiveRubImg from '../assets/money/5rub.webp';
import tenRubImg from '../assets/money/10rub.webp';

import styles from './Menu.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { giveChange, add } from '../store/menu/MenuActions';

export default function Menu() {
  const dispatch = useDispatch();

  const {
    balance,
    ones,
    fives,
    tens,
    productsBalance,
    boughtProducts,
    enoughChange,
    change,
  } = useSelector((state: RootState) => state.menu);

  const {
    changeOnes,
    changeTens,
    changeFives,
    changeFifties,
    changeHundreds,
    changeFiveHundreds,
  } = change;

  const machinesBalance = [
    { img: fiveHundredRubImg, amount: changeFiveHundreds, val: 500 },
    { img: hundredRubImg, amount: changeHundreds, val: 100 },
    { img: fiftyRubImg, amount: changeFifties, val: 50 },
    { img: tenRubImg, amount: changeTens, val: 10 },
    { img: fiveRubImg, amount: changeFives, val: 5 },
    { img: oneRubImg, amount: changeOnes, val: 1 },
  ];

  const banknotes = [
    { img: fiftyRubImg, val: 50 },
    { img: hundredRubImg, val: 100 },
    { img: fiveHundredRubImg, val: 500 },
    { img: thousandRubImg, val: 1000 },
  ];

  const pences = [
    { img: oneRubImg, amount: ones },
    { img: fiveRubImg, amount: fives },
    { img: tenRubImg, amount: tens },
  ];

  const availableChange = machinesBalance.reduce(
    (acc, { val, amount }) => acc + val * amount,
    0
  );

  return (
    <div className={styles.menu}>
      <div className={styles.typo}>
        <h2>Внесено: {balance}</h2>
        <strong>Доступно сдачи: {availableChange}</strong>
        <br />
        <strong>Сдача продуктами: {productsBalance}</strong>
        <ul className={styles.banknotes}>
          {machinesBalance.map(({ img, amount, val }) => (
            <li key={123 * val}>
              <img src={img} alt="" width={val > 10 ? 150 : 70} />
              <p>{amount}</p>
            </li>
          ))}
        </ul>
        <button onClick={() => dispatch(giveChange())} disabled={!balance}>
          Выдать сдачу
        </button>
      </div>
      <ul className={styles.banknotes}>
        {banknotes.map(({ img, val }) => (
          <li
            className={`${styles.banknote} ${
              enoughChange ? '' : 'out-of-stock'
            }`}
            key={val}
            onClick={() => enoughChange && dispatch(add(val))}
          >
            <img src={img} alt="" width={150} />
            <p>Пополнить на {val}</p>
          </li>
        ))}
        {pences.map(({ img, amount }) => (
          <li
            key={img}
            className={`${styles.banknote} ${amount ? '' : 'out-of-stock'}`}
          >
            <img src={img} alt="" height={70} />
            <p>{amount}</p>
          </li>
        ))}
      </ul>
      <div className={styles['bought-container']}>
        <strong className={styles.typo}>Купленные продукты</strong>
        <ul className={styles.bought}>
          {boughtProducts.map((product, idx) => (
            <li key={idx}>
              <img src={product} alt="" height={80} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
