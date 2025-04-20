
import React, { useState, useEffect, useRef } from "react";
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
import { useIsMobile } from "@/hooks/use-mobile";
import { createRoot } from "react-dom/client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import ResumeTemplate from "./ResumeTemplate";

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
  const { selectedTemplate, resumeData, personalDetails, formattedResumeData } = useResume();
  const { toast } = useToast();
  const resumePagesRef = useRef<HTMLDivElement>(null);
  const resumeContentRef = useRef<HTMLDivElement>(null);
  const pdfContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const A4_WIDTH = 800;
  const A4_HEIGHT = 1120;
  const PAGE_MARGIN = 0;

  const CONTENT_WIDTH = A4_WIDTH - PAGE_MARGIN * 2;
  const CONTENT_HEIGHT = A4_HEIGHT - PAGE_MARGIN * 2;

  // Get customized resume data from job if available
  const customizedResume = jobData?.customized_resume || null;

  // Build the resume data to show, preferring customized data if available
  const resumeDataToShow = formattedResumeData ? {
    ...formattedResumeData,
    skills: customizedResume?.modified_skills || formattedResumeData.skills,
    experience: customizedResume?.modified_work_experience
      ? customizedResume.modified_work_experience.map((exp: any) => ({
          title: exp["Job Title"],
          company: exp.Company,
          location: "",
          period: "",
          highlights: exp.Responsibilities,
        }))
      : formattedResumeData.experience
  } : null;

  useEffect(() => {
    if (open) {
      setCurrentPage(1);
      if (!pdfContainerRef.current) {
        const div = document.createElement("div");
        div.style.position = "absolute";
        div.style.left = "-9999px";
        div.style.visibility = "hidden";
        document.body.appendChild(div);
        pdfContainerRef.current = div;
      }
    }
  }, [open]);

  useEffect(() => {
    if (open && resumePagesRef.current && resumeDataToShow) {
      createResumePages();
    }
  }, [resumeDataToShow, open]);

  const createResumePages = () => {
    if (!resumePagesRef.current || !resumeDataToShow) return;

    resumePagesRef.current.innerHTML = "";

    // Create a temporary container to measure content height
    const tempContainer = document.createElement("div");
    tempContainer.style.width = `${CONTENT_WIDTH}px`;
    tempContainer.style.position = "absolute";
    tempContainer.style.left = "-9999px";
    tempContainer.style.visibility = "hidden";
    tempContainer.style.overflow = "visible";
    
    const tempContent = document.createElement("div");
    tempContent.style.width = "100%";
    tempContent.style.height = "auto";
    
    // Create root for the temporary container
    const root = createRoot(tempContainer);
    root.render(
      <ResumeTemplate 
        data={resumeDataToShow} 
        template={selectedTemplate || "template1"} 
      />
    );
    
    document.body.appendChild(tempContainer);

    // Get the height of the content
    const contentHeight = tempContainer.offsetHeight;
    const pages = Math.max(1, Math.ceil(contentHeight / CONTENT_HEIGHT));
    setTotalPages(pages);

    // Create pages
    for (let i = 0; i < pages; i++) {
      const pageDiv = document.createElement("div");
      pageDiv.className = "resume-page";
      pageDiv.id = `resume-page-${i + 1}`;
      pageDiv.style.width = `${A4_WIDTH}px`;
      pageDiv.style.height = `${A4_HEIGHT}px`;
      pageDiv.style.backgroundColor = "white";
      pageDiv.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
      pageDiv.style.margin = "0 auto 20px auto";
      pageDiv.style.position = "relative";
      pageDiv.style.overflow = "hidden";
      pageDiv.style.display = i + 1 === currentPage ? "block" : "none";

      const contentDiv = document.createElement("div");
      contentDiv.className = "resume-content";
      contentDiv.style.padding = `${PAGE_MARGIN}px`;
      contentDiv.style.height = `${CONTENT_HEIGHT}px`;
      contentDiv.style.overflow = "hidden";
      contentDiv.style.position = "relative";

      const contentClone = document.createElement("div");
      contentClone.style.position = "absolute";
      contentClone.style.top = `-${i * CONTENT_HEIGHT}px`;
      contentClone.style.width = "100%";
      
      // Create root for the content clone
      const pageRoot = createRoot(contentClone);
      pageRoot.render(
        <ResumeTemplate 
          data={resumeDataToShow} 
          template={selectedTemplate || "template1"} 
        />
      );

      contentDiv.appendChild(contentClone);
      pageDiv.appendChild(contentDiv);
      resumePagesRef.current.appendChild(pageDiv);
    }

    document.body.removeChild(tempContainer);
  };

  const updateVisiblePage = () => {
    if (!resumePagesRef.current) return;

    const pages = resumePagesRef.current.querySelectorAll(".resume-page");
    pages.forEach((page, index) => {
      if (index + 1 === currentPage) {
        (page as HTMLElement).style.display = "block";
      } else {
        (page as HTMLElement).style.display = "none";
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
    if (!resumeDataToShow) return;
    
    try {
      setIsGeneratingPdf(true);
      toast({
        title: "Preparing PDF",
        description: "Please wait while we prepare your resume...",
      });

      // Create a visible div for better PDF generation
      const pdfDiv = document.createElement('div');
      pdfDiv.style.position = 'fixed';
      pdfDiv.style.top = '0';
      pdfDiv.style.left = '0';
      pdfDiv.style.width = `${A4_WIDTH}px`;
      pdfDiv.style.backgroundColor = 'white';
      pdfDiv.style.zIndex = '-1000';
      pdfDiv.style.visibility = 'hidden';
      document.body.appendChild(pdfDiv);
      
      // Create root for the PDF div
      const pdfRoot = createRoot(pdfDiv);
      pdfRoot.render(
        <ResumeTemplate 
          data={resumeDataToShow} 
          template={selectedTemplate || "template1"} 
        />
      );
      
      // Wait for rendering to complete
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Create PDF with correct dimensions
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'a4',
      });

      // Use html2canvas with higher quality settings
      const canvas = await html2canvas(pdfDiv, {
        scale: 2, // Higher scale for better quality
        useCORS: true,
        allowTaint: true,
        backgroundColor: 'white',
        logging: false
      });
      
      const imgData = canvas.toDataURL('image/png');
      
      // Calculate dimensions that preserve aspect ratio
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const canvasAspectRatio = canvas.height / canvas.width;
      const pdfAspectRatio = pdfHeight / pdfWidth;
      
      let imgWidth = pdfWidth;
      let imgHeight = imgWidth * canvasAspectRatio;
      
      // If image height exceeds page height, scale down to fit
      if (imgHeight > pdfHeight) {
        imgHeight = pdfHeight;
        imgWidth = imgHeight / canvasAspectRatio;
      }
      
      // Add image to the PDF, centered
      const xPos = (pdfWidth - imgWidth) / 2;
      pdf.addImage(imgData, 'PNG', xPos, 0, imgWidth, imgHeight);
      
      // If the content is very long, handle multi-page
      if (imgHeight > pdfHeight) {
        const pageCount = Math.ceil(imgHeight / pdfHeight);
        
        // Create additional pages if needed
        for (let i = 1; i < pageCount; i++) {
          pdf.addPage();
          pdf.addImage(
            imgData,
            'PNG',
            xPos,
            -(imgHeight * i),
            imgWidth,
            imgHeight
          );
        }
      }
      
      // Clean up
      document.body.removeChild(pdfDiv);
      
      // Save the PDF
      pdf.save(`resume-${Date.now()}.pdf`);

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
    } finally {
      setIsGeneratingPdf(false);
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

  if (!resumeDataToShow) {
    return null;
  }

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
                        className={
                          currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <PaginationItem key={page}>
                          <PaginationLink
                            onClick={() => handlePageChange(page)}
                            isActive={page === currentPage}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    )}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() => handlePageChange(currentPage + 1)}
                        className={
                          currentPage === totalPages
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}

            <div ref={resumePagesRef} className="w-full scale-90 md:scale-100 origin-center"></div>

            {totalPages > 1 && (
              <div className="mt-4 w-full flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => handlePageChange(currentPage - 1)}
                        className={
                          currentPage === 1
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
                      />
                    </PaginationItem>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <PaginationItem key={page}>
                          <PaginationLink
                            onClick={() => handlePageChange(page)}
                            isActive={page === currentPage}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    )}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() => handlePageChange(currentPage + 1)}
                        className={
                          currentPage === totalPages
                            ? "pointer-events-none opacity-50"
                            : ""
                        }
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
                disabled={isGeneratingPdf}
              >
                {isGeneratingPdf ? "Preparing PDF..." : "Download Resume"}
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
