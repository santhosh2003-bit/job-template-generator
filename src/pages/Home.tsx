
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
  TrendingUp,
  BookOpenCheck,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import BubbleBackground from "@/components/animations/BubbleBackground";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import HeaderImage from "@/components/images/HeaderImage";
import CareerImages from "@/components/images/CareerImages";

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
      icon: <FileUp className="h-6 w-6 text-purple-500" />,
      title: "AI Job Scraper",
      description:
        "Pulls job listings from LinkedIn, Indeed, Glassdoor, and more automatically.",
    },
    {
      icon: <LayoutTemplate className="h-6 w-6 text-purple-500" />,
      title: "Overleaf ATS friendly Templates",
      description:
        "Choose from professionally designed templates to make your resume stand out.",
    },
    {
      icon: <Briefcase className="h-6 w-6 text-purple-500" />,
      title: "Job-Specific Tailoring",
      description:
        "Customize your resume for each job description with one click, highlighting relevant skills.",
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-purple-500" />,
      title: "ATS-Friendly Optimization",
      description:
        "AI scores and suggests improvements for better results with Applicant Tracking Systems.",
    },
  ];

  return (
    <Layout fullWidth>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background to-accent/50 pt-32 pb-16 md:py-32">
        {/* Add the BubbleBackground component here */}
        <BubbleBackground />

        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-purple-500/10 to-transparent" />
          <div className="absolute h-40 w-40 rounded-full bg-purple-500/20 blur-3xl -top-10 -left-10" />
          <div className="absolute h-60 w-60 rounded-full bg-purple-500/10 blur-3xl top-1/3 right-1/3" />
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
                <span className="inline-block px-3 border border-white py-1 rounded-full text-xs font-medium bg-purple-500/10 text-purple-500 mb-4">
                  Get Interview calls with <span>Ezeapply</span>
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-4xl md:text-6xl font-bold tracking-tight"
              >
                Generate custom resumes for every desired job
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
              >
                The place where you can find job openings matching your resume
                from multiple job boards within a few clicks. Our AI analyzes
                your resume, matches you to jobs, and helps you apply in within
                few clicks
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 pt-4"
              >
                <Button size="lg" asChild className="bg-purple-500 hover:bg-purple-600">
                  <Link to="/upload">
                    Upload Your Resume <FileText className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Career Path Images */}
      <section className="py-10 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <CareerImages category="tech" size="medium" />
            <CareerImages category="design" size="medium" />
            <CareerImages category="marketing" size="medium" />
            <CareerImages category="business" size="medium" />
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
                icon: <Upload className="h-10 w-10 text-purple-500" />,
                title: "Upload Your Resume",
                description:
                  "Upload your existing resume or create a new one using our intuitive builder.",
                number: 1,
              },
              {
                icon: <BarChart className="h-10 w-10 text-purple-500" />,
                title: "AI Job Ranking",
                description:
                  "Our AI analyzes your resume and provides ranking of job descriptions matching your experience and skills.",
                number: 2,
              },
              {
                icon: <FileCheck className="h-10 w-10 text-purple-500" />,
                title: "Get custom resumes & apply",
                description:
                  "Get custom resumes generated for you for every matched job, modify if needed & hit apply.",
                number: 3,
              },
            ].map((step, index) => (
              <div
                key={index}
                className="glass-card shadow-lg p-6 border border-white rounded-xl relative flex flex-col items-center text-center"
              >
                <div className="h-16 w-16 rounded-full bg-purple-500/10 flex items-center justify-center mb-4">
                  {step.icon}
                </div>
                <div className="absolute top-1 right-1/2 h-8 w-8 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" asChild className="bg-purple-500 hover:bg-purple-600">
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
            <h2 className="text-3xl font-bold mb-4">Our Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find & Apply to the matching Jobs across LinkedIn, Indeed, Naukri
              in Seconds Tailor your job application to increase chances of
              landing interviews.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="glass-card p-6 rounded-xl shadow-xl border border-white transition-shadow duration-300"
              >
                <div className="h-12 w-12 rounded-full bg-purple-500/10 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Benefits Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Benefits of Tailoring Your Resume
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: <TrendingUp className="h-10 w-10 text-purple-500" />,
                title: "Increased Visibility",
                description:
                  "By highlighting the most relevant skills and experiences, your resume stands out more to hiring managers.",
              },
              {
                icon: <FileText className="h-10 w-10 text-purple-500" />,
                title: "Better ATS Compatibility",
                description:
                  "Applicant Tracking Systems (ATS) often scan resumes for keywords, so tailoring can help your resume pass through the initial screening.",
              },
              {
                icon: <BookOpenCheck className="h-10 w-10 text-purple-500" />,
                title: "Demonstrates Interest",
                description:
                  "Taking the time to tailor your resume shows the employer you've carefully considered the job and company.",
              },
            ].map((benefits, index) => (
              <div
                key={index}
                className="glass-card shadow-lg p-6 border border-white rounded-xl relative flex flex-col items-center text-center"
              >
                <div className="h-16 w-16 rounded-full bg-purple-500/10 flex items-center justify-center mb-4">
                  {benefits.icon}
                </div>

                <h3 className="text-xl font-semibold mb-2">{benefits.title}</h3>
                <p className="text-muted-foreground">{benefits.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Story */}
      <section className="py-10 bg-background">
        <div className="container mx-auto px-4">
          <HeaderImage 
            title="Success Story" 
            subtitle="From struggling to find interviews to landing a dream job at a Fortune 500 company" 
            imageUrl="https://images.unsplash.com/photo-1552581234-26160f608093?q=80&w=2070&auto=format&fit=crop"
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-purple-500/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Start your AI-powered job search now!
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            We are curating the best end to end job searching and applying
            experience for you, if you have any suggestions and feedback, feel
            free to connect with us on socials and tag us to share your
            experience.
          </p>
          <Button size="lg" asChild className="bg-purple-500 hover:bg-purple-600">
            <Link to="/upload">
              Upload Your Resume & Get started{" "}
              <FileText className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
