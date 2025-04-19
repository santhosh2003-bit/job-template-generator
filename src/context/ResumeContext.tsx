
import React, { createContext, useContext, useState, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface JobOpportunity {
  apply_link: string;
  company: string;
  customized_resume?: {
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

export interface ResumeExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  highlights: string[];
}

export interface ResumeEducationItem {
  degree: string;
  school: string;
  period: string;
}

export interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    github: string;
    linkedin: string;
    location: string;
    summary: string;
  };
  skills: string[];
  experience: ResumeExperienceItem[];
  education: ResumeEducationItem[];
}

interface ApiResponse {
  job_opportunities: JobOpportunity[];
  personal_details: PersonalDetails;
  resume_data: {
    skills: string[];
    experience: {
      title: string;
      company: string;
      period: string;
      responsibilities: string[];
    }[];
  };
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
  formattedResumeData: ResumeData | null;
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
  
  const formattedResumeData: ResumeData | null = personalDetails ? {
    personalInfo: {
      name: personalDetails?.full_name || "Alex Johnson",
      title: personalDetails?.current_position || "Senior Software Engineer",
      email: personalDetails?.email || "alex@example.com",
      phone: personalDetails?.phone_number || "(555) 123-4567",
      github: personalDetails?.github === "None" ? "" : personalDetails?.github || "",
      linkedin: personalDetails?.linkedin === "None" ? "" : personalDetails?.linkedin || "",
      location: personalDetails?.physical_address || "San Francisco, CA",
      summary: personalDetails?.brief_summary === "None" ? 
        "Experienced professional with expertise in relevant technologies." : 
        personalDetails?.brief_summary,
    },
    skills: resumeData?.skills || ["JavaScript", "TypeScript", "React", "Node.js"],
    experience: resumeData?.experience || [
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
    education: personalDetails?.education ? [
      {
        degree: personalDetails.education,
        school: "",
        period: "",
      },
    ] : [
      {
        degree: "Bachelor of Science in Computer Science",
        school: "University",
        period: "2012 - 2016",
      },
    ],
  } : null;

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
        formattedResumeData,
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
