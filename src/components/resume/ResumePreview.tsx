
import React, { useState, useEffect, useRef } from "react";
import { Github, Linkedin, MapPin, Phone, X, ChevronLeft, ChevronRight } from "lucide-react";
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
import { 
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious 
} from "@/components/ui/pagination";

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
  const resumePagesRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [resumePages, setResumePages] = useState<HTMLDivElement[]>([]);
  const [pageHeight, setPageHeight] = useState(0);

  console.log("Job data in preview:", jobData);
  console.log("Personal details in preview:", personalDetails);

  // A4 dimensions in pixels (at 96 DPI)
  const A4_WIDTH = 794; // ~210mm at 96 DPI
  const A4_HEIGHT = 1123; // ~297mm at 96 DPI
  const PAGE_MARGIN = 50; // 50px margin

  // Calculate effective content area dimensions
  const CONTENT_WIDTH = A4_WIDTH - (PAGE_MARGIN * 2);
  const CONTENT_HEIGHT = A4_HEIGHT - (PAGE_MARGIN * 2);

  // Process customized resume data from the API if available
  const customizedResume = jobData.customized_resume || null;
  console.log("Customized resume:", customizedResume);

  // Create the resume data structure with all available information
  const resumeDataToShow = {
    personalInfo: {
      name: personalDetails?.full_name || "Alex Johnson",
      title: personalDetails?.current_position || "Senior Software Engineer",
      email: personalDetails?.email || "alex@example.com",
      phone: personalDetails?.phone_number || "(555) 123-4567",
      github:
        personalDetails?.github === "None" ? "" : personalDetails?.github || "",
      linkedin:
        personalDetails?.linkedin === "None"
          ? ""
          : personalDetails?.linkedin || "",
      location: personalDetails?.physical_address || "San Francisco, CA",
      summary:
        personalDetails?.brief_summary === "None"
          ? "Experienced professional with expertise in relevant technologies."
          : personalDetails?.brief_summary,
    },
    skills: customizedResume?.modified_skills ||
      resumeData?.skills || ["JavaScript", "TypeScript", "React", "Node.js"],
    experience: customizedResume?.modified_work_experience
      ? customizedResume.modified_work_experience.map((exp) => ({
          title: exp["Job Title"],
          company: exp.Company,
          location: "",
          period: "",
          highlights: exp.Responsibilities,
        }))
      : resumeData?.experience || [
          {
            title: "Software Engineer",
            company: "Example Company",
            location: "Remote",
            period: "2021 - Present",
            highlights: [
              "Developed web applications",
              "Collaborated with team members",
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
            degree: "Bachelor of Science in Computer Science",
            school: "University",
            period: "2012 - 2016",
          },
        ],
  };

  useEffect(() => {
    // Reset to first page when dialog opens
    if (open) {
      setCurrentPage(1);
    }
  }, [open]);

  useEffect(() => {
    if (resumePagesRef.current) {
      createResumePagination();
    }
  }, [resumeDataToShow, open]);

  const createResumePagination = () => {
    if (!resumePagesRef.current) return;

    // Clear any existing content
    while (resumePagesRef.current.firstChild) {
      resumePagesRef.current.removeChild(resumePagesRef.current.firstChild);
    }

    // Create the first page
    const firstPage = document.createElement('div');
    firstPage.className = 'resume-page';
    firstPage.style.width = `${A4_WIDTH}px`;
    firstPage.style.height = `${A4_HEIGHT}px`;
    firstPage.style.backgroundColor = 'white';
    firstPage.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    firstPage.style.margin = '0 auto 20px auto';
    firstPage.style.position = 'relative';
    firstPage.style.overflow = 'hidden';
    firstPage.style.pageBreakAfter = 'always';

    // Create content container with padding
    const contentDiv = document.createElement('div');
    contentDiv.className = 'resume-content';
    contentDiv.style.padding = `${PAGE_MARGIN}px`;
    contentDiv.style.fontFamily = 'Calibri, sans-serif';
    contentDiv.style.color = '#000';
    contentDiv.style.height = `${CONTENT_HEIGHT}px`;
    contentDiv.style.overflow = 'hidden';

    // Clone the template content
    const templateContent = document.getElementById('resume-template');
    if (templateContent) {
      contentDiv.appendChild(templateContent.cloneNode(true));
    }

    firstPage.appendChild(contentDiv);
    resumePagesRef.current.appendChild(firstPage);

    // Calculate pagination
    calculatePagination();
  };

  const calculatePagination = () => {
    if (!resumePagesRef.current) return;
    
    const contentElement = document.querySelector('.resume-content');
    if (!contentElement) return;
    
    const contentHeight = contentElement.scrollHeight;
    const availableHeight = CONTENT_HEIGHT;
    const calculatedTotalPages = Math.ceil(contentHeight / availableHeight);
    
    setTotalPages(calculatedTotalPages);
    
    // Create additional pages if needed
    const existingPages = resumePagesRef.current.querySelectorAll('.resume-page');
    
    for (let i = existingPages.length; i < calculatedTotalPages; i++) {
      const newPage = document.createElement('div');
      newPage.className = 'resume-page';
      newPage.style.width = `${A4_WIDTH}px`;
      newPage.style.height = `${A4_HEIGHT}px`;
      newPage.style.backgroundColor = 'white';
      newPage.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
      newPage.style.margin = '0 auto 20px auto';
      newPage.style.position = 'relative';
      newPage.style.overflow = 'hidden';
      newPage.style.pageBreakAfter = 'always';
      
      // Create content container with padding for additional pages
      const newContentDiv = document.createElement('div');
      newContentDiv.className = 'resume-content';
      newContentDiv.style.padding = `${PAGE_MARGIN}px`;
      newContentDiv.style.fontFamily = 'Calibri, sans-serif';
      newContentDiv.style.color = '#000';
      newContentDiv.style.height = `${CONTENT_HEIGHT}px`;
      newContentDiv.style.overflow = 'hidden';
      newContentDiv.style.position = 'relative';
      newContentDiv.style.top = `${-i * CONTENT_HEIGHT}px`;
      
      const contentClone = contentElement.cloneNode(true) as HTMLElement;
      contentClone.style.position = 'absolute';
      contentClone.style.top = `${i * CONTENT_HEIGHT}px`;
      
      newContentDiv.appendChild(contentClone);
      newPage.appendChild(newContentDiv);
      resumePagesRef.current.appendChild(newPage);
    }
    
    // Show only current page
    updateVisiblePage();
  };
  
  const updateVisiblePage = () => {
    if (!resumePagesRef.current) return;
    
    const pages = resumePagesRef.current.querySelectorAll('.resume-page');
    pages.forEach((page, index) => {
      if (index + 1 === currentPage) {
        (page as HTMLElement).style.display = 'block';
      } else {
        (page as HTMLElement).style.display = 'none';
      }
    });
  };

  useEffect(() => {
    updateVisiblePage();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleDownload = async () => {
    try {
      toast({
        title: "Preparing PDF",
        description: "Please wait while we prepare your resume...",
      });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      if (!resumePagesRef.current) return;
      const pages = resumePagesRef.current.querySelectorAll('.resume-page');
      
      // Make all pages visible for capturing
      pages.forEach((page) => {
        (page as HTMLElement).style.display = 'block';
      });

      // Process each page
      for (let i = 0; i < pages.length; i++) {
        const page = pages[i] as HTMLElement;
        
        // Temporarily make this page visible
        page.style.display = 'block';
        
        const canvas = await html2canvas(page, {
          scale: 2,
          useCORS: true,
          logging: false,
        });

        const imgData = canvas.toDataURL("image/png", 1.0);
        
        if (i > 0) {
          pdf.addPage();
        }
        
        // Get dimensions
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      }
      
      // Restore current page visibility
      pages.forEach((page, index) => {
        (page as HTMLElement).style.display = index + 1 === currentPage ? 'block' : 'none';
      });

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
          <div className="w-full lg:w-2/3 overflow-hidden flex flex-col items-center">
            {/* Pagination at top */}
            {totalPages > 1 && (
              <div className="mb-4 w-full flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => handlePageChange(currentPage - 1)} 
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""} 
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => handlePageChange(page)}
                          isActive={page === currentPage}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => handlePageChange(currentPage + 1)} 
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
            
            {/* Resume pages container */}
            <div ref={resumePagesRef} className="w-full">
              {/* Pages will be dynamically generated here */}
            </div>
            
            {/* Hidden template that will be cloned for pagination */}
            <div id="resume-template" className="hidden">
              <div className="py-4">
                <h1 className="text-black font-bold text-2xl sm:text-3xl md:text-4xl break-words">
                  {resumeDataToShow.personalInfo.name}
                </h1>
                <h2 className="text-black text-sm sm:text-base md:text-lg mt-1">
                  {resumeDataToShow.personalInfo.title}
                </h2>
                <div className="flex flex-wrap gap-4 mt-3">
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <Mail className="h-4 w-4" />
                    <span className="break-all">
                      {resumeDataToShow.personalInfo.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <Phone className="h-4 w-4" />
                    <span className="break-all">
                      {resumeDataToShow.personalInfo.phone}
                    </span>
                  </div>
                  {resumeDataToShow.personalInfo.github && (
                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                      <Github className="h-4 w-4" />
                      <span className="break-all">
                        {resumeDataToShow.personalInfo.github}
                      </span>
                    </div>
                  )}
                  {resumeDataToShow.personalInfo.linkedin && (
                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                      <Linkedin className="h-4 w-4" />
                      <span className="break-all">
                        {resumeDataToShow.personalInfo.linkedin}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <MapPin className="h-4 w-4" />
                    <span>{resumeDataToShow.personalInfo.location}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <h3 className="text-black border-b-2 border-black pb-1 font-bold text-base sm:text-lg md:text-xl mb-2">
                  Summary
                </h3>
                <p className="text-sm sm:text-base pl-5">
                  {resumeDataToShow.personalInfo.summary}
                </p>
              </div>

              <div className="mt-6">
                <h3 className="text-black border-b-2 border-black pb-1 font-bold text-base sm:text-lg md:text-xl mb-2">
                  Work Experience
                </h3>
                {resumeDataToShow.experience.map((exp, index) => (
                  <div key={index} className="pl-5 mb-5">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                      <h4 className="font-semibold text-base sm:text-lg">
                        {exp.title}
                      </h4>
                      {exp.period && (
                        <div className="text-black text-xs sm:text-sm font-medium">
                          {exp.period}
                        </div>
                      )}
                    </div>
                    <div className="text-gray-600 text-xs sm:text-sm font-medium mb-1">
                      {exp.company}
                      {exp.location ? `, ${exp.location}` : ""}
                    </div>
                    <ul className="pl-8 text-black list-disc space-y-2">
                      {exp.highlights.map((highlight, idx) => (
                        <li key={idx} className="text-sm sm:text-base">
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <h3 className="text-black border-b-2 border-black pb-1 font-bold text-base sm:text-lg md:text-xl mb-2">
                  Education
                </h3>
                <div className="flex flex-col gap-2">
                  {resumeDataToShow.education.map((edu, index) => (
                    <div key={index} className="pl-5 mb-3">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                        <h4 className="font-semibold text-base sm:text-lg">
                          {edu.degree}
                        </h4>
                        {edu.period && (
                          <div className="text-gray-600 text-xs">
                            {edu.period}
                          </div>
                        )}
                      </div>
                      {edu.school && (
                        <div className="text-gray-600 text-sm sm:text-base">
                          {edu.school}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-black border-b-2 border-black pb-1 font-bold text-base sm:text-lg md:text-xl mb-2">
                  Skills
                </h3>
                <div className="flex flex-wrap gap-3 pl-5">
                  {resumeDataToShow.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="text-sm sm:text-base inline-block"
                    >
                      {skill}
                      {index < resumeDataToShow.skills.length - 1 ? "," : ""}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Pagination at bottom */}
            {totalPages > 1 && (
              <div className="mt-4 w-full flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => handlePageChange(currentPage - 1)} 
                        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""} 
                      />
                    </PaginationItem>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          onClick={() => handlePageChange(page)}
                          isActive={page === currentPage}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => handlePageChange(currentPage + 1)} 
                        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
            
            <div className="mt-4">
              <Button
                onClick={handleDownload}
                className="bg-purple-500 hover:bg-purple-600"
              >
                Download Resume
              </Button>
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
                className="w-full bg-purple-500 hover:bg-purple-600"
              >
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
