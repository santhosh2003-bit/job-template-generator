
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
      const canvas = await html2canvas(resumeRef.current);
      const pdf = new jsPDF("p", "mm", "a4");
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
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
      await new Promise(resolve => setTimeout(resolve, 1000));
      
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
      <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Resume Preview</DialogTitle>
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Left side - Resume preview */}
          <div className="border rounded-md p-4 bg-white dark:bg-gray-800">
            <div ref={resumeRef} className="min-h-[500px] bg-white text-black p-4">
              <h2 className="text-xl font-bold mb-4">
                {resumeData?.name || "John Doe"}
              </h2>
              <p className="text-sm mb-2">
                {resumeData?.email || "johndoe@example.com"}
              </p>
              <p className="text-sm mb-4">
                {resumeData?.phone || "(123) 456-7890"}
              </p>
              
              <h3 className="text-lg font-semibold mt-4 mb-2">Experience</h3>
              <div className="mb-3">
                <p className="font-medium">
                  {resumeData?.experience?.[0]?.title || "Software Engineer"}
                </p>
                <p className="text-sm">
                  {resumeData?.experience?.[0]?.company || "Tech Company Inc."}
                </p>
                <p className="text-xs italic">
                  {resumeData?.experience?.[0]?.date || "Jan 2020 - Present"}
                </p>
              </div>
              
              <h3 className="text-lg font-semibold mt-4 mb-2">Education</h3>
              <div className="mb-3">
                <p className="font-medium">
                  {resumeData?.education?.[0]?.degree || "Bachelor of Science in Computer Science"}
                </p>
                <p className="text-sm">
                  {resumeData?.education?.[0]?.school || "University"}
                </p>
                <p className="text-xs italic">
                  {resumeData?.education?.[0]?.date || "2016 - 2020"}
                </p>
              </div>
              
              <h3 className="text-lg font-semibold mt-4 mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {(resumeData?.skills || ["JavaScript", "React", "Node.js", "TypeScript"]).map(
                  (skill: string, index: number) => (
                    <span
                      key={index}
                      className="bg-gray-200 text-gray-800 px-2 py-1 rounded-md text-xs"
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>
            <div className="mt-4 flex justify-center">
              <Button onClick={handleDownload}>
                Download Resume
              </Button>
            </div>
          </div>
          
          {/* Right side - Job details */}
          <div className="border rounded-md p-4">
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
