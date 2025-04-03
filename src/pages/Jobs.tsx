
import { useState } from "react";
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
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/layout/Layout";
import ResumePreview from "@/components/resume/ResumePreview";
import { Briefcase, MapPin, Clock, BarChart3, Search } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useResume } from "@/context/ResumeContext";

// Define a mock job type that includes all potential properties
interface MockJob {
  id: string;
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
}

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("all");
  const [salary, setSalary] = useState([50]);
  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const { jobOpportunities } = useResume();

  const handlePreview = (job: any) => {
    setSelectedJob(job);
    setShowPreview(true);
  };

  // Define mock jobs with the type that includes all potential properties
  const mockJobs: MockJob[] = [
    {
      id: "1",
      job_id: "1",
      job_title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      place: "San Francisco, CA",
      type: "Full-time",
      salary: "$120,000 - $150,000",
      posted_date: "2 days ago",
      job_description:
        "We are looking for an experienced Frontend Developer to join our team. You will be responsible for building and maintaining web applications using React and TypeScript.",
      requirements: [
        "5+ years of experience with frontend development",
        "Strong knowledge of React, TypeScript, and modern JavaScript",
        "Experience with responsive design and CSS frameworks",
        "Bachelor's degree in Computer Science or related field",
      ],
      benefits: [
        "Competitive salary and benefits package",
        "Remote work options",
        "Flexible working hours",
        "Professional development opportunities",
      ],
      match: 95,
      job_url: "#",
    },
    {
      id: "2",
      job_id: "2",
      job_title: "UX/UI Designer",
      company: "DesignHub",
      location: "New York, NY",
      place: "New York, NY",
      type: "Full-time",
      salary: "$90,000 - $110,000",
      posted_date: "1 week ago",
      job_description:
        "DesignHub is seeking a talented UX/UI Designer to create beautiful, intuitive interfaces for our clients. You will work closely with product managers and engineers to design engaging experiences.",
      requirements: [
        "3+ years of experience in UX/UI design",
        "Proficiency with design tools such as Figma and Adobe Creative Suite",
        "Portfolio showcasing your design process and solutions",
        "Excellent communication and collaboration skills",
      ],
      benefits: [
        "Health, dental, and vision insurance",
        "Unlimited PTO",
        "Gym membership",
        "Catered lunches",
      ],
      match: 82,
      job_url: "#",
    },
    {
      id: "3",
      job_id: "3",
      job_title: "Backend Developer",
      company: "ServerLogic",
      location: "Remote",
      place: "Remote",
      type: "Contract",
      salary: "$100,000 - $130,000",
      posted_date: "3 days ago",
      job_description:
        "ServerLogic is looking for a Backend Developer to build and maintain server-side applications. You will be responsible for database design, API development, and server optimization.",
      requirements: [
        "4+ years of experience with backend development",
        "Proficiency in Node.js, Python, or Java",
        "Experience with database systems (SQL, NoSQL)",
        "Knowledge of cloud services (AWS, Azure, GCP)",
      ],
      benefits: [
        "Flexible working hours",
        "Project completion bonuses",
        "Weekly team events",
        "Professional development stipend",
      ],
      match: 78,
      job_url: "#",
    },
    {
      id: "4",
      job_id: "4",
      job_title: "Full Stack Developer",
      company: "OmniTech Solutions",
      location: "Austin, TX",
      place: "Austin, TX",
      type: "Full-time",
      salary: "$110,000 - $140,000",
      posted_date: "1 day ago",
      job_description:
        "OmniTech is seeking a Full Stack Developer to work on our flagship product. You will be involved in all aspects of development, from database design to frontend implementation.",
      requirements: [
        "4+ years of full stack development experience",
        "Proficiency in React, Node.js, and SQL/NoSQL databases",
        "Experience with cloud services and deployment",
        "Ability to work in a fast-paced environment",
      ],
      benefits: [
        "Competitive salary",
        "Stock options",
        "Health and wellness programs",
        "Continued education assistance",
      ],
      match: 88,
      job_url: "#",
    },
    {
      id: "5",
      job_id: "5",
      job_title: "Data Scientist",
      company: "Analytix",
      location: "Boston, MA",
      place: "Boston, MA",
      type: "Full-time",
      salary: "$130,000 - $160,000",
      posted_date: "5 days ago",
      job_description:
        "Analytix is looking for a Data Scientist to help analyze and interpret complex data sets. You will build models and algorithms to extract insights and drive business decisions.",
      requirements: [
        "Master's or PhD in a quantitative field",
        "Experience with Python, R, and SQL",
        "Knowledge of machine learning algorithms",
        "Strong statistical background",
      ],
      benefits: [
        "Comprehensive benefits package",
        "Relocation assistance",
        "Flexible schedule",
        "Learning and development budget",
      ],
      match: 72,
      job_url: "#",
    },
  ];

  const jobsToDisplay = jobOpportunities.length > 0 
    ? jobOpportunities 
    : mockJobs;

  const filteredJobs = jobsToDisplay.filter((job) => {
    const jobTitle = job.job_title || "";
    const jobLocation = job.location || job.place || "";
    
    const matchesSearch = jobTitle
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesLocation = location === "" || jobLocation.includes(location);
    
    if (jobOpportunities.length > 0) {
      return matchesSearch && matchesLocation;
    }
    
    // For mock jobs, handle optional properties
    const mockJob = job as MockJob;
    const matchesType = jobType === "all" || mockJob.type === jobType;
    
    // Safely extract salary value - only used for mock data
    const jobSalaryMin = mockJob.salary 
      ? parseInt((mockJob.salary).replace(/[^0-9]/g, "").substring(0, 6))
      : 0;
    
    const matchesSalary = salary[0] * 2000 <= jobSalaryMin;

    return matchesSearch && matchesLocation && matchesType && matchesSalary;
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

        {/* Search and Filters */}
        <div className="glass-card p-4 md:p-6 rounded-xl mb-6 md:mb-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
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
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Min Salary</span>
                <span>${salary[0] * 2}k</span>
              </div>
              <Slider
                defaultValue={[50]}
                max={100}
                step={1}
                value={salary}
                onValueChange={setSalary}
              />
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="space-y-4 mb-10 flex flex-wrap gap-4 px-4">
          {filteredJobs.length === 0 ? (
            <div className="text-center p-6 md:p-12 glass-card rounded-xl">
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
              <Card key={job.job_id} className="overflow-hidden w-[700px]">
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
                    {/* Only show match percentage for jobs that have it */}
                    {(job as MockJob).match && (
                      <div className="flex items-start md:items-end md:flex-col">
                        <div className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm flex items-center">
                          <BarChart3 className="mr-1 h-4 w-4" />
                          {(job as MockJob).match}% Match
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
                    {/* Only show type for jobs that have it */}
                    {(job as MockJob).type && (
                      <div className="flex items-center">
                        <Briefcase className="mr-1 h-4 w-4" />
                        {(job as MockJob).type}
                      </div>
                    )}
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4" />
                      {job.posted_date || "Recently posted"}
                    </div>
                  </div>
                  <p className="text-xs md:text-sm line-clamp-2">
                    {job.job_description?.substring(0, 150)}...
                  </p>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-3 border-t p-4 md:p-6">
                  <div>
                    {/* Only show salary for jobs that have it */}
                    {(job as MockJob).salary && (
                      <p className="text-xs md:text-sm font-medium">
                        {(job as MockJob).salary}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => handlePreview(job)}
                    className="w-full sm:w-auto"
                  >
                    Preview Resume
                  </Button>
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
