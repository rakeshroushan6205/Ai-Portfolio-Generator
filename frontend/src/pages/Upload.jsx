import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload as UploadIcon, File, X, Check } from 'lucide-react';
import { usePortfolioContext } from '../context/PortfolioContext';
import { useToast } from '../components/ui/Toast';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Stepper from '../components/ui/Stepper';

/**
 * Premium Upload Page
 * Drag & drop file upload with animations and preview
 */
const Upload = () => {
  const navigate = useNavigate();
  const { setResumeFile } = usePortfolioContext();
  const { showToast } = useToast();
  const [selectedFile, setSelectedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const steps = ['Upload Resume', 'AI Process', 'Download'];

  /**
   * Validate and handle file selection
   */
  const handleFile = (file) => {
    if (!file) return;

    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword'
    ];

    if (!allowedTypes.includes(file.type)) {
      showToast('Invalid file type. Please upload a PDF or DOCX file.', 'error');
      return;
    }

    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      showToast('File size exceeds 10MB limit.', 'error');
      return;
    }

    setSelectedFile(file);
    showToast('File selected successfully!', 'success');
  };

  /**
   * Handle drag events
   */
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  /**
   * Handle drop event
   */
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  /**
   * Handle file input change
   */
  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  /**
   * Continue to generation page
   */
  const handleContinue = () => {
    if (selectedFile) {
      setResumeFile(selectedFile);
      navigate('/generate', { state: { file: selectedFile } });
    } else {
      showToast('Please select a file first.', 'warning');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 md:py-20">
      <div className="max-w-4xl w-full space-y-8 md:space-y-12">
        {/* Stepper */}
        <Stepper currentStep={1} steps={steps} />

        <Card>
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center space-y-2">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                Upload Your Resume
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Drag and drop your resume file or click to browse
              </p>
            </div>

            {/* File Drop Zone */}
            <motion.div
              className={`
                relative border-2 border-dashed rounded-2xl p-12 md:p-16 text-center cursor-pointer
                transition-all duration-300 overflow-hidden
                ${
                  dragActive
                    ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20 scale-105'
                    : selectedFile
                    ? 'border-green-500 bg-green-50/50 dark:bg-green-900/20'
                    : 'border-slate-300 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-600'
                }
              `}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              whileHover={{ scale: dragActive ? 1.05 : 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.doc"
                onChange={handleChange}
                className="hidden"
              />

              {/* Background gradient animation */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10"
                animate={{
                  x: dragActive ? [0, 100, 0] : 0,
                }}
                transition={{
                  duration: 2,
                  repeat: dragActive ? Infinity : 0,
                }}
              />

              <AnimatePresence mode="wait">
                {selectedFile ? (
                  <motion.div
                    key="file-selected"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="space-y-6 relative z-10"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="w-20 h-20 mx-auto bg-green-500 rounded-full flex items-center justify-center"
                    >
                      <Check className="w-10 h-10 text-white" />
                    </motion.div>
                    <div>
                      <p className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                        {selectedFile.name}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFile(null);
                        if (fileInputRef.current) {
                          fileInputRef.current.value = '';
                        }
                      }}
                      icon={<X className="w-4 h-4" />}
                    >
                      Remove File
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="file-upload"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-6 relative z-10"
                  >
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center"
                    >
                      <UploadIcon className="w-10 h-10 text-white" />
                    </motion.div>
                    <div>
                      <p className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                        Drag & drop your resume here
                      </p>
                      <p className="text-slate-600 dark:text-slate-400 mb-1">
                        or click to browse files
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-500 mt-4">
                        Supports PDF and DOCX (Max 10MB)
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <Button variant="secondary" onClick={() => navigate('/')}>
                Back to Home
              </Button>
              <Button
                variant="primary"
                onClick={handleContinue}
                disabled={!selectedFile}
                icon={<UploadIcon className="w-5 h-5" />}
              >
                Continue
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Upload;
