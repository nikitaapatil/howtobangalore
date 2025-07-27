import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { ChevronLeft, Eye, EyeOff } from 'lucide-react';

const AdminAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [isFirstUser, setIsFirstUser] = useState(false);

  const { login, register } = useAuth();

  useEffect(() => {
    // Check if this is the first user registration
    const checkFirstUser = async () => {
      try {
        const API_BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';
        const response = await fetch(`${API_BASE_URL}/api/admin/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: 'test', email: 'test', password: 'test' }),
        });
        
        if (response.status === 400) {
          const errorData = await response.json();
          if (errorData.detail && errorData.detail.includes('already exists')) {
            setIsFirstUser(false);
            setIsLogin(true);
          }
        } else {
          setIsFirstUser(true);
          setIsLogin(false);
        }
      } catch (error) {
        // Assume it's the first user if we can't determine
        setIsFirstUser(true);
        setIsLogin(false);
      }
    };

    checkFirstUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let result;
      if (isLogin) {
        result = await login(formData.username, formData.password);
      } else {
        result = await register(formData.username, formData.email, formData.password);
      }

      if (!result.success) {
        setError(result.error);
      }
      // Success case is handled by the AuthContext
    } catch (error) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Back to main site */}
      <div className="absolute top-4 left-4">
        <a
          href="/"
          className="inline-flex items-center text-orange-600 hover:text-orange-500"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to How to Bangalore
        </a>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <div className="bg-orange-500 rounded-lg p-3">
            <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {isFirstUser 
            ? 'Set up Admin Account' 
            : isLogin 
              ? 'Sign in to Admin Panel' 
              : 'Create Admin Account'
          }
        </h2>
        {isFirstUser && (
          <p className="mt-2 text-center text-sm text-gray-600">
            Welcome! Create your admin account to manage articles.
          </p>
        )}
        {!isLogin && !isFirstUser && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm text-blue-800 text-center">
              <strong>Note:</strong> Admin registration is restricted to authorized users only.
            </p>
          </div>
        )}
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleInputChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            {!isLogin && (
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">{error}</div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    {isLogin ? 'Signing in...' : 'Creating account...'}
                  </div>
                ) : (
                  isLogin ? 'Sign in' : 'Create account'
                )}
              </button>
            </div>

            {!isFirstUser && (
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError('');
                    setFormData({ username: '', email: '', password: '' });
                  }}
                  className="text-sm text-orange-600 hover:text-orange-500"
                >
                  {isLogin 
                    ? "Don't have an account? Create one" 
                    : 'Already have an account? Sign in'
                  }
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminAuth;