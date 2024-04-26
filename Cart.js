//import React from 'react';
import { Link } from 'react-router-dom'; // Import Link component
import '../index.css';
import React, { useState, useEffect } from 'react';
import cartdata from './cart.json';



function Banner() {
  return (
    <header className="banner">
      <div className="left">
        <a href="/">
          <img src="./images/BBlogo1.png" alt="Logo" width={90} height={50} />
        </a>
      </div>
      <div className="middle">
        <h1>Shopping Cart</h1>
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



function Cart() {

    const [totalPrice, setTotalPrice] = useState(0);

  // Calculate total price whenever cart data changes
  useEffect(() => {
    const totalPrice = cartdata.reduce((acc, product) => {
      return acc + parseFloat(product.productPrice) * product.quantity;
    }, 0);
    setTotalPrice(totalPrice);
  }, [cartdata]);

    const removeFromCart = async (productId) => {
        try {
          const response = await fetch('http://localhost:3001/cart/remove', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ productId }) // Include productId in the request body

            
          });
      
          if (response.ok) {
            console.log('Item removed from cart successfully');
          } else {
            console.error('Failed to remove item from cart');
          }
        } catch (error) {
          console.error('Error removing item from cart:', error);
        }
      };

      const placeOrder = async () => {
        try {
            const response = await fetch('http://localhost:3001/cart');
            if (!response.ok) {
                throw new Error('Failed to fetch cart data');
            }
            const cartData = await response.json();
            // Process cart data as needed
            console.log('Cart data:', cartData);

            try {
                // Send a POST request to the /orders endpoint with the cart data
                const response = await fetch('http://localhost:3001/orders', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(cartData)
                });
        
                if (response.ok) {
                    console.log('Order placed successfully!');
                    // Clear cart or perform other actions as needed
                } else {
                    throw new Error('Failed to place order');
                }

                try {
                    const response = await fetch('http://localhost:3001/cart/clear', {
                        method: 'POST'
                    });
                    if (response.ok) {
                        console.log('Cart cleared successfully');
                    } else {
                        console.error('Failed to clear cart');
                    }
                } catch (error) {
                    console.error('Error clearing cart:', error);
                }

            } catch (error) {
                console.error('Error placing order:', error);
            }

        } catch (error) {
            console.error('Error fetching cart data:', error);
        }

        
    };
      

      
      return (
        <div>
          <div className="product-grid">
            {cartdata.map((product) => (
              <div key={product.productId} className="product-item">
                <img src={product.productImageURL} alt={product.productName} />
                <h3>{product.productName}</h3>
                <h3>
                  ${product.productPrice}{" "}
                  <button onClick={() => removeFromCart(product.productId)}>Remove</button>{" "}
                  Quantity: {product.quantity}
                </h3>
              </div>
            ))}
          </div>
    
          <div className="cart-bottom-section">
            <div className="total-price-banner">
              <p>Total Price: {totalPrice.toFixed(2)}</p>
              <button onClick={placeOrder}>Place Order</button>
            </div>
            
          </div>
        </div>
      );
    }
  
function LowerBanner() {
  return (
    <footer className="lowerbanner" style={{ position: 'fixed'}}>
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

const CartInfo = () => {
  return (
    <div>
      <Banner />
      <Cart />
      
    </div>
  );
};

export default CartInfo;
