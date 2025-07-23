import { Link, useLocation } from 'react-router-dom';
import { FaGem } from 'react-icons/fa';

export default function Navbar() {
  const location = useLocation();
  
  return (
    <nav className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
      <Link to="/" className="flex items-center space-x-2">
        <FaGem className="text-gold text-2xl" />
        <span className="text-xl font-serif font-bold">LuxeJewels</span>
      </Link>
      <div className="space-x-4">
        <Link 
          to="/" 
          className={`hover:text-gold transition ${
            location.pathname === '/' ? 'text-gold font-medium' : ''
          }`}
        >
          Home
        </Link>
      </div>
    </nav>
  );
}