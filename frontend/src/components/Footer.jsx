import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, ExternalLink, Heart } from 'lucide-react';
import { categories } from '../data/comprehensive_mock';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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
            <div className="flex items-center text-sm text-gray-400">
              <Mail className="h-4 w-4 mr-2" />
              <a href="mailto:hello@howtobangalore.com" className="hover:text-orange-400 transition-colors">
                hello@howtobangalore.com
              </a>
            </div>
          </div>

          {/* Categories Navigation */}
          <div className="lg:col-span-2">
            <h4 className="text-lg font-semibold text-white mb-4">Explore Categories</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categories.map((category) => (
                <div key={category.id}>
                  <Link
                    to={`/category/${category.id}`}
                    className="text-orange-400 hover:text-orange-300 font-medium transition-colors"
                  >
                    {category.name}
                  </Link>
                  <ul className="mt-2 space-y-1">
                    {category.subcategories.slice(0, 3).map((subcategory) => (
                      <li key={subcategory.id}>
                        <Link
                          to={`/category/${category.id}/${subcategory.id}`}
                          className="text-sm text-gray-400 hover:text-gray-300 transition-colors"
                        >
                          {subcategory.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
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