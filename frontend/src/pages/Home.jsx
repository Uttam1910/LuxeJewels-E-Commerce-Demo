
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/products`
        );
        setProducts(response.data);
      } catch (err) {
        console.error('Products fetch error:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
          Exquisite Handcrafted Jewelry
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover our collection of premium gems and precious metals crafted 
          with timeless elegance.
        </p>
      </header>

      {loading ? (
        <div className="text-center py-16">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-yellow-500"></div>
          <p className="mt-4 text-gray-700">Loading treasures...</p>
        </div>
      ) : error ? (
        <div className="text-center py-12 text-red-600 font-medium">{error}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
