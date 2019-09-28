import React, { Component } from 'react';
import './CartProduct.css';

class CartProduct extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.removeItem(this.props.itemToBeRemoved);
  }

  render() {
    const { info } = this.props;
    return (
      <div className="CartProduct">
        <div className="CartProduct-image-container">
          <img className="CartProduct-image" src={info.image} alt={info.name} />
          <div className="CartProduct-quantity">
            <i
              class="fas fa-angle-up quantity-arrows"
              onClick={() => this.props.incrementQuantity(info)}
            ></i>
            <p className="CartProduct-quantity-number">{info.quantity}</p>
            <i
              class="fas fa-angle-down quantity-arrows"
              onClick={() => this.props.decrementQuantity(info)}
            ></i>
          </div>
        </div>
        <div className="CartProduct-info">
          <p className="CartProduct-name">{info.name}</p>
          <p className="CartProduct-price">
            Price: ${info.price * info.quantity}
          </p>
        </div>

        <i
          className="fas fa-times fa-times-cartProduct"
          onClick={this.handleClick}
        ></i>
      </div>
      // mislim da ovde ne treba komentari
    );
  }
}

export default CartProduct;
