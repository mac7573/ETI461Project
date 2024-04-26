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
        <h1>Return Guidelines</h1>
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



function ReturnGuidelines() {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 200px)', textAlign: 'center', lineHeight: '1.5' }}>
        <h1 style={{ margin: '0' }}>
            Most items are returnable within a 15 day period starting at day of pruchase<br /><br />
            Items need to be returned in a like-new condition. Items that are damaged, unsanitary, dented, scratched or missing major contents may be denied a return. Apparel must not be worn or laundered, and its original tags must be attached for us to accept a return.<br />

        
        
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

const ReturnGuidelinesPage  = () => {
  return (
    <div>
      <Banner />
      <ReturnGuidelines />
      <LowerBanner />
    </div>
  );
};

export default ReturnGuidelinesPage ;
