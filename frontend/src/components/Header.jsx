import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, ChevronDown, Home, Car, Zap, Users, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { categories, searchPosts } from '../data/updated_enhanced_mock';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const iconMap = {
    'Home': Home,
    'Car': Car,
    'Zap': Zap,
    'Users': Users,
    'MapPin': MapPin
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const toggleDropdown = (categoryId) => {
    setActiveDropdown(activeDropdown === categoryId ? null : categoryId);
  };

  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 flex-shrink-0">
            <div className="bg-orange-500 text-white p-2 rounded-lg">
              <MapPin className="h-5 w-5" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-gray-900 leading-tight">How to Bangalore</h1>
              <p className="text-xs text-gray-600 leading-tight">The Ultimate City Guide</p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-lg font-bold text-gray-900">How to Bangalore</h1>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 flex-1 justify-center">
            <Link to="/" className="text-gray-700 hover:text-orange-600 font-medium transition-colors whitespace-nowrap">
              Home
            </Link>
            
            {categories.map((category) => {
              const IconComponent = iconMap[category.icon];
              return (
                <div key={category.id} className="relative group">
                  <button
                    className="flex items-center space-x-1 text-gray-700 hover:text-orange-600 font-medium transition-colors py-2 whitespace-nowrap"
                    onMouseEnter={() => setActiveDropdown(category.id)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <IconComponent className="h-4 w-4" />
                    <span className="text-sm">{category.name}</span>
                    <ChevronDown className="h-3 w-3" />
                  </button>
                  
                  {activeDropdown === category.id && (
                    <div 
                      className="absolute top-full left-0 mt-1 w-80 bg-white rounded-lg shadow-lg border py-2 z-50"
                      onMouseEnter={() => setActiveDropdown(category.id)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <div className="px-4 py-2 border-b">
                        <h3 className="font-semibold text-gray-900">{category.name}</h3>
                        <p className="text-sm text-gray-600">{category.description}</p>
                      </div>
                      {category.subcategories.map((subcategory) => (
                        <Link
                          key={subcategory.id}
                          to={`/category/${category.id}/${subcategory.id}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                        >
                          {subcategory.name}
                          <span className="text-xs text-gray-500 ml-2">
                            ({subcategory.posts.length} articles)
                          </span>
                        </Link>
                      ))}
                      <Link
                        to={`/category/${category.id}`}
                        className="block px-4 py-2 text-sm font-medium text-orange-600 border-t mt-1 pt-2 hover:bg-orange-50 transition-colors"
                      >
                        View All {category.name} →
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}
            
            <Link to="/about" className="text-gray-700 hover:text-orange-600 font-medium transition-colors whitespace-nowrap">
              About
            </Link>
          </nav>

          {/* Search and Mobile Menu */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            {/* Search Form */}
            <form onSubmit={handleSearch} className="hidden md:flex items-center">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48 pr-10"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-600"
                >
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </form>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t bg-white">
            <div className="px-4 py-4 space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="flex items-center">
                <div className="relative flex-1">
                  <Input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    <Search className="h-4 w-4" />
                  </button>
                </div>
              </form>

              {/* Mobile Navigation */}
              <nav className="space-y-2">
                <Link
                  to="/"
                  className="block py-2 text-gray-700 hover:text-orange-600 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                
                {categories.map((category) => (
                  <div key={category.id}>
                    <button
                      onClick={() => toggleDropdown(category.id)}
                      className="flex items-center justify-between w-full py-2 text-gray-700 hover:text-orange-600 font-medium"
                    >
                      <span>{category.name}</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${activeDropdown === category.id ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {activeDropdown === category.id && (
                      <div className="pl-4 space-y-1">
                        {category.subcategories.map((subcategory) => (
                          <Link
                            key={subcategory.id}
                            to={`/category/${category.id}/${subcategory.id}`}
                            className="block py-1 text-sm text-gray-600 hover:text-orange-600"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subcategory.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                <Link
                  to="/about"
                  className="block py-2 text-gray-700 hover:text-orange-600 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;