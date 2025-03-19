
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Briefcase,
  Building,
  Calendar,
  ExternalLink,
  MapPin,
  Search,
  ThumbsUp,
  Clock,
  Sparkles,
  Filter,
  CheckCircle,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useForm } from 'react-hook-form';
import Layout from '@/components/layout/Layout';
import { useToast } from '@/hooks/use-toast';

interface JobFormValues {
  role: string;
  location: string;
  workType: string;
}

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [jobCategory, setJobCategory] = useState('recommended');
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [applyDialogOpen, setApplyDialogOpen] = useState(false);
  const [filterExpanded, setFilterExpanded] = useState(false);
  const { toast } = useToast();

  const form = useForm<JobFormValues>({
    defaultValues: {
      role: '',
      location: '',
      workType: '',
    },
  });

  const handleApply = (data: JobFormValues) => {
    console.log(data);
    setApplyDialogOpen(false);
    toast({
      title: "Application submitted!",
      description: "Your application has been sent. Good luck!",
    });
  };

  // Mocked job data
  const jobs = [
    {
      id: "job1",
      title: "Senior Frontend Developer",
      company: "TechFlow Solutions",
      location: "San Francisco, CA",
      salary: "$120,000 - $150,000",
      postedDate: "3 days ago",
      type: "Full-time",
      matchPercentage: 96,
      description: "We are looking for a Senior Frontend Developer who is proficient with React.js. The ideal candidate should have experience building scalable web applications, optimizing performance, and implementing responsive designs.",
      requirements: [
        "5+ years of experience with JavaScript and React",
        "Experience with modern frontend frameworks and libraries",
        "Strong understanding of state management (Redux, Context API)",
        "Experience with responsive and adaptive design",
      ],
      category: "recommended"
    },
    {
      id: "job2",
      title: "Full Stack Engineer",
      company: "InnovateSphere",
      location: "New York, NY",
      salary: "$110,000 - $140,000",
      postedDate: "1 week ago",
      type: "Full-time",
      matchPercentage: 92,
      description: "We're seeking a talented Full Stack Engineer to join our growing team. The ideal candidate will work on both frontend and backend development, implement new features, and maintain existing ones.",
      requirements: [
        "3+ years experience with full-stack development",
        "Proficiency in JavaScript, Node.js, and React",
        "Experience with RESTful APIs and database design",
        "Knowledge of cloud services (AWS, Azure, GCP)"
      ],
      category: "recommended"
    },
    {
      id: "job3",
      title: "Frontend Developer",
      company: "DigitalCraft Inc.",
      location: "Remote",
      salary: "$90,000 - $120,000",
      postedDate: "2 days ago",
      type: "Full-time",
      matchPercentage: 89,
      description: "DigitalCraft is looking for a Frontend Developer to join our team. You will be responsible for implementing visual elements and UI components that users interact with.",
      requirements: [
        "3+ years of experience with JavaScript and React",
        "Strong HTML, CSS, and responsive design skills",
        "Experience with frontend build tools and workflows",
        "Good understanding of UI/UX design principles"
      ],
      category: "recommended"
    },
    {
      id: "job4",
      title: "React Native Developer",
      company: "MobileTech",
      location: "Austin, TX",
      salary: "$100,000 - $130,000",
      postedDate: "5 days ago",
      type: "Full-time",
      matchPercentage: 85,
      description: "Join our mobile development team to build cross-platform applications using React Native. You'll be working on cutting-edge mobile applications for our clients.",
      requirements: [
        "2+ years of experience with React Native",
        "Experience with mobile app deployment",
        "Knowledge of native modules integration",
        "Understanding of mobile UI/UX principles"
      ],
      category: "recent"
    },
    {
      id: "job5",
      title: "Frontend Engineer",
      company: "CloudSync",
      location: "Seattle, WA",
      salary: "$115,000 - $145,000",
      postedDate: "1 day ago",
      type: "Full-time",
      matchPercentage: 82,
      description: "CloudSync is seeking a Frontend Engineer to help build our next-generation cloud management dashboard. You'll be working closely with designers and backend engineers.",
      requirements: [
        "4+ years of experience with JavaScript frameworks",
        "Experience with data visualization libraries",
        "Strong CSS and responsive design skills",
        "Experience with RESTful APIs and GraphQL"
      ],
      category: "recent"
    },
    {
      id: "job6",
      title: "UI/UX Developer",
      company: "DesignFirst",
      location: "Chicago, IL",
      salary: "$95,000 - $125,000",
      postedDate: "4 days ago",
      type: "Full-time",
      matchPercentage: 78,
      description: "DesignFirst is looking for a UI/UX Developer who can bridge the gap between design and implementation. You'll work on creating beautiful, functional interfaces for our clients.",
      requirements: [
        "3+ years experience with frontend development",
        "Strong understanding of UI/UX design principles",
        "Experience with design tools (Figma, Sketch)",
        "Ability to translate designs into functional code"
      ],
      category: "saved"
    }
  ];

  const filteredJobs = jobCategory === 'all' 
    ? jobs
    : jobs.filter(job => job.category === jobCategory);

  const searchedJobs = searchQuery 
    ? filteredJobs.filter(job => 
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        job.company.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredJobs;

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4">
            Job Recommendations
          </span>
          <h1 className="text-3xl font-bold">Find Your Perfect Match</h1>
          <p className="text-muted-foreground mt-2">
            We've matched your resume with jobs that fit your skills and experience.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="w-full md:w-1/3">
            <div className="glass-card rounded-xl p-6 h-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Job Search</h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setFilterExpanded(!filterExpanded)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                  {filterExpanded ? (
                    <ChevronUp className="h-4 w-4 ml-2" />
                  ) : (
                    <ChevronDown className="h-4 w-4 ml-2" />
                  )}
                </Button>
              </div>
              
              <div className="relative mb-4">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search jobs..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {filterExpanded && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4 mb-6"
                >
                  <div>
                    <label className="text-sm font-medium mb-1 block">Location</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Any location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any location</SelectItem>
                        <SelectItem value="sf">San Francisco, CA</SelectItem>
                        <SelectItem value="nyc">New York, NY</SelectItem>
                        <SelectItem value="remote">Remote</SelectItem>
                        <SelectItem value="austin">Austin, TX</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">Job Type</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Any type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any type</SelectItem>
                        <SelectItem value="fulltime">Full-time</SelectItem>
                        <SelectItem value="parttime">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-1 block">Experience Level</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Any level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any level</SelectItem>
                        <SelectItem value="entry">Entry Level</SelectItem>
                        <SelectItem value="mid">Mid Level</SelectItem>
                        <SelectItem value="senior">Senior Level</SelectItem>
                        <SelectItem value="executive">Executive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button className="w-full">Apply Filters</Button>
                </motion.div>
              )}
              
              <Tabs defaultValue="recommended" onValueChange={(value) => setJobCategory(value)}>
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="recommended" className="flex-1">Recommended</TabsTrigger>
                  <TabsTrigger value="recent" className="flex-1">Recent</TabsTrigger>
                  <TabsTrigger value="saved" className="flex-1">Saved</TabsTrigger>
                </TabsList>
              
                <div className="mt-2">
                  <p className="text-sm text-muted-foreground mb-4">
                    Showing {searchedJobs.length} {jobCategory === 'recommended' ? 'recommended' : jobCategory === 'recent' ? 'recent' : 'saved'} jobs
                  </p>
                  
                  {searchedJobs.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No jobs found matching your criteria.</p>
                    </div>
                  ) : null}
                </div>
              </Tabs>
            </div>
          </div>
          
          <div className="w-full md:w-2/3">
            <div className="space-y-4">
              {searchedJobs.map((job) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`glass-card rounded-xl p-6 cursor-pointer transition-all duration-300 ${
                    selectedJob === job.id 
                      ? 'ring-2 ring-primary scale-[1.01]' 
                      : 'hover:shadow-lg hover:scale-[1.01]'
                  }`}
                  onClick={() => setSelectedJob(job.id)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-semibold">{job.title}</h3>
                      <div className="flex items-center text-muted-foreground mt-1">
                        <Building className="h-4 w-4 mr-1" />
                        {job.company}
                        <span className="mx-2">•</span>
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location}
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className="flex items-center">
                        <Sparkles className="h-4 w-4 mr-1 text-primary" />
                        <span className="font-semibold text-primary">{job.matchPercentage}% Match</span>
                      </div>
                      <div className="flex items-center text-muted-foreground text-sm mt-1">
                        <Clock className="h-3 w-3 mr-1" />
                        {job.postedDate}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-4 space-x-4">
                    <Badge variant="secondary">
                      <Briefcase className="h-3 w-3 mr-1" />
                      {job.type}
                    </Badge>
                    <span className="text-sm">{job.salary}</span>
                  </div>
                  
                  <div className="mt-4 text-sm text-muted-foreground line-clamp-3">
                    {job.description}
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
                    <div className="flex space-x-2">
                      {job.category === 'recommended' && (
                        <Badge variant="outline" className="text-primary border-primary/30 bg-primary/5">
                          <ThumbsUp className="h-3 w-3 mr-1" />
                          Recommended
                        </Badge>
                      )}
                      {job.requirements.slice(0, 2).map((req, i) => (
                        <Badge key={i} variant="outline" className="hidden sm:flex">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          {req.split(' ')[0]} {req.split(' ')[1]}...
                        </Badge>
                      ))}
                    </div>
                    
                    <Button 
                      size="sm" 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedJob(job.id);
                        setApplyDialogOpen(true);
                      }}
                    >
                      Apply Now
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Dialog open={applyDialogOpen} onOpenChange={setApplyDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Apply for this position</DialogTitle>
            <DialogDescription>
              Complete the information below to submit your application.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleApply)} className="space-y-4">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Input placeholder="Senior Frontend Developer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Location</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="onsite">Onsite</SelectItem>
                        <SelectItem value="remote">Remote</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="workType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Work Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select work type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="fulltime">Full-time</SelectItem>
                        <SelectItem value="parttime">Part-time</SelectItem>
                        <SelectItem value="contract">Contract</SelectItem>
                        <SelectItem value="internship">Internship</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter className="pt-4">
                <Button variant="outline" type="button" onClick={() => setApplyDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  Submit Application
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Jobs;
