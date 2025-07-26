#!/usr/bin/env python3
"""
Backend API Testing Suite for "How to Bangalore" Blog Application
Tests all backend endpoints, database connectivity, and error handling
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

class BackendTester:
    def __init__(self):
        self.test_results = []
        self.failed_tests = []
        
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
    
    def test_status_post_endpoint(self):
        """Test POST /api/status endpoint"""
        try:
            test_data = {
                "client_name": "test_client_bangalore_blog"
            }
            
            response = requests.post(f"{API_BASE_URL}/status", 
                                   json=test_data, 
                                   headers={"Content-Type": "application/json"},
                                   timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ['id', 'client_name', 'timestamp']
                
                if all(field in data for field in required_fields):
                    if data['client_name'] == test_data['client_name']:
                        self.log_test("POST /status Endpoint", True, "Successfully created status check entry")
                        return data['id']  # Return ID for cleanup if needed
                    else:
                        self.log_test("POST /status Endpoint", False, "Client name mismatch in response")
                        return None
                else:
                    missing_fields = [f for f in required_fields if f not in data]
                    self.log_test("POST /status Endpoint", False, f"Missing required fields: {missing_fields}")
                    return None
            else:
                self.log_test("POST /status Endpoint", False, f"HTTP {response.status_code}: {response.text}")
                return None
                
        except requests.exceptions.RequestException as e:
            self.log_test("POST /status Endpoint", False, f"Request failed: {str(e)}")
            return None
    
    def test_status_get_endpoint(self):
        """Test GET /api/status endpoint"""
        try:
            response = requests.get(f"{API_BASE_URL}/status", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                if isinstance(data, list):
                    self.log_test("GET /status Endpoint", True, f"Successfully retrieved {len(data)} status check entries")
                    
                    # Validate structure of entries if any exist
                    if data:
                        first_entry = data[0]
                        required_fields = ['id', 'client_name', 'timestamp']
                        if all(field in first_entry for field in required_fields):
                            self.log_test("GET /status Data Structure", True, "Status entries have correct structure")
                        else:
                            missing_fields = [f for f in required_fields if f not in first_entry]
                            self.log_test("GET /status Data Structure", False, f"Missing fields in entries: {missing_fields}")
                    
                    return True
                else:
                    self.log_test("GET /status Endpoint", False, f"Expected list, got: {type(data)}")
                    return False
            else:
                self.log_test("GET /status Endpoint", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("GET /status Endpoint", False, f"Request failed: {str(e)}")
            return False
    
    def test_database_connectivity(self):
        """Test database connectivity by creating and retrieving data"""
        try:
            # First, create a test entry
            test_data = {
                "client_name": "db_connectivity_test_bangalore"
            }
            
            post_response = requests.post(f"{API_BASE_URL}/status", 
                                        json=test_data, 
                                        headers={"Content-Type": "application/json"},
                                        timeout=10)
            
            if post_response.status_code != 200:
                self.log_test("Database Connectivity", False, "Failed to create test entry for DB test")
                return False
            
            created_entry = post_response.json()
            created_id = created_entry.get('id')
            
            # Wait a moment for DB write
            time.sleep(1)
            
            # Now retrieve all entries and check if our test entry exists
            get_response = requests.get(f"{API_BASE_URL}/status", timeout=10)
            
            if get_response.status_code == 200:
                all_entries = get_response.json()
                
                # Look for our test entry
                test_entry_found = any(
                    entry.get('id') == created_id and 
                    entry.get('client_name') == test_data['client_name']
                    for entry in all_entries
                )
                
                if test_entry_found:
                    self.log_test("Database Connectivity", True, "Successfully wrote to and read from database")
                    return True
                else:
                    self.log_test("Database Connectivity", False, "Test entry not found in database after creation")
                    return False
            else:
                self.log_test("Database Connectivity", False, f"Failed to retrieve entries: HTTP {get_response.status_code}")
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("Database Connectivity", False, f"Database test failed: {str(e)}")
            return False
    
    def test_error_handling(self):
        """Test error handling for invalid requests"""
        try:
            # Test invalid JSON for POST endpoint
            response = requests.post(f"{API_BASE_URL}/status", 
                                   data="invalid json", 
                                   headers={"Content-Type": "application/json"},
                                   timeout=10)
            
            if response.status_code in [400, 422]:  # FastAPI returns 422 for validation errors
                self.log_test("Error Handling - Invalid JSON", True, f"Properly handled invalid JSON with HTTP {response.status_code}")
            else:
                self.log_test("Error Handling - Invalid JSON", False, f"Unexpected response to invalid JSON: HTTP {response.status_code}")
            
            # Test missing required field
            response = requests.post(f"{API_BASE_URL}/status", 
                                   json={}, 
                                   headers={"Content-Type": "application/json"},
                                   timeout=10)
            
            if response.status_code in [400, 422]:
                self.log_test("Error Handling - Missing Field", True, f"Properly handled missing required field with HTTP {response.status_code}")
            else:
                self.log_test("Error Handling - Missing Field", False, f"Unexpected response to missing field: HTTP {response.status_code}")
            
            # Test non-existent endpoint
            response = requests.get(f"{API_BASE_URL}/nonexistent", timeout=10)
            
            if response.status_code == 404:
                self.log_test("Error Handling - 404 Endpoint", True, "Properly returned 404 for non-existent endpoint")
            else:
                self.log_test("Error Handling - 404 Endpoint", False, f"Unexpected response for non-existent endpoint: HTTP {response.status_code}")
                
        except requests.exceptions.RequestException as e:
            self.log_test("Error Handling", False, f"Error handling test failed: {str(e)}")
    
    def test_cors_configuration(self):
        """Test CORS configuration"""
        try:
            # Test preflight request
            response = requests.options(f"{API_BASE_URL}/status", 
                                      headers={
                                          "Origin": "http://localhost:3000",
                                          "Access-Control-Request-Method": "POST",
                                          "Access-Control-Request-Headers": "Content-Type"
                                      },
                                      timeout=10)
            
            if response.status_code in [200, 204]:
                cors_headers = response.headers
                if 'Access-Control-Allow-Origin' in cors_headers:
                    self.log_test("CORS Configuration", True, "CORS is properly configured")
                else:
                    self.log_test("CORS Configuration", False, "CORS headers not found in response")
            else:
                self.log_test("CORS Configuration", False, f"CORS preflight failed: HTTP {response.status_code}")
                
        except requests.exceptions.RequestException as e:
            self.log_test("CORS Configuration", False, f"CORS test failed: {str(e)}")
    
    def run_all_tests(self):
        """Run all backend tests"""
        print("=" * 60)
        print("BACKEND API TESTING SUITE - How to Bangalore Blog")
        print("=" * 60)
        print(f"Testing backend at: {API_BASE_URL}")
        print()
        
        # Test service health first
        if not self.test_service_health():
            print("\n❌ Backend service is not accessible. Stopping tests.")
            return False
        
        print()
        
        # Run all other tests
        self.test_status_post_endpoint()
        self.test_status_get_endpoint()
        self.test_database_connectivity()
        self.test_error_handling()
        self.test_cors_configuration()
        
        # Print summary
        print("\n" + "=" * 60)
        print("TEST SUMMARY")
        print("=" * 60)
        
        total_tests = len(self.test_results)
        passed_tests = len([t for t in self.test_results if t['success']])
        failed_tests = len(self.failed_tests)
        
        print(f"Total Tests: {total_tests}")
        print(f"Passed: {passed_tests}")
        print(f"Failed: {failed_tests}")
        
        if self.failed_tests:
            print(f"\nFailed Tests:")
            for test in self.failed_tests:
                print(f"  - {test}")
        
        success_rate = (passed_tests / total_tests) * 100 if total_tests > 0 else 0
        print(f"\nSuccess Rate: {success_rate:.1f}%")
        
        return failed_tests == 0

if __name__ == "__main__":
    tester = BackendTester()
    success = tester.run_all_tests()
    
    # Exit with appropriate code
    sys.exit(0 if success else 1)