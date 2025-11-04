import { useState, useEffect } from 'react';
import { products as productsApi } from '@/lib/api';
import { useRouter } from 'next/router';
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

export default function ProductDetail() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      const response = await productsApi.getById(String(id));
      setProduct(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (!product) return <div className="p-4">Product not found</div>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <Link href="/products">Back to Products</Link>
      <h1 className="text-2xl mt-4 mb-4">{product.name}</h1>
      <div className="border p-4">
        <p>ID: {product.id}</p>
        <p>Description: {product.description || 'N/A'}</p>
        <p>Price: ${product.price}</p>
        <p>Stock: {product.stock}</p>
        <p>Created: {product.created_at}</p>
        <p>Updated: {product.updated_at}</p>
      </div>
    </div>
  );
}
