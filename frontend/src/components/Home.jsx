import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Star, TrendingUp, Users, MapPin, Home as HomeIcon, Car, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

const Home = () => {
  const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

  // Helper function to decode HTML entities
  const decodeHtmlEntities = (text) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
  };
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Helper function to decode HTML entities
  const decodeHtmlEntities = (text) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
  };

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

  // Get featured posts
  const featuredPosts = articles.filter(post => post.featured);
  const allPosts = articles;

  // Create categories from articles
  const categories = [
    {
      id: 'housing',
      name: 'Housing & Home Setup',
      description: 'Everything about finding, setting up, and managing your home in Bangalore',
      icon: 'Home',
      posts: articles.filter(a => a.category === 'housing')
    },
    {
      id: 'transport',
      name: 'Transport & Commute',
      description: "Master Bangalore's complex transportation system and optimize your daily commute",
      icon: 'Car',
      posts: articles.filter(a => a.category === 'transport')
    },
    {
      id: 'utilities',
      name: 'Utilities & Home Services',
      description: 'Navigate BESCOM, BWSSB, and other essential utilities like a pro',
      icon: 'Zap',
      posts: articles.filter(a => a.category === 'utilities')
    },
    {
      id: 'government',
      name: 'Government & Documentation',
      description: 'Navigate government processes and essential documentation in Bangalore',
      icon: 'Users',
      posts: articles.filter(a => a.category === 'government')
    },
    {
      id: 'lifestyle',
      name: 'Lifestyle & Integration',
      description: 'Integrate into Bangalore culture and lifestyle',
      icon: 'MapPin',
      posts: articles.filter(a => a.category === 'lifestyle')
    }
  ].filter(category => category.posts.length > 0); // Only show categories with articles

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-amber-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              How to <span className="text-orange-600">Bangalore</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-4 max-w-3xl mx-auto">
              Your Pragmatic Guide to Thriving in India's Silicon Valley
            </p>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Navigate the Bangalore Paradox with insider knowledge, practical solutions, and honest advice from someone who's been there.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3">
                <Link to="/category/housing" className="flex items-center">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
            
            <div className="mt-12 flex flex-wrap justify-center gap-8 text-gray-600">
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-orange-600" />
                <span>{allPosts.length}+ Comprehensive Guides</span>
              </div>
              <div className="flex items-center">
                <Star className="h-5 w-5 mr-2 text-orange-600" />
                <span>2000+ Words Each</span>
              </div>
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-orange-600" />
                <span>SEO Optimized</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredPosts.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Articles</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Start with these essential guides that address the most common challenges newcomers face in Bangalore.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredPosts.slice(0, 6).map((post) => (
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
                      <Badge variant="outline" className="text-orange-600 border-orange-200">
                        Featured
                      </Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.read_time}
                      </div>
                    </div>
                    <CardTitle className="text-xl leading-tight hover:text-orange-600 transition-colors">
                      <Link to={`/${post.slug}`} target="_blank" rel="noopener noreferrer">
                        {post.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 mb-4">
                      {post.excerpt}
                    </CardDescription>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{post.publish_date}</span>
                      <Link
                        to={`/${post.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
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
          </div>
        </section>
      )}

      {/* All Articles if no featured articles */}
      {featuredPosts.length === 0 && allPosts.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Latest Articles</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Discover comprehensive guides to help you navigate life in Bangalore.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allPosts.slice(0, 6).map((post) => (
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
                      <Badge variant="outline" className="text-orange-600 border-orange-200 capitalize">
                        {post.category}
                      </Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.read_time}
                      </div>
                    </div>
                    <CardTitle className="text-xl leading-tight hover:text-orange-600 transition-colors">
                      <Link to={`/${post.slug}`} target="_blank" rel="noopener noreferrer">
                        {post.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 mb-4">
                      {post.excerpt}
                    </CardDescription>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{post.publish_date}</span>
                      <Link
                        to={`/${post.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
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
          </div>
        </section>
      )}

      {/* Categories Overview */}
      {categories.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore by Category</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Find exactly what you need with our organized approach to Bangalore living.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((category) => {
                const iconMap = {
                  'Home': HomeIcon,
                  'Car': Car,
                  'Zap': Zap,
                  'Users': Users,
                  'MapPin': MapPin
                };
                const IconComponent = iconMap[category.icon];
                
                return (
                  <Card key={category.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2 hover:border-orange-200">
                    <CardHeader>
                      <div className="flex items-center mb-4">
                        <div className="bg-orange-100 p-3 rounded-lg mr-4">
                          <IconComponent className="h-6 w-6 text-orange-600" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{category.name}</CardTitle>
                          <p className="text-sm text-gray-500">{category.posts.length} articles</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600 mb-4">
                        {category.description}
                      </CardDescription>
                      <div className="space-y-2 mb-4">
                        {category.posts.slice(0, 3).map((post) => (
                          <Link
                            key={post.id}
                            to={`/${post.slug}`}
                            className="block text-sm text-gray-600 hover:text-orange-600 transition-colors truncate"
                          >
                            • {post.title}
                          </Link>
                        ))}
                        {category.posts.length > 3 && (
                          <p className="text-sm text-gray-500">
                            ...and {category.posts.length - 3} more
                          </p>
                        )}
                      </div>
                      <Link
                        to={`/category/${category.id}`}
                        className="text-orange-600 hover:text-orange-700 font-medium flex items-center group"
                      >
                        Explore Category
                        <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {allPosts.length === 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Coming Soon</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              We're working on bringing you comprehensive guides about living in Bangalore. Check back soon!
            </p>
          </div>
        </section>
      )}

      {/* Statistics Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Trust Our Guides?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our content is comprehensive, well-researched, and based on real experiences of living in Bangalore.
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">{allPosts.length}+</div>
              <div className="text-lg font-medium text-gray-900 mb-2">Comprehensive Articles</div>
              <p className="text-gray-600">Detailed guides covering every aspect of Bangalore life</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">2000+</div>
              <div className="text-lg font-medium text-gray-900 mb-2">Words Per Article</div>
              <p className="text-gray-600">In-depth content with practical tips and insights</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">{categories.length}</div>
              <div className="text-lg font-medium text-gray-900 mb-2">Main Categories</div>
              <p className="text-gray-600">Organized approach to Bangalore living topics</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">100%</div>
              <div className="text-lg font-medium text-gray-900 mb-2">Practical Focus</div>
              <p className="text-gray-600">Real-world advice you can implement immediately</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-amber-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Master Bangalore?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Join thousands of IT professionals who've successfully navigated the Silicon Valley of India with our practical guides.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="px-8 py-3">
              <Link to="/category/housing" className="flex items-center">
                Start with Housing
                <HomeIcon className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-3 border-white text-white hover:bg-white hover:text-orange-600">
              <Link to="/about">About This Guide</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;