
import React, { Suspense } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingWhatsAppButton from './components/FloatingWhatsAppButton';
import LoadingSpinner from './components/LoadingSpinner';

// Static imports for all page components
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import CheckFarePage from './pages/CheckFarePage';
import JoinDriverPage from './pages/JoinDriverPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import NotFoundPage from './pages/NotFoundPage';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-soft-cream"> {/* Ensure main bg is soft-cream */}
        <Navbar />
        <main className="flex-grow pt-20"> {/* pt-20 to offset fixed navbar height (h-20) */}
          <Suspense fallback={
            <div className="flex flex-col justify-center items-center h-[calc(100vh-10rem)]"> {/* Adjust height for navbar/footer */}
              <LoadingSpinner text="Memuat halaman..." size="lg" color="text-ternoae-green"/>
            </div>
          }>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/layanan" element={<ServicesPage />} />
              <Route path="/ongkir" element={<CheckFarePage />} />
              <Route path="/driver" element={<JoinDriverPage />} />
              <Route path="/tentang" element={<AboutPage />} />
              <Route path="/kontak" element={<ContactPage />} />
              <Route path="/blog" element={<BlogPage />} />
              {/* Individual blog post page would be: <Route path="/blog/:slug" element={<BlogArticlePage />} /> */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
        <FloatingWhatsAppButton />
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;