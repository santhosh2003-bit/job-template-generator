
import { Helmet } from "react-helmet";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Book, ScrollText, Briefcase, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

const ResourcesPage = () => {
  const resourceCategories = [
    {
      id: "blog",
      title: "Blog",
      icon: <Book className="h-5 w-5" />,
      description: "Latest insights, trends, and tips for job seekers",
      content: [
        {
          title: "How to Stand Out in a Competitive Job Market",
          description: "Learn strategies to differentiate yourself from other candidates.",
          link: "#",
          date: "May 1, 2025"
        },
        {
          title: "The Future of Remote Work",
          description: "Discover how remote work is evolving and what it means for job seekers.",
          link: "#",
          date: "April 22, 2025"
        },
        {
          title: "Mastering the Art of Networking",
          description: "Build meaningful professional connections that advance your career.",
          link: "#",
          date: "April 15, 2025"
        }
      ]
    },
    {
      id: "resume-tips",
      title: "Resume Tips",
      icon: <ScrollText className="h-5 w-5" />,
      description: "Expert advice to create impactful resumes",
      content: [
        {
          title: "10 Resume Mistakes to Avoid",
          description: "Common errors that could cost you interview opportunities.",
          link: "#",
          date: "April 28, 2025"
        },
        {
          title: "How to Quantify Your Achievements",
          description: "Transform your responsibilities into impressive measurable results.",
          link: "#",
          date: "April 20, 2025"
        },
        {
          title: "Resume Keywords That Get You Past ATS",
          description: "Optimize your resume to pass through Applicant Tracking Systems.",
          link: "#",
          date: "April 10, 2025"
        }
      ]
    },
    {
      id: "job-search",
      title: "Job Search Guide",
      icon: <Briefcase className="h-5 w-5" />,
      description: "Comprehensive guides to navigate your job search",
      content: [
        {
          title: "30-Day Job Search Plan",
          description: "A step-by-step guide to organize and optimize your job hunting.",
          link: "#",
          date: "April 30, 2025"
        },
        {
          title: "Negotiating Your Salary",
          description: "Techniques to secure the compensation you deserve.",
          link: "#",
          date: "April 18, 2025"
        },
        {
          title: "Acing the Technical Interview",
          description: "Preparation strategies for technical assessments and coding interviews.",
          link: "#",
          date: "April 5, 2025"
        }
      ]
    },
    {
      id: "help-center",
      title: "Help Center",
      icon: <HelpCircle className="h-5 w-5" />,
      description: "Support resources and answers to common questions",
      content: [
        {
          title: "Getting Started with EzeApply",
          description: "Learn how to make the most of our platform's features.",
          link: "#",
          date: "Updated regularly"
        },
        {
          title: "Frequently Asked Questions",
          description: "Find answers to the most common questions about our services.",
          link: "#",
          date: "Updated regularly"
        },
        {
          title: "Troubleshooting Guide",
          description: "Solutions to technical issues you might encounter.",
          link: "#",
          date: "Updated regularly"
        }
      ]
    }
  ];

  return (
    <Layout>
      <Helmet>
        <title>Resources | EzeApply</title>
      </Helmet>
      <div className="container py-8 md:py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Resources</h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Access our comprehensive collection of guides, articles, and tools to help you navigate your career journey successfully.
          </p>
        </div>

        <Tabs defaultValue="blog" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
            {resourceCategories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="flex items-center gap-2"
              >
                {category.icon}
                <span className="hidden md:inline">{category.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          {resourceCategories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="mb-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 mb-2">
                  {category.icon}
                  {category.title}
                </h2>
                <p className="text-muted-foreground">{category.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.content.map((item, index) => (
                  <Card key={index} className="h-full">
                    <CardHeader>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <CardDescription className="text-xs">{item.date}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        {item.description}
                      </p>
                      <Link 
                        to={item.link} 
                        className="text-sm text-primary font-medium hover:underline"
                      >
                        Read more
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
};

export default ResourcesPage;
