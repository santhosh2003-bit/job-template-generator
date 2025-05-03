import { Helmet } from "react-helmet";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollText } from "lucide-react";

const ResumeGuide = () => {
  const resumeTips = [
    {
      id: 1,
      title: "10 Resume Mistakes to Avoid",
      description: "Common errors that could cost you interview opportunities.",
      content: [
        "Using generic templates without customization",
        "Including irrelevant work experience",
        "Failing to include keywords from the job description",
        "Having spelling and grammatical errors",
        "Using an unprofessional email address",
        "Including a photo (in the US/UK job markets)",
        "Making your resume too long (over 2 pages)",
        "Not highlighting achievements with metrics",
        "Using objective statements instead of professional summaries",
        "Including references or writing 'references available upon request'"
      ]
    },
    {
      id: 2,
      title: "How to Quantify Your Achievements",
      description: "Transform your responsibilities into impressive measurable results.",
      content: [
        "Identify metrics that matter in your role (revenue, time, efficiency, etc.)",
        "Use percentages to show improvement (e.g., 'Increased sales by 35%')",
        "Include the scope of your work (e.g., 'Managed a team of 12 professionals')",
        "Mention the frequency of tasks (e.g., 'Processed 200+ transactions daily')",
        "Highlight project budgets you've managed",
        "Show customer/client satisfaction metrics",
        "Detail the size of databases or systems you've managed",
        "Include cost savings you've achieved"
      ]
    },
    {
      id: 3,
      title: "Resume Keywords That Get You Past ATS",
      description: "Optimize your resume to pass through Applicant Tracking Systems.",
      content: [
        "Include industry-specific technical skills",
        "Mirror language from the job posting",
        "Use full terms and acronyms (e.g., 'Search Engine Optimization (SEO)')",
        "Include relevant certifications with exact names",
        "Use action verbs like 'managed,' 'developed,' 'created'",
        "Include software and tools relevant to the position",
        "Format section headers conventionally (e.g., 'Work Experience' not 'Where I've Worked')",
        "Use standard file formats like .docx or .pdf"
      ]
    },
    {
      id: 4,
      title: "Tailoring Your Resume for Different Industries",
      description: "How to customize your resume for specific sectors.",
      content: [
        "Research industry-specific expectations and terminology",
        "Highlight transferable skills when changing industries",
        "Adjust your professional summary for each application",
        "Reorganize sections to emphasize relevant experience",
        "Include industry-appropriate achievements",
        "Modify your skills section for each application",
        "Adjust formatting to match industry conventions"
      ]
    },
    {
      id: 5,
      title: "Creating an Effective Skills Section",
      description: "How to showcase your abilities in a compelling way.",
      content: [
        "Separate hard skills and soft skills",
        "Group related skills into categories",
        "Include proficiency levels for technical skills",
        "Prioritize skills mentioned in the job description",
        "Avoid listing generic skills (e.g., 'communication')",
        "Include relevant certifications alongside skills",
        "Update your skills section regularly as you learn new ones"
      ]
    }
  ];
  
  return (
    <Layout>
      <Helmet>
        <title>Resume Tips | EzeApply</title>
      </Helmet>
      <div className="container py-8 md:py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Resume Tips</h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Expert advice to create impactful resumes that land interviews
          </p>
        </div>

        <div className="space-y-12">
          {resumeTips.map((guide) => (
            <Card key={guide.id} className="overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 bg-purple-50 dark:bg-purple-950/20 p-6 flex flex-col justify-center">
                  <div className="mb-4 flex items-center gap-2">
                    <ScrollText className="h-5 w-5 text-purple-500" />
                    <h3 className="font-semibold text-purple-500">Tip #{guide.id}</h3>
                  </div>
                  <CardTitle className="text-2xl mb-3">{guide.title}</CardTitle>
                  <CardDescription className="text-md">{guide.description}</CardDescription>
                </div>
                <div className="md:w-2/3 p-6">
                  <CardContent className="p-0">
                    <ul className="space-y-3">
                      {guide.content.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-purple-500 font-bold mt-1">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 p-8 bg-purple-50 dark:bg-purple-950/20 rounded-lg text-center">
          <h2 className="text-2xl font-semibold mb-4">Ready to apply your resume knowledge?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Upload your resume to EzeApply and let our AI tools help you optimize it for your dream job.
          </p>
          <div className="flex justify-center">
            <a href="/upload" className="bg-purple-500 text-white px-6 py-3 rounded-md hover:bg-purple-600 transition">
              Upload Your Resume
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResumeGuide;
