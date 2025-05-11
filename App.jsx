
    import React, { Suspense, lazy } from 'react';
    import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
    import { Toaster } from '@/components/ui/toaster';
    import MainLayout from '@/components/layout/MainLayout';
    import LoadingSpinner from '@/components/shared/LoadingSpinner';
    import { AuthProvider, useAuth } from '@/contexts/AuthContext';
    import Header from '@/components/layout/Header'; 
    import Footer from '@/components/layout/Footer';

    const HomePage = lazy(() => import('@/pages/HomePage'));
    const AboutPage = lazy(() => import('@/pages/AboutPage'));
    const FeaturesPage = lazy(() => import('@/pages/FeaturesPage'));
    const SolutionsPage = lazy(() => import('@/pages/SolutionsPage'));
    const PricingPage = lazy(() => import('@/pages/PricingPage'));
    const BlogPage = lazy(() => import('@/pages/BlogPage.jsx'));
    const ContactPage = lazy(() => import('@/pages/ContactPage'));
    const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));
    const PrivacyPolicyPage = lazy(() => import('@/pages/PrivacyPolicyPage'));
    const TermsOfServicePage = lazy(() => import('@/pages/TermsOfServicePage'));


    const DashboardPage = lazy(() => import('@/pages/DashboardPage'));
    const LoginPage = lazy(() => import('@/pages/auth/LoginPage'));
    const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage'));
    const ChatPage = lazy(() => import('@/pages/ChatPage'));
    const DocumentsPage = lazy(() => import('@/pages/DocumentsPage'));
    const DocumentViewPage = lazy(() => import('@/pages/DocumentViewPage'));
    const LearningPage = lazy(() => import('@/pages/LearningPage'));
    const LearningModulePage = lazy(() => import('@/pages/LearningModulePage'));
    const ProfilePage = lazy(() => import('@/pages/ProfilePage'));
    const SettingsPage = lazy(() => import('@/pages/SettingsPage'));


    const ProtectedRoute = () => {
      const { isAuthenticated, isLoading } = useAuth(); 

      if (import.meta.env.DEV && !import.meta.env.VITE_FORCE_AUTH_CHECK) {
        return <MainLayout />;
      }
      
      if (isLoading) {
        return <LoadingSpinner message="Authenticating..." />;
      }

      if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
      }
      
      return <MainLayout />;
    };
    
    const PublicPageLayout = ({ children }) => (
      <div className="flex flex-col min-h-screen bg-brand-parchmentWhite dark:bg-brand-deepPurple">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    );

    const AppRoutes = () => {
      const { isLoading: authIsLoading, isAuthenticated } = useAuth();

      if (authIsLoading && !(import.meta.env.DEV && !import.meta.env.VITE_FORCE_AUTH_CHECK)) {
        return <LoadingSpinner message="Initializing Application..." />;
      }

      return (
        <Routes>
          <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
          <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <RegisterPage />} />
          
          <Route path="/" element={<PublicPageLayout><HomePage /></PublicPageLayout>} />
          <Route path="/about" element={<PublicPageLayout><AboutPage /></PublicPageLayout>} />
          <Route path="/features" element={<PublicPageLayout><FeaturesPage /></PublicPageLayout>} />
          <Route path="/solutions" element={<PublicPageLayout><SolutionsPage /></PublicPageLayout>} />
          <Route path="/pricing" element={<PublicPageLayout><PricingPage /></PublicPageLayout>} />
          <Route path="/blog" element={<PublicPageLayout><BlogPage /></PublicPageLayout>} />
          <Route path="/contact" element={<PublicPageLayout><ContactPage /></PublicPageLayout>} />
          <Route path="/privacy-policy" element={<PublicPageLayout><PrivacyPolicyPage /></PublicPageLayout>} />
          <Route path="/terms-of-service" element={<PublicPageLayout><TermsOfServicePage /></PublicPageLayout>} />
          
          <Route element={<ProtectedRoute />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="chat" element={<ChatPage />} />
            <Route path="documents" element={<DocumentsPage />} />
            <Route path="documents/:id" element={<DocumentViewPage />} />
            <Route path="learning" element={<LearningPage />} />
            <Route path="learning/:moduleId" element={<LearningModulePage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
          
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      );
    }


    function App() {
      return (
        <Router>
          <AuthProvider>
            <Suspense fallback={<LoadingSpinner />}>
              <AppRoutes />
            </Suspense>
            <Toaster />
          </AuthProvider>
        </Router>
      );
    }

    export default App;
  