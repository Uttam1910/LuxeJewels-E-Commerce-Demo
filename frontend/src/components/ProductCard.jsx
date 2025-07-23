import { Link } from 'react-router-dom';
import { FaInfoCircle } from 'react-icons/fa';
import { useState } from 'react';

export default function ProductCard({ product, stylingTip }) {
  const [showTip, setShowTip] = useState(false);

  return (
    <div className="relative group">
      <Link 
        to={`/product/${product._id}`}
        className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition flex flex-col h-full"
      >
        <div className="h-56 overflow-hidden flex items-center justify-center relative">
          <img 
            src={product.imageUrl} 
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition duration-300"
          />
          
          {/* Styling tip indicator */}
          {stylingTip && (
            <div className="absolute bottom-2 right-2">
              <div className="bg-amber-500 text-white rounded-full p-1.5 shadow-md">
                <FaInfoCircle className="text-sm" />
              </div>
            </div>
          )}
        </div>
        <div className="p-4 flex-grow flex flex-col">
          <h3 className="font-serif text-lg font-semibold">{product.name}</h3>
          <p className="text-gold font-bold mt-2">${product.price.toFixed(2)}</p>
        </div>
      </Link>

      {/* Styling tip popover */}
      {stylingTip && (
        <div 
          className={`absolute z-10 top-16 right-2 bg-white p-3 rounded-lg shadow-xl border border-amber-200 transition-all duration-300 ${
            showTip ? 'opacity-100 visible' : 'opacity-0 invisible'
          }`}
          style={{ width: '90%', maxWidth: '300px' }}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-0.5 mr-2 text-amber-500">
              <FaInfoCircle />
            </div>
            <p className="text-sm text-gray-700">{stylingTip}</p>
          </div>
          <div className="absolute -top-2 right-3 w-4 h-4 bg-white transform rotate-45 border-t border-l border-amber-200"></div>
        </div>
      )}

      {/* Hover trigger area */}
      {stylingTip && (
        <div
          className="absolute bottom-14 right-2 w-8 h-8 cursor-pointer z-20"
          onMouseEnter={() => setShowTip(true)}
          onMouseLeave={() => setShowTip(false)}
          onClick={(e) => {
            e.preventDefault();
            setShowTip(!showTip);
          }}
        />
      )}
    </div>
  );
}