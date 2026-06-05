import { useState, useEffect, useMemo, useCallback } from 'react';
import { fetchProducts } from '../services/sheetsService';
import type { Product } from '../types/product';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const load = useCallback(() => {
    setLoading(true);
    setError(null);
    fetchProducts()
      .then(setProducts)
      .catch((err: unknown) => setError(err instanceof Error ? err.message : 'Lỗi không xác định'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return products.filter((p) =>
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.author.toLowerCase().includes(q) ||
      `#${p.id.padStart(3, '0')}`.includes(q) ||
      p.id.includes(q)
    );
  }, [products, searchQuery]);

  return { products: filtered, loading, error, searchQuery, setSearchQuery, refetch: load };
}
