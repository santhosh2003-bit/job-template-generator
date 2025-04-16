
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
  resume: File,
  job_profile: string
): Promise<ResumeAnalysisResponse> {
  try {
    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("job_profile", job_profile);

    console.log(`Analyzing resume for ${job_profile} position`);

    try {
      // Use the real API endpoint
      const response = await fetch(`${API_BASE_URL}/find_job`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
      }

      return await response.json();
    } catch (apiError) {
      console.error("Error fetching from API:", apiError);
      toast({
        title: "API Error",
        description: "Failed to analyze resume. Please try again later.",
        variant: "destructive",
      });
      throw apiError;
    }
  } catch (error) {
    console.error("Error analyzing resume:", error);
    toast({
      title: "API Error",
      description: "Failed to analyze resume. Please try again.",
      variant: "destructive",
    });
    throw error;
  }
}

export async function fetchJobListings(
  query: string,
  location: string = ""
): Promise<any[]> {
  try {
    console.log(
      `Searching for ${query} jobs in ${location || "all locations"}`
    );

    try {
      // Create formData to match the API's expected format
      const formData = new FormData();
      formData.append("job_profile", query);
      
      if (location) {
        formData.append("location", location);
      }

      // Use the same API endpoint with POST method and proper parameters
      const response = await fetch(`${API_BASE_URL}/find_job`, {
        method: "POST", 
        body: formData,
      });

      if (!response.ok) {
        throw new Error(
          `API returned ${response.status}: ${response.statusText}`
        );
      }

      const data = await response.json();
      console.log("API Response:", data);

      // Return the job_opportunities array
      return data.job_opportunities || [];
    } catch (apiError) {
      console.error("Error fetching from API:", apiError);
      throw apiError;
    }
  } catch (error) {
    console.error("Error fetching jobs:", error);
    toast({
      title: "API Error",
      description: "Failed to fetch job listings. Please try again.",
      variant: "destructive",
    });
    return [];
  }
}
