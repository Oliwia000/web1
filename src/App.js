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
    { id: 1, name: 'Produkt 1', price: 20, image: '150x150', quantity: 7  },
    { id: 2, name: 'Produkt 2', price: 20, image: 'product.jpg', quantity: 9 },
    { id: 3, name: 'Produkt 3', price: 20, image: 'product.jpg', quantity: 12 },
  ];


  const Product = ({ id, name, price, image, quantity, onAddToCart }) => {
    const [count, setCount] = useState(1); 
    const handleAddToCart = () => {
      if (count <= quantity) {
        onAddToCart({ id, name, price, quantity: count });
        alert(`${count} ${name}  dodano do koszyka`);
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
        <p className="card-text">Cena : {price} zł</p>
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
    <h4>Suma: {totalPrice} zł</h4>
  </div>
); 
};



 
const AppComponent = () => {
  const [cart, setCart] = useState([]);

    const addToCart = (newProduct) => {
      setCart((prevCart) => {
const productInCart = prevCart.find((item) => item.id === newProduct.id);
        if (productInCart) {
          return prevCart.map((item) =>
item.id === newProduct.id
              ? { ...item, quantity: item.quantity + newProduct.quantity }
              : item
          );
        }
        return [...prevCart, newProduct];
      });
    };


  const removeFromCart = (produktId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== produktId));
        };

        const updateQuantity = (produktId, newQuantity) => {
          setCart((prevCart) =>
    prevCart.map((item) => (item.id === produktId ? { ...item, quantity: newQuantity } : item))
          );
        };

  return (
    <div className="container">
    <h1>Sklep internetowy</h1>
    <div className="row">
      {productsData.map((produkt) => (
        <Product
          key={produkt.id}
          {...produkt}
          onAddToCart={addToCart}
        />
      ))}
    </div>
    <hr />
    <ShoppingCart cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />
  </div>
);

};

return <AppComponent />;

}
export default App;