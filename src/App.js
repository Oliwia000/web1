import './App.css';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  class Produkt {
    constructor(id, name, price, image, quantity ) {
      this.id = id;
      this.name = name;
      this.price = price;
      this.image = image;
      this.quantity = quantity;
    }
  }

  const productsData = [
    { id: 1, name: 'Produkt 1', price: 20, image: '150x150', quantity: 1  },
    { id: 2, name: 'Produkt 2', price: 20, image: 'product2.jpg', quantity: 1 },
    { id: 3, name: 'Produkt 3', price: 20, image: 'product3.jpg', quantity: 1 },
  ];


  const Product = ({ id, name, price, image, quantity, onAddToCart }) => {
    const [count, setCount] = useState(1); 
    const handleAddToCart = () => {
      if (count <= quantity) {
        onAddToCart({ id, name, price, quantity: count });
      } else {
        alert("Nie ma tyle produktów na magazynie");
      }
    };
  
      return (
        <div className="col-md-4 mb-3">
        <div className="card">
        <img src={image} className="card-img-top" alt={name} />
         <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">Cena : ${price}</p>
        <p className="card-text">Ilość : {quantity}</p>
        <input
          type="number"
          min={1}
          max={quantity}
          value={count}
          onChange={(e) => setCount(parseInt(e.target.value))}
        />
        <button
          onClick={handleAddToCart}
          className="btn btn-primary"
          disabled={quantity === 0}>
             Dodaj do koszyka
          </button>
       </div>
       </div>
        </div>
);
};

const ShoppingCart = ({ cart, removeFromCart, updateQuantity }) => {
const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
   
return (
  <div>
    <h2>Zawartość koszyka</h2>
    {cart.map((item) => (
      <div key={item.id} className="card mb-3">
        <div className="card-body">
          <h5 className="card-title">{item.name}</h5>
          <p className="card-text">Cena jedostkowa: ${item.price}</p>
          <input
            type="number"
            min={1}
            value={item.quantity}
            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
          />
          <button onClick={() => removeFromCart(item.id)} className="btn btn-danger">
            Usuń
          </button>
        </div>
      </div>
    ))}
    <h4>Suma: ${totalPrice}</h4>
  </div>
); 

};
 
const App = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (Produkt) => {
  const updatedCart = [cart, Produkt];
   setCart(updatedCart);
  };

  const removeFromCart = (produktId) => {
    const updatedCart = cart.filter((item) => item.id !== produktId);
    setCart(updatedCart);
  };

  const updateQuantity = (produktId, newQuantity) => {
    const updatedCart = cart.map(item => item.id === produktId ? {item, quantity: newQuantity} : item);
    setCart(updatedCart);
  };

  return (
   // <div className="container">
      <h1>Sklep internetowy</h1>
      //<div className="row">
      //  {produktsData.map((Produkt) => (
         // <Produkt
          //  key={Produkt.id}
          //  {...Produkt}
           // onAddToCart={addToCart}
         // />
       // ))}
      //</div>
     // <hr />
     //</div> <ShoppingCart cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />
    //<//</div>/div>
  );
};

};

export default App;
