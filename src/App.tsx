import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Home } from './pages/Home';
import { ServicesPage } from './pages/ServicesPage';
import { ProductsPage } from './pages/ProductsPage';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { Quote } from './pages/Quote';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { Login } from './pages/Login';
import { AdminProducts } from './pages/AdminProducts';
import { AdminDashboard } from './pages/AdminDashboard';
import { Footer } from './components/layout/Footer';
import { Chatbot } from './components/ui/Chatbot';
import { CookieConsent } from './components/ui/CookieConsent';
import { AuthProvider } from './contexts/AuthContext';
import { PrivateRoute } from './components/PrivateRoute';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect } from 'react';

import { HelmetProvider } from 'react-helmet-async';
import { SEO } from './components/ui/SEO';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <SEO />
          <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen selection:bg-white selection:text-black"
          >
            <Navbar />
            
            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/servicos" element={<ServicesPage />} />
                <Route path="/produtos" element={<ProductsPage />} />
                <Route path="/sobre" element={<About />} />
                <Route path="/contato" element={<Contact />} />
                <Route path="/orcamento" element={<Quote />} />
                <Route path="/privacidade" element={<PrivacyPolicy />} />
                <Route path="/termos" element={<TermsOfService />} />
                <Route path="/login" element={<Login />} />
                <Route path="/admin" element={
                  <PrivateRoute adminOnly>
                    <AdminDashboard />
                  </PrivateRoute>
                } />
                <Route path="/admin/products" element={
                  <PrivateRoute adminOnly>
                    <AdminProducts />
                  </PrivateRoute>
                } />
              </Routes>
            </main>

            <Footer />
            <Chatbot />
            <CookieConsent />
          </motion.div>
        </AnimatePresence>
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}
