import React, { Component, Fragment } from 'react';
import CartProduct from '../CartProduct/CartProduct';
import './Cart.css';

class Cart extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    // zatvaranje diva koj blokuje sajt kad se cart otvori ( ako ne uradim ovako onda on i cart grupise kao da je cart-overlay i onda gasi cart i kad kliknes na cart )
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

    // ide kroz shopState i renderuje iteme (moze da bude zbinjujuce zato sto je ovo zapravo cartState - naming ...)
    const cartItems = this.props.shopState.map(item => {
      return (
        <CartProduct
          info={item} // poslusao sam te, ovo je stvarno bolje iako sam mislio da lepse izgleda sa name, image...
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

          {cartItems.length > 0 ? ( // ako nema itema izbaciti poruku ako ima onda total + button
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
