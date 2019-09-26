import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import Home from '../Components/Home/Home';
import Shop from '../Components/Shop/Shop';
import Cart from '../Components/Cart/Cart';

// importing css
import './App.css';

// importing database
import database from './database';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      products: database.products,

      // mrzime sve ovako da radim ocu da zavrsim sto pre ali cisto sam uradio jedan da vidim sta mislis o ovakvom grupisanju ( po komponentama )
      // mada vrv se drugacije sve radi sa redux tako da ne znam ni dal je bitno
      cart: {
        cartOverlayClass: 'cart-overlay cart-overlay-not-visible',
        cartClass: 'Cart cart-not-visible'
      },

      shopState: [],

      cartTotal: 0
    };

    this.handleClickCart = this.handleClickCart.bind(this);
    this.handleClickShop = this.handleClickShop.bind(this);
    this.handleClickRemoveCartItem = this.handleClickRemoveCartItem.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
  }

  calculateTotal() {
    let newTotal = 0;
    this.state.shopState.map((item, index) => {
      newTotal += this.state.shopState[index].price;
    });

    this.setState({ cartTotal: newTotal });
  }

  handleClickCart() {
    if (this.state.cart.cartClass !== 'Cart') {
      this.setState({
        cart: {
          cartOverlayClass: 'cart-overlay',
          cartClass: 'Cart'
        }
      });
    } else {
      this.setState({
        cart: {
          cartOverlayClass: 'cart-overlay cart-overlay-not-visible',
          cartClass: 'Cart cart-not-visible'
        }
      });
    }
  }

  handleClickShop(shopObject) {
    this.setState({ shopState: [...this.state.shopState, shopObject] });
  }

  handleClickRemoveCartItem(shopObject) {
    this.setState({
      shopState: this.state.shopState.filter(index => index !== shopObject)
    });
  }

  render() {
    return (
      <div className="App">
        <Navbar handleClick={this.handleClickCart} />
        <Cart
          cartClass={this.state.cart.cartClass}
          cartOverlayClass={this.state.cart.cartOverlayClass}
          handleClick={this.handleClickCart}
          shopState={this.state.shopState}
          removeItem={this.handleClickRemoveCartItem}
          calculateTotal={this.calculateTotal}
          cartTotal={this.state.cartTotal}
        />
        <Home />
        <Shop
          products={this.state.products}
          handleClick={this.handleClickShop}
          openCartOnClick={this.handleClickCart}
          calculateTotal={this.calculateTotal}
        />
      </div>
    );
  }
}

export default App;
