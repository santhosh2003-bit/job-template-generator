
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";
import ResumePreview from "@/components/resume/ResumePreview";
import {
  Briefcase,
  MapPin,
  Clock,
  BarChart3,
  Search,
  Loader2,
  Star,
} from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useResume } from "@/context/ResumeContext";
import { analyzeResume } from "@/lib/api";
import PremiumFeatureOverlay from "@/components/premium/PremiumFeatureOverlay";
import PremiumBadge from "@/components/premium/PremiumBadge";
import CoverLetterGenerator from "@/components/premium/CoverLetterGenerator";

interface Job {
  id?: string;
  job_id: string;
  job_title: string;
  company: string;
  location: string;
  place: string;
  type?: string;
  salary?: string;
  posted_date: string;
  job_description: string;
  requirements?: string[];
  benefits?: string[];
  match?: number;
  job_url: string;
  apply_link?: string;
  customized_resume?: {
    modified_skills: string[];
    modified_work_experience: {
      Company: string;
      "Job Title": string;
      Responsibilities: string[];
    }[];
  };
}

// For demonstration purposes, let's assume this user is premium
// In a real application, this would come from an auth context or API
const userIsPremium = true;

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("all");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const {
    jobOpportunities,
    personalDetails,
    setJobOpportunities,
    selectedTemplate,
    checkResumeStatus,
  } = useResume();

  const [jobListings, setJobListings] = useState<Job[]>([]);

  useEffect(() => {
    if (!checkResumeStatus()) {
      return;
    }

    if (jobOpportunities && jobOpportunities.length > 0) {
      console.log(
        "Using job opportunities from resume context:",
        jobOpportunities
      );
      setJobListings(jobOpportunities);
    } else {
      // loadJobs();
    }
  }, [jobOpportunities]);

  const loadJobs = async (
    query: string = "software developer",
    loc: string = ""
  ) => {
    setIsLoading(true);
    try {
      const response = await analyzeResume(null, query);
      console.log("Loaded jobs:", response.job_opportunities);
      setJobOpportunities(response.job_opportunities || []);
      setJobListings(response.job_opportunities || []);
    } catch (error) {
      console.error("Error loading jobs:", error);
      toast({
        title: "Error Loading Jobs",
        description: "Failed to load job listings. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    loadJobs(searchTerm || "software developer", location);
  };

  const handlePreview = (job: Job) => {
    if (!selectedTemplate) {
      toast({
        title: "No Template Selected",
        description: "Please select a resume template first",
        variant: "destructive",
      });
      return;
    }

    setSelectedJob(job);
    setShowPreview(true);
  };

  const filteredJobs = jobListings.filter((job) => {
    const jobTitle = job.job_title || "";
    const jobLocation = job.location || job.place || "";

    const matchesSearch = searchTerm
      ? jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
      : true;

    const matchesLocation = location
      ? jobLocation.toLowerCase().includes(location.toLowerCase())
      : true;

    const matchesType = jobType === "all" || job.type === jobType;

    return matchesSearch && matchesLocation && matchesType;
  });

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-20 md:mt-20 px-4 md:px-0"
      >
        <div className="text-center mb-6 md:mb-10">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">
            Find Your Perfect Job
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base">
            Browse through our curated job listings tailored to your skills and
            experience.
          </p>
        </div>

        <div className="glass-card p-4 md:p-6 rounded-xl mb-6 md:mb-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Search input */}
            <div>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Job title or keyword"
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            {/* Location input */}
            <div>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Location"
                  className="pl-9"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>
            
            {/* Job type select */}
            <div>
              <Select value={jobType} onValueChange={setJobType}>
                <SelectTrigger>
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Full-time">Full-time</SelectItem>
                  <SelectItem value="Part-time">Part-time</SelectItem>
                  <SelectItem value="Contract">Contract</SelectItem>
                  <SelectItem value="Remote">Remote</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Search button */}
            <div className="flex items-end">
              <Button
                className="w-full bg-purple-500 hover:bg-purple-600"
                onClick={handleSearch}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Searching
                  </>
                ) : (
                  <>Search Jobs</>
                )}
              </Button>
            </div>
          </div>
          
          {/* Advanced search - Premium feature */}
          <div className="mt-4">
            <PremiumFeatureOverlay message="Upgrade to Premium for advanced job search filters">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select disabled>
                  <SelectTrigger>
                    <SelectValue placeholder="Salary Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Salary</SelectItem>
                    <SelectItem value="50k">$50k+</SelectItem>
                    <SelectItem value="75k">$75k+</SelectItem>
                    <SelectItem value="100k">$100k+</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select disabled>
                  <SelectTrigger>
                    <SelectValue placeholder="Experience Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">Entry Level</SelectItem>
                    <SelectItem value="mid">Mid Level</SelectItem>
                    <SelectItem value="senior">Senior Level</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select disabled>
                  <SelectTrigger>
                    <SelectValue placeholder="Posted Date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any Time</SelectItem>
                    <SelectItem value="day">Last 24 hours</SelectItem>
                    <SelectItem value="week">Last 7 days</SelectItem>
                    <SelectItem value="month">Last 30 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </PremiumFeatureOverlay>
          </div>
        </div>

        <div className="space-y-4 mb-10 flex flex-wrap gap-4 px-4">
          {/* Loading state */}
          {isLoading ? (
            <div className="w-full flex justify-center py-20">
              <div className="flex flex-col items-center">
                <Loader2 className="h-8 w-8 animate-spin text-purple-500 mb-4" />
                <p className="text-muted-foreground">Searching for jobs...</p>
              </div>
            </div>
          ) : filteredJobs.length === 0 ? (
            <div className="text-center p-6 md:p-12 glass-card rounded-xl w-full">
              <h3 className="text-lg md:text-xl font-medium mb-2">
                No Jobs Found
              </h3>
              <p className="text-muted-foreground text-sm md:text-base">
                Try adjusting your search criteria or check back later for new
                postings.
              </p>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <Card
                key={job.job_id}
                className="overflow-hidden w-full md:w-[700px]"
              >
                <CardHeader className="pb-3 p-4 md:p-6">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                    <div>
                      <CardTitle className="text-lg md:text-xl">
                        {job.job_title}
                      </CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <Briefcase className="mr-1 h-4 w-4" />
                        {job.company}
                      </CardDescription>
                    </div>
                    {job.match && (
                      <div className="flex items-start md:items-end md:flex-col">
                        <div className="bg-purple-500/10 text-purple-500 rounded-full px-3 py-1 text-sm flex items-center">
                          <BarChart3 className="mr-1 h-4 w-4" />
                          {job.match}% Match
                          {job.match > 80 && (
                            <Star className="ml-1 h-3 w-3" fill="currentColor" />
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pb-3 p-4 md:p-6 pt-0">
                  <div className="flex flex-wrap gap-3 text-xs md:text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <MapPin className="mr-1 h-4 w-4" />
                      {job.location || job.place}
                    </div>
                    {job.type && (
                      <div className="flex items-center">
                        <Briefcase className="mr-1 h-4 w-4" />
                        {job.type}
                      </div>
                    )}
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4" />
                      {job.posted_date || "Recently posted"}
                    </div>
                  </div>
                  <p className="text-xs md:text-sm line-clamp-3">
                    {job.job_description?.substring(0, 150)}...
                  </p>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-3 border-t p-4 md:p-6">
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      onClick={() => handlePreview(job)}
                      className="w-full sm:w-auto"
                    >
                      Preview Resume
                    </Button>
                    <CoverLetterGenerator 
                      jobTitle={job.job_title}
                      companyName={job.company}
                      jobDescription={job.job_description}
                      isPremium={userIsPremium}
                    />
                  </div>
                  {job.salary && (
                    <p className="text-xs md:text-sm font-medium">
                      {job.salary}
                    </p>
                  )}
                </CardFooter>
              </Card>
            ))
          )}
        </div>
      </motion.div>

      {selectedJob && (
        <ResumePreview
          open={showPreview}
          onOpenChange={setShowPreview}
          jobData={selectedJob}
        />
      )}
    </Layout>
  );
};

export default Jobs;
