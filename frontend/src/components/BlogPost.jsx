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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1 max-w-4xl">
            {/* Back Navigation */}
            <div className="mb-8">
              <Button 
                variant="ghost" 
                onClick={() => window.history.back()}
                className="text-gray-600 hover:text-orange-600"
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
            <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
              <div 
                className="prose prose-lg max-w-none 
                           prose-headings:text-gray-900 
                           prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4 prose-p:max-w-none
                           prose-li:text-gray-700 prose-li:mb-2
                           prose-strong:text-gray-900 prose-strong:font-semibold
                           prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:font-bold prose-h2:text-gray-900
                           prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3 prose-h3:font-semibold prose-h3:text-gray-900
                           prose-h4:text-lg prose-h4:mt-4 prose-h4:mb-2 prose-h4:font-semibold prose-h4:text-gray-900
                           prose-ul:mb-6 prose-ol:mb-6 prose-ul:space-y-2 prose-ol:space-y-2
                           prose-ul:list-disc prose-ol:list-decimal prose-ul:pl-6 prose-ol:pl-6
                           prose-blockquote:border-l-4 prose-blockquote:border-orange-500 prose-blockquote:bg-orange-50 prose-blockquote:p-4 prose-blockquote:my-6
                           prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
                           prose-table:w-full prose-table:border-collapse prose-th:border prose-th:p-2 prose-td:border prose-td:p-2"
                dangerouslySetInnerHTML={{ __html: displayPost.content }} 
              />
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
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost) => (
              <Card key={relatedPost.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                {relatedPost.featuredImage && (
                  <div className="w-full h-48 bg-gray-200 overflow-hidden rounded-t-lg">
                    <img 
                      src={relatedPost.featuredImage} 
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
                      {relatedPost.readTime}
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight hover:text-orange-600 transition-colors">
                    <Link to={`/post/${relatedPost.id}`}>
                      {relatedPost.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 mb-4">
                    {relatedPost.excerpt}
                  </CardDescription>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{relatedPost.publishDate}</span>
                    <Link
                      to={`/post/${relatedPost.id}`}
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