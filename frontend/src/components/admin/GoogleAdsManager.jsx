import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { AlertCircle, DollarSign, TrendingUp, Users, Eye, Settings } from 'lucide-react';

const GoogleAdsManager = () => {
  const [adConfig, setAdConfig] = useState({
    accountId: '',
    conversionId: '',
    remarketingId: '',
    budgetDaily: '',
    targetAudience: '',
    keywords: []
  });
  
  const [adPlacements, setAdPlacements] = useState([
    { id: 1, location: 'Header Banner', size: '728x90', active: false },
    { id: 2, location: 'Sidebar', size: '300x250', active: false },
    { id: 3, location: 'Article Bottom', size: '728x90', active: false },
    { id: 4, location: 'Footer', size: '970x250', active: false }
  ]);

  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: 'Bangalore Housing Guide',
      type: 'Search',
      budget: '₹500/day',
      status: 'Active',
      clicks: 1250,
      impressions: 15000,
      ctr: '8.33%',
      cpc: '₹4.50'
    },
    {
      id: 2,
      name: 'Transportation Tips',
      type: 'Display',
      budget: '₹300/day',
      status: 'Paused',
      clicks: 890,
      impressions: 12000,
      ctr: '7.42%',
      cpc: '₹3.80'
    }
  ]);

  const toggleAdPlacement = (id) => {
    setAdPlacements(prev => 
      prev.map(placement => 
        placement.id === id 
          ? { ...placement, active: !placement.active }
          : placement
      )
    );
  };

  const toggleCampaign = (id) => {
    setCampaigns(prev => 
      prev.map(campaign => 
        campaign.id === id 
          ? { ...campaign, status: campaign.status === 'Active' ? 'Paused' : 'Active' }
          : campaign
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Configuration Notice */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-orange-600" />
            <CardTitle>Google Ads Setup Required</CardTitle>
          </div>
          <CardDescription>
            Configure your Google Ads account in Analytics & Ads tab to enable full functionality
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h4 className="font-medium text-orange-900 mb-2">Next Steps:</h4>
            <ol className="text-sm text-orange-800 space-y-1 list-decimal list-inside">
              <li>Go to Analytics & Ads tab and configure your Google Ads account</li>
              <li>Set up conversion tracking for contact form submissions</li>
              <li>Create your first campaign targeting Bangalore-related keywords</li>
              <li>Configure ad placements on your website</li>
            </ol>
          </div>
        </CardContent>
      </Card>

      {/* Ad Placements */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Settings className="h-5 w-5 text-blue-600" />
            <CardTitle>Ad Placements</CardTitle>
          </div>
          <CardDescription>
            Manage where ads appear on your website
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            {adPlacements.map(placement => (
              <div key={placement.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${placement.active ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                  <div>
                    <h4 className="font-medium text-gray-900">{placement.location}</h4>
                    <p className="text-sm text-gray-500">{placement.size}</p>
                  </div>
                </div>
                <Button
                  variant={placement.active ? "destructive" : "default"}
                  size="sm"
                  onClick={() => toggleAdPlacement(placement.id)}
                >
                  {placement.active ? 'Disable' : 'Enable'}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Campaign Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            <CardTitle>Campaign Management</CardTitle>
          </div>
          <CardDescription>
            Monitor and manage your advertising campaigns
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            {campaigns.map(campaign => (
              <div key={campaign.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                      <span>{campaign.type}</span>
                      <span>{campaign.budget}</span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        campaign.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {campaign.status}
                      </span>
                    </div>
                  </div>
                  <Button
                    variant={campaign.status === 'Active' ? "destructive" : "default"}
                    size="sm"
                    onClick={() => toggleCampaign(campaign.id)}
                  >
                    {campaign.status === 'Active' ? 'Pause' : 'Resume'}
                  </Button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="text-center">
                    <div className="font-medium text-gray-900">{campaign.clicks}</div>
                    <div className="text-gray-500">Clicks</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-gray-900">{campaign.impressions}</div>
                    <div className="text-gray-500">Impressions</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-gray-900">{campaign.ctr}</div>
                    <div className="text-gray-500">CTR</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium text-gray-900">{campaign.cpc}</div>
                    <div className="text-gray-500">Avg CPC</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Performance Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <DollarSign className="h-5 w-5 text-yellow-600" />
            <CardTitle>Performance Overview</CardTitle>
          </div>
          <CardDescription>
            Key advertising metrics and insights
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Eye className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Total Impressions</span>
              </div>
              <div className="text-2xl font-bold text-blue-900">27,000</div>
              <div className="text-sm text-blue-700">+12% from last month</div>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-900">Total Clicks</span>
              </div>
              <div className="text-2xl font-bold text-green-900">2,140</div>
              <div className="text-sm text-green-700">+8% from last month</div>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-900">Avg CTR</span>
              </div>
              <div className="text-2xl font-bold text-yellow-900">7.93%</div>
              <div className="text-sm text-yellow-700">+0.5% from last month</div>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <DollarSign className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium text-purple-900">Total Spend</span>
              </div>
              <div className="text-2xl font-bold text-purple-900">₹9,180</div>
              <div className="text-sm text-purple-700">This month</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common advertising management tasks
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 text-left">
              <div>
                <div className="font-medium">Create New Campaign</div>
                <div className="text-sm text-gray-500 mt-1">Launch a new advertising campaign</div>
              </div>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 text-left">
              <div>
                <div className="font-medium">Update Keywords</div>
                <div className="text-sm text-gray-500 mt-1">Optimize your keyword targeting</div>
              </div>
            </Button>
            
            <Button variant="outline" className="h-auto p-4 text-left">
              <div>
                <div className="font-medium">View Reports</div>
                <div className="text-sm text-gray-500 mt-1">Analyze campaign performance</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GoogleAdsManager;