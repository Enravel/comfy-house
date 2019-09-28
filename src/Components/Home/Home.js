import React, { Component } from 'react';
import image from '../../images/main-cover.jpg';
import './Home.css';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <img className="main-cover" src={image} alt="cover" />
        <div className="Home-container">
          <h2 className="Home-container-header">FURNITURE COLLECTION</h2>

          <button className="btn-shop">SHOP NOW</button>
        </div>
      </div>
    );
  }
}

export default Home;
