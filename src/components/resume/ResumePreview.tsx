
import React, { useState, useEffect, useRef } from "react";
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
import { 
  Pagination,
  PaginationContent,
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
  const resumeContentRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
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
  const customizedResume = jobData?.customized_resume || null;
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

  // Create and render the resume content directly
  const renderResumeContent = () => {
    return (
      <div className="py-4 text-black">
        <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl break-words">
          {resumeDataToShow.personalInfo.name}
        </h1>
        <h2 className="text-sm sm:text-base md:text-lg mt-1">
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

        <div className="mt-5">
          <h3 className="border-b-2 border-black pb-1 font-bold text-base sm:text-lg md:text-xl mb-2">
            Summary
          </h3>
          <p className="text-sm sm:text-base pl-5">
            {resumeDataToShow.personalInfo.summary}
          </p>
        </div>

        <div className="mt-6">
          <h3 className="border-b-2 border-black pb-1 font-bold text-base sm:text-lg md:text-xl mb-2">
            Work Experience
          </h3>
          {resumeDataToShow.experience.map((exp, index) => (
            <div key={index} className="pl-5 mb-5">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                <h4 className="font-semibold text-base sm:text-lg">
                  {exp.title}
                </h4>
                {exp.period && (
                  <div className="text-xs sm:text-sm font-medium">
                    {exp.period}
                  </div>
                )}
              </div>
              <div className="text-gray-600 text-xs sm:text-sm font-medium mb-1">
                {exp.company}
                {exp.location ? `, ${exp.location}` : ""}
              </div>
              <ul className="pl-8 list-disc space-y-2">
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
          <h3 className="border-b-2 border-black pb-1 font-bold text-base sm:text-lg md:text-xl mb-2">
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
          <h3 className="border-b-2 border-black pb-1 font-bold text-base sm:text-lg md:text-xl mb-2">
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
    );
  };

  useEffect(() => {
    // Reset to first page when dialog opens
    if (open) {
      setCurrentPage(1);
    }
  }, [open]);

  useEffect(() => {
    if (open && resumeContentRef.current) {
      // Create the resume content as raw HTML
      const contentElement = document.createElement('div');
      contentElement.innerHTML = `
        <div class="py-4 text-black">
          <h1 class="font-bold text-2xl sm:text-3xl md:text-4xl break-words">
            ${resumeDataToShow.personalInfo.name}
          </h1>
          <h2 class="text-sm sm:text-base md:text-lg mt-1">
            ${resumeDataToShow.personalInfo.title}
          </h2>
          <div class="flex flex-wrap gap-4 mt-3">
            <div class="flex items-center gap-2 text-xs sm:text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              <span class="break-all">
                ${resumeDataToShow.personalInfo.email}
              </span>
            </div>
            <div class="flex items-center gap-2 text-xs sm:text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <span class="break-all">
                ${resumeDataToShow.personalInfo.phone}
              </span>
            </div>
            ${resumeDataToShow.personalInfo.github ? `
            <div class="flex items-center gap-2 text-xs sm:text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              <span class="break-all">
                ${resumeDataToShow.personalInfo.github}
              </span>
            </div>
            ` : ''}
            ${resumeDataToShow.personalInfo.linkedin ? `
            <div class="flex items-center gap-2 text-xs sm:text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              <span class="break-all">
                ${resumeDataToShow.personalInfo.linkedin}
              </span>
            </div>
            ` : ''}
            <div class="flex items-center gap-2 text-xs sm:text-sm">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>${resumeDataToShow.personalInfo.location}</span>
            </div>
          </div>

          <div class="mt-5">
            <h3 class="border-b-2 border-black pb-1 font-bold text-base sm:text-lg md:text-xl mb-2">
              Summary
            </h3>
            <p class="text-sm sm:text-base pl-5">
              ${resumeDataToShow.personalInfo.summary}
            </p>
          </div>

          <div class="mt-6">
            <h3 class="border-b-2 border-black pb-1 font-bold text-base sm:text-lg md:text-xl mb-2">
              Work Experience
            </h3>
            ${resumeDataToShow.experience.map((exp, index) => `
              <div class="pl-5 mb-5">
                <div class="flex flex-col sm:flex-row justify-between sm:items-center">
                  <h4 class="font-semibold text-base sm:text-lg">
                    ${exp.title}
                  </h4>
                  ${exp.period ? `
                    <div class="text-xs sm:text-sm font-medium">
                      ${exp.period}
                    </div>
                  ` : ''}
                </div>
                <div class="text-gray-600 text-xs sm:text-sm font-medium mb-1">
                  ${exp.company}
                  ${exp.location ? `, ${exp.location}` : ""}
                </div>
                <ul class="pl-8 list-disc space-y-2">
                  ${exp.highlights.map((highlight, idx) => `
                    <li class="text-sm sm:text-base">
                      ${highlight}
                    </li>
                  `).join('')}
                </ul>
              </div>
            `).join('')}
          </div>

          <div class="mt-6">
            <h3 class="border-b-2 border-black pb-1 font-bold text-base sm:text-lg md:text-xl mb-2">
              Education
            </h3>
            <div class="flex flex-col gap-2">
              ${resumeDataToShow.education.map((edu, index) => `
                <div class="pl-5 mb-3">
                  <div class="flex flex-col sm:flex-row justify-between sm:items-center">
                    <h4 class="font-semibold text-base sm:text-lg">
                      ${edu.degree}
                    </h4>
                    ${edu.period ? `
                      <div class="text-gray-600 text-xs">
                        ${edu.period}
                      </div>
                    ` : ''}
                  </div>
                  ${edu.school ? `
                    <div class="text-gray-600 text-sm sm:text-base">
                      ${edu.school}
                    </div>
                  ` : ''}
                </div>
              `).join('')}
            </div>
          </div>

          <div class="mt-6">
            <h3 class="border-b-2 border-black pb-1 font-bold text-base sm:text-lg md:text-xl mb-2">
              Skills
            </h3>
            <div class="flex flex-wrap gap-3 pl-5">
              ${resumeDataToShow.skills.map((skill, index) => `
                <span class="text-sm sm:text-base inline-block">
                  ${skill}${index < resumeDataToShow.skills.length - 1 ? "," : ""}
                </span>
              `).join('')}
            </div>
          </div>
        </div>
      `;
      
      // Store the HTML content
      if (resumeContentRef.current) {
        resumeContentRef.current.innerHTML = '';
        resumeContentRef.current.appendChild(contentElement);
      }
      
      // Create the initial page
      createInitialResumePage();
    }
  }, [resumeDataToShow, open]);
  
  // Create the initial resume page directly with the content
  const createInitialResumePage = () => {
    if (!resumePagesRef.current || !resumeContentRef.current) return;
    
    // Clear existing content
    resumePagesRef.current.innerHTML = '';
    
    // Create the first page
    const firstPage = document.createElement('div');
    firstPage.className = 'resume-page';
    firstPage.id = 'resume-page-1';
    firstPage.style.width = `${A4_WIDTH}px`;
    firstPage.style.height = `${A4_HEIGHT}px`;
    firstPage.style.backgroundColor = 'white';
    firstPage.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    firstPage.style.margin = '0 auto 20px auto';
    firstPage.style.position = 'relative';
    firstPage.style.overflow = 'hidden';
    firstPage.style.color = 'black';
    
    // Create content container
    const contentDiv = document.createElement('div');
    contentDiv.className = 'resume-content';
    contentDiv.id = 'resume-content';
    contentDiv.style.padding = `${PAGE_MARGIN}px`;
    contentDiv.style.fontFamily = 'Calibri, sans-serif';
    contentDiv.style.maxHeight = `${CONTENT_HEIGHT}px`;
    contentDiv.style.overflow = 'hidden';
    
    // Clone the content from our reference
    if (resumeContentRef.current?.firstChild) {
      contentDiv.appendChild(resumeContentRef.current.firstChild.cloneNode(true));
    }
    
    firstPage.appendChild(contentDiv);
    resumePagesRef.current.appendChild(firstPage);
    
    // Check if content needs pagination
    if (contentDiv.scrollHeight > CONTENT_HEIGHT) {
      const totalPages = Math.ceil(contentDiv.scrollHeight / CONTENT_HEIGHT);
      setTotalPages(totalPages);
      
      // Create additional pages
      for (let i = 1; i < totalPages; i++) {
        const newPage = document.createElement('div');
        newPage.className = 'resume-page';
        newPage.id = `resume-page-${i + 1}`;
        newPage.style.width = `${A4_WIDTH}px`;
        newPage.style.height = `${A4_HEIGHT}px`;
        newPage.style.backgroundColor = 'white';
        newPage.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        newPage.style.margin = '0 auto 20px auto';
        newPage.style.position = 'relative';
        newPage.style.overflow = 'hidden';
        newPage.style.display = 'none';
        newPage.style.color = 'black';
        
        const newContentDiv = document.createElement('div');
        newContentDiv.className = 'resume-content-clone';
        newContentDiv.style.padding = `${PAGE_MARGIN}px`;
        newContentDiv.style.fontFamily = 'Calibri, sans-serif';
        newContentDiv.style.position = 'relative';
        newContentDiv.style.height = `${CONTENT_HEIGHT}px`;
        newContentDiv.style.overflow = 'hidden';
        
        if (resumeContentRef.current?.firstChild) {
          const contentClone = resumeContentRef.current.firstChild.cloneNode(true) as HTMLElement;
          contentClone.style.position = 'absolute';
          contentClone.style.top = `-${i * CONTENT_HEIGHT}px`;
          
          newContentDiv.appendChild(contentClone);
        }
        
        newPage.appendChild(newContentDiv);
        resumePagesRef.current.appendChild(newPage);
      }
    } else {
      setTotalPages(1);
    }
    
    // Show only the current page
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

      // Create a div to render the complete resume for PDF
      const pdfContainer = document.createElement('div');
      pdfContainer.style.position = 'absolute';
      pdfContainer.style.left = '-9999px';
      pdfContainer.style.top = '-9999px';
      document.body.appendChild(pdfContainer);
      
      // Create a single page containing all content for PDF generation
      const pdfPage = document.createElement('div');
      pdfPage.className = 'pdf-resume-page';
      pdfPage.style.width = `${A4_WIDTH}px`;
      pdfPage.style.backgroundColor = 'white';
      pdfPage.style.padding = `${PAGE_MARGIN}px`;
      pdfPage.style.fontFamily = 'Calibri, sans-serif';
      pdfPage.style.color = 'black';
      
      // Clone content from our reference
      if (resumeContentRef.current?.firstChild) {
        pdfPage.appendChild(resumeContentRef.current.firstChild.cloneNode(true));
      }
      
      pdfContainer.appendChild(pdfPage);
      
      // Initialize PDF with A4 size
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      
      // Use html2canvas to capture the page
      const canvas = await html2canvas(pdfPage, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        logging: false,
        backgroundColor: 'white'
      });
      
      const contentHeight = canvas.height;
      const contentWidth = canvas.width;
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const pdfWidth = pdf.internal.pageSize.getWidth();
      
      // Determine if we need multiple PDF pages
      const pageCount = Math.ceil(contentHeight / (CONTENT_HEIGHT * 2)); // Scale factor of 2
      
      // Add each page to the PDF
      for (let i = 0; i < pageCount; i++) {
        if (i > 0) {
          pdf.addPage();
        }
        
        // Create a temporary canvas for each page
        const tempCanvas = document.createElement('canvas');
        const context = tempCanvas.getContext('2d');
        if (!context) continue;
        
        tempCanvas.width = contentWidth;
        tempCanvas.height = CONTENT_HEIGHT * 2; // Scale factor of 2
        
        // Draw the appropriate portion of the main canvas
        context.drawImage(
          canvas, 
          0, i * CONTENT_HEIGHT * 2, // Source x, y
          contentWidth, CONTENT_HEIGHT * 2, // Source width, height
          0, 0, // Destination x, y
          contentWidth, CONTENT_HEIGHT * 2 // Destination width, height
        );
        
        // Add the image to the PDF
        const imgData = tempCanvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      }
      
      // Clean up
      document.body.removeChild(pdfContainer);
      
      // Save the PDF
      pdf.save("resume.pdf");
      
      toast({
        title: "Success",
        description: "Resume downloaded successfully",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error",
        description: "Failed to download resume. Please try again.",
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
            
            {/* Hidden resume content for reference */}
            <div ref={resumeContentRef} className="hidden">
              {/* Content will be set via DOM APIs */}
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
