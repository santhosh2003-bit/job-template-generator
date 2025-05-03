
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import { ResumeProvider } from "./context/ResumeContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
import Dummy from "./pages/Dummy";
import ResumeUpload from "./pages/Upload";
import Templates from "./pages/Templates";
import Jobs from "./pages/Jobs";
import Premium from "./pages/Premium";
import NotFound from "./pages/NotFound";
import CoverLetterPage from "./pages/CoverLetterPage";
import Resources from "./pages/Resources";
import Company from "./pages/Company";
import Blog from "./pages/Blog";
import ResumeGuide from "./pages/ResumeGuide";
import JobSearchGuide from "./pages/JobSearchGuide";
import HelpCenter from "./pages/HelpCenter";
import AboutUs from "./pages/AboutUs";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
};

// App routes with authentication
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/upload" element={<ProtectedRoute><ResumeUpload /></ProtectedRoute>} />
      <Route path="/templates" element={<ProtectedRoute><Templates /></ProtectedRoute>} />
      <Route path="/jobs" element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
      <Route path="/cover-letter" element={<ProtectedRoute><CoverLetterPage /></ProtectedRoute>} />
      <Route path="/premium" element={<Premium />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/company" element={<Company />} />
      
      {/* New resource pages */}
      <Route path="/blog" element={<Blog />} />
      <Route path="/resume-tips" element={<ResumeGuide />} />
      <Route path="/job-search-guide" element={<JobSearchGuide />} />
      <Route path="/help-center" element={<HelpCenter />} />
      
      {/* Company pages */}
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      
      <Route path="/dummy" element={<Dummy />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <BrowserRouter>
          <AuthProvider>
            <ResumeProvider>
              <Toaster />
              <Sonner />
              <AppRoutes />
            </ResumeProvider>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
