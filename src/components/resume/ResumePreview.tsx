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
      const element = resumeRef.current;
      const canvas = await html2canvas(element, {
        scale: 2, // Reduced from 3 to maintain quality while managing size
        useCORS: true,
        logging: false,
        width: element.scrollWidth,
        height: element.scrollHeight, // Capture full content height
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

      // Calculate the ratio to fit width to A4
      const ratio = pdfWidth / imgWidth;
      const scaledWidth = imgWidth * ratio;
      const scaledHeight = imgHeight * ratio;

      // Calculate how many pages are needed
      const pageHeight = pdfHeight / ratio; // Height of one page in canvas pixels
      const totalPages = Math.ceil(imgHeight / pageHeight);

      // Add pages and content
      for (let i = 0; i < totalPages; i++) {
        if (i > 0) pdf.addPage();

        const srcY = i * pageHeight;
        const canvasSection = document.createElement("canvas");
        canvasSection.width = imgWidth;
        canvasSection.height = Math.min(pageHeight, imgHeight - srcY);

        const ctx = canvasSection.getContext("2d");
        ctx?.drawImage(
          canvas,
          0,
          srcY,
          imgWidth,
          Math.min(pageHeight, imgHeight - srcY),
          0,
          0,
          imgWidth,
          Math.min(pageHeight, imgHeight - srcY)
        );

        const sectionData = canvasSection.toDataURL("image/png", 1.0);
        pdf.addImage(
          sectionData,
          "PNG",
          0,
          0,
          pdfWidth,
          Math.min(pdfHeight, (imgHeight - srcY) * ratio)
        );
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
        highlights: ["Developed and maintained multiple Node.js microservices"],
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

        <div className="flex md:flex-row flex-col gap-6 mt-4">
          {/* Left side - Resume preview */}
          <div className="w-[130%]  border rounded-md p-4 bg-white dark:bg-gray-800">
            <div
              className="font-[calibri] px-4 sm:px-6 md:px-10 text-gray-700 bg-white max-w-[210mm] mx-auto" // Set width to A4 width
              ref={resumeRef}
              style={{
                width: "210mm", // A4 width
                padding: "20mm", // Standard A4 margins
                boxSizing: "border-box",
                overflow: "visible", // Ensure content isn't clipped
              }}
            >
              <div className="py-4 sm:py-2 md:py-2">
                <h1 className="text-black font-bold text-lg sm:text-xl md:text-3xl lg:text-4xl mb-0 break-words">
                  {resumeDataHere.personalInfo.name}
                </h1>
                <h2 className="text-blue-500 text-xs sm:text-sm md:text-base lg:text-lg mb-0">
                  ({resumeDataHere.personalInfo.title})
                </h2>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs sm:text-sm mt-2 sm:mt-1 gap-2 sm:gap-0">
                  <div className="flex items-center justify-center gap-1 sm:gap-2 relative">
                    <div>
                      <Mail />
                    </div>
                    <div>
                      <span className="text-[10px] sm:text-xs md:text-sm break-all">
                        {resumeDataHere.personalInfo.email}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <div>
                      <Phone />
                    </div>
                    <div>
                      <span className="text-[10px] sm:text-xs md:text-sm break-all">
                        {resumeDataHere.personalInfo.phone}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 sm:gap-2">
                    <div>
                      <Github />
                    </div>
                    <div>
                      <p className="text-[10px] sm:text-xs md:text-sm break-all">
                        {resumeDataHere.personalInfo.github}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <div>
                      <Linkedin />
                    </div>
                    <div>
                      <span className="text-[10px] sm:text-xs md:text-sm break-all">
                        {resumeDataHere.personalInfo.linkedin}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <div>
                      <MapPin />
                    </div>
                    <div>
                      <span className="text-[10px] sm:text-xs md:text-sm">
                        {resumeDataHere.personalInfo.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-2 sm:mb-1">
                <h3 className="text-black border-b border-black pb-1 sm:pb-2 font-bold text-sm sm:text-base md:text-lg">
                  Summary
                </h3>
                <p className="text-xs sm:text-sm md:text-base">
                  {resumeDataHere.personalInfo.summary}
                </p>
              </div>

              <div className="mb-4 sm:mb-1">
                <h3 className="text-black border-b border-black pb-1 sm:pb-1 font-bold text-sm sm:text-base md:text-lg">
                  Work Experience
                </h3>
                {resumeDataHere.experience.map((exp, index) => (
                  <div key={index} className="mb-3 sm:mb-1">
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

              <div className="mb-2 sm:mb-1">
                <h3 className="text-black border-b border-black pb-1 sm:pb-2 font-bold text-sm sm:text-base md:text-lg">
                  Education
                </h3>
                {resumeDataHere.education.map((edu, index) => (
                  <div key={index} className="mb-3 sm:mb-1">
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

              <div className="mb-4 sm:mb-1">
                <h3 className="text-black border-b border-black pb-1 sm:pb-1 font-bold text-sm sm:text-base md:text-lg">
                  Skills
                </h3>
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {resumeDataHere.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="text-xs sm:text-sm md:text-base"
                    >
                      {skill},
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4 sm:mb-1">
                <h3 className="text-black border-b border-black pb-1 sm:pb-1 font-bold text-sm sm:text-base md:text-lg">
                  Projects
                </h3>
                <div className="flex flex-col gap-2 sm:gap-3">
                  {resumeDataHere.projects.map((pro, index) => (
                    <div key={index}>
                      <h1 className="text-xs sm:text-sm md:text-base font-semibold">
                        {pro.title},
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
          <div className="border rounded-md p-4 h-fit">
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
