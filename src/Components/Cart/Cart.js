import React, { Component, Fragment } from 'react';
import CartProduct from '../CartProduct/CartProduct';
import './Cart.css';

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

    const cartButton = <button className="Cart-button">CLEAR CART</button>;

    const cartMessage = <h2>There are no items in your cart.</h2>;

    const cartItems = this.props.shopState.map((item, index) => {
      return (
        <CartProduct
          name={this.props.shopState[index].name}
          price={this.props.shopState[index].price}
          image={this.props.shopState[index].image}
          removeItem={this.props.removeItem}
          itemToBeRemoved={this.props.shopState[index]}
          calculateTotal={this.props.calculateTotal}
        />
      );
    });

    return (
      <div className={this.props.cartOverlayClass} onClick={this.handleClick}>
        <div className={this.props.cartClass}>
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
