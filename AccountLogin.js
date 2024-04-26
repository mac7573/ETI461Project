import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link component
import '../index.css';


function Banner() {
  return (
    <header className="banner">
      <div className="left">
        <a href="/">
          <img src="./images/BBlogo1.png" alt="Logo" width={90} height={50} />
        </a>
      </div>
      <div className="middle">
        <h1>Account Login</h1>
      </div>
      <div className="right">
        <a href="/AccountLogin" className="account-link">
          <img src="./images/account1.webp" alt="Account" width={50} height={50} />
        </a>
        <a href="/Cart">
          <img src="./images/cart1.png" alt="Shopping Cart" width={50} height={50} />
        </a>
      </div>
    </header>
  );
}



function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginMessage, setLoginMessage] = useState('');
  
    const handleLogin = async () => {
      try {
        const response = await fetch('http://localhost:3001/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        setLoginMessage(data.message);
      } catch (error) {
        console.error('Error logging in:', error);
        setLoginMessage('An error occurred while logging in');
      }
    };
  
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 200px)', textAlign: 'center', lineHeight: '1.5' }}>
        <div style={{ marginBottom: '1rem' }}>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={{ marginRight: '0.5rem' }} />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} style={{ marginRight: '0.5rem' }} />
        </div>
        <button onClick={handleLogin}>Login</button>
        <p style={{ marginTop: '1rem' }}>Don't have an account? <Link to="/CreateAccount">Create Account</Link></p>
        {loginMessage && <p>{loginMessage}</p>}
      </div>
    );
  }
  

function LowerBanner() {
  return (
    <footer className="lowerbanner" style={{ position: 'absolute'}}>
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

const loginPage  = () => {
  return (
    <div>
      <Banner />
      <Login />
      <LowerBanner />
    </div>
  );
};

export default loginPage ;
