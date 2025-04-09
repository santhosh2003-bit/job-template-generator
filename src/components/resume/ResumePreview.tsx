
import React from "react";
import { Github, Linkedin, MapPin, Phone, X } from "lucide-react";
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
import { Mail } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

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
  const { selectedTemplate, resumeData, personalDetails } = useResume();
  const { toast } = useToast();
  const resumeRef = React.useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const handleDownload = async () => {
    if (!resumeRef.current) return;

    try {
      const element = resumeRef.current;
      toast({
        title: "Preparing PDF",
        description: "Please wait while we prepare your resume...",
      });

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        width: element.scrollWidth,
        height: element.scrollHeight,
      });

      const imgData = canvas.toDataURL("image/png", 1.0);
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      const ratio = pdfWidth / imgWidth;
      const adjustedHeight = imgHeight * ratio;
      
      const totalPages = Math.ceil(adjustedHeight / pdfHeight);
      
      for (let i = 0; i < totalPages; i++) {
        if (i > 0) {
          pdf.addPage();
        }
        
        const sourceY = i * (pdfHeight / ratio);
        const sourceHeight = Math.min(pdfHeight / ratio, imgHeight - sourceY);
        
        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = imgWidth;
        pageCanvas.height = sourceHeight;
        
        const ctx = pageCanvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(
            canvas,
            0,
            sourceY,
            imgWidth,
            sourceHeight,
            0,
            0,
            imgWidth,
            sourceHeight
          );
          
          const pageImgData = pageCanvas.toDataURL("image/png", 1.0);
          pdf.addImage(
            pageImgData,
            "PNG",
            0,
            0,
            pdfWidth,
            (sourceHeight * ratio)
          );
        }
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
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (jobData.job_url) {
        window.open(jobData.job_url, "_blank");
      }

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

  const customizedResume = jobData.customized_resume || null;

  const resumeDataToShow = {
    personalInfo: {
      name: personalDetails?.full_name || "Alex Johnson",
      title: personalDetails?.current_position || "Senior Software Engineer",
      email: personalDetails?.email || "alex@example.com",
      phone: personalDetails?.phone_number || "(555) 123-4567",
      github:
        personalDetails?.github === "None"
          ? "Github"
          : personalDetails?.github || "Alex Johnson",
      linkedin:
        personalDetails?.linkedin === "None"
          ? "LinkedIn"
          : personalDetails?.linkedin || "alex-johnson",
      location: personalDetails?.physical_address || "San Francisco, CA",
      summary:
        personalDetails?.brief_summary === "None"
          ? "Experienced professional with expertise in relevant technologies. Passionate about building scalable solutions that solve real-world problems."
          : personalDetails?.brief_summary,
    },
    skills: customizedResume?.modified_skills || [
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
    experience: customizedResume?.modified_work_experience
      ? customizedResume.modified_work_experience.map((exp) => ({
          title: exp["Job Title"],
          company: exp.Company,
          location: "",
          period: "",
          highlights: exp.Responsibilities,
        }))
      : [
          {
            title: "Senior Frontend Engineer",
            company: "Tech Innovations Inc.",
            location: "San Francisco, CA",
            period: "Jan 2021 - Present",
            highlights: [
              "Led development of company's flagship React application, improving performance by 40%",
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
              "Reduced server costs by 30% through optimization efforts",
            ],
          },
        ],
    education: personalDetails?.education
      ? [
          {
            degree: personalDetails.education,
            school: "",
            period: "",
          },
        ]
      : [
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
      <DialogContent className="sm:max-w-[1400px] max-h-[90vh] overflow-auto p-0">
        <DialogHeader className="p-4 sm:p-6">
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

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 p-4 sm:p-6">
          <div className="w-full lg:w-2/3 border rounded-md p-4 bg-white dark:bg-gray-800 overflow-hidden">
            <div
              className="font-[calibri] text-gray-700 bg-white max-w-full mx-auto"
              ref={resumeRef}
              style={{
                width: "100%",
                padding: "10px",
                boxSizing: "border-box",
              }}
            >
              <div className="py-2">
                <h1 className="text-black font-bold text-lg sm:text-xl md:text-3xl mb-0 break-words">
                  {resumeDataToShow.personalInfo.name}
                </h1>
                <h2 className="text-purple-500 text-xs sm:text-sm md:text-base mb-0">
                  ({resumeDataToShow.personalInfo.title})
                </h2>
                <div className="flex flex-wrap gap-2 sm:gap-3 mt-2 sm:mt-1">
                  <div className="flex items-center gap-1 text-[10px] sm:text-xs md:text-sm">
                    <Mail className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="break-all">
                      {resumeDataToShow.personalInfo.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] sm:text-xs md:text-sm">
                    <Phone className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="break-all">
                      {resumeDataToShow.personalInfo.phone}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] sm:text-xs md:text-sm">
                    <Github className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="break-all">
                      {resumeDataToShow.personalInfo.github}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] sm:text-xs md:text-sm">
                    <Linkedin className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="break-all">
                      {resumeDataToShow.personalInfo.linkedin}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-[10px] sm:text-xs md:text-sm">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span>
                      {resumeDataToShow.personalInfo.location}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-2">
                <h3 className="text-black border-b border-black pb-1 font-bold text-sm sm:text-base md:text-lg">
                  Summary
                </h3>
                <p className="text-xs sm:text-sm md:text-base">
                  {resumeDataToShow.personalInfo.summary}
                </p>
              </div>

              <div className="mb-2">
                <h3 className="text-black border-b border-black pb-1 font-bold text-sm sm:text-base md:text-lg">
                  Work Experience
                </h3>
                {resumeDataToShow.experience.map((exp, index) => (
                  <div key={index} className="mb-2">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                      <h4 className="m-0 text-sm sm:text-[15px] font-semibold">
                        {exp.title}
                      </h4>
                      {exp.period && (
                        <div className="text-black text-xs sm:text-sm">
                          {exp.period}
                        </div>
                      )}
                    </div>
                    <div className="text-gray-600 text-[10px] sm:text-xs">
                      {exp.company}
                      {exp.location ? `, ${exp.location}` : ""}
                    </div>
                    <ul className="m-0 pl-4 text-black">
                      {exp.highlights.map((highlight, idx) => (
                        <li key={idx} className="mb-1 text-xs sm:text-sm md:text-base">
                          {" --> "}
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mb-2">
                <h3 className="text-black border-b border-black pb-1 font-bold text-sm sm:text-base md:text-lg">
                  Education
                </h3>
                {resumeDataToShow.education.map((edu, index) => (
                  <div key={index} className="mb-2">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                      <h4 className="m-0 text-sm sm:text-[15px] font-semibold">
                        {edu.degree}
                      </h4>
                      {edu.period && (
                        <div className="text-gray-600 text-xs sm:text-sm">
                          {edu.period}
                        </div>
                      )}
                    </div>
                    {edu.school && (
                      <div className="text-gray-600 text-[10px] sm:text-xs">
                        {edu.school}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mb-2">
                <h3 className="text-black border-b border-black pb-1 font-bold text-sm sm:text-base md:text-lg">
                  Skills
                </h3>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {resumeDataToShow.skills.map((skill, index) => (
                    <span key={index} className="text-xs sm:text-sm md:text-base">
                      {skill}
                      {index < resumeDataToShow.skills.length - 1 ? "," : ""}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-4 flex justify-center">
              <Button onClick={handleDownload} className="bg-purple-500 hover:bg-purple-600">Download Resume</Button>
            </div>
          </div>

          <div className="w-full lg:w-1/3 border rounded-md p-4 h-fit">
            <h2 className="text-xl font-bold mb-2">{jobData.job_title}</h2>
            <p className="text-muted-foreground mb-1">{jobData.company}</p>
            <p className="text-muted-foreground mb-4">
              {jobData.location || jobData.place}
            </p>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">Job Description</h3>
              <p className="text-sm whitespace-pre-line">
                {jobData.job_description}
              </p>
            </div>

            {jobData.requirements && (
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Requirements</h3>
                <ul className="list-disc pl-5 text-sm">
                  {jobData.requirements.map((req: string, index: number) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
            )}

            {jobData.benefits && (
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Benefits</h3>
                <ul className="list-disc pl-5 text-sm">
                  {jobData.benefits.map((benefit: string, index: number) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-6">
              <Button 
                onClick={handleApply} 
                className="w-full bg-purple-500 hover:bg-purple-600">
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
