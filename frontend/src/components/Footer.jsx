import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Heart } from 'lucide-react';

const Footer = () => {
  // Use actual categories from the database
  const categories = [
    { id: 'housing', name: 'Housing' },
    { id: 'transport', name: 'Transport' },
    { id: 'utilities', name: 'Utilities' },
    { id: 'lifestyle', name: 'Lifestyle' }
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-orange-500 text-white p-2 rounded-lg">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">How to Bangalore</h3>
                <p className="text-sm text-gray-400">The Ultimate City Guide</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4">
              Your pragmatic guide to thriving in India's Silicon Valley. Navigate the Bangalore Paradox with insider knowledge and practical solutions.
            </p>
          </div>

          {/* Categories Navigation */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Main Categories</h4>
            <ul className="space-y-3">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/category/${category.id}`}
                    className="text-orange-400 hover:text-orange-300 font-medium transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Information</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-gray-300 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-gray-300 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-gray-300 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-gray-300 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-gray-400 hover:text-gray-300 transition-colors">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link to="/sitemap" className="text-gray-400 hover:text-gray-300 transition-colors">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 How to Bangalore. All rights reserved.
            </div>
            
            <div className="flex items-center text-sm text-gray-400">
              <span>Made with</span>
              <Heart className="h-4 w-4 mx-1 text-red-500 fill-current" />
              <span>for Bangalore migrants</span>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              <strong>Disclaimer:</strong> This website provides general information and advice. 
              For legal, financial, or medical matters, please consult qualified professionals. 
              The authors are not responsible for any actions taken based on this information.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;