import { useState, useEffect } from 'react';
import { products as productsApi } from '@/lib/api';
import Link from 'next/link';

interface Product {
  id: number;
  name: string;
  description: string | null;
  price: string;
  stock: number;
  created_at: string;
  updated_at: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await productsApi.getAll();
      setProducts(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this product?')) return;
    try {
      await productsApi.delete(String(id));
      setProducts(products.filter(p => p.id !== id));
    } catch (err: any) {
      alert(err.message);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl mb-4">Products</h1>
      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <Link href={`/products/${product.id}`} className="text-xl">
                  {product.name}
                </Link>
                <p>Description: {product.description || 'N/A'}</p>
                <p>Price: ${product.price}</p>
                <p>Stock: {product.stock}</p>
                <p>ID: {product.id}</p>
              </div>
              <button
                onClick={() => handleDelete(product.id)}
                className="border p-2"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
