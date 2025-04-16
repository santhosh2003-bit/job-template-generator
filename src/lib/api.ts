
import { toast } from "@/hooks/use-toast";

const API_BASE_URL = "http://127.0.0.1:3012";

export interface ResumeAnalysisResponse {
  personal_details: {
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
  };
  resume_data: {
    skills: string[];
    experience: {
      title: string;
      company: string;
      period: string;
      responsibilities: string[];
    }[];
  };
  job_opportunities: {
    job_id: string;
    job_title: string;
    company: string;
    location: string;
    place: string;
    job_description: string;
    job_url: string;
    apply_link: string;
    posted_date: string;
    customized_resume?: {
      modified_skills: string[];
      modified_work_experience: {
        Company: string;
        "Job Title": string;
        Responsibilities: string[];
      }[];
    };
  }[];
}

export async function analyzeResume(
  resume: File | null = null,
  job_profile: string
): Promise<ResumeAnalysisResponse> {
  try {
    const formData = new FormData();
    
    // If resume is provided, append it (for resume upload flow)
    if (resume) {
      formData.append("resume", resume);
      console.log(`Analyzing resume for ${job_profile} position`);
    } else {
      console.log(`Searching for ${job_profile} jobs`);
    }
    
    // Always append job profile
    formData.append("job_profile", job_profile);

    // Call the API
    const response = await fetch(`${API_BASE_URL}/find_job`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error with API call:", error);
    toast({
      title: "API Error",
      description: "Failed to process request. Please try again later.",
      variant: "destructive",
    });
    throw error;
  }
}
