import './App.css';

import cokeImg from './assets/coke.png';
import doritosImg from './assets/doritos.png';
import drPepperImg from './assets/dr-pepper.png';
import fantaImg from './assets/fanta.png';
import juiceImg from './assets/juice.png';
import kinderImg from './assets/kinder.png';
import snickersImg from './assets/snickers.png';
import waterImg from './assets/water.png';

const goods = [
  { name: 'Coca Cola 0.33', price: 57, img: cokeImg },
  { name: 'Doritos', price: 121, img: doritosImg },
  { name: 'Dr Pepper 0.33', price: 93, img: drPepperImg },
  { name: 'Fanta 0.33', price: 61, img: fantaImg },
  { name: 'Juicy Juice', price: 44, img: juiceImg },
  { name: 'Kinder Bueno White', price: 89, img: kinderImg },
  { name: 'Snickers', price: 52, img: snickersImg },
  { name: 'Water 0.5', price: 50, img: waterImg },
];

function App() {
  return (
    <>
      <h1>Vending</h1>
      <ul className="app">
        {goods.map(({ img }) => (
          <li>
            <img src={img} alt="" height={100} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
