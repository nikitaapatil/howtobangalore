#!/usr/bin/env python3
"""
Featured Articles Testing Suite for "How to Bangalore" Application
Tests the featured articles functionality specifically as requested in the review
"""

import requests
import json
import sys
import os
from datetime import datetime
import time

# Load environment variables
sys.path.append('/app/backend')
from dotenv import load_dotenv
load_dotenv('/app/backend/.env')

# Get backend URL from frontend .env
with open('/app/frontend/.env', 'r') as f:
    for line in f:
        if line.startswith('REACT_APP_BACKEND_URL='):
            BACKEND_URL = line.split('=')[1].strip()
            break

API_BASE_URL = f"{BACKEND_URL}/api"

class FeaturedArticlesTester:
    def __init__(self):
        self.test_results = []
        self.failed_tests = []
        self.admin_token = None
        self.admin_username = "nikitaapatil"
        self.admin_password = "testing123"
        
    def log_test(self, test_name, success, message, details=None):
        """Log test results"""
        result = {
            'test': test_name,
            'success': success,
            'message': message,
            'timestamp': datetime.now().isoformat(),
            'details': details
        }
        self.test_results.append(result)
        
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status}: {test_name} - {message}")
        
        if not success:
            self.failed_tests.append(test_name)
            if details:
                print(f"   Details: {details}")
    
    def test_service_health(self):
        """Test if backend service is running and accessible"""
        try:
            response = requests.get(f"{API_BASE_URL}/", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if data.get("message") == "Hello World":
                    self.log_test("Service Health Check", True, "Backend service is running and accessible")
                    return True
                else:
                    self.log_test("Service Health Check", False, f"Unexpected response: {data}")
                    return False
            else:
                self.log_test("Service Health Check", False, f"HTTP {response.status_code}: {response.text}")
                return False
        except requests.exceptions.RequestException as e:
            self.log_test("Service Health Check", False, f"Connection failed: {str(e)}")
            return False
    
    def test_admin_authentication(self):
        """Test admin authentication with provided credentials"""
        try:
            login_data = {
                "username": self.admin_username,
                "password": self.admin_password
            }
            
            response = requests.post(f"{API_BASE_URL}/admin/login", 
                                   json=login_data, 
                                   headers={"Content-Type": "application/json"},
                                   timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ['access_token', 'token_type', 'user_info']
                
                if all(field in data for field in required_fields):
                    if data['token_type'] == 'bearer' and data['user_info']['username'] == self.admin_username:
                        self.admin_token = data['access_token']
                        self.log_test("Admin Authentication", True, f"Successfully authenticated admin user: {self.admin_username}")
                        return True
                    else:
                        self.log_test("Admin Authentication", False, "Invalid token type or username in response")
                        return False
                else:
                    missing_fields = [f for f in required_fields if f not in data]
                    self.log_test("Admin Authentication", False, f"Missing required fields: {missing_fields}")
                    return False
            else:
                self.log_test("Admin Authentication", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("Admin Authentication", False, f"Request failed: {str(e)}")
            return False
    
    def test_jwt_token_validation(self):
        """Test JWT token validation for admin operations"""
        if not self.admin_token:
            self.log_test("JWT Token Validation", False, "No admin token available for testing")
            return False
            
        try:
            headers = {
                "Authorization": f"Bearer {self.admin_token}",
                "Content-Type": "application/json"
            }
            
            response = requests.get(f"{API_BASE_URL}/admin/me", 
                                  headers=headers,
                                  timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ['username', 'email', 'id']
                
                if all(field in data for field in required_fields):
                    if data['username'] == self.admin_username:
                        self.log_test("JWT Token Validation", True, "JWT token validation working correctly for admin operations")
                        return True
                    else:
                        self.log_test("JWT Token Validation", False, "Username mismatch in token validation")
                        return False
                else:
                    missing_fields = [f for f in required_fields if f not in data]
                    self.log_test("JWT Token Validation", False, f"Missing required fields: {missing_fields}")
                    return False
            else:
                self.log_test("JWT Token Validation", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("JWT Token Validation", False, f"Request failed: {str(e)}")
            return False
    
    def test_featured_articles_api(self):
        """Test GET /api/articles endpoint for featured articles count and data"""
        try:
            response = requests.get(f"{API_BASE_URL}/articles", timeout=10)
            
            if response.status_code == 200:
                articles = response.json()
                
                if isinstance(articles, list):
                    total_articles = len(articles)
                    featured_articles = [article for article in articles if article.get('featured', False)]
                    featured_count = len(featured_articles)
                    
                    # Verify expected count (should be 17 featured out of 46 total)
                    if featured_count == 17:
                        self.log_test("Featured Articles API Count", True, f"Correct featured articles count: {featured_count} out of {total_articles} total articles")
                    else:
                        self.log_test("Featured Articles API Count", False, f"Expected 17 featured articles, got {featured_count} out of {total_articles} total")
                    
                    # Verify featured articles have all required fields
                    if featured_articles:
                        required_fields = ['id', 'title', 'slug', 'content', 'excerpt', 'category', 'featured', 'published', 'read_time', 'word_count']
                        missing_fields_articles = []
                        
                        for article in featured_articles[:3]:  # Check first 3 featured articles
                            missing_fields = [field for field in required_fields if field not in article]
                            if missing_fields:
                                missing_fields_articles.append(f"Article '{article.get('title', 'Unknown')}': {missing_fields}")
                        
                        if not missing_fields_articles:
                            self.log_test("Featured Articles Data Integrity", True, f"All featured articles contain required fields (checked {min(3, len(featured_articles))} articles)")
                        else:
                            self.log_test("Featured Articles Data Integrity", False, f"Missing fields in featured articles: {missing_fields_articles}")
                        
                        # Verify featured flag is correctly set
                        all_featured_flagged = all(article.get('featured', False) for article in featured_articles)
                        if all_featured_flagged:
                            self.log_test("Featured Flag Verification", True, "All featured articles have featured=true flag set correctly")
                        else:
                            self.log_test("Featured Flag Verification", False, "Some featured articles missing featured=true flag")
                        
                        return True
                    else:
                        self.log_test("Featured Articles API", False, "No featured articles found in response")
                        return False
                else:
                    self.log_test("Featured Articles API", False, f"Expected list, got: {type(articles)}")
                    return False
            else:
                self.log_test("Featured Articles API", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("Featured Articles API", False, f"Request failed: {str(e)}")
            return False
    
    def test_featured_article_update(self):
        """Test PUT /api/admin/articles/{id} endpoint for updating featured status"""
        if not self.admin_token:
            self.log_test("Featured Article Update", False, "No admin token available for testing")
            return False
            
        try:
            headers = {
                "Authorization": f"Bearer {self.admin_token}",
                "Content-Type": "application/json"
            }
            
            # First, get all articles to find one to test with
            response = requests.get(f"{API_BASE_URL}/admin/articles", 
                                  headers=headers,
                                  timeout=10)
            
            if response.status_code != 200:
                self.log_test("Featured Article Update", False, f"Failed to get articles list: HTTP {response.status_code}")
                return False
            
            articles = response.json()
            if not articles:
                self.log_test("Featured Article Update", False, "No articles available for testing update")
                return False
            
            # Find an article to test with (preferably one that's not featured)
            test_article = None
            for article in articles:
                if not article.get('featured', False):
                    test_article = article
                    break
            
            if not test_article:
                # If all are featured, use the first one and toggle it
                test_article = articles[0]
            
            article_id = test_article['id']
            original_featured_status = test_article.get('featured', False)
            new_featured_status = not original_featured_status
            
            # Update the article's featured status
            update_data = {
                "featured": new_featured_status
            }
            
            response = requests.put(f"{API_BASE_URL}/admin/articles/{article_id}", 
                                  json=update_data,
                                  headers=headers,
                                  timeout=10)
            
            if response.status_code == 200:
                updated_article = response.json()
                
                if updated_article.get('featured') == new_featured_status:
                    self.log_test("Featured Article Update", True, f"Successfully updated article '{updated_article.get('title', 'Unknown')}' featured status from {original_featured_status} to {new_featured_status}")
                    
                    # Revert the change to maintain system state
                    revert_data = {"featured": original_featured_status}
                    requests.put(f"{API_BASE_URL}/admin/articles/{article_id}", 
                               json=revert_data, headers=headers, timeout=10)
                    
                    return True
                else:
                    self.log_test("Featured Article Update", False, f"Featured status not updated correctly. Expected: {new_featured_status}, Got: {updated_article.get('featured')}")
                    return False
            else:
                self.log_test("Featured Article Update", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("Featured Article Update", False, f"Request failed: {str(e)}")
            return False
    
    def test_homepage_featured_articles_api(self):
        """Test that homepage can get featured articles through the API"""
        try:
            # Test the public articles endpoint that homepage would use
            response = requests.get(f"{API_BASE_URL}/articles", timeout=10)
            
            if response.status_code == 200:
                articles = response.json()
                
                if isinstance(articles, list):
                    featured_articles = [article for article in articles if article.get('featured', False)]
                    
                    if featured_articles:
                        # Verify articles have necessary fields for homepage display
                        homepage_required_fields = ['id', 'title', 'slug', 'excerpt', 'category', 'featured_image', 'read_time', 'publish_date']
                        
                        sample_article = featured_articles[0]
                        missing_fields = [field for field in homepage_required_fields if field not in sample_article]
                        
                        if not missing_fields:
                            self.log_test("Homepage Featured Articles API", True, f"Featured articles API ready for homepage display with {len(featured_articles)} featured articles")
                            return True
                        else:
                            self.log_test("Homepage Featured Articles API", False, f"Featured articles missing homepage display fields: {missing_fields}")
                            return False
                    else:
                        self.log_test("Homepage Featured Articles API", False, "No featured articles available for homepage display")
                        return False
                else:
                    self.log_test("Homepage Featured Articles API", False, f"Expected list, got: {type(articles)}")
                    return False
            else:
                self.log_test("Homepage Featured Articles API", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("Homepage Featured Articles API", False, f"Request failed: {str(e)}")
            return False
    
    def test_article_data_completeness(self):
        """Test that featured articles contain all required fields with proper data"""
        try:
            response = requests.get(f"{API_BASE_URL}/articles", timeout=10)
            
            if response.status_code == 200:
                articles = response.json()
                featured_articles = [article for article in articles if article.get('featured', False)]
                
                if not featured_articles:
                    self.log_test("Article Data Completeness", False, "No featured articles to test data completeness")
                    return False
                
                # Test data completeness for first 5 featured articles
                test_articles = featured_articles[:5]
                data_issues = []
                
                for article in test_articles:
                    title = article.get('title', 'Unknown')
                    
                    # Check required fields are not empty
                    if not article.get('title'):
                        data_issues.append(f"Article {article.get('id', 'Unknown')}: Empty title")
                    if not article.get('slug'):
                        data_issues.append(f"Article '{title}': Empty slug")
                    if not article.get('content'):
                        data_issues.append(f"Article '{title}': Empty content")
                    if not article.get('excerpt'):
                        data_issues.append(f"Article '{title}': Empty excerpt")
                    if not article.get('category'):
                        data_issues.append(f"Article '{title}': Empty category")
                    if not article.get('read_time'):
                        data_issues.append(f"Article '{title}': Empty read_time")
                    if not isinstance(article.get('word_count'), int) or article.get('word_count', 0) <= 0:
                        data_issues.append(f"Article '{title}': Invalid word_count")
                    if article.get('featured') is not True:
                        data_issues.append(f"Article '{title}': Featured flag not set to true")
                
                if not data_issues:
                    self.log_test("Article Data Completeness", True, f"All tested featured articles ({len(test_articles)}) have complete and valid data")
                    return True
                else:
                    self.log_test("Article Data Completeness", False, f"Data completeness issues found: {data_issues[:3]}...")  # Show first 3 issues
                    return False
                    
            else:
                self.log_test("Article Data Completeness", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("Article Data Completeness", False, f"Request failed: {str(e)}")
            return False
    
    def run_featured_articles_tests(self):
        """Run all featured articles functionality tests"""
        print("=" * 80)
        print("FEATURED ARTICLES FUNCTIONALITY TESTING SUITE")
        print("How to Bangalore - Featured Articles Review Testing")
        print("=" * 80)
        print(f"Testing backend at: {API_BASE_URL}")
        print(f"Admin credentials: {self.admin_username} / {self.admin_password}")
        print()
        
        # Test service health first
        if not self.test_service_health():
            print("\n❌ Backend service is not accessible. Stopping tests.")
            return False
        
        print("\n" + "="*60)
        print("AUTHENTICATION TESTING FOR ADMIN OPERATIONS")
        print("="*60)
        
        # Test authentication
        if not self.test_admin_authentication():
            print("❌ Admin authentication failed. Cannot test admin operations.")
            return False
        
        self.test_jwt_token_validation()
        
        print("\n" + "="*60)
        print("FEATURED ARTICLES API TESTING")
        print("="*60)
        
        # Test featured articles functionality
        self.test_featured_articles_api()
        self.test_featured_article_update()
        self.test_homepage_featured_articles_api()
        self.test_article_data_completeness()
        
        # Print summary
        print("\n" + "=" * 80)
        print("FEATURED ARTICLES TEST SUMMARY")
        print("=" * 80)
        
        total_tests = len(self.test_results)
        passed_tests = len([t for t in self.test_results if t['success']])
        failed_tests = len(self.failed_tests)
        
        print(f"Total Tests: {total_tests}")
        print(f"Passed: {passed_tests}")
        print(f"Failed: {failed_tests}")
        
        if self.failed_tests:
            print(f"\n❌ Failed Tests:")
            for test in self.failed_tests:
                print(f"  - {test}")
        else:
            print(f"\n✅ All featured articles tests passed successfully!")
        
        success_rate = (passed_tests / total_tests) * 100 if total_tests > 0 else 0
        print(f"\nSuccess Rate: {success_rate:.1f}%")
        
        # Specific featured articles summary
        print(f"\nFeatured Articles Testing Results:")
        print(f"  ✅ Service Health: {'PASS' if any(t['test'] == 'Service Health Check' and t['success'] for t in self.test_results) else 'FAIL'}")
        print(f"  ✅ Admin Authentication: {'PASS' if any(t['test'] == 'Admin Authentication' and t['success'] for t in self.test_results) else 'FAIL'}")
        print(f"  ✅ Featured Articles API: {'PASS' if any('Featured Articles API' in t['test'] and t['success'] for t in self.test_results) else 'FAIL'}")
        print(f"  ✅ Featured Article Updates: {'PASS' if any(t['test'] == 'Featured Article Update' and t['success'] for t in self.test_results) else 'FAIL'}")
        print(f"  ✅ Homepage API Integration: {'PASS' if any(t['test'] == 'Homepage Featured Articles API' and t['success'] for t in self.test_results) else 'FAIL'}")
        print(f"  ✅ Article Data Integrity: {'PASS' if any('Data' in t['test'] and t['success'] for t in self.test_results) else 'FAIL'}")
        
        return failed_tests == 0

if __name__ == "__main__":
    tester = FeaturedArticlesTester()
    success = tester.run_featured_articles_tests()
    
    # Exit with appropriate code
    sys.exit(0 if success else 1)