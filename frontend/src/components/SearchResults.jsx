import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Clock, ArrowRight, Filter } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const categoryFilter = searchParams.get('category') || 'all';
  
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState(query);

  const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

  // Helper function to decode HTML entities
  const decodeHtmlEntities = (text) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    performSearch();
  }, [query, categoryFilter, articles]);

  const fetchArticles = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/articles`);
      
      if (response.ok) {
        const data = await response.json();
        setArticles(data);
      } else {
        console.error('Failed to fetch articles');
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const performSearch = () => {
    if (!query.trim()) {
      setSearchResults(articles);
      return;
    }
    
    const lowerQuery = query.toLowerCase();
    let filtered = articles.filter(post => 
      post.title.toLowerCase().includes(lowerQuery) ||
      post.excerpt.toLowerCase().includes(lowerQuery) ||
      post.content.toLowerCase().includes(lowerQuery)
    );

    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(post => post.category === categoryFilter);
    }

    setSearchResults(filtered);
  };

  // Get unique categories from articles
  const categories = [...new Set(articles.map(article => article.category))].filter(Boolean);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchParams({ q: searchQuery.trim(), category: categoryFilter });
    }
  };

  const handleCategoryFilter = (value) => {
    setSearchParams({ q: query, category: value });
  };

  const highlightText = (text, searchTerm) => {
    if (!searchTerm.trim()) return text;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? 
        <mark key={index} className="bg-yellow-200 px-1 rounded">{part}</mark> : 
        part
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              {query ? `Search Results for "${query}"` : 'Search Articles'}
            </h1>
            
            <form onSubmit={handleSearch} className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button type="submit" className="bg-orange-600 hover:bg-orange-700">
                Search
              </Button>
            </form>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Filter by category:</span>
              </div>
              <Select value={categoryFilter} onValueChange={handleCategoryFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Search Results */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <p className="text-gray-600">
              {searchResults.length} {searchResults.length === 1 ? 'article' : 'articles'} found
              {query && (
                <span> for "{query}"</span>
              )}
              {categoryFilter !== 'all' && (
                <span> in {categoryFilter} category</span>
              )}
            </p>
          </div>

          {searchResults.length === 0 ? (
            <div className="text-center py-12">
              <Search className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No articles found</h3>
              <p className="mt-1 text-gray-500">
                {query ? 
                  `No articles match your search for "${query}". Try different keywords or remove filters.` :
                  'Try searching for articles about Bangalore.'
                }
              </p>
            </div>
          ) : (
            <div className="grid gap-8">
              {searchResults.map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-all duration-300">
                  <div className="flex">
                    {post.featured_image && (
                      <div className="w-48 h-32 bg-gray-200 overflow-hidden rounded-l-lg flex-shrink-0">
                        <img 
                          src={post.featured_image} 
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-orange-600 border-orange-200 capitalize">
                              {post.category}
                            </Badge>
                            {post.featured && (
                              <Badge variant="outline" className="text-yellow-600 border-yellow-200">
                                Featured
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="h-4 w-4 mr-1" />
                            {post.read_time}
                          </div>
                        </div>
                        <CardTitle className="text-xl leading-tight hover:text-orange-600 transition-colors">
                          <Link to={`/${post.slug}`} target="_blank" rel="noopener noreferrer">
                            {highlightText(decodeHtmlEntities(post.title), query)}
                          </Link>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-gray-600 mb-4">
                          {highlightText(post.excerpt, query)}
                        </CardDescription>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span>{post.publish_date}</span>
                            <span>{post.word_count} words</span>
                          </div>
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
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SearchResults;