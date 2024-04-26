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
        <h1>Mission Statement</h1>
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



function MissionStatement() {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 200px)', textAlign: 'center', lineHeight: '1.5' }}>
        <h1 style={{ margin: '0' }}>
          At Best Buy, our purpose is to enrich lives through technology. We do that by leveraging our unique combination of tech expertise and human touch to meet our customers’ everyday needs, whether they come to us online, visit our stores or invite us into their homes. We have more than 1,000 stores and more than 90,000 employees in the United States and Canada.
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

const MisstionStatement = () => {
  return (
    <div>
      <Banner />
      <MissionStatement />
      <LowerBanner />
    </div>
  );
};

export default MisstionStatement;
