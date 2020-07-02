import React, { Component, Fragment } from 'react';
import CartProduct from '../CartProduct/CartProduct';
import './Cart.css';

import { v4 as uuid } from 'uuid';

class Cart extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    if (e.target.classList.contains('cart-overlay')) {
      this.props.handleClick();
    }
  }

  render() {
    const cartTotal = (
      <h3 className="Cart-total">Your Total: ${this.props.cartTotal}</h3>
    );

    const cartButton = (
      <button className="Cart-button" onClick={this.props.clearCart}>
        CLEAR CART
      </button>
    );

    const cartMessage = <h2>There are no items in your cart.</h2>;

    const cartItems = this.props.shopState.map((item) => {
      return (
        <CartProduct
          key={uuid()}
          info={item}
          removeItem={this.props.removeItem}
          itemToBeRemoved={item}
          incrementQuantity={this.props.incrementQuantity}
          decrementQuantity={this.props.decrementQuantity}
        />
      );
    });

    return (
      <div
        className={
          'cart-overlay ' +
          (this.props.cartVisibility ? '' : 'cart-overlay-not-visible')
        }
        onClick={this.handleClick}
      >
        <div
          className={
            'Cart ' + (this.props.cartVisibility ? '' : 'cart-not-visible')
          }
        >
          <i className="fas fa-times" onClick={this.props.handleClick}></i>

          <h2 className="Cart-header">Your Cart</h2>

          <div className="Cart-items">{cartItems}</div>

          {cartItems.length > 0 ? (
            <Fragment>
              {cartTotal}
              {cartButton}
            </Fragment>
          ) : (
            cartMessage
          )}
        </div>
      </div>
    );
  }
}

export default Cart;
