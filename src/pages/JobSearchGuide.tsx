import { Helmet } from "react-helmet-async";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase } from "lucide-react";

const JobSearchGuide = () => {
  const jobSearchTips = [
    {
      id: 1,
      title: "Optimizing Your LinkedIn Profile",
      description: "Make your LinkedIn profile stand out to recruiters.",
      content: [
        "Use a professional headshot",
        "Write a compelling summary highlighting your key skills and experience",
        "Customize your LinkedIn URL",
        "List your skills and get endorsements",
        "Request recommendations from colleagues and managers",
        "Join relevant industry groups",
        "Engage with content and share your insights",
        "Keep your profile updated with your latest achievements"
      ]
    },
    {
      id: 2,
      title: "Networking Strategies for Introverts",
      description: "Effective ways to build connections without feeling overwhelmed.",
      content: [
        "Attend smaller, targeted events",
        "Prepare conversation starters in advance",
        "Focus on building a few meaningful connections",
        "Use online platforms to connect with professionals",
        "Follow up with contacts after meeting them",
        "Offer value to your network",
        "Practice active listening",
        "Set realistic networking goals"
      ]
    },
    {
      id: 3,
      title: "Mastering the STAR Method for Interviews",
      description: "How to structure your answers to behavioral interview questions.",
      content: [
        "Situation: Describe the context of the situation",
        "Task: Explain the task you needed to complete",
        "Action: Detail the actions you took to address the situation",
        "Result: Share the outcomes of your actions",
        "Use specific examples",
        "Quantify your results whenever possible",
        "Practice your answers beforehand",
        "Be honest and authentic"
      ]
    },
    {
      id: 4,
      title: "Crafting a Compelling Cover Letter",
      description: "Tips for writing cover letters that grab attention.",
      content: [
        "Customize each cover letter for the specific job",
        "Start with a strong opening paragraph",
        "Highlight your relevant skills and experience",
        "Showcase your passion for the company and role",
        "Quantify your achievements",
        "Proofread carefully for errors",
        "Keep it concise and focused",
        "End with a call to action"
      ]
    },
    {
      id: 5,
      title: "Leveraging Job Boards Effectively",
      description: "How to maximize your job search using online platforms.",
      content: [
        "Use specific keywords in your search",
        "Set up job alerts to receive notifications",
        "Filter results by location, industry, and experience level",
        "Research companies before applying",
        "Track your applications",
        "Network with recruiters on the platform",
        "Customize your resume for each application",
        "Follow up on your applications"
      ]
    }
  ];

  return (
    <Layout>
      <Helmet>
        <title>Job Search Guide | EzeApply</title>
      </Helmet>
      <div className="container py-8 md:py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Job Search Guide</h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Expert advice to navigate your job search successfully
          </p>
        </div>

        <div className="space-y-12">
          {jobSearchTips.map((guide) => (
            <Card key={guide.id} className="overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3 bg-purple-50 dark:bg-purple-950/20 p-6 flex flex-col justify-center">
                  <div className="mb-4 flex items-center gap-2">
                    <Briefcase className="h-5 w-5 text-purple-500" />
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
          <h2 className="text-2xl font-semibold mb-4">Ready to take the next step in your job search?</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Explore our resources and tools to help you find your dream job.
          </p>
          <div className="flex justify-center">
            <a href="/jobs" className="bg-purple-500 text-white px-6 py-3 rounded-md hover:bg-purple-600 transition">
              Find Job Opportunities
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default JobSearchGuide;
