import React, { Component } from 'react';
import './CartProduct.css';

class CartProduct extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.removeItem(this.props.itemToBeRemoved);
    this.props.calculateTotal();
  }

  render() {
    return (
      <div className="CartProduct">
        <img
          className="CartProduct-image"
          src={this.props.image}
          alt={this.props.name}
        />
        <div className="CartProduct-info">
          <p className="CartProduct-name">{this.props.name}</p>
          <p className="CartProduct-price">Price: ${this.props.price}</p>
        </div>

        <i
          className="fas fa-times fa-times-cartProduct"
          onClick={this.handleClick}
        ></i>
      </div>
    );
  }
}

export default CartProduct;
