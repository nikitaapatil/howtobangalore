import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const Footer = () => {
  // Function to scroll to top when clicking links
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Categories */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Categories</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/category/housing"
                  onClick={scrollToTop}
                  className="text-orange-400 hover:text-orange-300 font-medium transition-colors"
                >
                  Housing
                </Link>
              </li>
              <li>
                <Link
                  to="/category/transport"
                  onClick={scrollToTop}
                  className="text-orange-400 hover:text-orange-300 font-medium transition-colors"
                >
                  Transport
                </Link>
              </li>
              <li>
                <Link
                  to="/category/utilities"
                  onClick={scrollToTop}
                  className="text-orange-400 hover:text-orange-300 font-medium transition-colors"
                >
                  Utilities
                </Link>
              </li>
              <li>
                <Link
                  to="/category/lifestyle"
                  onClick={scrollToTop}
                  className="text-orange-400 hover:text-orange-300 font-medium transition-colors"
                >
                  Lifestyle
                </Link>
              </li>
            </ul>
          </div>

          {/* Pages */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Pages</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  onClick={scrollToTop}
                  className="text-gray-400 hover:text-gray-300 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  onClick={scrollToTop}
                  className="text-gray-400 hover:text-gray-300 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  to="/sitemap"
                  onClick={scrollToTop}
                  className="text-gray-400 hover:text-gray-300 transition-colors"
                >
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/privacy"
                  onClick={scrollToTop}
                  className="text-gray-400 hover:text-gray-300 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  onClick={scrollToTop}
                  className="text-gray-400 hover:text-gray-300 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/disclaimer"
                  onClick={scrollToTop}
                  className="text-gray-400 hover:text-gray-300 transition-colors"
                >
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          {/* Empty column for spacing */}
          <div></div>
        </div>

        {/* Bottom Section - Only "Made with Love" */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex justify-center items-center">
            <div className="flex items-center text-lg text-gray-400">
              <span>Made with</span>
              <Heart className="h-5 w-5 mx-2 text-red-500 fill-current" />
              <span>for Bangalore</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;