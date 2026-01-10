import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download as DownloadIcon, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';
import { usePortfolioContext } from '../context/PortfolioContext';
import { downloadPortfolio } from '../services/api';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Stepper from '../components/ui/Stepper';

/**
 * Premium Download Page
 * Success page with download option and celebration animations
 */
const Download = () => {
  const navigate = useNavigate();
  const { portfolioBlob, filename, clearPortfolio } = usePortfolioContext();

  const steps = ['Upload Resume', 'AI Process', 'Download'];

  // Redirect if no portfolio available
  useEffect(() => {
    if (!portfolioBlob) {
      navigate('/');
    }
  }, [portfolioBlob, navigate]);

  if (!portfolioBlob) {
    return null;
  }

  /**
   * Handle download
   */
  const handleDownload = () => {
    downloadPortfolio(portfolioBlob, filename);
  };

  /**
   * Start over
   */
  const handleStartOver = () => {
    clearPortfolio();
    navigate('/upload');
  };

  // Confetti effect
  const confettiColors = ['#3b82f6', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 md:py-20">
      <div className="max-w-4xl w-full space-y-8 md:space-y-12">
        {/* Stepper */}
        <Stepper currentStep={3} steps={steps} />

        <Card>
          <div className="space-y-8">
            {/* Success Animation */}
            <div className="relative">
              {/* Confetti particles */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute top-0 left-1/2 w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: confettiColors[i % confettiColors.length],
                  }}
                  initial={{
                    x: 0,
                    y: 0,
                    rotate: 0,
                    opacity: 1,
                  }}
                  animate={{
                    x: (Math.random() - 0.5) * 400,
                    y: 300 + Math.random() * 200,
                    rotate: 360,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 2 + Math.random(),
                    delay: Math.random() * 0.5,
                    ease: "easeOut",
                  }}
                />
              ))}

              {/* Success Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="relative w-32 h-32 mx-auto"
              >
                <motion.div
                  className="w-32 h-32 bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-2xl"
                  animate={{
                    boxShadow: [
                      '0 0 0 0 rgba(16, 185, 129, 0.7)',
                      '0 0 0 20px rgba(16, 185, 129, 0)',
                      '0 0 0 0 rgba(16, 185, 129, 0)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  <CheckCircle className="w-16 h-16 text-white" />
                </motion.div>
              </motion.div>
            </div>

            {/* Success Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center space-y-4"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
                Portfolio Ready!
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                Your AI-generated portfolio has been created successfully and is ready to deploy
              </p>
            </motion.div>

            {/* Info Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                    <DownloadIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                      Download Package
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      Your portfolio ZIP file contains all HTML, CSS, and JavaScript files ready for deployment.
                    </p>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                      Deploy Anywhere
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm">
                      Upload to Netlify, Vercel, GitHub Pages, or any static hosting service.
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
            >
              <Button
                size="lg"
                onClick={handleDownload}
                icon={<DownloadIcon className="w-5 h-5" />}
              >
                Download Portfolio ZIP
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={handleStartOver}
                icon={<ArrowRight className="w-5 h-5" />}
              >
                Create Another
              </Button>
            </motion.div>

            {/* File Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-center pt-6 border-t border-slate-200 dark:border-slate-800"
            >
              <p className="text-sm text-slate-500 dark:text-slate-500">
                File: <span className="font-semibold text-slate-700 dark:text-slate-300">{filename}</span>
              </p>
            </motion.div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Download;
