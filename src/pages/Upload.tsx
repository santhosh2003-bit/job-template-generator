
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { FileUploader } from "react-drag-drop-files";
import { Progress } from "@/components/ui/progress";
import { useResume } from "@/context/ResumeContext";
import { useAuth } from "@/context/AuthContext";
import { FileText, Upload as UploadIcon, Briefcase } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FileType = File | null;

const ResumeUpload = () => {
  const [file, setFile] = useState<FileType>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [jobProfile, setJobProfile] = useState("");
  const { toast } = useToast();
  const { setResumeData, setPersonalDetails, setJobOpportunities, setHasResume } = useResume();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const handleChange = (file: File) => {
    setFile(file);
  };

  const handleReset = () => {
    setFile(null);
    setUploadProgress(0);
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a PDF file to upload",
        variant: "destructive",
      });
      return;
    }

    if (!jobProfile.trim()) {
      toast({
        title: "Job profile required",
        description: "Please enter your desired job profile",
        variant: "destructive",
      });
      return;
    }

    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to upload your resume",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setUploadProgress(0);

    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + 10;
      });
    }, 500);

    try {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("job_profile", jobProfile);

      // Normally we would send this to an API
      // const response = await fetch('/api/resume/upload', {
      //   method: 'POST',
      //   body: formData
      // });

      const mockPersonalDetails = {
        brief_summary: "Experienced software engineer with a passion for building scalable web applications.",
        current_company: "Tech Innovations Inc.",
        current_position: "Senior Software Engineer",
        education: "MS in Computer Science, Stanford University",
        email: "alex@example.com",
        experience_years: "5",
        full_name: "Alex Johnson",
        github: "github.com/alexj",
        languages: ["JavaScript", "Python", "Java"],
        linkedin: "linkedin.com/in/alexj",
        personal_website: "alexj.dev",
        phone_number: "(555) 123-4567",
        physical_address: "San Francisco, CA",
      };

      const mockResumeData = {
        skills: ["JavaScript", "React", "Node.js", "Python", "AWS", "Docker"],
        experience: [
          {
            title: "Senior Software Engineer",
            company: "Tech Innovations Inc.",
            period: "2020 - Present",
            responsibilities: [
              "Led development of a microservices architecture",
              "Reduced API response time by 40% through optimizations",
              "Mentored junior developers on best practices",
            ],
          },
          {
            title: "Software Engineer",
            company: "DataSystems LLC",
            period: "2018 - 2020",
            responsibilities: [
              "Developed RESTful APIs for financial data analysis",
              "Implemented CI/CD pipeline reducing deployment time by 30%",
              "Collaborated with UX team on frontend optimizations",
            ],
          },
        ],
      };

      // Simulating API delay
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Jobs based on input job profile
      const mockJobOpportunities = [
        {
          job_id: "1",
          job_title: `Senior ${jobProfile}`,
          company: "Tech Solutions Inc.",
          location: "Remote",
          job_description: `Looking for an experienced ${jobProfile} with strong technical skills and leadership abilities...`,
          job_url: "https://example.com/jobs/1",
          apply_link: "",
          place: "Remote",
          posted_date: "2025-04-01",
          customized_resume: {
            modified_skills: ["JavaScript", "React", "TypeScript", "Redux", "CSS-in-JS"],
            modified_work_experience: [
              {
                Company: "Tech Innovations Inc.",
                "Job Title": "Senior Software Engineer",
                Responsibilities: [
                  `Led ${jobProfile}-focused development for multiple projects`,
                  "Implemented responsive design patterns that improved mobile conversion by 25%",
                  "Optimized rendering performance resulting in 40% faster page loads",
                ],
              },
              {
                Company: "DataSystems LLC",
                "Job Title": "Software Engineer",
                Responsibilities: [
                  `Built ${jobProfile} components for financial dashboards`,
                  "Collaborated with UX designers to implement pixel-perfect interfaces",
                  "Reduced bundle size by 35% through code splitting techniques",
                ],
              },
            ],
          },
        },
        {
          job_id: "2",
          job_title: `${jobProfile} Developer`,
          company: "Global Innovations",
          location: "New York, NY",
          job_description: `We're seeking a talented ${jobProfile} developer with experience in modern frameworks...`,
          job_url: "https://example.com/jobs/2",
          apply_link: "",
          place: "New York, NY",
          posted_date: "2025-04-02",
          customized_resume: {
            modified_skills: ["JavaScript", "Node.js", "Express", "React", "MongoDB", "AWS"],
            modified_work_experience: [
              {
                Company: "Tech Innovations Inc.",
                "Job Title": "Senior Software Engineer",
                Responsibilities: [
                  `Built and maintained ${jobProfile} applications using modern frameworks`,
                  "Integrated MongoDB for scalable data storage solutions",
                  "Deployed microservices on AWS using Docker containers",
                ],
              },
              {
                Company: "DataSystems LLC",
                "Job Title": "Software Engineer",
                Responsibilities: [
                  `Developed full stack applications focusing on ${jobProfile}`,
                  "Implemented secure authentication systems",
                  "Conducted code reviews and provided technical leadership",
                ],
              },
            ],
          },
        },
      ];

      const mockApiResponse = {
        personal_details: mockPersonalDetails,
        resume_data: mockResumeData,
        job_opportunities: mockJobOpportunities,
      };

      setPersonalDetails(mockApiResponse.personal_details);
      setResumeData(mockApiResponse.resume_data);
      setJobOpportunities(mockApiResponse.job_opportunities);
      setHasResume(true);

      setUploadProgress(100);
      toast({
        title: "Resume uploaded successfully",
        description: `We've analyzed your resume for ${jobProfile} positions and found matching jobs`,
      });

      setTimeout(() => {
        navigate("/templates");
      }, 1000);
    } catch (error) {
      toast({
        title: "Upload failed",
        description:
          error instanceof Error
            ? error.message
            : "Failed to upload and parse resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      clearInterval(progressInterval);
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container max-w-4xl mx-auto py-20 px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Upload Your Resume</h1>
          <p className="text-muted-foreground">
            Upload your resume to get started with personalized job matching and
            resume enhancement
          </p>
        </div>

        <div className="glass-card p-8 rounded-xl shadow-lg">
          {!file ? (
            <FileUploader
              handleChange={handleChange}
              name="file"
              types={["PDF"]}
              maxSize={5}
              label="Upload or drop your resume PDF here"
              hoverTitle="Drop here"
            >
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center cursor-pointer hover:border-purple-500 transition-colors">
                <div className="flex justify-center mb-4">
                  <div className="h-16 w-16 bg-purple-500/10 rounded-full flex items-center justify-center">
                    <UploadIcon className="h-8 w-8 text-purple-500" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Upload your resume
                </h3>
                <p className="text-muted-foreground mb-4">
                  PDF format up to 5MB
                </p>
                <Button className="bg-purple-500 hover:bg-purple-600">Select Resume</Button>
              </div>
            </FileUploader>
          ) : (
            <div className="space-y-6">
              <div className="bg-purple-500/10 rounded-lg p-6 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <FileText className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button variant="ghost" onClick={handleReset} size="sm">
                  Change
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="job-profile">Enter Desired Job Profile</Label>
                  <Input
                    id="job-profile"
                    placeholder="e.g., Frontend Developer, UX Designer, Data Scientist"
                    value={jobProfile}
                    onChange={(e) => setJobProfile(e.target.value)}
                    className="mt-2"
                  />
                </div>
              </div>

              {isLoading ? (
                <div className="space-y-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Uploading...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <Progress value={uploadProgress} className="h-2 bg-gray-200">
                    <div className="h-full bg-purple-500 rounded-full" style={{ width: `${uploadProgress}%` }} />
                  </Progress>
                  <p className="text-xs text-muted-foreground">
                    {uploadProgress < 100
                      ? "Processing your resume..."
                      : "Resume processed successfully!"}
                  </p>
                </div>
              ) : (
                <div className="flex justify-end">
                  <Button onClick={handleUpload} className="bg-purple-500 hover:bg-purple-600">Upload & Analyze</Button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <UploadIcon className="h-6 w-6 text-purple-500" />,
                title: "1. Upload Your Resume",
                description:
                  "Upload your existing resume in PDF format. Our AI will automatically extract your information.",
              },
              {
                icon: <FileText className="h-6 w-6 text-purple-500" />,
                title: "2. Choose a Template",
                description:
                  "Select from our professionally designed templates to make your resume stand out.",
              },
              {
                icon: <Briefcase className="h-6 w-6 text-purple-500" />,
                title: "3. Apply to Jobs",
                description:
                  "Get matched with relevant job opportunities and apply with your enhanced resume.",
              },
            ].map((step, index) => (
              <div key={index} className="glass-card p-6 rounded-lg shadow-md">
                <div className="h-12 w-12 bg-purple-500/10 rounded-full flex items-center justify-center mb-4">
                  {step.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResumeUpload;
