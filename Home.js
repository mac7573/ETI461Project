//import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component
import '../index.css';

import React, { useEffect, useState } from 'react';
import productsData from './products.json';


function Banner() {
  return (
    <header className="banner">
      <div className="left">
        <a href="/">
          <img src="./images/BBLogo1.png" alt="Logo" width={90} height={50} />
        </a>
      </div>
      <div className="middle">
        <h1>Welcome to BestBuy</h1>
      </div>
      <div className="right">
        <a href="/CreateAccount" className="account-link">
          <img src="./images/account1.webp" alt="Account" width={50} height={50} />
        </a>
        <a href="/Cart">
          <img src="./images/cart1.png" alt="Shopping Cart" width={50} height={50} />
        </a>
      </div>
    </header>
  );
}

function ProductGrid() {
    const addToCart = async (productId, productName, productPrice, productImageURL) => {
        try {
          const response = await fetch('http://localhost:3001/cart', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productId, productName, productPrice, productImageURL, quantity: 1 }) // Default quantity is 1
          });
      
          if (response.ok) {
            console.log('Item added to cart successfully');
          } else {
            console.error('Failed to add item to cart');
          }
        } catch (error) {
          console.error('Error adding item to cart:', error);
        }
      };
      
      return (
        <div className="product-grid">
          {productsData.map(product => (
            <div key={product.id} className="product-item">
              <img src={product.imageUrl} alt={product.name} />
              <h3>{product.name}</h3>
              <h3>${product.price} <button onClick={() => addToCart(product.id, product.name, product.price, product.imageUrl)}>Add to Cart</button></h3>
            </div>
          ))}
        </div>
      );
  }


function LowerBanner() {
  return (
    <footer className="lowerbanner">
      <div className="links">
        <a href="/CompanyDetails">Company Details</a>
        <a href="/ContactInfo">Support Contact Information</a>
        <Link to="/MissionStatement">Mission Statement</Link>
        <a href="/StoreInformation">Store Address Information</a>
        <a href="/ReturnGuidelines">Return Guidelines</a>
      </div>
    </footer>
  );
}

const Home = () => {
  return (
    <div>
      <Banner />
      <ProductGrid />
      <LowerBanner />
    </div>
  );
};

export default Home;
