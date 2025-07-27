#!/usr/bin/env python3
"""
Quick API Verification Test for "How to Bangalore" Application
Verifies that existing API endpoints are still working after contact form addition
"""

import requests
import json
import sys

# Get backend URL from frontend .env
with open('/app/frontend/.env', 'r') as f:
    for line in f:
        if line.startswith('REACT_APP_BACKEND_URL='):
            BACKEND_URL = line.split('=')[1].strip()
            break

API_BASE_URL = f"{BACKEND_URL}/api"

def test_existing_endpoints():
    """Test key existing endpoints"""
    print("=" * 60)
    print("EXISTING API ENDPOINTS VERIFICATION")
    print("=" * 60)
    
    tests = []
    
    # Test 1: Root endpoint
    try:
        response = requests.get(f"{API_BASE_URL}/", timeout=10)
        if response.status_code == 200 and response.json().get("message") == "Hello World":
            tests.append(("Root Endpoint", True, "Working correctly"))
        else:
            tests.append(("Root Endpoint", False, f"HTTP {response.status_code}"))
    except Exception as e:
        tests.append(("Root Endpoint", False, str(e)))
    
    # Test 2: Articles endpoint
    try:
        response = requests.get(f"{API_BASE_URL}/articles", timeout=10)
        if response.status_code == 200:
            articles = response.json()
            if isinstance(articles, list):
                tests.append(("Articles Endpoint", True, f"Retrieved {len(articles)} articles"))
            else:
                tests.append(("Articles Endpoint", False, "Invalid response format"))
        else:
            tests.append(("Articles Endpoint", False, f"HTTP {response.status_code}"))
    except Exception as e:
        tests.append(("Articles Endpoint", False, str(e)))
    
    # Test 3: Status endpoint
    try:
        response = requests.get(f"{API_BASE_URL}/status", timeout=10)
        if response.status_code == 200:
            status_checks = response.json()
            if isinstance(status_checks, list):
                tests.append(("Status Endpoint", True, f"Retrieved {len(status_checks)} status checks"))
            else:
                tests.append(("Status Endpoint", False, "Invalid response format"))
        else:
            tests.append(("Status Endpoint", False, f"HTTP {response.status_code}"))
    except Exception as e:
        tests.append(("Status Endpoint", False, str(e)))
    
    # Test 4: Admin login endpoint (without credentials)
    try:
        response = requests.post(f"{API_BASE_URL}/admin/login", 
                               json={"username": "nonexistent_user_12345", "password": "invalid_password_67890"}, 
                               timeout=10)
        if response.status_code == 401:
            tests.append(("Admin Login Endpoint", True, "Properly rejects invalid credentials"))
        else:
            tests.append(("Admin Login Endpoint", False, f"Unexpected response: HTTP {response.status_code}"))
    except Exception as e:
        tests.append(("Admin Login Endpoint", False, str(e)))
    
    # Print results
    passed = 0
    for test_name, success, message in tests:
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status}: {test_name} - {message}")
        if success:
            passed += 1
    
    print(f"\nSummary: {passed}/{len(tests)} existing endpoints working correctly")
    return passed == len(tests)

if __name__ == "__main__":
    success = test_existing_endpoints()
    sys.exit(0 if success else 1)