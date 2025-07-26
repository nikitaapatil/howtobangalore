import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Clock, ArrowRight, Filter } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { searchPosts, categories } from '../data/comprehensive_mock';

const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const categoryFilter = searchParams.get('category') || 'all';
  
  const [searchQuery, setSearchQuery] = useState(query);
  const [results, setResults] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    const searchResults = searchPosts(query);
    setResults(searchResults);
    
    // Apply category filter
    if (categoryFilter === 'all') {
      setFilteredResults(searchResults);
    } else {
      const category = categories.find(cat => cat.id === categoryFilter);
      if (category) {
        const categoryPostIds = category.subcategories.flatMap(sub => sub.posts.map(post => post.id));
        setFilteredResults(searchResults.filter(post => categoryPostIds.includes(post.id)));
      }
    }
  }, [query, categoryFilter]);

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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              {query ? `Search Results for "${query}"` : 'Search Articles'}
            </h1>
            
            {/* Search Form */}
            <form onSubmit={handleSearch} className="mb-6">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Input
                    type="text"
                    placeholder="Search for articles, topics, or keywords..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pr-12 text-lg py-3"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-600"
                  >
                    <Search className="h-5 w-5" />
                  </button>
                </div>
                <Button type="submit" size="lg" className="px-8">
                  Search
                </Button>
              </div>
            </form>

            {/* Filters */}
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <Filter className="h-4 w-4 mr-2 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Filter by:</span>
              </div>
              <Select value={categoryFilter} onValueChange={handleCategoryFilter}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
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
          {query && (
            <div className="mb-8">
              <p className="text-gray-600">
                Found <span className="font-semibold">{filteredResults.length}</span> {filteredResults.length === 1 ? 'result' : 'results'} 
                {categoryFilter !== 'all' && (
                  <span> in <span className="font-semibold">
                    {categories.find(cat => cat.id === categoryFilter)?.name}
                  </span></span>
                )}
              </p>
            </div>
          )}

          {filteredResults.length > 0 ? (
            <div className="space-y-6">
              {filteredResults.map((post) => (
                <Card key={post.id} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      {post.featured && (
                        <Badge variant="outline" className="text-orange-600 border-orange-200">
                          Featured
                        </Badge>
                      )}
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    <CardTitle className="text-2xl leading-tight hover:text-orange-600 transition-colors">
                      <Link to={`/post/${post.id}`}>
                        {highlightText(post.title, query)}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 mb-4 text-base">
                      {highlightText(post.excerpt, query)}
                    </CardDescription>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{post.publishDate}</span>
                      <Link
                        to={`/post/${post.id}`}
                        className="text-orange-600 hover:text-orange-700 font-medium flex items-center group"
                      >
                        Read Full Article
                        <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              {query ? (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No results found for "{query}"
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search terms or browse our categories below.
                  </p>
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Start Your Search
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Enter keywords to find relevant articles and guides.
                  </p>
                </div>
              )}
              
              {/* Popular Categories */}
              <div className="max-w-2xl mx-auto">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  Popular Categories
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {categories.slice(0, 4).map((category) => (
                    <Link
                      key={category.id}
                      to={`/category/${category.id}`}
                      className="p-4 bg-white rounded-lg border hover:border-orange-200 hover:shadow-md transition-all"
                    >
                      <h5 className="font-medium text-gray-900 mb-1">{category.name}</h5>
                      <p className="text-sm text-gray-600">
                        {category.subcategories.reduce((acc, sub) => acc + sub.posts.length, 0)} articles
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Search Tips */}
      {query && results.length === 0 && (
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Search Tips</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Try Different Keywords</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Use simpler terms like "rent" instead of "rental agreement"</li>
                  <li>• Try synonyms like "transport" instead of "commute"</li>
                  <li>• Use location names like "Koramangala" or "Whitefield"</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Popular Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {['housing', 'rent', 'metro', 'traffic', 'PG', 'broadband', 'water', 'electricity'].map((term) => (
                    <Button
                      key={term}
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSearchQuery(term);
                        setSearchParams({ q: term, category: categoryFilter });
                      }}
                    >
                      {term}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default SearchResults;