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
  const pdfContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageHeight, setPageHeight] = useState(0);

  console.log("Job data in preview:", jobData);
  console.log("Personal details in preview:", personalDetails);

  const A4_WIDTH = 794; // ~210mm at 96 DPI
  const A4_HEIGHT = 1123; // ~297mm at 96 DPI
  const PAGE_MARGIN = 50; // 50px margin

  const CONTENT_WIDTH = A4_WIDTH - (PAGE_MARGIN * 2);
  const CONTENT_HEIGHT = A4_HEIGHT - (PAGE_MARGIN * 2);

  const customizedResume = jobData?.customized_resume || null;
  console.log("Customized resume:", customizedResume);

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

  const getResumeHtml = () => {
    return `
      <div class="py-4 text-black" style="font-family: 'Calibri', sans-serif;">
        <h1 class="font-bold text-2xl sm:text-3xl md:text-4xl break-words" style="font-size: 24px; font-weight: bold;">
          ${resumeDataToShow.personalInfo.name}
        </h1>
        <h2 class="text-sm sm:text-base md:text-lg mt-1" style="font-size: 16px; margin-top: 4px;">
          ${resumeDataToShow.personalInfo.title}
        </h2>
        <div class="flex flex-wrap gap-4 mt-3" style="display: flex; flex-wrap: wrap; gap: 16px; margin-top: 12px;">
          <div class="flex items-center gap-2 text-xs sm:text-sm" style="display: flex; align-items: center; gap: 8px; font-size: 12px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 16px; height: 16px;"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
            <span style="word-break: break-all;">${resumeDataToShow.personalInfo.email}</span>
          </div>
          <div class="flex items-center gap-2 text-xs sm:text-sm" style="display: flex; align-items: center; gap: 8px; font-size: 12px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 16px; height: 16px;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <span style="word-break: break-all;">${resumeDataToShow.personalInfo.phone}</span>
          </div>
          ${resumeDataToShow.personalInfo.github ? `
          <div class="flex items-center gap-2 text-xs sm:text-sm" style="display: flex; align-items: center; gap: 8px; font-size: 12px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 16px; height: 16px;"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
            <span style="word-break: break-all;">${resumeDataToShow.personalInfo.github}</span>
          </div>
          ` : ''}
          ${resumeDataToShow.personalInfo.linkedin ? `
          <div class="flex items-center gap-2 text-xs sm:text-sm" style="display: flex; align-items: center; gap: 8px; font-size: 12px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 16px; height: 16px;"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            <span style="word-break: break-all;">${resumeDataToShow.personalInfo.linkedin}</span>
          </div>
          ` : ''}
          <div class="flex items-center gap-2 text-xs sm:text-sm" style="display: flex; align-items: center; gap: 8px; font-size: 12px;">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 16px; height: 16px;"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            <span>${resumeDataToShow.personalInfo.location}</span>
          </div>
        </div>

        <div class="mt-5" style="margin-top: 20px;">
          <h3 class="border-b-2 border-black pb-1 font-bold text-base sm:text-lg md:text-xl mb-2" style="border-bottom: 2px solid black; padding-bottom: 4px; font-weight: bold; font-size: 18px; margin-bottom: 8px;">
            Summary
          </h3>
          <p class="text-sm sm:text-base pl-5" style="font-size: 14px; padding-left: 20px;">
            ${resumeDataToShow.personalInfo.summary}
          </p>
        </div>

        <div class="mt-6" style="margin-top: 24px;">
          <h3 class="border-b-2 border-black pb-1 font-bold text-base sm:text-lg md:text-xl mb-2" style="border-bottom: 2px solid black; padding-bottom: 4px; font-weight: bold; font-size: 18px; margin-bottom: 8px;">
            Work Experience
          </h3>
          ${resumeDataToShow.experience.map((exp, index) => `
            <div class="pl-5 mb-5" style="padding-left: 20px; margin-bottom: 20px;">
              <div class="flex flex-col sm:flex-row justify-between sm:items-center" style="display: flex; flex-direction: column;">
                <h4 class="font-semibold text-base sm:text-lg" style="font-weight: 600; font-size: 16px;">
                  ${exp.title}
                </h4>
                ${exp.period ? `
                  <div class="text-xs sm:text-sm font-medium" style="font-size: 12px; font-weight: 500;">
                    ${exp.period}
                  </div>
                ` : ''}
              </div>
              <div class="text-gray-600 text-xs sm:text-sm font-medium mb-1" style="color: #666; font-size: 12px; font-weight: 500; margin-bottom: 4px;">
                ${exp.company}
                ${exp.location ? `, ${exp.location}` : ""}
              </div>
              <ul class="pl-8 list-disc space-y-2" style="padding-left: 32px; list-style-type: disc; margin-top: 8px;">
                ${exp.highlights.map((highlight, idx) => `
                  <li class="text-sm sm:text-base" style="font-size: 14px; margin-bottom: 8px;">
                    ${highlight}
                  </li>
                `).join('')}
              </ul>
            </div>
          `).join('')}
        </div>

        <div class="mt-6" style="margin-top: 24px;">
          <h3 class="border-b-2 border-black pb-1 font-bold text-base sm:text-lg md:text-xl mb-2" style="border-bottom: 2px solid black; padding-bottom: 4px; font-weight: bold; font-size: 18px; margin-bottom: 8px;">
            Education
          </h3>
          <div class="flex flex-col gap-2" style="display: flex; flex-direction: column; gap: 8px;">
            ${resumeDataToShow.education.map((edu, index) => `
              <div class="pl-5 mb-3" style="padding-left: 20px; margin-bottom: 12px;">
                <div class="flex flex-col sm:flex-row justify-between sm:items-center" style="display: flex; flex-direction: column;">
                  <h4 class="font-semibold text-base sm:text-lg" style="font-weight: 600; font-size: 16px;">
                    ${edu.degree}
                  </h4>
                  ${edu.period ? `
                    <div class="text-gray-600 text-xs" style="color: #666; font-size: 12px;">
                      ${edu.period}
                    </div>
                  ` : ''}
                </div>
                ${edu.school ? `
                  <div class="text-gray-600 text-sm sm:text-base" style="color: #666; font-size: 14px;">
                    ${edu.school}
                  </div>
                ` : ''}
              </div>
            `).join('')}
          </div>
        </div>

        <div class="mt-6" style="margin-top: 24px;">
          <h3 class="border-b-2 border-black pb-1 font-bold text-base sm:text-lg md:text-xl mb-2" style="border-bottom: 2px solid black; padding-bottom: 4px; font-weight: bold; font-size: 18px; margin-bottom: 8px;">
            Skills
          </h3>
          <div class="flex flex-wrap gap-3 pl-5" style="display: flex; flex-wrap: wrap; gap: 12px; padding-left: 20px;">
            ${resumeDataToShow.skills.map((skill, index) => `
              <span class="text-sm sm:text-base inline-block" style="font-size: 14px; display: inline-block;">
                ${skill}${index < resumeDataToShow.skills.length - 1 ? "," : ""}
              </span>
            `).join('')}
          </div>
        </div>
      </div>
    `;
  };

  useEffect(() => {
    if (open) {
      setCurrentPage(1);
      
      if (!pdfContainerRef.current) {
        const div = document.createElement('div');
        div.style.position = 'absolute';
        div.style.left = '-9999px';
        div.style.visibility = 'hidden';
        document.body.appendChild(div);
        pdfContainerRef.current = div;
      }
    }
  }, [open]);

  useEffect(() => {
    if (open && resumePagesRef.current) {
      createResumePages();
    }
  }, [resumeDataToShow, open]);

  const createResumePages = () => {
    if (!resumePagesRef.current) return;

    resumePagesRef.current.innerHTML = '';
    
    const resumeHtml = getResumeHtml();
    
    const tempContainer = document.createElement('div');
    tempContainer.style.width = `${CONTENT_WIDTH}px`;
    tempContainer.style.position = 'absolute';
    tempContainer.style.left = '-9999px';
    tempContainer.style.visibility = 'hidden';
    tempContainer.innerHTML = resumeHtml;
    document.body.appendChild(tempContainer);
    
    const contentHeight = tempContainer.offsetHeight;
    
    const pages = Math.max(1, Math.ceil(contentHeight / CONTENT_HEIGHT));
    setTotalPages(pages);
    
    for (let i = 0; i < pages; i++) {
      const pageDiv = document.createElement('div');
      pageDiv.className = 'resume-page';
      pageDiv.id = `resume-page-${i + 1}`;
      pageDiv.style.width = `${A4_WIDTH}px`;
      pageDiv.style.height = `${A4_HEIGHT}px`;
      pageDiv.style.backgroundColor = 'white';
      pageDiv.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
      pageDiv.style.margin = '0 auto 20px auto';
      pageDiv.style.position = 'relative';
      pageDiv.style.overflow = 'hidden';
      pageDiv.style.display = i + 1 === currentPage ? 'block' : 'none';
      pageDiv.style.color = 'black';
      
      const contentDiv = document.createElement('div');
      contentDiv.className = 'resume-content';
      contentDiv.style.padding = `${PAGE_MARGIN}px`;
      contentDiv.style.fontFamily = 'Calibri, sans-serif';
      contentDiv.style.height = `${CONTENT_HEIGHT}px`;
      contentDiv.style.overflow = 'hidden';
      contentDiv.style.position = 'relative';
      
      const contentClone = document.createElement('div');
      contentClone.innerHTML = resumeHtml;
      contentClone.style.position = 'absolute';
      contentClone.style.top = `-${i * CONTENT_HEIGHT}px`;
      contentClone.style.width = '100%';
      
      contentDiv.appendChild(contentClone);
      pageDiv.appendChild(contentDiv);
      resumePagesRef.current.appendChild(pageDiv);
    }
    
    document.body.removeChild(tempContainer);
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

      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'fixed';
      tempDiv.style.left = '-9999px';
      tempDiv.style.top = '0';
      tempDiv.style.width = `${A4_WIDTH}px`;
      tempDiv.style.backgroundColor = 'white';
      tempDiv.style.zIndex = '-1000';
      document.body.appendChild(tempDiv);
      
      tempDiv.innerHTML = getResumeHtml();
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      
      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: 'white',
        logging: false,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.body.firstChild as HTMLElement;
          if (clonedElement) {
            clonedElement.style.width = `${A4_WIDTH}px`;
            clonedElement.style.padding = '40px';
            clonedElement.style.boxSizing = 'border-box';
          }
        }
      });
      
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = pdf.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      
      if (imgHeight > pdf.internal.pageSize.getHeight()) {
        let heightLeft = imgHeight;
        let position = 0;
        const pageHeight = pdf.internal.pageSize.getHeight();
        
        pdf.deletePage(1);
        
        while (heightLeft > 0) {
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
          position -= pageHeight;
        }
      }
      
      document.body.removeChild(tempDiv);
      
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
            
            <div ref={resumePagesRef} className="w-full">
            </div>
            
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
