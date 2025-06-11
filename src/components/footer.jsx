import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faInstagram,
  faFacebookF,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { faLocationDot, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-orange-100 to-yellow-200 text-gray-800 border-t border-orange-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand/Logo */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img
                className="w-10 h-10 object-cover"
                src="https://www.svgrepo.com/show/490737/food-dish.svg"
                alt="TastyBites Logo"
              />
              <h1 className="text-xl sm:text-2xl font-bold text-orange-600">
                TastyBites
              </h1>
            </div>
            <p className="text-sm sm:text-base text-gray-600 max-w-xs">
              Serving happiness with every bite. Your favorite meals delivered fresh and fast.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-600 hover:text-orange-500 transition-colors duration-300"
                aria-label="Instagram"
              >
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-orange-500 transition-colors duration-300"
                aria-label="Facebook"
              >
                <FontAwesomeIcon icon={faFacebookF} size="lg" />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-orange-500 transition-colors duration-300"
                aria-label="Twitter"
              >
                <FontAwesomeIcon icon={faXTwitter} size="lg" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Quick Links</h2>
            <div className="space-y-2">
              <Link
                to="/"
                className="block text-gray-600 hover:text-orange-500 transition-colors duration-300 text-sm sm:text-base"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="block text-gray-600 hover:text-orange-500 transition-colors duration-300 text-sm sm:text-base"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="block text-gray-600 hover:text-orange-500 transition-colors duration-300 text-sm sm:text-base"
              >
                Contact
              </Link>
              <Link
                to="/cart"
                className="block text-gray-600 hover:text-orange-500 transition-colors duration-300 text-sm sm:text-base"
              >
                Cart
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Contact Info</h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon icon={faPhone} className="text-orange-500 flex-shrink-0" />
                <span className="text-sm sm:text-base text-gray-600">(123) 456-7890</span>
              </div>
              <div className="flex items-center space-x-3">
                <FontAwesomeIcon icon={faEnvelope} className="text-orange-500 flex-shrink-0" />
                <span className="text-sm sm:text-base text-gray-600">hello@tastybites.com</span>
              </div>
              <div className="flex items-start space-x-3">
                <FontAwesomeIcon icon={faLocationDot} className="text-orange-500 flex-shrink-0 mt-1" />
                <span className="text-sm sm:text-base text-gray-600">
                  123 Food Street, Flavor Town, CA 90210
                </span>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-800">Business Hours</h2>
            <div className="space-y-2 text-sm sm:text-base text-gray-600">
              <div className="flex justify-between">
                <span>Monday - Friday:</span>
                <span>9:00 AM - 11:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Saturday:</span>
                <span>10:00 AM - 12:00 AM</span>
              </div>
              <div className="flex justify-between">
                <span>Sunday:</span>
                <span>10:00 AM - 10:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-orange-300">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-gray-600 text-center sm:text-left">
              © {new Date().getFullYear()} TastyBites. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center sm:justify-end space-x-4 sm:space-x-6 text-sm">
              <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-300">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;