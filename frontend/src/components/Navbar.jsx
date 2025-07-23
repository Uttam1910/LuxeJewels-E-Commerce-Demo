import { Link, useLocation } from 'react-router-dom';
import { FaGem } from 'react-icons/fa';

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="flex items-center space-x-2">
        <FaGem className="text-yellow-500 text-2xl" />
        <span className="text-2xl font-serif font-bold tracking-wide text-gray-800">LuxeJewels</span>
      </Link>
      <div className="space-x-6 text-lg">
        <Link 
          to="/" 
          className={`hover:text-yellow-500 transition-colors duration-300 ${
            location.pathname === '/' ? 'text-yellow-500 font-semibold' : 'text-gray-700'
          }`}
        >
          Home
        </Link>
      </div>
    </nav>
  );
}