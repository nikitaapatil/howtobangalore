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
import AdminAuth from "./components/admin/AdminAuth";
import AdminDashboard from "./components/admin/AdminDashboard";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { Toaster } from "./components/ui/toaster";

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
                <AdminDashboard />
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
                  <Route path="/contact" element={<div className="py-20 text-center"><h1 className="text-3xl font-bold">Contact Us</h1><p className="mt-4">Coming soon...</p></div>} />
                  <Route path="/privacy" element={<div className="py-20 text-center"><h1 className="text-3xl font-bold">Privacy Policy</h1><p className="mt-4">Coming soon...</p></div>} />
                  <Route path="/terms" element={<div className="py-20 text-center"><h1 className="text-3xl font-bold">Terms of Service</h1><p className="mt-4">Coming soon...</p></div>} />
                  <Route path="/disclaimer" element={<div className="py-20 text-center"><h1 className="text-3xl font-bold">Disclaimer</h1><p className="mt-4">Coming soon...</p></div>} />
                  <Route path="/sitemap" element={<div className="py-20 text-center"><h1 className="text-3xl font-bold">Sitemap</h1><p className="mt-4">Coming soon...</p></div>} />
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