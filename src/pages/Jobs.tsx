
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

const Jobs = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("all");
  const [salary, setSalary] = useState([50]);
  const [selectedJob, setSelectedJob] = useState<any | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const { toast } = useToast();

  const mockJobs = [
    {
      id: "1",
      title: "Senior Frontend Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120,000 - $150,000",
      posted: "2 days ago",
      description:
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
    },
    {
      id: "2",
      title: "UX/UI Designer",
      company: "DesignHub",
      location: "New York, NY",
      type: "Full-time",
      salary: "$90,000 - $110,000",
      posted: "1 week ago",
      description:
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
    },
    {
      id: "3",
      title: "Backend Developer",
      company: "ServerLogic",
      location: "Remote",
      type: "Contract",
      salary: "$100,000 - $130,000",
      posted: "3 days ago",
      description:
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
    },
    {
      id: "4",
      title: "Full Stack Developer",
      company: "OmniTech Solutions",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$110,000 - $140,000",
      posted: "1 day ago",
      description:
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
    },
    {
      id: "5",
      title: "Data Scientist",
      company: "Analytix",
      location: "Boston, MA",
      type: "Full-time",
      salary: "$130,000 - $160,000",
      posted: "5 days ago",
      description:
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
    },
  ];

  const handlePreview = (job: any) => {
    setSelectedJob(job);
    setShowPreview(true);
  };

  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch = job.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesLocation =
      location === "" || job.location.includes(location);
    const matchesType = jobType === "all" || job.type === jobType;
    const jobSalaryMin = parseInt(
      job.salary.replace(/[^0-9]/g, "").substring(0, 6)
    );
    const matchesSalary = salary[0] * 2000 <= jobSalaryMin;

    return matchesSearch && matchesLocation && matchesType && matchesSalary;
  });

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-20"
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Find Your Perfect Job</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse through our curated job listings tailored to your skills and
            experience.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="glass-card p-6 rounded-xl mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
        <div className="space-y-4 mb-10">
          {filteredJobs.length === 0 ? (
            <div className="text-center p-12 glass-card rounded-xl">
              <h3 className="text-xl font-medium mb-2">No Jobs Found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or check back later for new
                postings.
              </p>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <Card key={job.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{job.title}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <Briefcase className="mr-1 h-4 w-4" />
                        {job.company}
                      </CardDescription>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="bg-primary/10 text-primary rounded-full px-3 py-1 text-sm flex items-center">
                        <BarChart3 className="mr-1 h-4 w-4" />
                        {job.match}% Match
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-3">
                  <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center">
                      <MapPin className="mr-1 h-4 w-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center">
                      <Briefcase className="mr-1 h-4 w-4" />
                      {job.type}
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4" />
                      {job.posted}
                    </div>
                  </div>
                  <p className="text-sm line-clamp-2">{job.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between pt-3 border-t">
                  <div>
                    <p className="text-sm font-medium">{job.salary}</p>
                  </div>
                  <Button variant="outline" onClick={() => handlePreview(job)}>
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
