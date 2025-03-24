import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useResume } from "@/context/ResumeContext";
import { useToast } from "@/hooks/use-toast";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

interface ResumePreviewProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobData: any;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({
  open,
  onOpenChange,
  jobData,
}) => {
  const { selectedTemplate, resumeData } = useResume();
  const { toast } = useToast();
  const resumeRef = React.useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!resumeRef.current) return;

    try {
      // First, temporarily modify the resume container for better PDF capture
      const resumeContainer = resumeRef.current;
      const originalStyle = resumeContainer.style.cssText;
      
      // Temporarily modify the container for better PDF rendering
      resumeContainer.style.width = "800px";
      resumeContainer.style.height = "auto";
      resumeContainer.style.position = "relative";
      resumeContainer.style.overflow = "visible";
      
      // Set specific dimensions for PDF generation
      const pdfWidth = 210; // A4 width in mm
      const pdfHeight = 297; // A4 height in mm
      
      // Wait for styles to be applied
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Use higher scale for better quality
      const canvas = await html2canvas(resumeContainer, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        allowTaint: true,
        // Ensure we capture the full height
        height: resumeContainer.scrollHeight + 50, // Add extra space to ensure everything is captured
        windowHeight: resumeContainer.scrollHeight + 50,
        // Set specific dimensions
        width: resumeContainer.offsetWidth,
        onclone: (clonedDoc) => {
          // Make sure all elements in the clone are visible
          const clonedResume = clonedDoc.querySelector('#resume-container');
          if (clonedResume) {
            (clonedResume as HTMLElement).style.padding = '20px';
            (clonedResume as HTMLElement).style.height = 'auto';
          }
        }
      });
      
      // Restore original styles
      resumeContainer.style.cssText = originalStyle;
      
      const imgData = canvas.toDataURL("image/png", 1.0);
      
      // Create PDF with proper dimensions
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      
      // Calculate the aspect ratio to maintain proportions
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const ratio = Math.min(pdfWidth / canvasWidth, pdfHeight / canvasHeight);
      
      // Check if content exceeds a single page
      const scaledHeight = canvasHeight * ratio;
      
      if (scaledHeight > pdfHeight) {
        // Content is larger than one page - need to handle multi-page
        const pageCount = Math.ceil(scaledHeight / pdfHeight);
        
        for (let i = 0; i < pageCount; i++) {
          if (i > 0) {
            pdf.addPage();
          }
          
          // Calculate what portion of the canvas to render on this page
          const sourceY = (pdfHeight / ratio) * i;
          const sourceHeight = Math.min((pdfHeight / ratio), canvasHeight - sourceY);
          
          // Use the correct signature for addImage with clipping
          pdf.addImage(
            imgData,
            "PNG",
            0,
            0,
            pdfWidth,
            sourceHeight * ratio,
            undefined,
            'NONE',
            0,
            sourceY
          );
        }
      } else {
        // Content fits on a single page
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, scaledHeight);
      }
      
      pdf.save("resume.pdf");

      toast({
        title: "Success",
        description: "Resume downloaded successfully",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error",
        description: "Failed to download resume",
        variant: "destructive",
      });
    }
  };

  const handleApply = async () => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Application Submitted",
        description: "Your application has been submitted successfully",
      });

      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit application",
        variant: "destructive",
      });
    }
  };
  
  const resumeDataHere = {
    personalInfo: {
      name: "Alex Johnson",
      title: "Senior Software Engineer",
      email: "alex@example.com",
      phone: "(555) 123-4567",
      github: "Alex Johnson",
      linkedin: "alex-johnson",
      location: "San Francisco, CA",
      summary:
        "Experienced software engineer with expertise in React, Node.js, and cloud technologies. Passionate about building scalable and user-friendly applications that solve real-world problems.",
    },
    skills: [
      "JavaScript",
      "TypeScript",
      "React",
      "Node.js",
      "AWS",
      "Docker",
      "GraphQL",
      "RESTful APIs",
      "CI/CD",
      "Agile Methodologies",
    ],
    experience: [
      {
        title: "Senior Frontend Engineer",
        company: "Tech Innovations Inc.",
        location: "San Francisco, CA",
        period: "Jan 2021 - Present",
        highlights: [
          "Led development of company's flagship React application, improving performance by 40%",
          "Implemented CI/CD pipeline reducing deployment time by 60%",
          "Mentored junior developers and conducted code reviews",
        ],
      },
      {
        title: "Software Engineer",
        company: "DataSystems LLC",
        location: "Portland, OR",
        period: "Mar 2018 - Dec 2020",
        highlights: [
          "Developed and maintained multiple Node.js microservices",
          "Created RESTful APIs consumed by web and mobile clients",
          "Reduced server costs by 30% through optimization efforts",
        ],
      },
      {
        title: "Senior Frontend Engineer",
        company: "Tech Innovations Inc.",
        location: "San Francisco, CA",
        period: "Jan 2021 - Present",
        highlights: [
          "Led development of company's flagship React application, improving performance by 40%",
          "Implemented CI/CD pipeline reducing deployment time by 60%",
          "Mentored junior developers and conducted code reviews",
        ],
      },
      {
        title: "Software Engineer",
        company: "DataSystems LLC",
        location: "Portland, OR",
        period: "Mar 2018 - Dec 2020",
        highlights: [
          "Developed and maintained multiple Node.js microservices",
          "Created RESTful APIs consumed by web and mobile clients",
          "Reduced server costs by 30% through optimization efforts",
        ],
      },
    ],
    education: [
      {
        degree: "Master of Science in Computer Science",
        school: "University of California, Berkeley",
        period: "2016 - 2018",
      },
      {
        degree: "Bachelor of Science in Computer Science",
        school: "University of Washington",
        period: "2012 - 2016",
      },
    ],
    projects: [
      {
        title: "LIBRARY MANAGEMENT SYSTEM:",
        description:
          "Developed a full-featured library management system using Node.js, Express.js, React, andMongoDB.",
      },
      {
        title: "COURSE ENROLLMENT APPLICATION PROJECT:",
        description:
          "I also built a Course Enrollment Application that streamlines the registration process for students",
      },
    ],
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[1400px] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Resume Preview
          </DialogTitle>
          <DialogDescription>
            Review your resume and job details before applying
          </DialogDescription>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="flex flex-col md:flex-row gap-6 mt-4">
          {/* Left side - Resume preview */}
          <div className="w-full md:w-[130%] border rounded-md p-4 bg-white dark:bg-gray-800">
            <div
              ref={resumeRef}
              id="resume-container"
              className="font-serif px-4 sm:px-6 md:px-10 text-gray-700 bg-white relative mx-auto max-w-4xl"
              style={{ minHeight: "842px" }} /* A4 height in px */
            >
              <div className="py-4 sm:py-6 md:py-8">
                <h1 className="text-black font-bold text-lg sm:text-xl md:text-3xl lg:text-4xl mb-0 break-words">
                  {resumeDataHere.personalInfo.name}
                </h1>
                <h2 className="text-blue-500 text-xs sm:text-sm md:text-base lg:text-lg mb-2">
                  {resumeDataHere.personalInfo.title}
                </h2>
                
                {/* Fixed contact info with grid for better alignment */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6H2ZM20 8L12 13L4 8V6L12 11L20 6V8Z"></path>
                    </svg>
                    <span className="text-[10px] sm:text-xs md:text-sm break-all inline-block">
                      {resumeDataHere.personalInfo.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M6.62 10.79C7.06 12.19 7.99 13.45 9.32 14.68C10.55 16.01 11.81 16.94 13.21 17.38C14.34 17.73 15.03 17.62 15.88 17.08L17.37 16.14C17.76 15.89 18.26 15.98 18.57 16.34L21.15 19.41C21.41 19.72 21.38 20.18 21.06 20.42C19.96 21.3 18.09 22 15.86 22C14.43 22 12.88 21.73 11.28 21.19C9.68 20.66 8.16 19.87 6.75 18.81C5.34 17.75 4.06 16.5 2.91 15.07C1.77 13.64 1 12.11 0.58 10.49C0.15 8.86 0 7.3 0 5.79C0 3.56 0.7 1.69 1.58 0.58C1.82 0.27 2.27 0.24 2.59 0.5L5.66 3.08C6.02 3.39 6.11 3.89 5.86 4.28L4.92 5.77C4.38 6.62 4.27 7.31 4.62 8.44C5.06 9.84 5.99 11.1 6.62 10.79Z"></path>
                    </svg>
                    <span className="text-[10px] sm:text-xs md:text-sm inline-block">
                      {resumeDataHere.personalInfo.phone}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12C2 16.42 4.87 20.17 8.84 21.5C9.34 21.59 9.52 21.31 9.52 21.07C9.52 20.85 9.51 20.26 9.51 19.54C7 20.03 6.34 18.61 6.34 18.61C5.92 17.63 5.32 17.37 5.32 17.37C4.55 16.84 5.38 16.85 5.38 16.85C6.24 16.91 6.68 17.74 6.68 17.74C7.45 19.11 8.79 18.72 9.27 18.49C9.34 17.91 9.58 17.5 9.84 17.28C7.18 17.02 4.37 15.98 4.37 11.38C4.37 10.09 4.84 9.05 5.62 8.24C5.5 8.02 5.08 6.82 5.74 5.35C5.74 5.35 6.7 5.06 9.5 6.72C10.4 6.48 11.35 6.36 12.3 6.36C13.25 6.36 14.2 6.48 15.1 6.72C17.9 5.06 18.86 5.35 18.86 5.35C19.52 6.82 19.1 8.02 18.98 8.24C19.76 9.05 20.23 10.09 20.23 11.38C20.23 15.99 17.41 17.02 14.74 17.28C15.11 17.57 15.44 18.16 15.44 19.07C15.44 20.39 15.42 21.41 15.42 21.78C15.42 22.02 15.59 22.3 16.09 22.21C20.06 20.88 23 17.13 23 12C23 6.48 18.52 2 12 2Z"></path>
                    </svg>
                    <span className="text-[10px] sm:text-xs md:text-sm break-all inline-block">
                      {resumeDataHere.personalInfo.github}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M4.98 3.5C4.98 4.6 4.1 5.5 3 5.5C1.9 5.5 1 4.6 1 3.5C1 2.4 1.9 1.5 3 1.5C4.1 1.5 4.98 2.4 4.98 3.5ZM4.98 8V22H1V8H4.98ZM8 8H11.77V9.85H11.82C12.33 8.93 13.55 7.86 15.37 7.86C19 7.86 19.5 10.32 19.5 13.32V22H15.5V14C15.5 12.47 15.47 10.61 13.6 10.61C11.7 10.61 11.4 12.13 11.4 13.9V22H8V8Z"></path>
                    </svg>
                    <span className="text-[10px] sm:text-xs md:text-sm break-all inline-block">
                      {resumeDataHere.personalInfo.linkedin}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2C8.13 2 5 5.13 5 9C5 13.25 10.45 20.3 11.12 21.17C11.53 21.69 12.47 21.69 12.88 21.17C13.55 20.3 19 13.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"></path>
                    </svg>
                    <span className="text-[10px] sm:text-xs md:text-sm inline-block">
                      {resumeDataHere.personalInfo.location}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-4 sm:mb-5">
                <h3 className="text-black border-b border-black pb-1 sm:pb-2 font-bold text-sm sm:text-base md:text-lg">
                  Summary
                </h3>
                <p className="text-xs sm:text-sm md:text-base mt-2">
                  {resumeDataHere.personalInfo.summary}
                </p>
              </div>

              <div className="mb-4 sm:mb-5">
                <h3 className="text-black border-b border-black pb-1 sm:pb-2 font-bold text-sm sm:text-base md:text-lg">
                  Work Experience
                </h3>
                {resumeDataHere.experience.slice(0, 3).map((exp, index) => (
                  <div key={index} className="mb-3 sm:mb-4">
                    <div className="flex flex-col sm:flex-row justify-between mb-1">
                      <h4 className="m-0 text-sm sm:text-[15px] font-semibold">
                        {exp.title}
                      </h4>
                      <div className="text-black text-xs sm:text-sm">
                        {exp.period}
                      </div>
                    </div>
                    <div className="text-gray-600 text-[10px] sm:text-xs">
                      {exp.company}, {exp.location}
                    </div>
                    <ul className="m-0 pl-4 sm:pl-5 text-black">
                      {exp.highlights.map((highlight, idx) => (
                        <li
                          key={idx}
                          className="mb-1 text-xs sm:text-sm md:text-base"
                        >
                          {" --> "}
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mb-4 sm:mb-5">
                <h3 className="text-black border-b border-black pb-1 sm:pb-2 font-bold text-sm sm:text-base md:text-lg">
                  Education
                </h3>
                {resumeDataHere.education.map((edu, index) => (
                  <div key={index} className="mb-3 sm:mb-4">
                    <div className="flex flex-col sm:flex-row justify-between mb-1">
                      <h4 className="m-0 text-sm sm:text-[15px] font-semibold">
                        {edu.degree}
                      </h4>
                      <div className="text-gray-600 text-xs sm:text-sm">
                        {edu.period}
                      </div>
                    </div>
                    <div className="text-gray-600 text-[10px] sm:text-xs">
                      {edu.school}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mb-4 sm:mb-5">
                <h3 className="text-black border-b border-black pb-1 sm:pb-2 font-bold text-sm sm:text-base md:text-lg">
                  Skills
                </h3>
                <div className="flex flex-wrap gap-1 sm:gap-2 mt-2">
                  {resumeDataHere.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="text-xs sm:text-sm md:text-base"
                    >
                      {skill}{index < resumeDataHere.skills.length - 1 ? "," : ""}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4 sm:mb-5">
                <h3 className="text-black border-b border-black pb-1 sm:pb-2 font-bold text-sm sm:text-base md:text-lg">
                  Projects
                </h3>
                <div className="flex flex-col gap-2 sm:gap-3 mt-2">
                  {resumeDataHere.projects.map((pro, index) => (
                    <div key={index}>
                      <h1 className="text-xs sm:text-sm md:text-base font-semibold">
                        {pro.title}
                      </h1>
                      <p className="text-[10px] sm:text-xs md:text-sm">
                        {pro.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-center">
              <Button onClick={handleDownload}>Download Resume</Button>
            </div>
          </div>

          {/* Right side - Job details */}
          <div className="border rounded-md p-4 h-fit w-full md:w-auto">
            <h2 className="text-xl font-bold mb-2">{jobData.title}</h2>
            <p className="text-muted-foreground mb-1">{jobData.company}</p>
            <p className="text-muted-foreground mb-4">{jobData.location}</p>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">Job Description</h3>
              <p className="text-sm">{jobData.description}</p>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">Requirements</h3>
              <ul className="list-disc pl-5 text-sm">
                {jobData.requirements.map((req: string, index: number) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">Benefits</h3>
              <ul className="list-disc pl-5 text-sm">
                {jobData.benefits.map((benefit: string, index: number) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>

            <div className="mt-6">
              <Button onClick={handleApply} className="w-full">
                Apply Now
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResumePreview;

