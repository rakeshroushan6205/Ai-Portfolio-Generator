import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, CheckCircle, AlertCircle } from 'lucide-react';
import { usePortfolioContext } from '../context/PortfolioContext';
import { useToast } from '../components/ui/Toast';
import { generatePortfolio, downloadPortfolio } from '../services/api';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Loader from '../components/ui/Loader';
import Stepper from '../components/ui/Stepper';

/**
 * Premium Generate Page
 * Shows AI generation process with animated stepper and loader
 */
const Generate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setPortfolioBlob, setFilename, setResumeFile } = usePortfolioContext();
  const { showToast } = useToast();
  
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);

  const steps = ['Upload Resume', 'AI Process', 'Download'];

  // Generation steps with messages
  const generationSteps = [
    'Parsing your resume...',
    'Extracting skills and experience...',
    'Analyzing your career profile...',
    'Generating portfolio content...',
    'Creating website structure...',
    'Applying design styles...',
    'Optimizing for performance...',
    'Packaging files...',
  ];

  // Get file from location state
  useEffect(() => {
    const resumeFile = location.state?.file;
    if (resumeFile) {
      setFile(resumeFile);
      setResumeFile(resumeFile);
      // Auto-start generation
      handleGenerate(resumeFile);
    } else {
      navigate('/upload');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  /**
   * Generate portfolio from resume
   */
  const handleGenerate = async (fileToGenerate) => {
    const resumeFile = fileToGenerate || file;
    if (!resumeFile) {
      setError('No file selected.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);
    setProgress(0);
    setCurrentStep(2);

    // Simulate step progression
    let currentStepIndex = 0;
    const stepInterval = setInterval(() => {
      if (currentStepIndex < generationSteps.length) {
        setProgress(((currentStepIndex + 1) / generationSteps.length) * 100);
        currentStepIndex++;
      } else {
        clearInterval(stepInterval);
      }
    }, 3000);

    try {
      const response = await generatePortfolio(resumeFile, (uploadProgress) => {
        // Update progress during upload
        if (uploadProgress < 50) {
          setProgress(uploadProgress);
        }
      });

      clearInterval(stepInterval);
      setProgress(100);
      
      // Store portfolio data
      const portfolioFilename = `portfolio_${resumeFile.name.split('.')[0]}.zip`;
      setPortfolioBlob(response.data);
      setFilename(portfolioFilename);
      
      setSuccess(true);
      setLoading(false);
      setCurrentStep(3);

      // Auto-download
      downloadPortfolio(response.data, portfolioFilename);
      showToast('Portfolio generated successfully!', 'success');

      // Navigate to download page
      setTimeout(() => {
        navigate('/download');
      }, 2000);

    } catch (err) {
      clearInterval(stepInterval);
      setError(err.message || 'Failed to generate portfolio. Please try again.');
      setLoading(false);
      setProgress(0);
      setCurrentStep(1);
      showToast(err.message || 'Generation failed. Please try again.', 'error');
    }
  };

  /**
   * Retry generation
   */
  const handleRetry = () => {
    handleGenerate();
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 md:py-20">
      <div className="max-w-4xl w-full space-y-8 md:space-y-12">
        {/* Stepper */}
        <Stepper currentStep={currentStep} steps={steps} />

        <Card>
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-2">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                {loading ? 'Generating Your Portfolio' : success ? 'Generation Complete!' : error ? 'Generation Failed' : 'Ready to Generate'}
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                {file && `Processing: ${file.name}`}
              </p>
            </div>

            {/* Loading State */}
            <AnimatePresence mode="wait">
              {loading && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-8 py-12"
                >
                  <Loader
                    variant="spinner"
                    size="lg"
                    messages={generationSteps}
                  />
                  
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      />
                    </div>
                    <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                      <span>Processing...</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                  </div>

                  {/* Animated sparkles */}
                  <div className="flex justify-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          y: [0, -10, 0],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      >
                        <Sparkles className="w-5 h-5 text-purple-500" />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Success State */}
              {success && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="space-y-6 py-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-24 h-24 mx-auto bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center"
                  >
                    <CheckCircle className="w-12 h-12 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                      Success!
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      Your portfolio has been generated and is downloading...
                    </p>
                  </div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-sm text-slate-500 dark:text-slate-500"
                  >
                    Redirecting to download page...
                  </motion.p>
                </motion.div>
              )}

              {/* Error State */}
              {error && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6 py-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="w-24 h-24 mx-auto bg-gradient-to-br from-red-500 to-rose-500 rounded-full flex items-center justify-center"
                  >
                    <AlertCircle className="w-12 h-12 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                      Generation Failed
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      {error}
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="secondary" onClick={() => navigate('/upload')}>
                      Back to Upload
                    </Button>
                    <Button variant="primary" onClick={handleRetry}>
                      Try Again
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Generate;
