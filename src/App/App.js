import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import Home from '../Components/Home/Home';
import Shop from '../Components/Shop/Shop';
import Cart from '../Components/Cart/Cart';

import './App.css';

import database from './database';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: database.products,

      cartVisibility: false,

      shopState: [],

      cartTotal: 0,

      itemsInCart: 0,
    };

    this.handleClickCart = this.handleClickCart.bind(this);
    this.handleClickShop = this.handleClickShop.bind(this);
    this.handleClickRemoveCartItem = this.handleClickRemoveCartItem.bind(this);
    this.clearCart = this.clearCart.bind(this);
    this.incrementQuantity = this.incrementQuantity.bind(this);
    this.decrementQuantity = this.decrementQuantity.bind(this);
  }

  calculateTotal() {
    let newTotal = 0;
    this.state.shopState.map((item) => {
      return (newTotal += item.price * item.quantity);
    });

    this.setState({ cartTotal: newTotal });
  }

  handleClickCart() {
    this.setState({ cartVisibility: !this.state.cartVisibility });
  }

  alreadyExists(object) {
    return this.state.shopState.some((item) => item.name === object.name);
  }

  handleClickShop(shopObject) {
    if (this.alreadyExists(shopObject)) {
      let newState = [...this.state.shopState];
      newState[newState.indexOf(shopObject)].quantity += 1;

      this.setState(
        {
          shopState: newState,
        },
        this.calculateTotal
      );
      this.calculateItemsInCart();
    } else {
      this.setState(
        { shopState: [...this.state.shopState, shopObject] },
        () => {
          this.calculateTotal();
          this.calculateItemsInCart();
        }
      );
    }
  }

  handleClickRemoveCartItem(shopObject) {
    shopObject.quantity = 1;

    this.setState(
      {
        shopState: this.state.shopState.filter((index) => index !== shopObject),
      },
      () => {
        this.calculateTotal();
        this.calculateItemsInCart();
      }
    );
  }

  calculateItemsInCart() {
    let itemsInCart = 0;
    this.state.shopState.map((item) => {
      return (itemsInCart += item.quantity);
    });

    this.setState({ itemsInCart: itemsInCart });
  }

  clearCart() {
    const newState = this.state.shopState.map((item) => {
      return (item.quantity = 1);
    });
    this.setState({ shopState: newState });

    this.setState({ shopState: [] }, () => {
      this.calculateTotal();
      this.calculateItemsInCart();
    });
  }

  incrementQuantity(itemInfo) {
    const newState = [...this.state.shopState];
    newState[newState.indexOf(itemInfo)].quantity += 1;
    this.setState(
      {
        shopState: newState,
      },
      () => {
        this.calculateTotal();
        this.calculateItemsInCart();
      }
    );
  }

  decrementQuantity(itemInfo) {
    const newState = [...this.state.shopState];
    if (newState[newState.indexOf(itemInfo)].quantity !== 1) {
      newState[newState.indexOf(itemInfo)].quantity -= 1;
      this.setState(
        {
          shopState: newState,
        },
        () => {
          this.calculateTotal();
          this.calculateItemsInCart();
        }
      );
    }
  }

  render() {
    const {
      cartVisibility,
      shopState,
      cartTotal,
      products,
      itemsInCart,
    } = this.state;
    return (
      <div className="App">
        <Navbar handleClick={this.handleClickCart} itemsInCart={itemsInCart} />
        <Cart
          cartVisibility={cartVisibility}
          handleClick={this.handleClickCart}
          shopState={shopState}
          removeItem={this.handleClickRemoveCartItem}
          cartTotal={cartTotal}
          clearCart={this.clearCart}
          incrementQuantity={this.incrementQuantity}
          decrementQuantity={this.decrementQuantity}
        />
        <Home />
        <Shop
          products={products}
          handleClick={this.handleClickShop}
          openCartOnClick={this.handleClickCart}
        />
      </div>
    );
  }
}

export default App;
