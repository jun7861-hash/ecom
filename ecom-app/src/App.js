import React, { useState, useEffect } from 'react';
import './App.css';
import Product from './Product';
import Cart from './Cart';

const App = () => {
  const [showCart, setShowCart] = useState(false)

  const handleShow = () => {
    setShowCart(showCart ? false : true)
  }
  useEffect(() => {
    console.log(showCart)
  }, [showCart])
  // SAMPLE CART ITEM
  const [cart, setCart] = useState([
    {
      id: 1,
      image: 'https://image.spreadshirtmedia.com/image-server/v1/products/T210A120PA3176PT17X19Y18D12884717FS4617/views/1,width=650,height=650,appearanceId=120.jpg',
      name: 'Brown Shirt',
      description: 'Lorem ipsum',
      price: 500,
      size: 'S',
      units: 1
    }
  ]);

  const PRODUCTS = [
    {
      id: 1,
      image: "https://image.spreadshirtmedia.com/image-server/v1/products/T210A120PA3176PT17X19Y18D12884717FS4617/views/1,width=650,height=650,appearanceId=120.jpg",
      name: 'Brown Shirt',
      price: 500,
      description: 'Lorem ipsum',
      size: 'S',
    },
    {
      id: 2,
      image: "https://image.spreadshirtmedia.com/image-server/v1/products/T812A2PA3140PT17X56Y81D12854648FS7891CxFFFFFF/views/1,width=650,height=650,appearanceId=2.jpg",
      name: 'Black Shirt',
      price: 600,
      description: 'Lorem ipsum',
      size: 'M',
    },
  ]
  // 

  
  // REMOVE ITEM ON CART
  const handleRemoveFunc =  (item) => {
    const removeCartItem = cart.filter((i) => {
      console.log(item)
      return i.id !== item.id
    })
    setCart(removeCartItem);
  }
  
  // ADD LOCAL TO STORAGE
  useEffect(() => {
    const localCart = localStorage.getItem('Cart');
    setCart(JSON.parse(localCart))
  }, []);
  useEffect(() => {
    localStorage.setItem('Cart', JSON.stringify(cart));
  }, [cart]);
  // 
  

  // CHECK AND PUSH IF PRODUCT IS AVAILABLE AT THE CART
  function handleAddFunc(product) {
    setCart(cart => ([...cart,
      {
        id: product.id,
        image: product.image,
        name: product.name,
        description: product.description,
        price: product.price,
        size: product.size,
        units: product.units
      }
    ]));
    
    // check if item is existing on cart
    const existingProductIndex = cart.findIndex(p => p.id === product.id);
    // slice = first add first index rule
    if (existingProductIndex >= 0) {
      const cartProducts = cart.slice();
      const existingProduct = cartProducts[existingProductIndex];
      const updatedUnitsProduct = {
        ...existingProduct,
        units: existingProduct.units + product.units
      }
      cartProducts[existingProductIndex] = updatedUnitsProduct;
      setCart(cartProducts)
    } else {
      setCart([...cart, product]);
    }
  }
  // 

  // INCREASE NUMBER OF UNITS OF AN ITEM ON CART
  const handleUnitsIncrement = (cartItem) => {
    const existingProdId = cart.findIndex(item => item.id === cartItem.id)
    const cartProducts = cart.slice()
    const existingProd = cartProducts[existingProdId]
    const incrementUnits = {
      ...existingProd, units: existingProd.units + 1
    }
    cartProducts[existingProdId] = incrementUnits
    setCart(cartProducts);
  }
  // 

  // DECREASE NUMBER OF UNITS OF AN ITEM ON CART
  const handleUnitsDecrement = (cartItem) => {
    const existingProdId = cart.findIndex(item => item.id === cartItem.id)
    if (cartItem.units !== 1) {
      const cartProducts = cart.slice()
      const existingProd = cartProducts[existingProdId]
      const decrementUnits = {
        ...existingProd, units: existingProd.units - 1
      }
      cartProducts[existingProdId] = decrementUnits
      setCart(cartProducts);
    }  
  }
  
  // TOTAL
  const grandTotal = () => {
    let total = cart.reduce((acc, cur) => acc + cur.price * cur.units, 0);
    return total
  }
  //

  return (
    <div className="App content-center">
      <div className='wrap'>
        <header className="d-flex content-end">
          <div className="inner">
            <p>
              <p className="cart-button" onClick={handleShow}>
                My Cart ( {cart.length} )
              </p>
            </p>
          </div>
        </header>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-12'>
              <div className='row'>
                {
                  PRODUCTS.map(p => <Product key={p.id} {...p} addFunc={handleAddFunc} /> )
                }
              </div>
            </div>
            <div 
              className='container'
              style={{ 
                display: showCart === false ? 'none' : 'block',
                position: 'absolute'
              }}
            >
              <div className='cart-container'>
                {
                  cart.map((c, index) => (
                    <Cart 
                      key={index} 
                      {...c} 
                      removeFunc={handleRemoveFunc} 
                      unitsIncrement={handleUnitsIncrement} 
                      unitsDecrement={handleUnitsDecrement} 
                    />
                  ))
                }
                <h1>Grand Total: $ {grandTotal()}.00</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
