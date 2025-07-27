import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Clock, Home as HomeIcon, Car, Zap, Users, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

const CategoryPage = () => {
  const { categoryId, subcategoryId } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
      } else {
        setError('Failed to fetch articles');
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  // Filter articles by category and subcategory
  const filteredArticles = articles.filter(article => {
    if (subcategoryId) {
      return article.category === categoryId && article.subcategory === subcategoryId;
    }
    return article.category === categoryId;
  });

  // Get unique subcategories for this category
  const subcategories = [...new Set(
    articles
      .filter(article => article.category === categoryId)
      .map(article => article.subcategory)
  )].filter(Boolean);

  const categoryInfo = {
    housing: {
      name: 'Housing & Home Setup',
      description: 'Everything about finding, setting up, and managing your home in Bangalore',
      icon: HomeIcon
    },
    transport: {
      name: 'Transport & Commute',
      description: "Master Bangalore's complex transportation system and optimize your daily commute",
      icon: Car
    },
    utilities: {
      name: 'Utilities & Home Services',
      description: 'Navigate BESCOM, BWSSB, and other essential utilities like a pro',
      icon: Zap
    },
    government: {
      name: 'Government & Documentation',
      description: 'Navigate government processes and essential documentation in Bangalore',
      icon: Users
    },
    lifestyle: {
      name: 'Lifestyle & Integration',
      description: 'Integrate into Bangalore culture and lifestyle',
      icon: MapPin
    }
  };

  const currentCategory = categoryInfo[categoryId];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Unable to load articles</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => {
              setError(null);
              setLoading(true);
              fetchArticles();
            }}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!currentCategory) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <p className="text-gray-600 mb-4">The category "{categoryId}" doesn't exist.</p>
          <Link to="/" className="text-orange-600 hover:text-orange-700 font-medium">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const IconComponent = currentCategory.icon;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Category Header */}
      <section className="bg-gradient-to-br from-orange-50 to-amber-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Link to="/" className="hover:text-orange-600">Home</Link>
              <span>/</span>
              <Link to={`/category/${categoryId}`} className="hover:text-orange-600 capitalize">
                {categoryId}
              </Link>
              {subcategoryId && (
                <>
                  <span>/</span>
                  <span className="text-gray-900 capitalize">{subcategoryId.replace('-', ' ')}</span>
                </>
              )}
            </div>
          </nav>

          <div className="flex items-center mb-6">
            <div className="bg-orange-500 p-4 rounded-lg mr-6">
              <IconComponent className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {subcategoryId ? 
                  subcategoryId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase()) :
                  currentCategory.name
                }
              </h1>
              <p className="text-lg text-gray-700 max-w-3xl">
                {currentCategory.description}
              </p>
              <div className="mt-4 flex items-center text-sm text-gray-600">
                <span>{filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subcategories (only show if not viewing a specific subcategory) */}
      {!subcategoryId && subcategories.length > 0 && (
        <section className="py-8 bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Browse by Topic</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {subcategories.map(subcategory => {
                const subcategoryArticles = articles.filter(
                  article => article.category === categoryId && article.subcategory === subcategory
                );
                
                return (
                  <Link
                    key={subcategory}
                    to={`/category/${categoryId}/${subcategory}`}
                    className="p-4 bg-gray-50 rounded-lg hover:bg-orange-50 hover:border-orange-200 border transition-all"
                  >
                    <h3 className="font-medium text-gray-900 mb-1 capitalize">
                      {subcategory.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {subcategoryArticles.length} {subcategoryArticles.length === 1 ? 'article' : 'articles'}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Articles */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <IconComponent className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No articles yet</h3>
              <p className="text-gray-600 mb-6">
                {subcategoryId 
                  ? `No articles have been published for ${subcategoryId.replace('-', ' ')} yet.`
                  : `No articles have been published for ${currentCategory.name} yet.`
                }
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  {post.featured_image && (
                    <div className="w-full h-48 bg-gray-200 overflow-hidden rounded-t-lg">
                      <img 
                        src={post.featured_image} 
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {post.featured && (
                          <Badge variant="outline" className="text-orange-600 border-orange-200">
                            Featured
                          </Badge>
                        )}
                        <Badge variant="outline" className="text-gray-600 border-gray-200 capitalize">
                          {post.subcategory}
                        </Badge>
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.read_time}
                      </div>
                    </div>
                    <CardTitle className="text-xl leading-tight hover:text-orange-600 transition-colors">
                      <Link to={`/${post.slug}`}>
                        {post.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 mb-4">
                      {post.excerpt}
                    </CardDescription>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{post.publish_date}</span>
                        <span>{post.word_count} words</span>
                      </div>
                      <Link
                        to={`/${post.slug}`}
                        className="text-orange-600 hover:text-orange-700 font-medium flex items-center group"
                      >
                        Read More
                        <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CategoryPage;