import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Users, Target, Heart, ArrowRight, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 to-amber-50 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-orange-500 text-white p-3 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
            <MapPin className="h-8 w-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About How to Bangalore
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Your pragmatic guide to thriving in India's Silicon Valley. We bridge the gap between 
            Bangalore's promise and reality with honest, actionable advice.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                We believe every migrant to Bangalore deserves to succeed, not just survive. 
                Our mission is to provide the insider knowledge and practical tools that make 
                the difference between struggling and thriving in this complex city.
              </p>
              <p className="text-gray-600 mb-6">
                Born from real experiences of navigating the "Bangalore Paradox" - the gap 
                between the city's reputation as a land of opportunity and the daily challenges 
                of infrastructure, cost of living, and urban complexity.
              </p>
              <div className="flex items-center space-x-4">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <Target className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Practical Solutions</h3>
                  <p className="text-gray-600 text-sm">Real advice from real experience</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">The Bangalore Paradox</h3>
              <p className="text-gray-700 mb-4">
                Bangalore attracts thousands with promises of lucrative IT jobs and cosmopolitan living. 
                But the reality often includes:
              </p>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  Infrastructure challenges and traffic woes
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  High cost of living vs. quality of life gaps
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  Cultural and linguistic barriers
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  Complex bureaucracy and utility systems
                </li>
              </ul>
              <p className="text-gray-700 mt-4 font-medium">
                Our guides help you navigate these challenges effectively.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">What We Offer</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive guides covering every aspect of Bangalore life, from finding 
              the right neighborhood to mastering the city's unique challenges.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="bg-orange-100 p-3 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle>100+ Comprehensive Guides</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Detailed articles covering housing, transport, utilities, lifestyle, and exploration 
                  - everything you need to know about Bangalore life.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="bg-orange-100 p-3 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Target className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle>Practical Solutions</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Real-world advice based on actual experiences, not theoretical knowledge. 
                  Every tip has been tested in the field.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="bg-orange-100 p-3 rounded-lg w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Heart className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle>Honest Perspective</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  We don't sell dreams - we provide realistic expectations and genuine solutions 
                  to help you make informed decisions.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Approach</h2>
            <p className="text-lg text-gray-600">
              We combine insider knowledge with practical research to deliver actionable advice.
            </p>
          </div>
          
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="bg-orange-500 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Real Experience</h3>
                <p className="text-gray-600">
                  Every guide is based on actual experiences of living, working, and thriving in Bangalore. 
                  We've walked the walk, not just talked the talk.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-orange-500 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Comprehensive Research</h3>
                <p className="text-gray-600">
                  We dive deep into every topic, covering not just the what, but the how, when, where, 
                  and why of Bangalore life decisions.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-orange-500 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Regular Updates</h3>
                <p className="text-gray-600">
                  Bangalore changes rapidly. We continuously update our guides to reflect current 
                  realities, prices, and best practices.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-orange-500 text-white p-2 rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm flex-shrink-0">
                4
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Community Focused</h3>
                <p className="text-gray-600">
                  We understand the unique challenges faced by IT professionals, migrants, and 
                  newcomers to create content that truly serves their needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Get in Touch</h2>
          <p className="text-lg text-gray-600 mb-8">
            Have questions, suggestions, or want to share your Bangalore experience? We'd love to hear from you.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button size="lg" className="px-8 py-3">
              <Mail className="h-5 w-5 mr-2" />
              <a href="mailto:hello@howtobangalore.com">hello@howtobangalore.com</a>
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3">
              <Link to="/contact">Contact Form</Link>
            </Button>
          </div>
          
          <p className="text-gray-600">
            We typically respond within 24-48 hours and value every piece of feedback we receive.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-amber-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Master Bangalore?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Start with our most popular guides and build your Bangalore success story.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="px-8 py-3">
              <Link to="/category/housing" className="flex items-center">
                Start with Housing
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="px-8 py-3 border-white text-white hover:bg-white hover:text-orange-600">
              <Link to="/">Browse All Categories</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;