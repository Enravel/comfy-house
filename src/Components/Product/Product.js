import React, { Component } from 'react';
import './Product.css';

class Product extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.handleClick(this.props.shopObject);
    this.props.openCartOnClick();
  }

  render() {
    return (
      <div className="Product">
        <div className="Product-image-container">
          <img
            className="Product-image"
            src={this.props.info.image}
            alt={this.props.info.name}
          />

          <button className="Product-button" onClick={this.handleClick}>
            <i class="fa fa-shopping-cart"></i>
            ADD TO CART
          </button>
        </div>

        <p className="Product-name">{this.props.info.name}</p>

        <p className="Product-price">${this.props.info.price}</p>
      </div>
    );
  }
}

export default Product;
