
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
    customized_resume: {
      modified_skills: string[];
      modified_work_experience: {
        Company: string;
        "Job Title": string;
        Responsibilities: string[];
      }[];
    };
  }[];
}

export async function analyzeResume(resumeFile: File, jobProfile: string): Promise<ResumeAnalysisResponse> {
  try {
    // For demo purposes, we'll simulate an API call
    // In a real application, this would be an actual fetch call
    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("job_profile", jobProfile);
    
    console.log(`Analyzing resume for ${jobProfile} position`);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real-world scenario, this would be:
    // const response = await fetch(`${API_BASE_URL}/analyze-resume`, {
    //   method: 'POST',
    //   body: formData
    // });
    // return await response.json();
    
    return generateMockResponse(jobProfile);
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

export async function fetchJobListings(query: string, location: string = ""): Promise<any[]> {
  try {
    console.log(`Searching for ${query} jobs in ${location || 'all locations'}`);
    
    try {
      // Use the actual API endpoint
      const response = await fetch(`${API_BASE_URL}/find_job`);
      
      if (!response.ok) {
        throw new Error(`API returned ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log("API Response:", data);
      
      // Return the job_opportunities array
      return data.job_opportunities || [];
    } catch (apiError) {
      console.error("Error fetching from real API:", apiError);
      console.log("Falling back to mock data");
      
      // Fall back to mock data if the API call fails
      return generateMockJobs(query, location);
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

// Helper function to generate mock jobs (fallback)
function generateMockJobs(query: string, location: string): any[] {
  const numberOfJobs = Math.floor(Math.random() * 4) + 5; // 5-8 jobs
  const jobs = [];
  
  const companies = [
    "TechCorp Inc.", "DesignHub", "ServerLogic", 
    "OmniTech Solutions", "Analytix", "Global Innovations",
    "DevSphere", "InnovateTech", "DataDynamics", "CloudMasters"
  ];
  
  const locations = [
    "San Francisco, CA", "New York, NY", "Austin, TX", 
    "Seattle, WA", "Boston, MA", "Chicago, IL", 
    "Remote", "London, UK", "Berlin, Germany", "Toronto, Canada"
  ];
  
  const jobTypes = ["Full-time", "Part-time", "Contract", "Freelance"];
  
  for (let i = 0; i < numberOfJobs; i++) {
    const company = companies[Math.floor(Math.random() * companies.length)];
    const jobLocation = location || locations[Math.floor(Math.random() * locations.length)];
    const jobType = jobTypes[Math.floor(Math.random() * jobTypes.length)];
    const minSalary = Math.floor(Math.random() * 50) + 70; // 70-120k
    const maxSalary = minSalary + Math.floor(Math.random() * 30) + 10; // 10-40k more
    const match = Math.floor(Math.random() * 30) + 70; // 70-100% match
    const daysAgo = Math.floor(Math.random() * 10); // 0-10 days ago
    
    jobs.push({
      id: `job-${i + 1}`,
      job_id: `job-${i + 1}`,
      job_title: `${query} ${i % 3 === 0 ? 'Senior ' : i % 3 === 1 ? 'Mid-Level ' : ''}Developer`,
      company,
      location: jobLocation,
      place: jobLocation,
      type: jobType,
      salary: `$${minSalary},000 - $${maxSalary},000`,
      posted_date: daysAgo === 0 ? 'Today' : daysAgo === 1 ? 'Yesterday' : `${daysAgo} days ago`,
      job_description: `We are looking for a talented ${query} developer to join our team. You will be responsible for developing and maintaining high-quality applications.`,
      requirements: [
        `${Math.floor(Math.random() * 5) + 2}+ years of experience with ${query} development`,
        "Strong problem-solving skills",
        "Excellent communication and teamwork abilities",
        "Bachelor's degree in Computer Science or related field"
      ],
      benefits: [
        "Competitive salary and benefits package",
        "Remote work options",
        "Professional development opportunities",
        "Great team environment"
      ],
      match,
      job_url: "#",
      apply_link: "#",
      customized_resume: {
        modified_skills: ["JavaScript", "React", "TypeScript", "Node.js", "API Integration", "Git", "Agile"],
        modified_work_experience: [
          {
            Company: "Previous Company",
            "Job Title": `${query} Developer`,
            Responsibilities: [
              `Built and maintained ${query} applications`,
              "Collaborated with cross-functional teams",
              "Implemented responsive design patterns"
            ]
          }
        ]
      }
    });
  }
  
  return jobs;
}

// Helper function to generate mock response
function generateMockResponse(jobProfile: string): ResumeAnalysisResponse {
  return {
    personal_details: {
      brief_summary: `Experienced ${jobProfile} professional with a passion for building scalable applications.`,
      current_company: "Tech Innovations Inc.",
      current_position: `Senior ${jobProfile} Engineer`,
      education: "MS in Computer Science, Stanford University",
      email: "alex@example.com",
      experience_years: "5",
      full_name: "Alex Johnson",
      github: "github.com/alexj",
      languages: ["JavaScript", "Python", "Java"],
      linkedin: "linkedin.com/in/alexj",
      personal_website: "alexj.dev",
      phone_number: "(555) 123-4567",
      physical_address: "San Francisco, CA"
    },
    resume_data: {
      skills: ["JavaScript", "React", "Node.js", "Python", "AWS", "Docker"],
      experience: [
        {
          title: `Senior ${jobProfile} Engineer`,
          company: "Tech Innovations Inc.",
          period: "2020 - Present",
          responsibilities: [
            `Led ${jobProfile} development for multiple projects`,
            "Reduced API response time by 40% through optimizations",
            "Mentored junior developers on best practices"
          ]
        },
        {
          title: `${jobProfile} Developer`,
          company: "DataSystems LLC",
          period: "2018 - 2020",
          responsibilities: [
            `Developed ${jobProfile} solutions for financial data analysis`,
            "Implemented CI/CD pipeline reducing deployment time by 30%",
            "Collaborated with UX team on optimizations"
          ]
        }
      ]
    },
    job_opportunities: Array.from({ length: 5 }, (_, i) => ({
      job_id: `${i + 1}`,
      job_title: i % 2 === 0 ? `Senior ${jobProfile}` : `${jobProfile} Developer`,
      company: i % 3 === 0 ? "Tech Solutions Inc." : i % 3 === 1 ? "Global Innovations" : "DataDriven Co.",
      location: i % 4 === 0 ? "Remote" : i % 4 === 1 ? "New York, NY" : i % 4 === 2 ? "San Francisco, CA" : "Austin, TX",
      place: i % 4 === 0 ? "Remote" : i % 4 === 1 ? "New York, NY" : i % 4 === 2 ? "San Francisco, CA" : "Austin, TX",
      job_description: `Looking for an experienced ${jobProfile} with strong technical skills and leadership abilities to join our growing team. You'll be working on cutting-edge projects.`,
      job_url: `https://example.com/jobs/${i + 1}`,
      apply_link: `https://example.com/apply/${i + 1}`,
      posted_date: i % 3 === 0 ? "Just now" : i % 3 === 1 ? "2 days ago" : "1 week ago",
      customized_resume: {
        modified_skills: [
          "JavaScript",
          "React",
          "TypeScript",
          "Redux",
          "CSS-in-JS"
        ],
        modified_work_experience: [
          {
            Company: "Tech Innovations Inc.",
            "Job Title": `Senior ${jobProfile}`,
            Responsibilities: [
              `Led ${jobProfile}-focused development for multiple projects`,
              "Implemented responsive design patterns that improved mobile conversion by 25%",
              "Optimized performance resulting in 40% faster load times"
            ]
          },
          {
            Company: "DataSystems LLC",
            "Job Title": `${jobProfile} Developer`,
            Responsibilities: [
              `Built ${jobProfile} components for financial dashboards`,
              "Collaborated with UX designers to implement pixel-perfect interfaces",
              "Reduced bundle size by 35% through code splitting techniques"
            ]
          }
        ]
      }
    }))
  };
}
