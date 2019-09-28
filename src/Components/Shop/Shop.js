import React, { Component } from 'react';
import Product from '../Product/Product';

// importing css
import './Shop.css';

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
