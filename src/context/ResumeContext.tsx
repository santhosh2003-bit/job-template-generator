
import React, { createContext, useContext, useState, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface ResumeContextType {
  hasResume: boolean;
  setHasResume: (value: boolean) => void;
  selectedTemplate: string | null;
  setSelectedTemplate: (template: string | null) => void;
  checkResumeStatus: () => boolean;
  resumeData: any | null;
  setResumeData: (data: any) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const [hasResume, setHasResume] = useState<boolean>(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [resumeData, setResumeData] = useState<any | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  const checkResumeStatus = (): boolean => {
    if (!hasResume) {
      toast({
        title: "Resume Required",
        description: "Please upload your resume first",
        variant: "destructive",
      });
      navigate("/upload");
      return false;
    }
    return true;
  };

  return (
    <ResumeContext.Provider
      value={{
        hasResume,
        setHasResume,
        selectedTemplate,
        setSelectedTemplate,
        checkResumeStatus,
        resumeData,
        setResumeData,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = (): ResumeContextType => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error("useResume must be used within a ResumeProvider");
  }
  return context;
};
