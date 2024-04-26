import React from 'react';
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
        <h1>Store Information</h1>
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



function StoreInfomation() {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 200px)', textAlign: 'center', lineHeight: '1.5' }}>
        <h1 style={{ margin: '0' }}>
        Address: 1650 N Atherton St, State College, PA 16803<br />
        Phone: (814) 237-5610<br /><br />
        
        Hours:<br />
        Monday	    10 AM–8 PM<br />
        Tuesday	    10 AM–8 PM<br />
        Wednesday	10 AM–8 PM<br />
        Thursday	10 AM–8 PM<br />
        Friday	    10 AM–8 PM<br />
        Saturday	10 AM–8 PM<br />
        Sunday	    11 AM–7 PM<br />
        
        
        </h1>
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

const StoreInformation = () => {
  return (
    <div>
      <Banner />
      <StoreInfomation />
      <LowerBanner />
    </div>
  );
};

export default StoreInformation;
