// --- AIRecommendations.js ---
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import { FaGem, FaLightbulb } from 'react-icons/fa';

export default function AIRecommendations({ productId }) {
  const [recommendations, setRecommendations] = useState([]);
  const [source, setSource] = useState('ai');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [stylingTips, setStylingTips] = useState([]);
  const [personalizedMessage, setPersonalizedMessage] = useState('');

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        setLoading(true);
        setError(false);
        setStylingTips([]);
        setPersonalizedMessage('');

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/products/${productId}/recommendations`,
          { timeout: 15000 }
        );

        setRecommendations(response.data.products || []);
        setSource(response.data.source || 'fallback');
        setStylingTips(response.data.stylingTips || []);
        setPersonalizedMessage(response.data.personalizedMessage || '');
      } catch (error) {
        console.error('Recommendations error:', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (productId && /^[0-9a-fA-F]{24}$/.test(productId)) {
      fetchRecommendations();
    } else {
      setLoading(false);
      setError(true);
    }
  }, [productId]);

  const getTipForProduct = (productId) => {
    const tip = stylingTips.find(t => t.productId === productId);
    return tip ? tip.tip : '';
  };

  const sourceLabels = {
    ai: 'AI-Curated Recommendations',
    hybrid: 'Recommended For You',
    fallback: 'Similar Products',
    random: 'You Might Also Like'
  };

  return (
    <div className="mt-12">
      <div className="flex justify-between items-center mb-6 border-b pb-2">
        <h2 className="text-2xl font-serif font-bold text-gray-800">
          {sourceLabels[source] || 'Recommended For You'}
        </h2>
        {personalizedMessage && (
          <div className="flex items-center text-yellow-600">
            <FaLightbulb className="mr-2" />
            <span className="text-sm italic">{personalizedMessage}</span>
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex flex-col items-center py-8">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
            <FaGem className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-yellow-500 text-xl" />
          </div>
          <p className="mt-4 text-gray-600">
            {source === 'ai' 
              ? "Gemini AI is curating perfect matches..." 
              : "Loading recommendations..."}
          </p>
        </div>
      ) : error ? (
        <div className="bg-yellow-50 p-6 rounded-lg text-center border border-yellow-200">
          <p className="text-yellow-700">
            Recommendations are temporarily unavailable. Please check back later.
          </p>
        </div>
      ) : recommendations.length > 0 ? (
        <div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {recommendations.map((product) => (
              <ProductCard 
                key={product._id} 
                product={product} 
                stylingTip={getTipForProduct(product._id)} 
              />
            ))}
          </div>

          {source !== 'random' && (
            <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
              <div className="flex items-start">
                <FaLightbulb className="text-yellow-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-bold text-yellow-700 mb-2">Styling Guide</h3>
                  <ul className="space-y-2">
                    {stylingTips.slice(0, 4).map((tip, index) => (
                      <li key={index} className="text-sm text-yellow-800">
                        <span className="font-medium">✓</span> {tip.tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <p className="text-gray-500 italic">No recommendations found</p>
      )}

      {source === 'fallback' && !loading && (
        <p className="mt-4 text-sm text-gray-500">
          Showing similar items in the same category
        </p>
      )}
    </div>
  );
}