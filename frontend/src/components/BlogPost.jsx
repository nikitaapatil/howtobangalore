import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Share2, Bookmark, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { allPosts, categories } from '../data/comprehensive_mock';

const BlogPost = () => {
  const { postId } = useParams();
  const post = allPosts.find(p => p.id === parseInt(postId));
  
  if (!post) {
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

  // Find related posts from the same category
  const relatedPosts = allPosts
    .filter(p => p.id !== post.id)
    .slice(0, 3);

  // Mock article content - In a real implementation, this would come from a CMS or API
  const articleContent = `
  <div class="prose max-w-none">
    <p class="text-lg text-gray-700 leading-relaxed mb-6">
      Welcome to this comprehensive guide on ${post.title.toLowerCase()}. This article is designed to provide you with practical, actionable advice based on real experiences of living in Bangalore.
    </p>
    
    <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Understanding the Challenge</h2>
    <p class="text-gray-700 leading-relaxed mb-6">
      Bangalore presents unique challenges that require insider knowledge to navigate successfully. Whether you're a newcomer or a long-time resident, understanding the nuances of city life can make a significant difference in your daily experience.
    </p>
    
    <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Practical Solutions</h2>
    <p class="text-gray-700 leading-relaxed mb-4">
      Based on extensive research and real-world experience, here are the key strategies that work:
    </p>
    <ul class="list-disc pl-6 mb-6 text-gray-700 space-y-2">
      <li>Research thoroughly before making any decisions</li>
      <li>Connect with local communities and networks</li>
      <li>Keep realistic expectations about costs and timelines</li>
      <li>Always have backup plans for common issues</li>
      <li>Leverage technology and online resources effectively</li>
    </ul>
    
    <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Common Pitfalls to Avoid</h2>
    <p class="text-gray-700 leading-relaxed mb-4">
      Many newcomers fall into these traps. Here's how to avoid them:
    </p>
    <ol class="list-decimal pl-6 mb-6 text-gray-700 space-y-2">
      <li>Don't underestimate the importance of location in your decisions</li>
      <li>Avoid making financial commitments without proper verification</li>
      <li>Don't ignore the local language and cultural aspects</li>
      <li>Never compromise on safety and security measures</li>
    </ol>
    
    <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Expert Tips</h2>
    <div class="bg-orange-50 border-l-4 border-orange-500 p-6 mb-6">
      <p class="text-gray-700 leading-relaxed">
        <strong>Pro Tip:</strong> The key to succeeding in Bangalore is to balance ambition with pragmatism. Set realistic expectations while staying focused on your long-term goals.
      </p>
    </div>
    
    <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Next Steps</h2>
    <p class="text-gray-700 leading-relaxed mb-6">
      Now that you have this foundational knowledge, you can move forward with confidence. Remember that every situation is unique, so adapt these guidelines to your specific circumstances.
    </p>
    
    <p class="text-gray-700 leading-relaxed">
      This comprehensive approach will help you navigate the complexities of Bangalore life more effectively. For more detailed guides on specific topics, explore our other articles in this category.
    </p>
  </div>
  `;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
          {post.featured && (
            <Badge variant="outline" className="text-orange-600 border-orange-200 mb-4">
              Featured Article
            </Badge>
          )}
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6">
            {post.title}
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed mb-6">
            {post.excerpt}
          </p>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-8">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{post.publishDate}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              <span>{post.readTime}</span>
            </div>
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
            className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700 prose-strong:text-gray-900"
            dangerouslySetInnerHTML={{ __html: post.content }} 
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
      </article>

      {/* Related Articles */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {relatedPosts.map((relatedPost) => (
              <Card key={relatedPost.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
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