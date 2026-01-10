import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { PortfolioProvider } from './context/PortfolioContext';
import { ToastProvider } from './components/ui/Toast';
import MainLayout from './layouts/MainLayout';
import Landing from './pages/Landing';
import Upload from './pages/Upload';
import Generate from './pages/Generate';
import Download from './pages/Download';

/**
 * Main App Component
 * Sets up all providers, routing, and layout
 */
function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <PortfolioProvider>
          <Router>
            <MainLayout>
              <AnimatePresence mode="wait">
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/upload" element={<Upload />} />
                  <Route path="/generate" element={<Generate />} />
                  <Route path="/download" element={<Download />} />
                </Routes>
              </AnimatePresence>
            </MainLayout>
          </Router>
        </PortfolioProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
