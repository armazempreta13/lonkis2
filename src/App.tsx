import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Home } from './pages/Home';
import { ServicesPage } from './pages/ServicesPage';
import { ProductsPage } from './pages/ProductsPage';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { Footer } from './components/layout/Footer';
import { Chatbot } from './components/ui/Chatbot';
import { CookieConsent } from './components/ui/CookieConsent';
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
              <Route path="/privacidade" element={<PrivacyPolicy />} />
              <Route path="/termos" element={<TermsOfService />} />
            </Routes>
          </main>

          <Footer />
          <Chatbot />
          <CookieConsent />
        </motion.div>
      </AnimatePresence>
      </Router>
    </HelmetProvider>
  );
}
