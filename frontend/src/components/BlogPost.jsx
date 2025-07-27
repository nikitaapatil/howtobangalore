import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Share2, Bookmark, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import TableOfContents from './TableOfContents';

const BlogPost = () => {
  const { postId, slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

  // Get the identifier (either slug from URL path or postId from params)
  const identifier = slug || postId;

  useEffect(() => {
    fetchPost();
  }, [identifier]);

  const fetchPost = async () => {
    if (!identifier) {
      setError('No article identifier provided');
      setLoading(false);
      return;
    }

    try {
      // First try to fetch by slug (for new URL structure)
      let response = await fetch(`${API_BASE_URL}/api/articles/${identifier}`);
      
      // If slug fails and identifier looks like a number, try the old ID-based approach
      if (!response.ok && !isNaN(identifier)) {
        // For backward compatibility, fetch all articles and find by ID
        response = await fetch(`${API_BASE_URL}/api/articles`);
        if (response.ok) {
          const articles = await response.json();
          const foundPost = articles.find(p => p.id === identifier || p.id === parseInt(identifier));
          if (foundPost) {
            setPost(foundPost);
            // Set related posts from same category
            const related = articles
              .filter(p => p.id !== foundPost.id && p.category === foundPost.category)
              .slice(0, 3);
            setRelatedPosts(related);
            setLoading(false);
            return;
          }
        }
        setError('Article not found');
        setLoading(false);
        return;
      }

      if (response.ok) {
        const data = await response.json();
        setPost(data);
        
        // Fetch related posts from same category
        const allArticlesResponse = await fetch(`${API_BASE_URL}/api/articles`);
        if (allArticlesResponse.ok) {
          const allArticles = await allArticlesResponse.json();
          const related = allArticles
            .filter(p => p.id !== data.id && p.category === data.category)
            .slice(0, 3);
          setRelatedPosts(related);
        }
      } else if (response.status === 404) {
        setError('Article not found');
      } else {
        setError('Failed to load article');
      }
    } catch (error) {
      console.error('Error fetching article:', error);
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <Link to="/" className="text-orange-600 hover:text-orange-700">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  // Update article meta field names to match API response
  const displayPost = post ? {
    ...post,
    featuredImage: post.featured_image,
    readTime: post.read_time,
    publishDate: post.publish_date,
    wordCount: post.word_count
  } : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Featured Image */}
      {displayPost.featuredImage && (
        <div className="w-full h-96 bg-gray-200 overflow-hidden relative">
          <img 
            src={displayPost.featuredImage} 
            alt={displayPost.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Article Content with Right Sidebar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1 max-w-4xl">
            {/* Back Navigation */}
            <div className="mb-6">
              <Button 
                variant="ghost" 
                onClick={() => window.history.back()}
                className="text-gray-600 hover:text-orange-600 hover:bg-orange-50 px-0"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Articles
              </Button>
            </div>

            {/* Article Meta */}
            <div className="mb-8">
              {displayPost.featured && (
                <Badge variant="outline" className="text-orange-600 border-orange-200 mb-4">
                  Featured Article
                </Badge>
              )}
              
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
                {displayPost.title}
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                {displayPost.excerpt}
              </p>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-8">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{displayPost.publishDate}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{displayPost.readTime}</span>
                </div>
                {displayPost.wordCount && (
                  <div className="flex items-center">
                    <span>{displayPost.wordCount.toLocaleString()} words</span>
                  </div>
                )}
                <div className="flex items-center space-x-3">
                  <Button variant="outline" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  <Button variant="outline" size="sm">
                    <Bookmark className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
              </div>
            </div>

            {/* Article Content */}
            <div className="bg-white rounded-lg shadow-sm mb-12">
              <div className="max-w-4xl mx-auto px-8 py-12">
                {/* Article Header */}
                <header className="mb-10 pb-8 border-b border-gray-200">
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                    {displayPost.title}
                  </h1>
                  
                  <p className="text-xl text-gray-600 leading-relaxed mb-8 font-medium">
                    {displayPost.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-orange-500" />
                      <span className="font-medium">{displayPost.publishDate}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-orange-500" />
                      <span className="font-medium">{displayPost.readTime}</span>
                    </div>
                    {displayPost.wordCount && (
                      <div className="flex items-center">
                        <span className="font-medium">{displayPost.wordCount.toLocaleString()} words</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-3 ml-auto">
                      <Button variant="outline" size="sm" className="hover:bg-orange-50 hover:border-orange-200">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </Button>
                      <Button variant="outline" size="sm" className="hover:bg-orange-50 hover:border-orange-200">
                        <Bookmark className="h-4 w-4 mr-2" />
                        Save
                      </Button>
                    </div>
                  </div>
                </header>

                {/* Article Content with Enhanced Typography */}
                <article 
                  className="reader-friendly-content prose prose-xl max-w-none
                           prose-headings:text-gray-900 prose-headings:font-bold
                           prose-h1:text-4xl prose-h1:mt-12 prose-h1:mb-6 prose-h1:leading-tight prose-h1:border-b prose-h1:border-gray-200 prose-h1:pb-4
                           prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-5 prose-h2:leading-tight prose-h2:text-orange-700
                           prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:leading-tight prose-h3:text-gray-800
                           prose-h4:text-xl prose-h4:mt-6 prose-h4:mb-3 prose-h4:leading-tight prose-h4:text-gray-700
                           prose-h5:text-lg prose-h5:mt-5 prose-h5:mb-2 prose-h5:font-semibold prose-h5:text-gray-700
                           prose-h6:text-base prose-h6:mt-4 prose-h6:mb-2 prose-h6:font-semibold prose-h6:text-gray-600
                           prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-lg prose-p:max-w-none
                           prose-li:text-gray-700 prose-li:mb-2 prose-li:text-lg prose-li:leading-relaxed
                           prose-strong:text-gray-900 prose-strong:font-semibold
                           prose-em:text-gray-800 prose-em:italic
                           prose-ul:mb-8 prose-ol:mb-8 prose-ul:space-y-3 prose-ol:space-y-3
                           prose-ul:list-disc prose-ol:list-decimal prose-ul:pl-6 prose-ol:pl-6
                           prose-ul:marker:text-orange-500 prose-ol:marker:text-orange-500 prose-ol:marker:font-semibold
                           prose-blockquote:border-l-4 prose-blockquote:border-orange-400 prose-blockquote:bg-orange-50 
                           prose-blockquote:p-6 prose-blockquote:my-8 prose-blockquote:rounded-r-lg prose-blockquote:text-gray-800
                           prose-blockquote:text-lg prose-blockquote:italic prose-blockquote:font-medium
                           prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:text-gray-800
                           prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
                           prose-table:w-full prose-table:border-collapse prose-table:shadow-sm prose-table:rounded-lg prose-table:overflow-hidden
                           prose-th:bg-orange-500 prose-th:text-white prose-th:font-semibold prose-th:p-4 prose-th:text-left
                           prose-td:border prose-td:border-gray-200 prose-td:p-4 prose-td:text-gray-700
                           prose-tr:even:bg-gray-50 prose-tr:hover:bg-gray-100
                           prose-a:text-orange-600 prose-a:font-medium prose-a:no-underline hover:prose-a:text-orange-700 hover:prose-a:underline
                           prose-img:rounded-lg prose-img:shadow-md prose-img:mx-auto prose-img:my-8"
                  dangerouslySetInnerHTML={{ __html: displayPost.content }} 
                />

                {/* Article Footer */}
                <footer className="mt-16 pt-8 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      <p>Published on {displayPost.publishDate}</p>
                      <p className="mt-1">Part of <span className="capitalize font-medium text-gray-700">{displayPost.category}</span> guides</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Button variant="outline" size="sm" className="hover:bg-orange-50 hover:border-orange-200">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share Article
                      </Button>
                      <Button variant="outline" size="sm" className="hover:bg-orange-50 hover:border-orange-200">
                        <Bookmark className="h-4 w-4 mr-2" />
                        Bookmark
                      </Button>
                    </div>
                  </div>
                </footer>
              </div>
            </div>

            {/* Article Footer */}
            <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
              <div className="border-t pt-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Found this helpful?
                    </h3>
                    <p className="text-gray-600">
                      Share it with others who might benefit from this guide.
                    </p>
                  </div>
                  <div className="flex items-center space-x-3 mt-4 md:mt-0">
                    <Button variant="outline">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share Article
                    </Button>
                    <Button>
                      <Bookmark className="h-4 w-4 mr-2" />
                      Save for Later
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar - Table of Contents */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <TableOfContents content={displayPost.content} />
          </div>
        </div>
      </div>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <section className="bg-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  {relatedPost.featured_image && (
                    <div className="w-full h-48 bg-gray-200 overflow-hidden rounded-t-lg">
                      <img 
                        src={relatedPost.featured_image} 
                        alt={relatedPost.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      {relatedPost.featured && (
                        <Badge variant="outline" className="text-orange-600 border-orange-200">
                          Featured
                        </Badge>
                      )}
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-1" />
                        {relatedPost.read_time}
                      </div>
                    </div>
                    <CardTitle className="text-lg leading-tight hover:text-orange-600 transition-colors">
                      <Link to={`/${relatedPost.slug}`} target="_blank" rel="noopener noreferrer">
                        {relatedPost.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 mb-4">
                      {relatedPost.excerpt}
                    </CardDescription>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{relatedPost.publish_date}</span>
                      <Link
                        to={`/${relatedPost.slug}`}
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

      {/* Call to Action */}
      <section className="py-12 bg-gradient-to-r from-orange-600 to-amber-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Need More Bangalore Insights?
          </h2>
          <p className="text-orange-100 mb-6">
            Explore our comprehensive guides covering every aspect of life in India's Silicon Valley.
          </p>
          <Link to="/">
            <Button size="lg" variant="secondary" className="px-8 py-3">
              Explore All Guides
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;