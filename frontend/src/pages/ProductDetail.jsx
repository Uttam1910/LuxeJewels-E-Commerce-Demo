import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AIRecommendations from '../components/AIRecommendations';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/products/${id}`
        );
        setProduct(response.data);
      } catch (err) {
        console.error('Product fetch error:', err);
        setError('Product not found');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
        <p className="mt-4">Loading gem details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-serif font-bold mb-4">Product Not Found</h1>
        <p className="mb-6">The jewelry piece you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-gold hover:bg-yellow-700 text-white font-bold py-2 px-6 rounded-full transition"
        >
          Browse Collection
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Product image */}
        <div className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-center">
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="max-w-full max-h-[500px] object-contain"
          />
        </div>
        
        {/* Product details */}
        <div>
          <h1 className="text-3xl font-serif font-bold mb-4">{product.name}</h1>
          <p className="text-gold text-2xl font-bold mb-6">${product.price.toFixed(2)}</p>
          
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Description</h2>
            <p className="text-gray-700 leading-relaxed">{product.description}</p>
          </div>
          
          <div className="flex items-center mb-8">
            <span className="bg-gray-200 text-gray-800 py-1 px-3 rounded-full text-sm">
              {product.category}
            </span>
          </div>
          
          <button className="bg-gold hover:bg-yellow-700 text-white font-bold py-3 px-8 rounded-full transition w-full md:w-auto">
            Add to Cart
          </button>
        </div>
      </div>

      {/* AI Recommendations */}
      <AIRecommendations productId={id} />
    </div>
  );
}