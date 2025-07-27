import React from 'react';
import { AlertTriangle, Info, Shield, Building, Heart } from 'lucide-react';

const DisclaimerPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-amber-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-orange-500 text-white p-3 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
            <AlertTriangle className="h-8 w-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Disclaimer
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Important information about the use of How to Bangalore content and services.
          </p>
          <p className="text-sm text-gray-600 mt-4">
            Last updated: January 2024
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            
            {/* General Disclaimer */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="bg-orange-100 p-3 rounded-lg mr-4">
                  <Info className="h-6 w-6 text-orange-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">General Disclaimer</h2>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <p>
                  The information contained in this website is for general information purposes only. The information is provided by How to Bangalore and while we endeavor to keep the information up to date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability or availability with respect to the website or the information, products, services, or related graphics contained on the website for any purpose.
                </p>
                <p>
                  Any reliance you place on such information is therefore strictly at your own risk.
                </p>
              </div>
            </div>

            {/* Professional Advice */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="bg-orange-100 p-3 rounded-lg mr-4">
                  <Shield className="h-6 w-6 text-orange-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Professional Advice</h2>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <p>
                  The content on How to Bangalore is provided for informational and educational purposes only. This information should not be used as a substitute for professional advice in the following areas:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <strong>Legal Advice:</strong> Consult with qualified lawyers for legal matters, property transactions, and regulatory compliance
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <strong>Financial Advice:</strong> Consult with certified financial advisors for investment, tax, and financial planning decisions
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <strong>Medical Advice:</strong> Consult with licensed healthcare providers for medical concerns and health-related decisions
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    <strong>Real Estate:</strong> Consult with licensed real estate professionals for property transactions and market analysis
                  </li>
                </ul>
                <p>
                  We strongly recommend seeking professional advice before making any significant decisions based on the information provided on this website.
                </p>
              </div>
            </div>

            {/* Information Accuracy */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="bg-orange-100 p-3 rounded-lg mr-4">
                  <Building className="h-6 w-6 text-orange-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Information Accuracy and Updates</h2>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <p>
                  Bangalore is a rapidly changing city with evolving infrastructure, policies, and regulations. While we strive to provide accurate and up-to-date information, we cannot guarantee that all information on this website is current or complete.
                </p>
                <h3 className="text-xl font-semibold text-gray-900">Dynamic Nature of Information</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    Government policies and regulations change frequently
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    Housing markets and rental prices fluctuate
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    Transportation routes and infrastructure develop continuously
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    Business locations and services may change
                  </li>
                </ul>
                <p>
                  We recommend verifying information independently and checking with relevant authorities before making decisions.
                </p>
              </div>
            </div>

            {/* External Links */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">External Links</h2>
              
              <div className="space-y-4 text-gray-700">
                <p>
                  Our website may contain links to external websites that are not provided or maintained by or in any way affiliated with How to Bangalore. Please note that we do not guarantee the accuracy, relevance, timeliness, or completeness of any information on these external websites.
                </p>
                <p>
                  We have no control over the nature, content, and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.
                </p>
              </div>
            </div>

            {/* Personal Experience */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Experience and Subjective Views</h2>
              
              <div className="space-y-4 text-gray-700">
                <p>
                  Much of the content on How to Bangalore is based on personal experiences and observations. What works for one person may not work for another. Factors that may influence your experience include:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    Individual preferences and lifestyle choices
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    Financial circumstances and budget constraints
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    Cultural background and language skills
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    Timing of your arrival and length of stay
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    Professional field and work requirements
                  </li>
                </ul>
                <p>
                  We encourage you to use our guides as a starting point while making your own informed decisions based on your specific circumstances.
                </p>
              </div>
            </div>

            {/* Limitation of Liability */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Limitation of Liability</h2>
              
              <div className="space-y-4 text-gray-700">
                <p>
                  In no event will How to Bangalore be liable for any loss or damage including without limitation, indirect or consequential loss or damage, or any loss or damage whatsoever arising from loss of data or profits arising out of, or in connection with, the use of this website.
                </p>
                <p>
                  Through this website, you are able to link to other websites which are not under the control of How to Bangalore. We have no control over the nature, content, and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.
                </p>
              </div>
            </div>

            {/* No Warranty */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">No Warranty</h2>
              
              <div className="space-y-4 text-gray-700">
                <p>
                  This website is provided "as is" without any representations or warranties, express or implied. How to Bangalore makes no representations or warranties in relation to this website or the information and materials provided on this website.
                </p>
                <p>
                  Without prejudice to the generality of the foregoing paragraph, How to Bangalore does not warrant that:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    This website will be constantly available or available at all
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    The information on this website is complete, true, accurate, or non-misleading
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    The website will be free from errors or interruptions
                  </li>
                </ul>
              </div>
            </div>

            {/* User Responsibility */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">User Responsibility</h2>
              
              <div className="space-y-4 text-gray-700">
                <p>
                  As a user of this website, you acknowledge and agree that:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    You use this website at your own risk and discretion
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    You are responsible for verifying information independently
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    You should seek professional advice for important decisions
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    You understand that experiences may vary
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mb-12 bg-orange-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="bg-orange-100 p-3 rounded-lg mr-4">
                  <Heart className="h-6 w-6 text-orange-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Our Commitment</h2>
              </div>
              <div className="text-gray-700">
                <p className="mb-4">
                  Despite this disclaimer, we are committed to providing helpful, accurate, and practical information to help you thrive in Bangalore. We continuously update our content and welcome feedback from our community.
                </p>
                <p>
                  If you have questions about this disclaimer or notice any issues with our content, please contact us through our contact form. We appreciate your understanding and support.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default DisclaimerPage;