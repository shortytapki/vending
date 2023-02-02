import { useSelector, useDispatch } from 'react-redux';
import './App.css';

import Menu from './menu/Menu';
import {
  addBoughtProduct,
  decreaseBalance,
  setProductBalance,
} from './store/menu/MenuActions';
import { RootState } from './store/store';

function App() {
  const { balance } = useSelector((state: RootState) => state.menu);
  const { products } = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch();
  return (
    <>
      <h1>Vending</h1>
      <div className="app grid">
        <ul className="products grid">
          {products.map(({ img, price, name, amount, id }) => (
            <li key={name}>
              <img
                src={img}
                alt=""
                height={80}
                className={!amount ? 'out-of-stock' : ''}
              />
              <p>{name}</p>
              <p className="price">{price} руб.</p>
              <p>Осталось: {amount}</p>
              {amount > 0 && (
                <button
                  disabled={balance < price}
                  onClick={() => {
                    dispatch(decreaseBalance(price));
                    dispatch(addBoughtProduct(img));
                    dispatch({ type: 'DECREASE_AMOUNT', payload: id });
                    dispatch(setProductBalance(price));
                  }}
                >
                  Купить
                </button>
              )}
            </li>
          ))}
        </ul>
        <Menu />
      </div>
    </>
  );
}

export default App;
