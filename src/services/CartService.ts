// src/services/CartService.ts
export interface CartInfo {
    id: string;
    count: number;
  }
  
  export const CartService = {
    async getInfo(): Promise<CartInfo> {
      const res = await fetch('/api/tpq_requests/cart', {
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Failed to fetch cart');
      return res.json();
    },
  
    async addArtifact(artifactId: string): Promise<void> {
      await fetch(`/api/artifacts/${artifactId}/add_to_request`, {
        method: 'POST',
        credentials: 'include',
      });
    }
  };