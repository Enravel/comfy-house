import React, { Component } from 'react';
import Product from '../Product/Product';

import './Shop.css';

import { v4 as uuid } from 'uuid';

class Shop extends Component {
  render() {
    const { handleClick, openCartOnClick, products } = this.props;

    return (
      <div className="Shop">
        <h1 className="Shop-header">Our Products</h1>
        <div className="Shop-products">
          {this.props.products.map((item, index) => {
            return (
              <Product
                key={uuid()}
                info={item}
                handleClick={handleClick}
                openCartOnClick={openCartOnClick}
                shopObject={products[index]}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default Shop;
