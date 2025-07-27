import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { 
  Save, 
  ArrowLeft, 
  Eye, 
  Upload, 
  Image as ImageIcon, 
  Bold, 
  Italic, 
  List, 
  Link as LinkIcon,
  Loader2
} from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';

const ArticleEditor = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [article, setArticle] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    subcategory: '',
    featured: false,
    published: true
  });
  const [previewMode, setPreviewMode] = useState(false);

  const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

  const categories = {
    government: ['documentation', 'services'],
    housing: ['finding-home', 'choosing-neighborhood', 'setup'],
    transport: ['navigating-roads', 'public-transport', 'private-transport'],
    utilities: ['electricity-water', 'internet-telecom', 'waste-management'],
    lifestyle: ['shopping', 'healthcare', 'education', 'entertainment']
  };

  // Quill editor configuration
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        [{ 'direction': 'rtl' }],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'font': [] }],
        [{ 'align': [] }],
        ['blockquote', 'code-block'],
        ['link', 'image', 'video'],
        ['clean']
      ],
      handlers: {
        image: imageHandler
      }
    },
    clipboard: {
      matchVisual: false,
    }
  }), []);

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
    'color', 'background',
    'align', 'script',
    'code-block'
  ];

  // Custom image handler for the editor
  function imageHandler() {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');

    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const quill = this.quill;
          const range = quill.getSelection();
          const base64Image = e.target.result;
          quill.insertEmbed(range.index, 'image', base64Image);
        };
        reader.readAsDataURL(file);
      }
    };

    input.click();
  }

  useEffect(() => {
    if (articleId) {
      fetchArticle();
    } else {
      setLoading(false);
    }
  }, [articleId]);

  const fetchArticle = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/articles`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const articles = await response.json();
        const foundArticle = articles.find(a => a.id === articleId);
        
        if (foundArticle) {
          setArticle(foundArticle);
          setFormData({
            title: foundArticle.title,
            content: foundArticle.content,
            excerpt: foundArticle.excerpt,
            category: foundArticle.category,
            subcategory: foundArticle.subcategory || '',
            featured: foundArticle.featured,
            published: foundArticle.published
          });
        } else {
          alert('Article not found');
          navigate('/admin');
        }
      }
    } catch (error) {
      console.error('Error fetching article:', error);
      alert('Error loading article');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Title and content are required');
      return;
    }

    setSaving(true);
    try {
      const updateData = {
        title: formData.title,
        content: formData.content,
        excerpt: formData.excerpt,
        category: formData.category,
        subcategory: formData.subcategory || '',
        featured: formData.featured,
        published: formData.published
      };

      const response = await fetch(`${API_BASE_URL}/api/admin/articles/${articleId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        alert('Article saved successfully!');
        navigate('/admin');
      } else {
        const error = await response.json();
        alert(`Save failed: ${error.detail || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Save failed: Network error');
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-orange-600" />
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Button
                variant="ghost"
                onClick={() => navigate('/admin')}
                className="mr-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <h1 className="text-xl font-bold text-gray-900">
                {articleId ? 'Edit Article' : 'New Article'}
              </h1>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={() => setPreviewMode(!previewMode)}
              >
                <Eye className="h-4 w-4 mr-2" />
                {previewMode ? 'Edit' : 'Preview'}
              </Button>
              <Button
                onClick={handleSave}
                disabled={saving}
                className="bg-orange-600 hover:bg-orange-700"
              >
                {saving ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                {saving ? 'Saving...' : 'Save Article'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Article Settings Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Article Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => {
                      handleInputChange('category', e.target.value);
                      handleInputChange('subcategory', '');
                    }}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                  >
                    <option value="">Select category</option>
                    {Object.keys(categories).map(cat => (
                      <option key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Subcategory */}
                {formData.category && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subcategory <span className="text-gray-500">(Optional)</span>
                    </label>
                    <select
                      value={formData.subcategory}
                      onChange={(e) => handleInputChange('subcategory', e.target.value)}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    >
                      <option value="">No subcategory</option>
                      {categories[formData.category].map(subcat => (
                        <option key={subcat} value={subcat}>
                          {subcat.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Featured */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => handleInputChange('featured', e.target.checked)}
                    className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                  <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
                    Featured article
                  </label>
                </div>

                {/* Published */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="published"
                    checked={formData.published}
                    onChange={(e) => handleInputChange('published', e.target.checked)}
                    className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                  <label htmlFor="published" className="ml-2 text-sm text-gray-700">
                    Published
                  </label>
                </div>

                {/* Article Stats */}
                {article && (
                  <div className="pt-4 border-t border-gray-200">
                    <h4 className="font-medium text-gray-900 mb-2">Article Stats</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p>Words: {formData.content.replace(/<[^>]*>/g, '').split(' ').length}</p>
                      <p>Created: {new Date(article.created_at).toLocaleDateString()}</p>
                      <p>URL: /{article.slug}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Editor */}
          <div className="lg:col-span-3">
            {previewMode ? (
              /* Preview Mode */
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-blue-600 border-blue-200">
                      Preview Mode
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-xl max-w-none reader-friendly-content">
                    <h1>{formData.title}</h1>
                    {formData.excerpt && (
                      <p className="text-xl text-gray-600 font-medium">{formData.excerpt}</p>
                    )}
                    <div dangerouslySetInnerHTML={{ __html: formData.content }} />
                  </div>
                </CardContent>
              </Card>
            ) : (
              /* Edit Mode */
              <Card>
                <CardHeader>
                  <Badge variant="outline" className="text-green-600 border-green-200 w-fit">
                    Edit Mode
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Article Title
                    </label>
                    <Input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="Enter article title..."
                      className="text-lg font-semibold"
                    />
                  </div>

                  {/* Excerpt */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Article Excerpt <span className="text-gray-500">(Optional)</span>
                    </label>
                    <textarea
                      value={formData.excerpt}
                      onChange={(e) => handleInputChange('excerpt', e.target.value)}
                      placeholder="Brief description of the article..."
                      rows={3}
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>

                  {/* Rich Text Editor */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Article Content
                    </label>
                    <div className="border border-gray-300 rounded-md">
                      <ReactQuill
                        theme="snow"
                        value={formData.content}
                        onChange={(content) => handleInputChange('content', content)}
                        modules={modules}
                        formats={formats}
                        placeholder="Write your article content here..."
                        style={{ minHeight: '400px' }}
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Use the toolbar to format text, add images, links, and more.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleEditor;