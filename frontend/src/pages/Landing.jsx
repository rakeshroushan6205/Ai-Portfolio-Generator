import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Sparkles, Upload, Zap, Download, ArrowRight } from "lucide-react";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";

/**
 * Premium Landing Page
 * Hero section with animated headline, feature cards, and CTA
 */
const Landing = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const features = [
    {
      icon: Upload,
      title: "Upload Resume",
      description:
        "Simply drag and drop your PDF or DOCX resume. Our AI will extract all your key information.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Zap,
      title: "AI Generation",
      description:
        "Watch as AI creates a stunning, responsive portfolio tailored to your career profile in seconds.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Download,
      title: "Download & Deploy",
      description:
        "Get a production-ready ZIP file with all HTML, CSS, and JS assets. Download & Deploy anywhere instantly.",
      gradient: "from-amber-500 to-orange-500",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex items-center justify-center px-4 py-20 md:py-32">
        <div className="max-w-7xl w-full">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center space-y-8 md:space-y-12"
          >
            {/* Badge */}
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-semibold text-blue-600 dark:text-blue-400">
                <Sparkles className="w-4 h-4" />
                AI Powered
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div
              variants={itemVariants}
              className="space-y-4 md:space-y-6"
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
                <span className="block text-slate-900 dark:text-white">
                  Turn Your Resume
                </span>
                <motion.span
                  className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ["0%", "100%", "0%"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    backgroundSize: "200% 100%",
                  }}
                >
                  Into a Portfolio
                </motion.span>
              </h1>
              <p className="text-xl md:text-2xl lg:text-3xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto font-light">
                Generate a stunning, deployment-ready portfolio website in
                seconds using the power of AI
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button
                size="xl"
                onClick={() => navigate("/upload")}
                icon={<ArrowRight className="w-5 h-5" />}
              >
                Generate My Portfolio
              </Button>
              <Button
                variant="outline"
                size="xl"
                onClick={() => {
                  document
                    .getElementById("features")
                    .scrollIntoView({ behavior: "smooth" });
                }}
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Three simple steps to transform your resume into a professional
              portfolio
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card hover className="h-full">
                    <div className="space-y-4">
                      <div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} p-4 flex items-center justify-center`}
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                        {feature.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 md:py-32 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="text-center p-12 md:p-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
              Ready to Build Your Portfolio?
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who have transformed their resumes
              into stunning portfolios
            </p>
            <Button
              size="xl"
              onClick={() => navigate("/upload")}
              icon={<ArrowRight className="w-5 h-5" />}
            >
              Get Started Now
            </Button>
          </Card>
        </motion.div>
      </section>
    </div>
  );
};

export default Landing;
