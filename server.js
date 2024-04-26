const bcrypt = require('bcrypt');
const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// CORS configuration to allow requests from the React frontend
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

const sendError = (res, status, message) => {
    res.status(status).json({ error: message });
  };


  
  


// Function to find a product by its ID in the cart
const findProductById = (cart, productId) => {
  return cart.find(item => item.productId === productId);
};

// POST endpoint to handle adding items to the cart
app.post('/cart', (req, res) => {
  // Extract productId, productName, productPrice, productImageURL, and quantity from the request body
  const { productId, productName, productPrice, productImageURL, quantity } = req.body;

  // Ensure productId, productName, productPrice, productImageURL, and quantity are present
  if (!productId || !productName || !productPrice || !productImageURL || isNaN(quantity) || quantity <= 0) {
    return res.status(400).json({ error: 'Invalid product data or quantity' });
  }

  // Load existing cart data from cart.json (if it exists)
  let cartData = [];
  try {
    const cartJson = fs.readFileSync('./cart.json', 'utf8');
    cartData = JSON.parse(cartJson);
  } catch (error) {
    console.error('Error reading cart data:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }

  // Check if the product already exists in the cart
  const existingProductIndex = cartData.findIndex(item => item.productId === productId);

  if (existingProductIndex !== -1) {
    // If the product exists, increment its quantity
    cartData[existingProductIndex].quantity += parseInt(quantity);
  } else {
    // If the product doesn't exist, add it to the cart with the specified quantity
    cartData.push({ productId, productName, productPrice, productImageURL, quantity: parseInt(quantity) });
  }

  // Write updated cart data back to cart.json
  try {
    fs.writeFileSync('./cart.json', JSON.stringify(cartData, null, 2));
    // Send a success response
    res.json({ success: true });
  } catch (error) {
    console.error('Error writing cart data:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/cart', (req, res) => {
    try {
        const cartJson = fs.readFileSync('./cart.json', 'utf8');
        const cartData = JSON.parse(cartJson);
        res.json(cartData);
    } catch (error) {
        console.error('Error reading cart data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/cart/remove', (req, res) => {
    // Extract productId from the request body
    const { productId } = req.body;
  
    // Ensure productId is present
    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required' });
    }
  
    // Load existing cart data from cart.json
    let cartData = [];
    try {
      const cartJson = fs.readFileSync('./cart.json', 'utf8');
      cartData = JSON.parse(cartJson);
    } catch (error) {
      console.error('Error reading cart data:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  
    // Find the index of the product in the cart
    const productIndex = cartData.findIndex(item => item.productId === productId);
  
    // If the product is not found in the cart, return an error
    if (productIndex === -1) {
      return res.status(404).json({ error: 'Product not found in the cart' });
    }
  
    // If the product is found, decrement its quantity
    cartData[productIndex].quantity--;
  
    // If the quantity becomes zero or less, remove the product from the cart
    if (cartData[productIndex].quantity <= 0) {
      cartData.splice(productIndex, 1);
    }
  
    // Write updated cart data back to cart.json
    try {
      fs.writeFileSync('./cart.json', JSON.stringify(cartData, null, 2));
      // Send a success response
      res.json({ success: true });
    } catch (error) {
      console.error('Error writing cart data:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  


const ACCOUNTS_FILE = 'accounts.json';

// POST endpoint to handle user registration
app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  // Validate email and password (e.g., check for empty values)
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Read existing accounts data
  let accounts = [];
  try {
    const accountsData = fs.readFileSync(ACCOUNTS_FILE, 'utf8');
    accounts = JSON.parse(accountsData);
  } catch (error) {
    console.error('Error reading accounts data:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }

  // Check if email already exists
  const existingAccount = accounts.find(account => account.email === email);
  if (existingAccount) {
    return res.status(400).json({ error: 'Email already exists' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Add the new account to the array
    accounts.push({ email, password: hashedPassword });

    // Write updated accounts data back to file
    fs.writeFileSync(ACCOUNTS_FILE, JSON.stringify(accounts, null, 2));

    return res.status(201).json({ success: true, message: 'Account created successfully' });
  } catch (error) {
    console.error('Error creating account:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.post('/orders', (req, res) => {
    const cartData = req.body; // Assuming the cart data is sent in the request body

    // Read existing orders data from orders.json file
    let orders = [];
    try {
        const ordersData = fs.readFileSync('orders.json', 'utf8');
        orders = JSON.parse(ordersData);
    } catch (error) {
        console.error('Error reading orders data:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Add the cart data to the orders array
    orders.push(cartData);

    // Write updated orders data back to orders.json file
    try {
        fs.writeFileSync('orders.json', JSON.stringify(orders, null, 2));
        res.status(201).json({ success: true, message: 'Order placed successfully' });
    } catch (error) {
        console.error('Error writing orders data:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST endpoint to handle clearing the cart
app.post('/cart/clear', (req, res) => {
    try {
        // Write an empty array to cart.json
        fs.writeFileSync('cart.json', '[]');
        res.status(200).json({ success: true, message: 'Cart cleared successfully' });
    } catch (error) {
        console.error('Error clearing cart:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
