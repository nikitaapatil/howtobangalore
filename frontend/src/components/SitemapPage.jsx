import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Map, Home, FileText, Users, MessageSquare, Shield, ExternalLink } from 'lucide-react';

const SitemapPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/articles`);
      if (response.ok) {
        const data = await response.json();
        setArticles(data);
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  // Group articles by category
  const articlesByCategory = articles.reduce((acc, article) => {
    if (!acc[article.category]) {
      acc[article.category] = [];
    }
    acc[article.category].push(article);
    return acc;
  }, {});

  const categoryInfo = {
    housing: {
      name: 'Housing & Home Setup',
      icon: Home,
      description: 'Everything about finding and setting up your home in Bangalore'
    },
    transport: {
      name: 'Transport & Commute',
      icon: ExternalLink,
      description: 'Navigate Bangalore\'s transportation system effectively'
    },
    utilities: {
      name: 'Utilities & Home Services',
      icon: Shield,
      description: 'Essential utilities and services for your home'
    },
    lifestyle: {
      name: 'Lifestyle & Integration',
      icon: Users,
      description: 'Integrate into Bangalore culture and lifestyle'
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-amber-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-orange-500 text-white p-3 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
            <Map className="h-8 w-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Sitemap
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Navigate through all the content and pages available on How to Bangalore
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Main Navigation */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Main Navigation</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center mb-4">
                  <Home className="h-6 w-6 text-orange-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">Main Pages</h3>
                </div>
                <ul className="space-y-2">
                  <li>
                    <Link to="/" className="text-orange-600 hover:text-orange-700 transition-colors">
                      Homepage
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" className="text-orange-600 hover:text-orange-700 transition-colors">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-orange-600 hover:text-orange-700 transition-colors">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link to="/search" className="text-orange-600 hover:text-orange-700 transition-colors">
                      Search
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center mb-4">
                  <FileText className="h-6 w-6 text-orange-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">Legal Pages</h3>
                </div>
                <ul className="space-y-2">
                  <li>
                    <Link to="/privacy" className="text-orange-600 hover:text-orange-700 transition-colors">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link to="/terms" className="text-orange-600 hover:text-orange-700 transition-colors">
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link to="/disclaimer" className="text-orange-600 hover:text-orange-700 transition-colors">
                      Disclaimer
                    </Link>
                  </li>
                  <li>
                    <Link to="/sitemap" className="text-orange-600 hover:text-orange-700 transition-colors">
                      Sitemap
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-center mb-4">
                  <Users className="h-6 w-6 text-orange-600 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900">Categories</h3>
                </div>
                <ul className="space-y-2">
                  {Object.entries(categoryInfo).map(([key, category]) => (
                    <li key={key}>
                      <Link 
                        to={`/category/${key}`} 
                        className="text-orange-600 hover:text-orange-700 transition-colors"
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Articles by Category */}
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-8">All Articles</h2>
            
            {loading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
              </div>
            ) : (
              <div className="space-y-12">
                {Object.entries(articlesByCategory).map(([categoryKey, categoryArticles]) => {
                  const categoryData = categoryInfo[categoryKey];
                  if (!categoryData) return null;

                  return (
                    <div key={categoryKey} className="bg-white rounded-lg shadow-sm border p-8">
                      <div className="flex items-center mb-6">
                        <div className="bg-orange-100 p-3 rounded-lg mr-4">
                          <categoryData.icon className="h-6 w-6 text-orange-600" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900">
                            <Link 
                              to={`/category/${categoryKey}`}
                              className="hover:text-orange-600 transition-colors"
                            >
                              {categoryData.name}
                            </Link>
                          </h3>
                          <p className="text-gray-600 mt-1">{categoryData.description}</p>
                          <p className="text-sm text-gray-500 mt-2">
                            {categoryArticles.length} articles available
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {categoryArticles.map((article) => (
                          <div key={article.id} className="border border-gray-200 rounded-lg p-4">
                            <h4 className="font-semibold text-gray-900 mb-2">
                              <Link 
                                to={`/${article.slug}`}
                                className="hover:text-orange-600 transition-colors"
                              >
                                {article.title}
                              </Link>
                            </h4>
                            <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                              {article.excerpt}
                            </p>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span>{article.read_time}</span>
                              <span>{article.publish_date}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Statistics */}
          <div className="mt-16 bg-orange-50 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Site Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-orange-600">{articles.length}</div>
                <div className="text-gray-600">Total Articles</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600">{Object.keys(articlesByCategory).length}</div>
                <div className="text-gray-600">Categories</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600">{articles.filter(a => a.featured).length}</div>
                <div className="text-gray-600">Featured Articles</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-600">
                  {articles.reduce((total, article) => total + article.word_count, 0).toLocaleString()}
                </div>
                <div className="text-gray-600">Total Words</div>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-12 text-center text-gray-600">
            <p>
              This sitemap is automatically updated as new content is added to How to Bangalore. 
              If you can't find what you're looking for, try using our search function or contact us directly.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SitemapPage;