
import { Helmet } from "react-helmet";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HelpCircle, FileText, Upload, Briefcase, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const faqCategories = [
    {
      id: "general",
      title: "General",
      icon: <HelpCircle className="h-4 w-4" />,
      faqs: [
        {
          question: "What is EzeApply?",
          answer: "EzeApply is an AI-powered platform that helps job seekers create professional resumes, apply to jobs more efficiently, and improve their chances of landing interviews. Our tools include resume analysis, customization for specific job postings, cover letter generation, and direct job application features."
        },
        {
          question: "Is EzeApply free to use?",
          answer: "EzeApply offers both free and premium plans. The free plan includes basic resume creation and job search features, while our Premium plan offers advanced features like AI-powered cover letter generation, resume analytics, and tailored job matches. Visit our Premium page for more details on pricing and features."
        },
        {
          question: "How do I get started with EzeApply?",
          answer: "Getting started is easy! Simply create an account using your email or social login, then upload your existing resume or create a new one using our templates. Once your resume is in our system, you can immediately start exploring job opportunities and enhancing your application materials."
        },
        {
          question: "Is my data secure with EzeApply?",
          answer: "Yes, we take data security seriously. All personal information and resume data is encrypted and stored securely. We do not share your information with third parties without your consent. Please review our Privacy Policy for more details on how we handle your data."
        }
      ]
    },
    {
      id: "resume",
      title: "Resume",
      icon: <FileText className="h-4 w-4" />,
      faqs: [
        {
          question: "What file formats are supported for resume uploads?",
          answer: "EzeApply currently supports resume uploads in PDF format. This ensures that formatting remains consistent across different platforms and improves the accuracy of our AI analysis tools."
        },
        {
          question: "How does the resume analysis work?",
          answer: "Our AI-powered resume analysis scans your resume to identify key information including skills, experience, education, and personal details. It then compares this information against job listings to suggest improvements and customizations that might increase your chances of getting an interview."
        },
        {
          question: "Can I create multiple versions of my resume?",
          answer: "Yes! With EzeApply Premium, you can create and save multiple versions of your resume tailored for different job types, industries, or specific positions. This allows you to quickly select the most appropriate version for each application."
        },
        {
          question: "Will EzeApply format my resume automatically?",
          answer: "Yes, our system can automatically format your resume based on professional templates. You can also choose from a variety of templates and customize the formatting to match your preferences while maintaining ATS compatibility."
        }
      ]
    },
    {
      id: "uploads",
      title: "Uploads",
      icon: <Upload className="h-4 w-4" />,
      faqs: [
        {
          question: "What is the maximum file size for uploads?",
          answer: "The maximum file size for resume uploads is 5MB. If your file is larger than this, you may need to compress it or reduce unnecessary elements like high-resolution images."
        },
        {
          question: "My resume upload failed. What should I do?",
          answer: "If your upload fails, please check that your file is in PDF format and under the 5MB size limit. Ensure you have a stable internet connection and try again. If the problem persists, try using a different browser or contact our support team for assistance."
        },
        {
          question: "Can I upload my LinkedIn profile instead of a resume?",
          answer: "Currently, direct LinkedIn profile imports are not supported. However, you can download your LinkedIn profile as a PDF and upload it to EzeApply, though you may need to adjust formatting for optimal results."
        },
        {
          question: "How long does processing take after I upload my resume?",
          answer: "Resume processing typically takes 30-60 seconds, depending on the complexity of your document and current system load. During this time, our AI analyzes your resume content and prepares it for integration with our tools."
        }
      ]
    },
    {
      id: "jobs",
      title: "Jobs",
      icon: <Briefcase className="h-4 w-4" />,
      faqs: [
        {
          question: "Where do the job listings come from?",
          answer: "EzeApply aggregates job listings from multiple sources including major job boards, company career pages, and partner recruitment platforms. We continuously update our database to ensure you have access to the latest opportunities."
        },
        {
          question: "How are job matches determined?",
          answer: "Our AI matching algorithm compares your resume content (skills, experience, education, etc.) with job requirements to determine compatibility. Jobs are ranked based on how closely your profile matches the position requirements, with higher matches indicating better fit."
        },
        {
          question: "Can I save jobs to apply later?",
          answer: "Yes, you can save any job posting to your favorites for later review. This feature helps you organize your job search and prioritize applications."
        },
        {
          question: "What happens when I click 'Apply'?",
          answer: "When you click 'Apply,' EzeApply will prepare an application package including your optimized resume and a customized cover letter (Premium feature). For some positions, you'll be directed to the company's application page with your documents ready to upload. For others, you may be able to complete the application directly through our platform."
        }
      ]
    }
  ];
  
  const filteredFAQs = searchQuery ? 
    faqCategories.map(category => ({
      ...category,
      faqs: category.faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(category => category.faqs.length > 0) : 
    faqCategories;
  
  return (
    <Layout>
      <Helmet>
        <title>Help Center | EzeApply</title>
      </Helmet>
      <div className="container py-8 md:py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Help Center</h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Find answers to your questions about EzeApply
          </p>
        </div>

        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative">
            <Input 
              placeholder="Search for answers..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <HelpCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        <Tabs defaultValue="general" className="w-full max-w-4xl mx-auto">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
            {faqCategories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="flex items-center gap-2"
                disabled={filteredFAQs.findIndex(c => c.id === category.id) === -1}
              >
                {category.icon}
                <span>{category.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          {filteredFAQs.map((category) => (
            <TabsContent key={category.id} value={category.id} className="focus-visible:outline-none focus-visible:ring-0">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    {category.icon}
                    <CardTitle>{category.title} FAQ</CardTitle>
                  </div>
                  <CardDescription>Frequently asked questions about {category.title.toLowerCase()}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent>
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
          
          {filteredFAQs.length === 0 && (
            <div className="text-center py-10">
              <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-medium mb-2">No results found</h3>
              <p className="text-muted-foreground mb-6">
                We couldn't find any answers matching your search. Try using different keywords or contact our support team.
              </p>
              <Button onClick={() => setSearchQuery("")}>Clear Search</Button>
            </div>
          )}
        </Tabs>
        
        <div className="max-w-2xl mx-auto mt-16 bg-purple-50 dark:bg-purple-950/20 rounded-lg p-8">
          <div className="flex flex-col items-center text-center">
            <Mail className="h-12 w-12 text-purple-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Still have questions?</h2>
            <p className="text-muted-foreground mb-6 max-w-md">
              Our support team is here to help. Send us a message and we'll get back to you as soon as possible.
            </p>
            <Button className="bg-purple-500 hover:bg-purple-600">
              Contact Support
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HelpCenter;
