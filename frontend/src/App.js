import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import CategoryPage from "./components/CategoryPage";
import BlogPost from "./components/BlogPost";
import SearchResults from "./components/SearchResults";
import AboutPage from "./components/AboutPage";
import ContactPage from "./components/ContactPage";
import PrivacyPage from "./components/PrivacyPage";
import TermsPage from "./components/TermsPage";
import DisclaimerPage from "./components/DisclaimerPage";
import SitemapPage from "./components/SitemapPage";
import AdminAuth from "./components/admin/AdminAuth";
import AdminDashboard from "./components/admin/AdminDashboard";
import ArticleEditor from "./components/admin/ArticleEditor";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Toaster } from "./components/ui/toaster";

// Add enhanced reading styles
const readerStyles = `
  .reader-friendly-content {
    line-height: 1.8;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif;
  }
  
  .reader-friendly-content h1 {
    font-size: 2.5rem;
    line-height: 1.2;
    margin-top: 3rem;
    margin-bottom: 1.5rem;
    color: #1f2937;
    font-weight: 800;
    letter-spacing: -0.025em;
  }
  
  .reader-friendly-content h2 {
    font-size: 2rem;
    line-height: 1.3;
    margin-top: 2.5rem;
    margin-bottom: 1.25rem;
    color: #ea580c;
    font-weight: 700;
    letter-spacing: -0.025em;
  }
  
  .reader-friendly-content h3 {
    font-size: 1.5rem;
    line-height: 1.4;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: #374151;
    font-weight: 600;
  }
  
  .reader-friendly-content p {
    font-size: 1.125rem;
    line-height: 1.8;
    margin-bottom: 1.5rem;
    color: #374151;
    font-weight: 400;
  }
  
  .reader-friendly-content ul,
  .reader-friendly-content ol {
    margin-bottom: 1.5rem;
    padding-left: 1.5rem;
  }
  
  .reader-friendly-content li {
    font-size: 1.125rem;
    line-height: 1.7;
    margin-bottom: 0.5rem;
    color: #374151;
  }
  
  .reader-friendly-content blockquote {
    border-left: 4px solid #f97316;
    background: #fff7ed;
    padding: 1.5rem;
    margin: 2rem 0;
    border-radius: 0 0.5rem 0.5rem 0;
    font-style: italic;
    font-size: 1.125rem;
    color: #9a3412;
  }
  
  .reader-friendly-content code {
    background: #f3f4f6;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-family: 'Fira Code', 'Monaco', 'Cascadia Code', 'Roboto Mono', monospace;
    font-size: 0.875rem;
  }
  
  .reader-friendly-content pre {
    background: #1f2937;
    color: #f9fafb;
    padding: 1.5rem;
    border-radius: 0.5rem;
    overflow-x: auto;
    margin: 1.5rem 0;
  }
  
  .reader-friendly-content img {
    border-radius: 0.5rem;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
    margin: 2rem auto;
    max-width: 100%;
    height: auto;
  }
  
  .reader-friendly-content table {
    width: 100%;
    border-collapse: collapse;
    margin: 2rem 0;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    border-radius: 0.5rem;
    overflow: hidden;
  }
  
  .reader-friendly-content th {
    background: #ea580c;
    color: white;
    font-weight: 600;
    padding: 1rem;
    text-align: left;
  }
  
  .reader-friendly-content td {
    padding: 1rem;
    border-bottom: 1px solid #e5e7eb;
  }
  
  .reader-friendly-content tr:nth-child(even) {
    background: #f9fafb;
  }
  
  .reader-friendly-content tr:hover {
    background: #f3f4f6;
  }
  
  .reader-friendly-content a {
    color: #ea580c;
    font-weight: 500;
    text-decoration: none;
    border-bottom: 1px solid transparent;
    transition: all 0.2s ease;
  }
  
  .reader-friendly-content a:hover {
    color: #c2410c;
    border-bottom-color: #c2410c;
  }
  
  @media (max-width: 768px) {
    .reader-friendly-content h1 {
      font-size: 2rem;
    }
    
    .reader-friendly-content h2 {
      font-size: 1.75rem;
    }
    
    .reader-friendly-content h3 {
      font-size: 1.25rem;
    }
    
    .reader-friendly-content p,
    .reader-friendly-content li {
      font-size: 1rem;
    }
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = readerStyles;
  document.head.appendChild(style);
}

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return isAuthenticated ? children : <AdminAuth />;
};

// Main App Component
function AppContent() {
  return (
    <div className="App min-h-screen flex flex-col">
      <BrowserRouter>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminAuth />} />
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute>
                <Routes>
                  <Route path="/" element={<AdminDashboard />} />
                  <Route path="/articles/edit/:articleId" element={<ArticleEditor />} />
                  <Route path="/articles/new" element={<ArticleEditor />} />
                </Routes>
              </ProtectedRoute>
            } 
          />
          
          {/* Public Routes */}
          <Route path="/*" element={
            <>
              <Header />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/category/:categoryId" element={<CategoryPage />} />
                  <Route path="/category/:categoryId/:subcategoryId" element={<CategoryPage />} />
                  <Route path="/post/:postId" element={<BlogPost />} />
                  <Route path="/:slug" element={<BlogPost />} />
                  <Route path="/search" element={<SearchResults />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/privacy" element={<PrivacyPage />} />
                  <Route path="/terms" element={<TermsPage />} />
                  <Route path="/disclaimer" element={<DisclaimerPage />} />
                  <Route path="/sitemap" element={<SitemapPage />} />
                </Routes>
              </main>
              <Footer />
            </>
          } />
        </Routes>
        <Toaster />
      </BrowserRouter>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;