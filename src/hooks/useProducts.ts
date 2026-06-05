import { useState, useEffect, useMemo } from 'react';
import { fetchProducts } from '../services/sheetsService';
import type { Product } from '../types/product';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Lỗi không xác định'))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return products.filter((p) =>
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.author.toLowerCase().includes(q)
    );
  }, [products, searchQuery]);

  return { products: filtered, loading, error, searchQuery, setSearchQuery };
}
