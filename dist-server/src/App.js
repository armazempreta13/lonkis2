import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsx(HelmetProvider, { children: _jsxs(Router, { children: [_jsx(ScrollToTop, {}), _jsx(SEO, {}), _jsx(AnimatePresence, { mode: "wait", children: _jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "min-h-screen selection:bg-white selection:text-black", children: [_jsx(Navbar, {}), _jsx("main", { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/servicos", element: _jsx(ServicesPage, {}) }), _jsx(Route, { path: "/produtos", element: _jsx(ProductsPage, {}) }), _jsx(Route, { path: "/sobre", element: _jsx(About, {}) }), _jsx(Route, { path: "/contato", element: _jsx(Contact, {}) }), _jsx(Route, { path: "/privacidade", element: _jsx(PrivacyPolicy, {}) }), _jsx(Route, { path: "/termos", element: _jsx(TermsOfService, {}) })] }) }), _jsx(Footer, {}), _jsx(Chatbot, {}), _jsx(CookieConsent, {})] }) })] }) }));
}
