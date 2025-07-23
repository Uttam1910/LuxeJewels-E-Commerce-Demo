import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </main>
        <footer className="bg-white py-6 text-center border-t">
          <p>© {new Date().getFullYear()} LuxeJewels. Crafted with elegance.</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;