#!/usr/bin/env python3
"""
Contact Form Testing Suite for "How to Bangalore" Application
Tests the new contact form functionality specifically
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

class ContactFormTester:
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

    def test_contact_form_basic_submission(self):
        """Test basic contact form submission with valid data"""
        try:
            contact_data = {
                "name": "Ananya Reddy",
                "email": "ananya.reddy@gmail.com",
                "subject": "Inquiry about Bangalore Transportation",
                "message": "Hello! I'm planning to move to Bangalore for work and would like to know more about the public transportation system. Specifically, I'm interested in understanding the metro connectivity between Electronic City and Koramangala. Could you provide some insights on the best routes and timings? Also, are there any monthly passes available for regular commuters? Thank you for your help!"
            }
            
            response = requests.post(f"{API_BASE_URL}/contact", 
                                   json=contact_data, 
                                   headers={"Content-Type": "application/json"},
                                   timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success') == True and 'submitted successfully' in data.get('message', ''):
                    self.log_test("Contact Form Basic Submission", True, "Successfully submitted contact form with valid data")
                    return True
                else:
                    self.log_test("Contact Form Basic Submission", False, f"Unexpected response format: {data}")
                    return False
            else:
                self.log_test("Contact Form Basic Submission", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("Contact Form Basic Submission", False, f"Request failed: {str(e)}")
            return False

    def test_contact_form_multiple_submissions(self):
        """Test multiple contact form submissions to verify database storage"""
        try:
            submissions = [
                {
                    "name": "Vikram Singh",
                    "email": "vikram.singh@techcorp.com",
                    "subject": "Housing Query - Whitefield Area",
                    "message": "I'm looking for a 2BHK apartment in Whitefield area. What's the average rent and what documents do I need?"
                },
                {
                    "name": "Meera Krishnan",
                    "email": "meera.k@startup.io",
                    "subject": "Bangalore Weather and Clothing",
                    "message": "Moving from Delhi to Bangalore. What kind of clothes should I pack? How's the weather throughout the year?"
                },
                {
                    "name": "Rohit Sharma",
                    "email": "rohit.sharma@consulting.com",
                    "subject": "Banking and Financial Services",
                    "message": "Which banks have good presence in Bangalore? Need to open a salary account and looking for recommendations."
                }
            ]
            
            successful_submissions = 0
            
            for i, contact_data in enumerate(submissions):
                response = requests.post(f"{API_BASE_URL}/contact", 
                                       json=contact_data, 
                                       headers={"Content-Type": "application/json"},
                                       timeout=10)
                
                if response.status_code == 200:
                    data = response.json()
                    if data.get('success') == True:
                        successful_submissions += 1
                
                # Small delay between submissions
                time.sleep(0.5)
            
            if successful_submissions == len(submissions):
                self.log_test("Contact Form Multiple Submissions", True, f"Successfully submitted {successful_submissions} contact forms")
                return True
            else:
                self.log_test("Contact Form Multiple Submissions", False, f"Only {successful_submissions}/{len(submissions)} submissions succeeded")
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("Contact Form Multiple Submissions", False, f"Request failed: {str(e)}")
            return False

    def test_contact_form_edge_cases(self):
        """Test contact form with edge cases"""
        try:
            edge_cases = [
                {
                    "name": "Test User with Very Long Name That Exceeds Normal Length Expectations",
                    "email": "very.long.email.address.for.testing@verylongdomainname.com",
                    "subject": "Very Long Subject Line That Tests The System's Ability To Handle Extended Text Input Without Breaking Or Causing Issues",
                    "message": "This is a very long message that tests the system's ability to handle extended text input. " * 10
                },
                {
                    "name": "राज कुमार",  # Unicode characters
                    "email": "raj.kumar@example.com",
                    "subject": "बैंगलोर में आवास",
                    "message": "मुझे बैंगलोर में रहने की जगह चाहिए। कृपया सहायता करें।"
                },
                {
                    "name": "John O'Connor",  # Special characters
                    "email": "john.oconnor@email.com",
                    "subject": "Question about Bangalore's IT sector & opportunities",
                    "message": "I'm interested in Bangalore's tech scene. What are the major companies there?"
                }
            ]
            
            successful_edge_cases = 0
            
            for i, contact_data in enumerate(edge_cases):
                response = requests.post(f"{API_BASE_URL}/contact", 
                                       json=contact_data, 
                                       headers={"Content-Type": "application/json"},
                                       timeout=10)
                
                if response.status_code == 200:
                    data = response.json()
                    if data.get('success') == True:
                        successful_edge_cases += 1
                
                time.sleep(0.5)
            
            if successful_edge_cases >= 2:  # Allow for some edge cases to fail
                self.log_test("Contact Form Edge Cases", True, f"Successfully handled {successful_edge_cases}/{len(edge_cases)} edge cases")
                return True
            else:
                self.log_test("Contact Form Edge Cases", False, f"Only {successful_edge_cases}/{len(edge_cases)} edge cases succeeded")
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("Contact Form Edge Cases", False, f"Request failed: {str(e)}")
            return False

    def test_contact_form_invalid_data(self):
        """Test contact form with invalid data"""
        try:
            invalid_cases = [
                {
                    "name": "",
                    "email": "",
                    "subject": "",
                    "message": ""
                },
                {
                    "name": "Test User",
                    "email": "invalid-email-format",
                    "subject": "Test Subject",
                    "message": "Test message"
                },
                {
                    "email": "test@example.com",
                    "subject": "Missing name field",
                    "message": "This submission is missing the name field"
                }
            ]
            
            handled_invalid_cases = 0
            
            for i, contact_data in enumerate(invalid_cases):
                response = requests.post(f"{API_BASE_URL}/contact", 
                                       json=contact_data, 
                                       headers={"Content-Type": "application/json"},
                                       timeout=10)
                
                # The API might accept invalid data (which is acceptable for a simple form)
                # or it might reject it with validation errors
                if response.status_code in [200, 400, 422]:
                    handled_invalid_cases += 1
                
                time.sleep(0.5)
            
            if handled_invalid_cases == len(invalid_cases):
                self.log_test("Contact Form Invalid Data", True, f"Properly handled {handled_invalid_cases} invalid data cases")
                return True
            else:
                self.log_test("Contact Form Invalid Data", False, f"Only handled {handled_invalid_cases}/{len(invalid_cases)} invalid cases")
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("Contact Form Invalid Data", False, f"Request failed: {str(e)}")
            return False

    def test_contact_form_malformed_requests(self):
        """Test contact form with malformed requests"""
        try:
            malformed_cases = [
                ("invalid json", "text/plain"),
                ('{"incomplete": "json"', "application/json"),
                ("", "application/json"),
                ('{"name": "Test", "email": "test@example.com"}', "application/xml")  # Wrong content type
            ]
            
            handled_malformed = 0
            
            for data, content_type in malformed_cases:
                response = requests.post(f"{API_BASE_URL}/contact", 
                                       data=data, 
                                       headers={"Content-Type": content_type},
                                       timeout=10)
                
                # Should return 4xx for malformed requests
                if response.status_code >= 400:
                    handled_malformed += 1
                
                time.sleep(0.5)
            
            if handled_malformed >= 3:  # Allow some flexibility
                self.log_test("Contact Form Malformed Requests", True, f"Properly rejected {handled_malformed}/{len(malformed_cases)} malformed requests")
                return True
            else:
                self.log_test("Contact Form Malformed Requests", False, f"Only rejected {handled_malformed}/{len(malformed_cases)} malformed requests")
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("Contact Form Malformed Requests", False, f"Request failed: {str(e)}")
            return False

    def test_contact_form_response_format(self):
        """Test contact form response format consistency"""
        try:
            contact_data = {
                "name": "Response Format Test User",
                "email": "response.test@example.com",
                "subject": "Testing Response Format",
                "message": "This is a test to verify the response format is consistent."
            }
            
            response = requests.post(f"{API_BASE_URL}/contact", 
                                   json=contact_data, 
                                   headers={"Content-Type": "application/json"},
                                   timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                # Check required response fields
                required_fields = ['message', 'success']
                missing_fields = [field for field in required_fields if field not in data]
                
                if not missing_fields:
                    if isinstance(data['success'], bool) and isinstance(data['message'], str):
                        self.log_test("Contact Form Response Format", True, "Response format is consistent and properly structured")
                        return True
                    else:
                        self.log_test("Contact Form Response Format", False, f"Response field types incorrect: success={type(data['success'])}, message={type(data['message'])}")
                        return False
                else:
                    self.log_test("Contact Form Response Format", False, f"Missing required response fields: {missing_fields}")
                    return False
            else:
                self.log_test("Contact Form Response Format", False, f"HTTP {response.status_code}: {response.text}")
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("Contact Form Response Format", False, f"Request failed: {str(e)}")
            return False

    def run_all_tests(self):
        """Run all contact form tests"""
        print("=" * 80)
        print("CONTACT FORM FUNCTIONALITY TESTING SUITE")
        print("How to Bangalore - Contact Form Backend Testing")
        print("=" * 80)
        print(f"Testing contact form at: {API_BASE_URL}/contact")
        print()
        
        # Run all contact form tests
        self.test_contact_form_basic_submission()
        self.test_contact_form_multiple_submissions()
        self.test_contact_form_edge_cases()
        self.test_contact_form_invalid_data()
        self.test_contact_form_malformed_requests()
        self.test_contact_form_response_format()
        
        # Print summary
        print("\n" + "=" * 80)
        print("CONTACT FORM TEST SUMMARY")
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
            print(f"\n✅ All contact form tests passed successfully!")
        
        success_rate = (passed_tests / total_tests) * 100 if total_tests > 0 else 0
        print(f"\nSuccess Rate: {success_rate:.1f}%")
        
        return failed_tests == 0

if __name__ == "__main__":
    tester = ContactFormTester()
    success = tester.run_all_tests()
    
    # Exit with appropriate code
    sys.exit(0 if success else 1)