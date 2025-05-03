
import { Helmet } from "react-helmet";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, Calendar, DollarSign, Users, Building, MessageSquare } from "lucide-react";

const JobSearchGuide = () => {
  const guides = [
    {
      id: "planning",
      title: "Search Planning",
      icon: <Calendar className="h-5 w-5" />,
      content: {
        title: "30-Day Job Search Plan",
        description: "A step-by-step guide to organize and optimize your job hunting.",
        steps: [
          {
            title: "Week 1: Preparation & Research",
            tasks: [
              "Update your resume and LinkedIn profile",
              "Create a target list of 20-30 companies",
              "Research industry trends and salary expectations",
              "Set up job alerts on 3-5 job boards",
              "Prepare a basic cover letter template",
              "Reach out to 3-5 contacts in your network"
            ]
          },
          {
            title: "Week 2: Active Application",
            tasks: [
              "Apply to 3-5 jobs daily (15-25 total)",
              "Customize each resume and cover letter",
              "Follow up on applications from Week 1",
              "Participate in relevant industry webinars/events",
              "Connect with 5-10 professionals on LinkedIn",
              "Practice interview questions daily"
            ]
          },
          {
            title: "Week 3: Networking & Follow-up",
            tasks: [
              "Continue applying to 3-5 jobs daily",
              "Schedule 2-3 informational interviews",
              "Follow up on Week 2 applications",
              "Join and participate in industry-specific groups",
              "Reach out to recruiters in your field",
              "Review and refine your interview techniques"
            ]
          },
          {
            title: "Week 4: Interviews & Assessment",
            tasks: [
              "Continue targeted applications (2-3 per day)",
              "Attend scheduled interviews",
              "Send thank-you notes after interviews",
              "Evaluate your strategy and results",
              "Adjust your approach based on feedback",
              "Plan your strategy for month 2 if needed"
            ]
          }
        ]
      }
    },
    {
      id: "negotiation",
      title: "Salary Negotiation",
      icon: <DollarSign className="h-5 w-5" />,
      content: {
        title: "Negotiating Your Salary",
        description: "Techniques to secure the compensation you deserve.",
        tips: [
          "Research market rates for your position and location using sites like Glassdoor, PayScale, and Salary.com",
          "Consider the entire compensation package, not just the base salary",
          "Wait for the employer to mention salary first if possible",
          "When asked about expectations, give a range rather than a specific number",
          "Practice your negotiation script ahead of time",
          "Highlight your unique value proposition when asking for higher compensation",
          "Be prepared with specific achievements and metrics",
          "Consider non-salary benefits like remote work, flexible hours, or professional development",
          "Get the final offer in writing before accepting",
          "Express enthusiasm and professionalism throughout the negotiation process"
        ],
        commonMistakes: [
          "Accepting the first offer without negotiation",
          "Basing your ask solely on personal needs rather than market value",
          "Apologizing when asking for more",
          "Not considering the full benefits package",
          "Revealing your current salary when it's below market value",
          "Using aggressive or confrontational language"
        ]
      }
    },
    {
      id: "interview",
      title: "Interview Prep",
      icon: <Users className="h-5 w-5" />,
      content: {
        title: "Acing the Technical Interview",
        description: "Preparation strategies for technical assessments and coding interviews.",
        sections: [
          {
            title: "Before the Interview",
            tips: [
              "Research the company's tech stack and products",
              "Review fundamental concepts in your field",
              "Practice solving problems on platforms like LeetCode or HackerRank",
              "Prepare examples of past projects that demonstrate relevant skills",
              "Set up your environment for virtual interviews",
              "Prepare questions to ask the interviewer about their tech challenges"
            ]
          },
          {
            title: "During the Interview",
            tips: [
              "Clarify the problem before attempting to solve it",
              "Think out loud to demonstrate your problem-solving approach",
              "Start with a simple solution and optimize from there",
              "Ask for hints if you're stuck",
              "Test your solution with examples",
              "Discuss time and space complexity"
            ]
          },
          {
            title: "Common Technical Questions",
            topics: [
              "Data structures (arrays, linked lists, trees, graphs)",
              "Algorithms (searching, sorting, dynamic programming)",
              "System design for more senior roles",
              "Language-specific nuances",
              "Database concepts and SQL queries",
              "API design principles",
              "Testing methodologies"
            ]
          }
        ]
      }
    },
    {
      id: "company",
      title: "Company Research",
      icon: <Building className="h-5 w-5" />,
      content: {
        title: "Effective Company Research Strategies",
        description: "How to gather meaningful insights about potential employers.",
        methods: [
          {
            title: "Online Research Resources",
            items: [
              "Company website (About, Careers, Blog sections)",
              "Annual reports and investor relations for public companies",
              "News articles and press releases",
              "Glassdoor, Indeed, and LinkedIn reviews",
              "Social media presence (LinkedIn, Twitter, etc.)",
              "Industry publications and analyses"
            ]
          },
          {
            title: "Networking for Insider Insights",
            items: [
              "Connect with current or former employees on LinkedIn",
              "Attend industry events where company representatives might be present",
              "Join relevant professional groups or forums",
              "Arrange informational interviews with employees",
              "Check alumni networks for connections at target companies"
            ]
          },
          {
            title: "What to Research",
            items: [
              "Company culture and values",
              "Recent projects, products, or initiatives",
              "Leadership team background",
              "Financial stability and growth trajectory",
              "Competitors and market position",
              "Challenges and opportunities facing the company",
              "Recent news, mergers, or acquisitions"
            ]
          }
        ]
      }
    },
    {
      id: "networking",
      title: "Networking",
      icon: <MessageSquare className="h-5 w-5" />,
      content: {
        title: "Building Your Professional Network",
        description: "Strategic approaches to creating valuable connections.",
        strategies: [
          {
            title: "Online Networking",
            tips: [
              "Optimize your LinkedIn profile with keywords and accomplishments",
              "Join and actively participate in industry-specific groups",
              "Share relevant content and thoughtful comments",
              "Send personalized connection requests",
              "Follow up with new connections through meaningful messages",
              "Engage with posts from target companies and professionals"
            ]
          },
          {
            title: "In-Person Networking",
            tips: [
              "Prepare a concise and compelling elevator pitch",
              "Set specific goals for each networking event",
              "Ask open-ended questions to encourage conversation",
              "Focus on how you can help others, not just what you need",
              "Exchange contact information and follow up within 48 hours",
              "Bring business cards or have a digital alternative ready"
            ]
          },
          {
            title: "Maintaining Relationships",
            tips: [
              "Schedule regular check-ins with key contacts",
              "Share articles or resources of interest to your connections",
              "Celebrate others' accomplishments and milestones",
              "Offer assistance before asking for favors",
              "Keep track of conversations and personal details",
              "Express genuine gratitude for any help received"
            ]
          }
        ]
      }
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
            Comprehensive strategies to navigate your job search successfully
          </p>
        </div>

        <Tabs defaultValue="planning" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
            {guides.map((guide) => (
              <TabsTrigger 
                key={guide.id} 
                value={guide.id}
                className="flex items-center gap-2"
              >
                {guide.icon}
                <span className="hidden md:inline">{guide.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          {guides.map((guide) => (
            <TabsContent key={guide.id} value={guide.id} className="focus-visible:outline-none focus-visible:ring-0">
              <Card>
                <CardHeader className="bg-purple-50 dark:bg-purple-950/20">
                  <div className="flex items-center gap-2">
                    {guide.icon}
                    <CardTitle>{guide.content.title}</CardTitle>
                  </div>
                  <p className="text-muted-foreground">{guide.content.description}</p>
                </CardHeader>
                <CardContent className="pt-6">
                  {guide.id === "planning" && (
                    <div className="space-y-8">
                      {guide.content.steps.map((week, index) => (
                        <div key={index}>
                          <h3 className="text-lg font-medium mb-3">{week.title}</h3>
                          <ul className="space-y-2">
                            {week.tasks.map((task, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-purple-500 font-bold mt-1">•</span>
                                <span>{task}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {guide.id === "negotiation" && (
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-lg font-medium mb-3">Key Strategies</h3>
                        <ul className="space-y-2">
                          {guide.content.tips.map((tip, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-purple-500 font-bold mt-1">•</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h3 className="text-lg font-medium mb-3">Common Mistakes to Avoid</h3>
                        <ul className="space-y-2">
                          {guide.content.commonMistakes.map((mistake, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-red-500 font-bold mt-1">✗</span>
                              <span>{mistake}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  {guide.id === "interview" && (
                    <div className="space-y-8">
                      {guide.content.sections.map((section, index) => (
                        <div key={index}>
                          <h3 className="text-lg font-medium mb-3">{section.title}</h3>
                          <ul className="space-y-2">
                            {section.tips ? section.tips.map((tip, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-purple-500 font-bold mt-1">•</span>
                                <span>{tip}</span>
                              </li>
                            )) : section.topics?.map((topic, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-purple-500 font-bold mt-1">•</span>
                                <span>{topic}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {guide.id === "company" && (
                    <div className="space-y-8">
                      {guide.content.methods.map((method, index) => (
                        <div key={index}>
                          <h3 className="text-lg font-medium mb-3">{method.title}</h3>
                          <ul className="space-y-2">
                            {method.items.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-purple-500 font-bold mt-1">•</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {guide.id === "networking" && (
                    <div className="space-y-8">
                      {guide.content.strategies.map((strategy, index) => (
                        <div key={index}>
                          <h3 className="text-lg font-medium mb-3">{strategy.title}</h3>
                          <ul className="space-y-2">
                            {strategy.tips.map((tip, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-purple-500 font-bold mt-1">•</span>
                                <span>{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
};

export default JobSearchGuide;
