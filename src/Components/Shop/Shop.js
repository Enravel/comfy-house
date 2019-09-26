import React, { Component } from 'react';
import Product from '../Product/Product';

// importing css
import './Shop.css';

class Shop extends Component {
  render() {
    return (
      <div className="Shop">
        <h1 className="Shop-header">Our Products</h1>
        <div className="Shop-products">
          {this.props.products.map((item, index) => {
            return (
              <Product
                name={this.props.products[index].name}
                price={this.props.products[index].price}
                image={this.props.products[index].image}
                handleClick={this.props.handleClick}
                openCartOnClick={this.props.openCartOnClick}
                shopObject={this.props.products[index]}
                calculateTotal={this.props.calculateTotal}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Shop;
