import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { AlertCircle, CheckCircle, BarChart3, Search, DollarSign, Settings, Copy, ExternalLink } from 'lucide-react';
import { useToast } from '../../hooks/use-toast';

const AnalyticsManager = () => {
  const [analyticsConfig, setAnalyticsConfig] = useState({
    googleAnalyticsId: '',
    googleSearchConsoleId: '',
    googleAdsId: '',
    googleTagManagerId: ''
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

  useEffect(() => {
    loadAnalyticsConfig();
  }, []);

  const loadAnalyticsConfig = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/api/admin/analytics-config`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setAnalyticsConfig(data);
      }
    } catch (error) {
      console.error('Error loading analytics config:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveAnalyticsConfig = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_BASE_URL}/api/admin/analytics-config`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(analyticsConfig)
      });
      
      if (response.ok) {
        toast({
          title: "Configuration Saved",
          description: "Analytics configuration has been updated successfully.",
          variant: "default"
        });
      } else {
        throw new Error('Failed to save configuration');
      }
    } catch (error) {
      console.error('Error saving analytics config:', error);
      toast({
        title: "Save Failed",
        description: "Failed to save analytics configuration. Please try again.",
        variant: "destructive"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field, value) => {
    setAnalyticsConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied",
      description: "Domain copied to clipboard",
      variant: "default"
    });
  };

  const siteUrl = "https://howtobangalore.com";

  return (
    <div className="space-y-6">
      {/* Google Analytics */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-5 w-5 text-blue-600" />
            <CardTitle>Google Analytics</CardTitle>
          </div>
          <CardDescription>
            Track website traffic, user behavior, and performance metrics
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Google Analytics Measurement ID
            </label>
            <Input
              type="text"
              value={analyticsConfig.googleAnalyticsId}
              onChange={(e) => handleInputChange('googleAnalyticsId', e.target.value)}
              placeholder="G-XXXXXXXXXX"
              className="font-mono"
            />
            <p className="text-sm text-gray-500 mt-1">
              Format: G-XXXXXXXXXX (Google Analytics 4 property ID)
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Setup Instructions:</h4>
            <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
              <li>Go to <a href="https://analytics.google.com/" target="_blank" rel="noopener noreferrer" className="underline">Google Analytics</a></li>
              <li>Create a new property or select existing one</li>
              <li>Go to Admin → Data Streams → Web</li>
              <li>Add your website URL: <code className="bg-blue-100 px-1 rounded">{siteUrl}</code></li>
              <li>Copy the Measurement ID (starts with G-)</li>
            </ol>
          </div>

          {analyticsConfig.googleAnalyticsId && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 text-green-800">
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm font-medium">Google Analytics is configured</span>
              </div>
              <p className="text-sm text-green-700 mt-1">
                Tracking code will be automatically added to all pages
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Google Search Console */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Search className="h-5 w-5 text-green-600" />
            <CardTitle>Google Search Console</CardTitle>
          </div>
          <CardDescription>
            Monitor search performance and optimize SEO
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Search Console Property ID
            </label>
            <Input
              type="text"
              value={analyticsConfig.googleSearchConsoleId}
              onChange={(e) => handleInputChange('googleSearchConsoleId', e.target.value)}
              placeholder="sc-domain:howtobangalore.com"
              className="font-mono"
            />
            <p className="text-sm text-gray-500 mt-1">
              Optional: For advanced verification (usually auto-verified with Analytics)
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-medium text-green-900 mb-2">Setup Instructions:</h4>
            <ol className="text-sm text-green-800 space-y-1 list-decimal list-inside">
              <li>Go to <a href="https://search.google.com/search-console/" target="_blank" rel="noopener noreferrer" className="underline">Google Search Console</a></li>
              <li>Add property: <code className="bg-green-100 px-1 rounded">{siteUrl}</code></li>
              <li>Choose "Domain" or "URL prefix" method</li>
              <li>Verify ownership (usually auto-verified if Analytics is set up)</li>
              <li>Submit your sitemap: <code className="bg-green-100 px-1 rounded">{siteUrl}/api/sitemap.xml</code></li>
            </ol>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">✅ Ready for Search Console:</h4>
            <div className="text-sm text-blue-800 space-y-2">
              <p>Your website is already configured with:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Google Analytics verification (auto-verification enabled)</li>
                <li>Dynamic XML sitemap with all {46} articles</li>
                <li>SEO-optimized robots.txt file</li>
                <li>Proper meta tags and structured data</li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <h5 className="font-medium text-gray-900 mb-2">Website Domain</h5>
              <div className="flex items-center space-x-2">
                <code className="text-sm bg-gray-100 px-2 py-1 rounded">{siteUrl}</code>
                <button
                  onClick={() => copyToClipboard(siteUrl)}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <Copy className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
              <h5 className="font-medium text-gray-900 mb-2">Sitemap URL</h5>
              <div className="flex items-center space-x-2">
                <code className="text-sm bg-gray-100 px-2 py-1 rounded">{siteUrl}/api/sitemap.xml</code>
                <button
                  onClick={() => copyToClipboard(`${siteUrl}/api/sitemap.xml`)}
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <Copy className="h-4 w-4" />
                </button>
                <a
                  href={`${API_BASE_URL}/api/sitemap.xml`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 hover:bg-gray-200 rounded"
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
              <p className="text-xs text-gray-600 mt-1">Dynamic sitemap with all articles</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Google Ads */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-yellow-600" />
            <CardTitle>Google Ads</CardTitle>
          </div>
          <CardDescription>
            Manage advertising campaigns and conversion tracking
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Google Ads Account ID
            </label>
            <Input
              type="text"
              value={analyticsConfig.googleAdsId}
              onChange={(e) => handleInputChange('googleAdsId', e.target.value)}
              placeholder="123-456-7890"
              className="font-mono"
            />
            <p className="text-sm text-gray-500 mt-1">
              Format: XXX-XXX-XXXX (10-digit customer ID)
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-medium text-yellow-900 mb-2">Setup Instructions:</h4>
            <ol className="text-sm text-yellow-800 space-y-1 list-decimal list-inside">
              <li>Go to <a href="https://ads.google.com/" target="_blank" rel="noopener noreferrer" className="underline">Google Ads</a></li>
              <li>Create a new account or select existing one</li>
              <li>Find your Customer ID in the top right corner</li>
              <li>Set up conversion tracking</li>
              <li>Connect with Google Analytics for better insights</li>
            </ol>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-orange-900">Ad Management Features</h4>
                <p className="text-sm text-orange-800 mt-1">
                  Once configured, you'll be able to manage ad placements, track conversions, 
                  and analyze campaign performance directly from this dashboard.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Google Tag Manager */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Settings className="h-5 w-5 text-purple-600" />
            <CardTitle>Google Tag Manager</CardTitle>
          </div>
          <CardDescription>
            Centralized tag management for analytics and marketing tools
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Google Tag Manager ID
            </label>
            <Input
              type="text"
              value={analyticsConfig.googleTagManagerId}
              onChange={(e) => handleInputChange('googleTagManagerId', e.target.value)}
              placeholder="GTM-XXXXXXX"
              className="font-mono"
            />
            <p className="text-sm text-gray-500 mt-1">
              Format: GTM-XXXXXXX (Container ID)
            </p>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <h4 className="font-medium text-purple-900 mb-2">Setup Instructions:</h4>
            <ol className="text-sm text-purple-800 space-y-1 list-decimal list-inside">
              <li>Go to <a href="https://tagmanager.google.com/" target="_blank" rel="noopener noreferrer" className="underline">Google Tag Manager</a></li>
              <li>Create a new container for your website</li>
              <li>Copy the Container ID (starts with GTM-)</li>
              <li>Configure tags for Analytics, Ads, and other tools</li>
              <li>Test and publish your container</li>
            </ol>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Recommended Setup:</h4>
            <p className="text-sm text-blue-800">
              Use Google Tag Manager to manage all your tracking codes (Analytics, Ads, etc.) 
              in one place. This provides better performance and easier maintenance.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Save Configuration */}
      <div className="flex justify-end">
        <Button
          onClick={saveAnalyticsConfig}
          disabled={saving}
          className="bg-orange-600 hover:bg-orange-700"
        >
          {saving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Saving...
            </>
          ) : (
            <>
              <Settings className="h-4 w-4 mr-2" />
              Save Configuration
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default AnalyticsManager;