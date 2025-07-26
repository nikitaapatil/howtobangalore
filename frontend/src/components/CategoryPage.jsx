import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, Clock, Home as HomeIcon, Car, Zap, Users, MapPin } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { categories } from '../data/comprehensive_mock';

const CategoryPage = () => {
  const { categoryId, subcategoryId } = useParams();
  
  const category = categories.find(cat => cat.id === categoryId);
  
  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Category Not Found</h1>
          <Link to="/" className="text-orange-600 hover:text-orange-700">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  const subcategory = subcategoryId ? 
    category.subcategories.find(sub => sub.id === subcategoryId) : null;

  const iconMap = {
    'Home': HomeIcon,
    'Car': Car,
    'Zap': Zap,
    'Users': Users,
    'MapPin': MapPin
  };
  const IconComponent = iconMap[category.icon];

  const postsToShow = subcategory ? 
    subcategory.posts : 
    category.subcategories.flatMap(sub => sub.posts);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
            <Link to="/" className="hover:text-orange-600">Home</Link>
            <span>/</span>
            <Link to={`/category/${categoryId}`} className="hover:text-orange-600">
              {category.name}
            </Link>
            {subcategory && (
              <>
                <span>/</span>
                <span className="text-gray-900">{subcategory.name}</span>
              </>
            )}
          </nav>

          <div className="flex items-center mb-6">
            <div className="bg-orange-100 p-4 rounded-lg mr-6">
              <IconComponent className="h-8 w-8 text-orange-600" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {subcategory ? subcategory.name : category.name}
              </h1>
              <p className="text-lg text-gray-600 max-w-3xl">
                {subcategory ? 
                  `Comprehensive guides for ${subcategory.name.toLowerCase()} in Bangalore` : 
                  category.description
                }
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-sm text-gray-600">
            <span className="flex items-center">
              <Users className="h-4 w-4 mr-1" />
              {postsToShow.length} Articles
            </span>
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {Math.round(postsToShow.reduce((acc, post) => acc + parseInt(post.readTime), 0) / postsToShow.length)} min avg read
            </span>
          </div>
        </div>
      </section>

      {/* Subcategories Navigation (if viewing main category) */}
      {!subcategory && (
        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Topic</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.subcategories.map((sub) => (
                <Card key={sub.id} className="hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      <Link 
                        to={`/category/${categoryId}/${sub.id}`}
                        className="hover:text-orange-600 transition-colors"
                      >
                        {sub.name}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      {sub.posts.length} comprehensive {sub.posts.length === 1 ? 'article' : 'articles'} covering everything you need to know.
                    </p>
                    <div className="space-y-2">
                      {sub.posts.slice(0, 3).map((post) => (
                        <Link
                          key={post.id}
                          to={`/post/${post.id}`}
                          className="block text-sm text-gray-600 hover:text-orange-600 transition-colors"
                        >
                          • {post.title.length > 60 ? post.title.substring(0, 60) + '...' : post.title}
                        </Link>
                      ))}
                      {sub.posts.length > 3 && (
                        <p className="text-sm text-gray-500">
                          ...and {sub.posts.length - 3} more
                        </p>
                      )}
                    </div>
                    <Link
                      to={`/category/${categoryId}/${sub.id}`}
                      className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium mt-4 group"
                    >
                      View All Articles
                      <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Articles Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {subcategory && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">All Articles</h2>
              <p className="text-gray-600">
                Everything you need to know about {subcategory.name.toLowerCase()} in Bangalore.
              </p>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {postsToShow.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
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
                  <CardTitle className="text-xl leading-tight hover:text-orange-600 transition-colors">
                    <Link to={`/post/${post.id}`}>
                      {post.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 mb-4">
                    {post.excerpt}
                  </CardDescription>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{post.publishDate}</span>
                    <Link
                      to={`/post/${post.id}`}
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

          {postsToShow.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Articles Found</h3>
              <p className="text-gray-600 mb-6">
                We're working on adding more content to this section.
              </p>
              <Link
                to="/"
                className="text-orange-600 hover:text-orange-700 font-medium"
              >
                Explore Other Categories →
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Related Categories */}
      {!subcategory && (
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Categories</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.filter(cat => cat.id !== categoryId).slice(0, 4).map((relatedCat) => {
                const RelatedIcon = iconMap[relatedCat.icon];
                return (
                  <Link
                    key={relatedCat.id}
                    to={`/category/${relatedCat.id}`}
                    className="group p-6 bg-gray-50 rounded-lg hover:bg-orange-50 transition-colors"
                  >
                    <RelatedIcon className="h-8 w-8 text-orange-600 mb-4" />
                    <h3 className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                      {relatedCat.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      {relatedCat.subcategories.reduce((acc, sub) => acc + sub.posts.length, 0)} articles
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default CategoryPage;