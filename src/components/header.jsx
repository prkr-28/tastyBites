import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartItems = useSelector((store) => store.cart);
  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();

  return (
    <header className="bg-white border-b border-green-600 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to={'/'} className="flex items-center gap-2">
              <img
                className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 object-cover border-4 border-white"
                src="https://www.svgrepo.com/show/490737/food-dish.svg"
                alt="TastyBites Logo"
              />
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 bg-clip-text">
                TastyBites
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {isAuthenticated && (
              <span className="text-sm text-gray-400 border-b border-gray-400">
                {user.nickname}
              </span>
            )}
            <Link
              to="/"
              className="text-gray-700 hover:text-purple-600 hover:border-b-2 hover:border-purple-600 transition-all duration-200 pb-1"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-purple-600 hover:border-b-2 hover:border-purple-600 transition-all duration-200 pb-1"
            >
              About us
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-purple-600 hover:border-b-2 hover:border-purple-600 transition-all duration-200 pb-1"
            >
              Contact us
            </Link>
            <Link
              to="/cart"
              className="text-gray-700 hover:text-purple-600 hover:border-b-2 hover:border-purple-600 transition-all duration-200 pb-1 font-semibold"
            >
              Cart
              {cartItems.length > 0 && (
                <span className="ml-1 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                  {cartItems.length}
                </span>
              )}
            </Link>
            {isAuthenticated ? (
              <button
                className="bg-purple-700 hover:bg-purple-800 text-white font-medium rounded-lg text-sm px-4 py-2 transition-colors duration-200"
                onClick={() =>
                  logout({
                    logoutParams: { returnTo: window.location.origin },
                  })
                }
              >
                Log Out
              </button>
            ) : (
              <button
                className="bg-purple-700 hover:bg-purple-800 text-white font-medium rounded-lg text-sm px-4 py-2 transition-colors duration-200"
                onClick={() => loginWithRedirect()}
              >
                Log In
              </button>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-4">
            {/* Cart icon for mobile */}
            <Link to="/cart" className="relative">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" />
              </svg>
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-purple-600 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round\" strokeLinejoin="round\" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-4">
              {isAuthenticated && (
                <span className="text-sm text-gray-400 px-4 border-b border-gray-200 pb-2">
                  Welcome, {user.name}
                </span>
              )}
              <Link
                to="/"
                className="block px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="block px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About us
              </Link>
              <Link
                to="/contact"
                className="block px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md transition-colors duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact us
              </Link>
              <Link
                to="/cart"
                className="block px-4 py-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-md transition-colors duration-200 font-semibold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Cart {cartItems.length > 0 && `(${cartItems.length})`}
              </Link>
              <div className="px-4 pt-2">
                {isAuthenticated ? (
                  <button
                    className="w-full bg-purple-700 hover:bg-purple-800 text-white font-medium rounded-lg text-sm px-4 py-2 transition-colors duration-200"
                    onClick={() => {
                      logout({
                        logoutParams: { returnTo: window.location.origin },
                      });
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Log Out
                  </button>
                ) : (
                  <button
                    className="w-full bg-purple-700 hover:bg-purple-800 text-white font-medium rounded-lg text-sm px-4 py-2 transition-colors duration-200"
                    onClick={() => {
                      loginWithRedirect();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    Log In
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;