
import React, { createContext, useContext, useState, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface JobOpportunity {
  apply_link: string;
  company: string;
  customized_resume?: {  // Changed from required to optional with ?
    modified_skills: string[];
    modified_work_experience: {
      Company: string;
      "Job Title": string;
      Responsibilities: string[];
    }[];
  };
  job_description: string;
  job_id: string;
  job_title: string;
  job_url: string;
  location: string;
  place: string;
  posted_date: string;
}

interface PersonalDetails {
  brief_summary: string;
  current_company: string;
  current_position: string;
  education: string;
  email: string;
  experience_years: string;
  full_name: string;
  github: string;
  languages: string[];
  linkedin: string;
  personal_website: string;
  phone_number: string;
  physical_address: string;
}

interface ApiResponse {
  job_opportunities: JobOpportunity[];
  personal_details: PersonalDetails;
}

interface ResumeContextType {
  hasResume: boolean;
  setHasResume: (value: boolean) => void;
  selectedTemplate: string | null;
  setSelectedTemplate: (template: string | null) => void;
  checkResumeStatus: () => boolean;
  resumeData: any | null;
  setResumeData: (data: any) => void;
  jobOpportunities: JobOpportunity[];
  setJobOpportunities: (jobs: JobOpportunity[]) => void;
  personalDetails: PersonalDetails | null;
  setPersonalDetails: (details: PersonalDetails) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
  const [hasResume, setHasResume] = useState<boolean>(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [resumeData, setResumeData] = useState<any | null>(null);
  const [jobOpportunities, setJobOpportunities] = useState<JobOpportunity[]>([]);
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails | null>(null);
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
        jobOpportunities,
        setJobOpportunities,
        personalDetails,
        setPersonalDetails,
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
