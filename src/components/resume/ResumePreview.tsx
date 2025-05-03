
import React, { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useResume } from "@/context/ResumeContext";
import { useToast } from "@/hooks/use-toast";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useIsMobile } from "@/hooks/use-mobile";
import { createRoot } from "react-dom/client";
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
  const { selectedTemplate, resumeData, personalDetails, formattedResumeData } =
    useResume();
  const { toast } = useToast();
  const resumePageRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const A4_WIDTH = 595; // A4 width in points (72 DPI)
  const A4_HEIGHT = 842; // A4 height in points (72 DPI)
  const PAGE_MARGIN = 20;
  const CONTENT_WIDTH = A4_WIDTH - PAGE_MARGIN * 2;
  const CONTENT_HEIGHT = A4_HEIGHT - PAGE_MARGIN * 2;

  const customizedResume = jobData?.customized_resume || null;

  const resumeDataToShow = formattedResumeData
    ? {
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
          : formattedResumeData.experience,
      }
    : null;

  useEffect(() => {
    if (open && resumePageRef.current && resumeDataToShow) {
      createResumePage();
    }
  }, [resumeDataToShow, open, selectedTemplate]);

  const createResumePage = async () => {
    if (!resumePageRef.current || !resumeDataToShow) return;

    resumePageRef.current.innerHTML = "";

    const pageDiv = document.createElement("div");
    pageDiv.className = "resume-page";
    pageDiv.style.width = `${A4_WIDTH}px`;
    pageDiv.style.height = `${A4_HEIGHT}px`;
    pageDiv.style.backgroundColor = "white";
    pageDiv.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
    pageDiv.style.margin = "0 auto";
    pageDiv.style.position = "relative";

    const contentDiv = document.createElement("div");
    contentDiv.className = "resume-content";
    contentDiv.style.width = `${CONTENT_WIDTH}px`;
    contentDiv.style.height = `${CONTENT_HEIGHT}px`;
    contentDiv.style.padding = `${PAGE_MARGIN}px`;
    contentDiv.style.boxSizing = "border-box";
    contentDiv.style.overflow = "hidden";
    contentDiv.style.fontFamily = "'Calibri', sans-serif";

    const contentClone = document.createElement("div");
    contentClone.style.width = `${CONTENT_WIDTH}px`;

    const pageRoot = createRoot(contentClone);
    pageRoot.render(
      <ResumeTemplate
        data={resumeDataToShow}
        template={selectedTemplate || "template1"}
      />
    );

    contentDiv.appendChild(contentClone);
    pageDiv.appendChild(contentDiv);
    resumePageRef.current.appendChild(pageDiv);

    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  const handleDownload = async () => {
    if (!resumeDataToShow || !resumePageRef.current) return;

    try {
      setIsGeneratingPdf(true);
      toast({
        title: "Preparing PDF",
        description: "Please wait while we prepare your resume...",
      });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
      });

      const pageDiv = resumePageRef.current.querySelector(".resume-page");
      if (!pageDiv) throw new Error("Resume page not found");

      const offscreenContainer = document.createElement("div");
      offscreenContainer.style.position = "absolute";
      offscreenContainer.style.left = "-9999px";
      offscreenContainer.style.width = `${A4_WIDTH}px`;
      offscreenContainer.style.height = `${A4_HEIGHT}px`;
      document.body.appendChild(offscreenContainer);
      const clonedPageDiv = pageDiv.cloneNode(true) as HTMLElement;
      offscreenContainer.appendChild(clonedPageDiv);

      // Modify cloned DOM to replace borderBottom with div and adjust spacing
      const h3Elements = clonedPageDiv.querySelectorAll("h3");
      h3Elements.forEach((h3) => {
        // Fix TypeScript error: cast the element to HTMLElement
        const h3Element = h3 as HTMLElement;
        // Remove borderBottom and related styles
        h3Element.style.borderBottom = "none";
        h3Element.style.paddingBottom = "0";
        h3Element.style.marginBottom = "6px"; // Increased margin to position line
        h3Element.style.position = "static"; // Remove relative positioning
        h3Element.style.zIndex = "auto";

        // Insert a div for the line after h3
        const lineDiv = document.createElement("div");
        lineDiv.style.width = "100%";
        lineDiv.style.height = "1px";
        lineDiv.style.backgroundColor = "#000000";
        lineDiv.style.marginBottom = "6px"; // Increased margin below line
        h3.parentNode?.insertBefore(lineDiv, h3.nextSibling);
      });

      // Reduce other margins to compensate for increased spacing
      const sections = clonedPageDiv.querySelectorAll("section");
      sections.forEach((section) => {
        // Fix TypeScript error: cast the element to HTMLElement
        const sectionElement = section as HTMLElement;
        sectionElement.style.marginBottom = "2px"; // Reduced from 5px
      });

      const experienceItems = clonedPageDiv.querySelectorAll(
        "div[style*='margin-bottom: 4px']"
      );
      experienceItems.forEach((item) => {
        // Fix TypeScript error: cast the element to HTMLElement
        const itemElement = item as HTMLElement;
        itemElement.style.marginBottom = "2px"; // Reduced from 4px
      });

      const subElements = clonedPageDiv.querySelectorAll(
        "div[style*='margin-bottom: 2px']"
      );
      subElements.forEach((item) => {
        // Fix TypeScript error: cast the element to HTMLElement
        const itemElement = item as HTMLElement;
        itemElement.style.marginBottom = "1px"; // Reduced from 2px
      });

      const bulletPoints = clonedPageDiv.querySelectorAll(
        "li[style*='margin-bottom: 1px']"
      );
      bulletPoints.forEach((li) => {
        // Fix TypeScript error: cast the element to HTMLElement
        const liElement = li as HTMLElement;
        liElement.style.marginBottom = "0.5px"; // Reduced from 1px
      });

      // Force quadruple repaints
      offscreenContainer.offsetHeight;
      offscreenContainer.offsetHeight;
      offscreenContainer.offsetHeight;
      offscreenContainer.offsetHeight;

      const canvas = await html2canvas(clonedPageDiv, {
        scale: 4,
        useCORS: true,
        backgroundColor: "white",
        width: A4_WIDTH,
        height: A4_HEIGHT,
        windowWidth: A4_WIDTH,
        windowHeight: A4_HEIGHT,
        scrollX: 0,
        scrollY: 0,
        logging: false,
        // Remove the 'willReadFrequently' property as it's not in the Options type
      });

      const imgData = canvas.toDataURL("image/png", 1.0);
      pdf.addImage(imgData, "PNG", 0, 0, A4_WIDTH, A4_HEIGHT);
      pdf.save(`resume-${Date.now()}.pdf`);

      document.body.removeChild(offscreenContainer);

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

  if (!resumeDataToShow) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[1400px] max-h-[90vh] overflow-auto p-0">
        <DialogHeader className="p-6">
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

        <div className="flex flex-col lg:flex-row gap-6 p-6">
          <div className="w-full lg:w-2/3 flex flex-col items-center">
            <div ref={resumePageRef} className="w-full max-w-[595px]"></div>

            <Button
              onClick={handleDownload}
              className="mt-4 bg-purple-500 hover:bg-purple-600"
              disabled={isGeneratingPdf}
            >
              {isGeneratingPdf ? "Preparing PDF..." : "Download Resume"}
            </Button>
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
            <Button
              onClick={handleApply}
              className="w-full bg-purple-500 hover:bg-purple-600"
            >
              Apply Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResumePreview;
