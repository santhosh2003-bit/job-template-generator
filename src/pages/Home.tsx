import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Briefcase,
  CheckCircle,
  User,
  ArrowRight,
  FileUp,
  LayoutTemplate,
  Search,
  Upload,
  BarChart,
  FileCheck,
  Edit3,
  Send,
} from "lucide-react";
import Layout from "@/components/layout/Layout";

const Home = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const features = [
    {
      icon: <FileUp className="h-6 w-6 text-primary" />,
      title: "Easy Resume Upload",
      description:
        "Upload your existing resume and let our AI analyze it within seconds.",
    },
    {
      icon: <LayoutTemplate className="h-6 w-6 text-primary" />,
      title: "Beautiful Templates",
      description:
        "Choose from dozens of professionally designed templates to make your resume stand out.",
    },
    {
      icon: <Briefcase className="h-6 w-6 text-primary" />,
      title: "Job Matching",
      description:
        "Get matched with jobs that align with your skills and experience.",
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-primary" />,
      title: "Expert Recommendations",
      description:
        "Receive tailored advice to improve your resume and boost your chances.",
    },
  ];

  const testimonials = [
    {
      quote:
        "ResumeCraft helped me land interviews at three Fortune 500 companies within a week!",
      author: "Sarah J.",
      role: "Marketing Director",
    },
    {
      quote:
        "The AI-powered resume analysis gave me insights I never would have considered. Game changer!",
      author: "Michael T.",
      role: "Software Engineer",
    },
    {
      quote:
        "I was struggling to format my resume properly. ResumeCraft made it look professional in minutes.",
      author: "Alexis R.",
      role: "Recent Graduate",
    },
  ];

  return (
    <Layout fullWidth>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-accent/50 pt-32 pb-16 md:py-32">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-primary/10 to-transparent" />
          <div className="absolute h-40 w-40 rounded-full bg-primary/20 blur-3xl -top-10 -left-10" />
          <div className="absolute h-60 w-60 rounded-full bg-primary/10 blur-3xl top-1/3 right-1/3" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <motion.div
              initial="hidden"
              animate={isVisible ? "visible" : "hidden"}
              variants={staggerChildren}
              className="space-y-6"
            >
              <motion.div variants={fadeInUp}>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4">
                  Craft Your Career
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-4xl md:text-6xl font-bold tracking-tight"
              >
                Your Resume, <span className="text-primary">Perfected</span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
              >
                Transform your resume instantly with our AI-powered platform.
                Upload your current resume, get personalized templates, and
                connect with your dream job.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4"
              >
                <Button size="lg" asChild>
                  <Link to="/upload">
                    Upload Your Resume <FileText className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/templates">View Templates</Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From Resume to customised job application in 3 simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <Upload className="h-10 w-10 text-primary" />,
                title: "Upload Your Resume",
                description:
                  "Upload your existing resume or create a new one using our intuitive builder.",
                number: 1,
              },
              {
                icon: <BarChart className="h-10 w-10 text-primary" />,
                title: "AI Job Ranking",
                description:
                  "Our AI analyzes your resume and provides ranking of job descriptions matching your experience and skills.",
                number: 2,
              },
              {
                icon: <FileCheck className="h-10 w-10 text-primary" />,
                title: "Get custom resumes & apply",
                description:
                  "Get custom resumes generated for you for every matched job, modify if needed & hit apply.",
                number: 3,
              },
            ].map((step, index) => (
              <div
                key={index}
                className="glass-card shadow-lg p-6 rounded-xl relative flex flex-col items-center text-center"
              >
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  {step.icon}
                </div>
                <div className="absolute top-1 right-1/2 h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild>
              <Link to="/upload">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-accent/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to create professional resumes and land your
              dream job.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="glass-card p-6 rounded-xl shadow-xl transition-shadow duration-300"
              >
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Join thousands of professionals who've accelerated their careers
              with ResumeCraft.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="glass-card p-6 rounded-xl shadow-lg">
                <div className="mb-4 text-primary ">
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.605 4.5C8.69833 4.5 6.35 6.84833 6.35 9.755V19.5H16.095C18.9983 19.5 21.35 17.1517 21.35 14.245C21.35 11.3417 19.0017 9 16.095 9H14.35V11.5H16.095C17.615 11.5 18.85 12.735 18.85 14.255C18.85 15.7683 17.6083 17 16.095 17H8.84167V9.755C8.84167 8.235 10.0767 7 11.5967 7H14.3417V4.5H11.605Z"
                      fill="currentColor"
                    />
                    <path
                      d="M5.25 12.5C4.56 12.5 4 11.94 4 11.25V7.75C4 7.06 4.56 6.5 5.25 6.5C5.94 6.5 6.5 7.06 6.5 7.75V11.25C6.5 11.94 5.94 12.5 5.25 12.5Z"
                      fill="currentColor"
                    />
                    <path
                      d="M2.25 10.5C1.56 10.5 1 9.94 1 9.25V7.75C1 7.06 1.56 6.5 2.25 6.5C2.94 6.5 3.5 7.06 3.5 7.75V9.25C3.5 9.94 2.94 10.5 2.25 10.5Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <p className="text-foreground italic mb-4">
                  {testimonial.quote}
                </p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-muted-foreground text-sm">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Elevate Your Career?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of professionals who've found their dream job using
            ResumeCraft.
          </p>
          <Button size="lg" asChild>
            <Link to="/upload">
              Upload Your Resume <FileText className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
