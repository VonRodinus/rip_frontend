// src/components/CartIcon.tsx
import { useState, useEffect } from 'react';
import './CartIcon.css';

export const CartIcon = () => {
  const [count, setCount] = useState(0);
  const [hasRequest, setHasRequest] = useState(false);

  useEffect(() => {
    // Mock: имитируем получение данных
    // Позже заменишь на fetch('/api/current_request')
    const mockCount = 2; // или 0
    setCount(mockCount);
    setHasRequest(mockCount > 0);
  }, []);

  return (
    <div className="cart-icon-container">
      {hasRequest ? (
        <a href="#" className="cart-icon-link">
          <img
            src={`${import.meta.env.BASE_URL}assets/feather_icon.png`}
            alt="Корзина"
            className="cart-icon"
          />
          <span className="cart-count">{count}</span>
        </a>
      ) : (
        <div className="cart-icon-link disabled">
          <img
            src={`${import.meta.env.BASE_URL}assets/feather_icon.png`}
            alt="Корзина пуста"
            className="cart-icon disabled"
          />
          <span className="cart-count">0</span>
        </div>
      )}
    </div>
  );
};