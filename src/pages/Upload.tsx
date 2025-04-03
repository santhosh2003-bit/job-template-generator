import { useState, useRef, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Layout from "@/components/layout/Layout";
import { useResume } from "@/context/ResumeContext";
import {
  Check,
  FileText,
  Upload as UploadIcon,
  File,
  X,
  Loader2,
} from "lucide-react";

const uploadResumeAPI = async (
  file: File,
  jobProfile: string,
  onProgressUpdate: (progress: number) => void
): Promise<any> => {
  const formData = new FormData();
  formData.append("resume", file);
  formData.append("jobProfile", jobProfile);

  return new Promise((resolve, reject) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      onProgressUpdate(progress);

      if (progress >= 100) {
        clearInterval(interval);

        resolve({
          success: true,
          resumeId: "mock-resume-id-" + Date.now(),
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "(123) 456-7890",
          experience: [
            {
              title: "Frontend Developer",
              company: "Tech Solutions Inc.",
              date: "Jan 2020 - Present",
              description:
                "Developed responsive web applications using React and TypeScript.",
            },
          ],
          education: [
            {
              degree: "Bachelor of Science in Computer Science",
              school: "University of Technology",
              date: "2016 - 2020",
            },
          ],
          skills: ["JavaScript", "React", "TypeScript", "HTML/CSS", "Node.js"],
        });
      }
    }, 100);
  });
};

const ResumeUpload = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [jobProfile, setJobProfile] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [step, setStep] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { setHasResume, setResumeData, setJobOpportunities, setPersonalDetails } = useResume();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or Word document (.doc, .docx)",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Maximum file size is 5MB",
        variant: "destructive",
      });
      return;
    }

    setFile(file);
  };

  const handleRemoveFile = () => {
    setFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleApiUpload = async () => {
    if (!file || !jobProfile.trim()) {
      toast({
        title: "Missing information",
        description: file
          ? "Please enter a job profile"
          : "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    setStep(1);

    try {
      const response = await uploadResumeAPI(file, jobProfile, (progress) =>
        setUploadProgress(progress)
      );

      if (response.success) {
        setResumeData(response);
        setHasResume(true);

        setTimeout(() => {
          setStep(2); // Analyzing
          setTimeout(() => {
            setStep(3); // Extracting
            setTimeout(() => {
              setStep(4); // Formatting
              setTimeout(() => {
                setStep(5); // Complete
                setUploading(false);

                toast({
                  title: "Resume processed successfully",
                  description: "Taking you to templates...",
                });

                setTimeout(() => {
                  navigate("/templates");
                }, 1000);
              }, 1000);
            }, 1500);
          }, 1500);
        }, 500);
      } else {
        throw new Error("Resume processing failed");
      }
    } catch (error) {
      setUploading(false);
      setStep(0);

      toast({
        title: "Upload failed",
        description:
          "There was an error processing your resume. Please try again.",
        variant: "destructive",
      });

      console.error("Upload failed:", error);
    }
  };

  const simulateUpload = useCallback(() => {
    console.log("Using legacy simulation - should use API integration instead");

    setUploading(true);
    setStep(1);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 5;
      setUploadProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);

        setTimeout(() => {
          setStep(2); // Analyzing
          setTimeout(() => {
            setStep(3); // Extracting
            setTimeout(() => {
              setStep(4); // Formatting
              setTimeout(() => {
                setStep(5); // Complete
                setUploading(false);

                setHasResume(true);

                setResumeData({
                  name: "John Doe",
                  email: "john.doe@example.com",
                  phone: "(123) 456-7890",
                  experience: [
                    {
                      title: "Frontend Developer",
                      company: "Tech Solutions Inc.",
                      date: "Jan 2020 - Present",
                      description:
                        "Developed responsive web applications using React and TypeScript.",
                    },
                  ],
                  education: [
                    {
                      degree: "Bachelor of Science in Computer Science",
                      school: "University of Technology",
                      date: "2016 - 2020",
                    },
                  ],
                  skills: [
                    "JavaScript",
                    "React",
                    "TypeScript",
                    "HTML/CSS",
                    "Node.js",
                  ],
                });

                setTimeout(() => {
                  navigate("/templates");
                }, 1000);
              }, 1000);
            }, 1500);
          }, 1500);
        }, 500);
      }
    }, 100);
  }, [navigate, setHasResume, setResumeData]);

  const handleUpload = () => {
    if (!file) return;

    toast({
      title: "Resume upload started",
      description: "We're processing your resume...",
    });
    handleUploadResume();
    // handleApiUpload();
  };

  const handleUploadResume = async () => {
    if (!file || !jobProfile.trim()) {
      toast({
        title: "Missing information",
        description: file
          ? "Please enter a job profile"
          : "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    try {
      setUploading(true);
      setStep(1);

      const formData = new FormData();
      formData.append("resume", file);
      formData.append("job_profile", jobProfile);

      const response = await fetch("http://127.0.0.1:3012/find_job", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      
      if (data.job_opportunities) {
        setJobOpportunities(data.job_opportunities);
      }
      
      if (data.personal_details) {
        setPersonalDetails(data.personal_details);
      }
      
      setResumeData(data);
      setHasResume(true);

      setTimeout(() => {
        setStep(2); // Analyzing
        setTimeout(() => {
          setStep(3); // Extracting
          setTimeout(() => {
            setStep(4); // Formatting
            setTimeout(() => {
              setStep(5); // Complete
              setUploading(false);

              toast({
                title: "Resume processed successfully",
                description: "Taking you to templates...",
              });

              setTimeout(() => {
                navigate("/templates");
              }, 1000);
            }, 1000);
          }, 1500);
        }, 1500);
      }, 500);
    } catch (error) {
      console.error("Upload failed:", error);

      setUploading(false);
      setStep(0);

      toast({
        title: "Upload failed",
        description:
          "There was an error processing your resume. Please try again.",
        variant: "destructive",
      });
    }
  };

  const steps = [
    { label: "Upload", icon: <UploadIcon className="h-[18px] w-[18px]" /> },
    {
      label: "Uploading",
      icon: <Loader2 className="h-[18px] w-[18px] animate-spin" />,
    },
    {
      label: "Analyzing",
      icon: <Loader2 className="h-[18px] w-[18px] animate-spin" />,
    },
    {
      label: "Extracting",
      icon: <Loader2 className="h-[18px] w-[18px] animate-spin" />,
    },
    {
      label: "Formatting",
      icon: <Loader2 className="h-[18px] w-[18px] animate-spin" />,
    },
    { label: "Complete", icon: <Check className="h-[18px] w-[18px]" /> },
  ];

  return (
    <Layout>
      <div className="max-w-3xl mx-auto mt-20 p-5">
        <div className="text-center mb-10">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold"
          >
            Upload Your Resume
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-muted-foreground mt-2"
          >
            Upload your existing resume to get started. We support PDF, DOC, and
            DOCX formats.
          </motion.p>
        </div>

        <div className="mb-10">
          <div className="flex items-center justify-between max-w-2xl mx-auto relative">
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-muted z-0" />

            {steps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  transition: { delay: i * 0.1 },
                }}
                className="relative z-10"
              >
                <div
                  className={`h-10 w-10 rounded-full flex items-center justify-center border-2 transition-all ${
                    i < step
                      ? "bg-primary border-primary text-white"
                      : i === step
                      ? "bg-primary border-primary text-white"
                      : "bg-white border-muted text-muted-foreground"
                  }`}
                >
                  {i < step ? <Check className="h-4 w-4" /> : s.icon}
                </div>
                <div
                  className={`text-xs mt-2 text-center transition-colors ${
                    i <= step
                      ? "text-primary font-medium"
                      : "text-muted-foreground"
                  }`}
                >
                  {s.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {step === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {!file ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-10 text-center transition-colors ${
                  isDragging ? "border-primary bg-primary/5" : "border-muted"
                }`}
              >
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-medium">
                      Drag & Drop Your Resume
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Or click to browse files (PDF, DOC, DOCX up to 5MB)
                    </p>
                  </div>

                  <input
                    ref={inputRef}
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    placeholder="Upload your resume"
                    id="resume-upload"
                  />

                  <Button
                    onClick={() => inputRef.current?.click()}
                    variant="outline"
                    className="relative"
                  >
                    <UploadIcon className="mr-2 h-4 w-4" />
                    Browse Files
                  </Button>
                </div>
              </div>
            ) : (
              <div className="glass-card p-6 rounded-xl">
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mr-4">
                    <File className="h-6 w-6 text-primary" />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-medium truncate">{file.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      {(file.size / 1024 / 1024).toFixed(2)} MB •{" "}
                      {file.type.split("/")[1].toUpperCase()}
                    </p>
                  </div>

                  <Button
                    onClick={handleRemoveFile}
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div className="mt-4">
                  <Label htmlFor="job-profile">Job Profile</Label>
                  <Input
                    id="job-profile"
                    value={jobProfile}
                    onChange={(e) => setJobProfile(e.target.value)}
                    placeholder="Enter the job profile (e.g., Software Engineer)"
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    We'll optimize your resume for this job profile
                  </p>
                </div>

                <div className="mt-6">
                  <Button
                    onClick={handleUpload}
                    className="w-full"
                    disabled={!jobProfile.trim()}
                  >
                    Process Resume
                  </Button>
                </div>
              </div>
            )}

            <div className="mt-8 glass-card p-6 rounded-xl">
              <h3 className="font-medium mb-4">What happens after upload?</h3>
              <ul className="space-y-3">
                {[
                  "Our AI analyzes your resume to extract your skills, experience, and education",
                  "We create tailored resume templates based on your information",
                  "You can choose from multiple template options and customize them",
                  "We'll match your profile with relevant job opportunities",
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                      <span className="text-primary text-xs font-medium">
                        {i + 1}
                      </span>
                    </span>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass-card p-8 rounded-xl"
          >
            <div className="text-center mb-6">
              <h2 className="text-xl font-semibold mb-2">
                {step < 5 ? "Processing Your Resume" : "Processing Complete!"}
              </h2>
              <p className="text-muted-foreground">
                {step < 5
                  ? "Please wait while we analyze and process your resume..."
                  : "Your resume has been successfully processed. Taking you to templates..."}
              </p>
            </div>

            {step === 1 && (
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span>Uploading</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}

            <div className="space-y-6">
              {steps.slice(1).map((s, i) => {
                const stepIndex = i + 1;
                let status: "pending" | "current" | "complete" = "pending";

                if (step > stepIndex) status = "complete";
                else if (step === stepIndex) status = "current";

                return (
                  <div
                    key={i}
                    className={`flex items-center ${
                      status === "pending" ? "opacity-50" : ""
                    }`}
                  >
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center mr-4 ${
                        status === "complete"
                          ? "bg-primary text-white"
                          : status === "current"
                          ? "bg-primary text-white"
                          : "bg-muted"
                      }`}
                    >
                      {status === "complete" ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        s.icon
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{s.label}</p>
                      <p className="text-muted-foreground text-sm">
                        {status === "complete"
                          ? "Completed"
                          : status === "current"
                          ? "In progress..."
                          : "Pending"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default ResumeUpload;
