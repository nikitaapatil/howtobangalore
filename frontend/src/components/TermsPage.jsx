import React from 'react';
import { FileText, AlertCircle, Scale, Users, Shield } from 'lucide-react';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-amber-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-orange-500 text-white p-3 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
            <FileText className="h-8 w-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Terms of Service
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            These terms govern your use of How to Bangalore. Please read them carefully.
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
            
            {/* Agreement */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="bg-orange-100 p-3 rounded-lg mr-4">
                  <Scale className="h-6 w-6 text-orange-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Agreement to Terms</h2>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <p>
                  By accessing and using the How to Bangalore website ("Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
                <p>
                  These Terms of Service ("Terms") govern your relationship with How to Bangalore ("us", "we", or "our") operated by our team.
                </p>
              </div>
            </div>

            {/* Use of Service */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="bg-orange-100 p-3 rounded-lg mr-4">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Use of Service</h2>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <h3 className="text-xl font-semibold text-gray-900">Permitted Use</h3>
                <p>You may use our Service for lawful purposes only. You agree to use the Service in accordance with:</p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    All applicable laws and regulations
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    These Terms of Service
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    Any applicable third-party terms
                  </li>
                </ul>
                
                <h3 className="text-xl font-semibold text-gray-900 mt-6">Prohibited Use</h3>
                <p>You may not use our Service:</p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    For any unlawful purpose or to solicit others to perform unlawful acts
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    To infringe upon or violate our intellectual property rights or the intellectual property rights of others
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    To submit false or misleading information
                  </li>
                </ul>
              </div>
            </div>

            {/* Content and Intellectual Property */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="bg-orange-100 p-3 rounded-lg mr-4">
                  <Shield className="h-6 w-6 text-orange-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Content and Intellectual Property</h2>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <h3 className="text-xl font-semibold text-gray-900">Our Content</h3>
                <p>
                  The Service and its original content, features, and functionality are and will remain the exclusive property of How to Bangalore and its licensors. The Service is protected by copyright, trademark, and other laws.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 mt-6">Your Content</h3>
                <p>
                  Our Service may allow you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("Content"). You are responsible for Content that you post to the Service, including its legality, reliability, and appropriateness.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-900 mt-6">Content License</h3>
                <p>
                  By posting Content to the Service, You grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such Content on and through the Service.
                </p>
              </div>
            </div>

            {/* Disclaimer */}
            <div className="mb-12">
              <div className="flex items-center mb-6">
                <div className="bg-orange-100 p-3 rounded-lg mr-4">
                  <AlertCircle className="h-6 w-6 text-orange-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Disclaimer</h2>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <p>
                  The information on this website is provided on an "as is" basis. To the fullest extent permitted by law, this Company:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    Excludes all representations and warranties relating to this website and its contents
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2">•</span>
                    Excludes all liability for damages arising out of or in connection with your use of this website
                  </li>
                </ul>
                <p>
                  This website provides general information about living in Bangalore. It is not intended as professional advice and should not be relied upon as such. You should consult with appropriate professionals for specific situations.
                </p>
              </div>
            </div>

            {/* Limitation of Liability */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Limitation of Liability</h2>
              
              <div className="space-y-4 text-gray-700">
                <p>
                  In no event shall How to Bangalore, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of the Service.
                </p>
                <p>
                  Our total liability to you for all claims arising out of or related to these Terms or the Service shall not exceed the amount paid by you (if any) for accessing the Service.
                </p>
              </div>
            </div>

            {/* Indemnification */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Indemnification</h2>
              
              <div className="text-gray-700">
                <p>
                  You agree to defend, indemnify, and hold harmless How to Bangalore and its licensee and licensors, and their employees, contractors, agents, officers and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney's fees).
                </p>
              </div>
            </div>

            {/* Termination */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Termination</h2>
              
              <div className="space-y-4 text-gray-700">
                <p>
                  We may terminate or suspend your access immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                </p>
                <p>
                  Upon termination, your right to use the Service will cease immediately. If you wish to terminate your account, you may simply discontinue using the Service.
                </p>
              </div>
            </div>

            {/* Governing Law */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Governing Law</h2>
              
              <div className="text-gray-700">
                <p>
                  These Terms shall be interpreted and governed by the laws of India, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                </p>
              </div>
            </div>

            {/* Changes to Terms */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Changes to Terms</h2>
              
              <div className="text-gray-700">
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
                </p>
                <p>
                  By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
                </p>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mb-12 bg-orange-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
              <div className="text-gray-700">
                <p className="mb-4">
                  If you have any questions about these Terms of Service, please contact us through our contact form or by visiting our Contact page.
                </p>
                <p>
                  We will respond to your inquiry within a reasonable timeframe.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsPage;