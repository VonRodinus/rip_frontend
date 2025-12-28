// src/components/Navbar.tsx
import { Link } from 'react-router-dom';

import './Navbar.css';

export const AppNavbar = () => {
  

  return (
    <>
      
      <nav className="navbar">
        <div className="navbar-content">
          <Link to="/" className="logo-link">
            <span className="logo-text">Chronus</span>
          </Link>
        </div>

        
        <Link to="/catalog" className="artifacts-btn">
          <img
            src={`${import.meta.env.BASE_URL}assets/vase_669308.png`}
            alt=""
            className="artifacts-btn-icon"
          />
          <span className="artifacts-btn-text">Артефакты</span>
        </Link>
      </nav>

      
      <div className="navbar-spacer"></div>

      
      <div className="cart-container">
      <div className="cart-icon disabled">
      <img src={`${import.meta.env.BASE_URL}assets/feather_icon.png`} alt="Корзина" className="cart-img disabled" />
      <span className="cart-badge">0</span>
      </div>
      </div>
    </>
  );
};