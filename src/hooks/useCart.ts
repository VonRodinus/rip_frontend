// src/hooks/useCart.ts
import { useState, useEffect, useCallback } from 'react';

export interface Cart {
  id: string;
  count: number;
}

export const useCart = () => {
  const [cart, setCart] = useState<Cart>({ id: '', count: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // ЗАКОММЕНТИРОВАНО — НЕТ API
  /*
  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const info = await CartService.getInfo();
      setCart({ id: info.id, count: info.artifacts.length });
    } catch (err: any) {
      setError(err.message || 'Ошибка корзины');
      setCart({ id: '', count: 0 });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(refresh, 5000);
    refresh();
    return () => clearInterval(interval);
  }, [refresh]);
  */

  // ЗАГЛУШКА: корзина всегда 0
  useEffect(() => {
    setCart({ id: '', count: 0 });
    setLoading(false);
  }, []);

  const refresh = useCallback(() => {
    // Ничего не делаем
  }, []);

  return { cart, loading, error, refresh };
};