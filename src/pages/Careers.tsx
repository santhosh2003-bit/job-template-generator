
import { Helmet } from "react-helmet";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, MapPin, Clock } from "lucide-react";

const Careers = () => {
  const openings = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      department: "Engineering",
      location: "Remote (US/Canada)",
      type: "Full-time",
      description: "We're looking for an experienced Frontend Developer to join our product team. You'll be responsible for building responsive user interfaces using React, implementing design systems, and collaborating with UX designers to create an exceptional user experience.",
      requirements: [
        "5+ years of experience with React and modern JavaScript",
        "Experience with TypeScript and modern frontend tooling",
        "Strong understanding of UI/UX principles",
        "Experience with responsive design and cross-browser compatibility",
        "Familiarity with state management libraries (Redux, Context API)"
      ]
    },
    {
      id: 2,
      title: "Machine Learning Engineer",
      department: "AI Team",
      location: "San Francisco, CA (Hybrid)",
      type: "Full-time",
      description: "Join our AI team to build and improve our resume analysis and job matching algorithms. You'll work on NLP models to extract information from resumes and job descriptions, develop recommendation systems for job matching, and continually improve our AI capabilities.",
      requirements: [
        "MS or PhD in Computer Science, Machine Learning or similar field",
        "3+ years of experience in NLP and text processing",
        "Experience with modern ML frameworks (PyTorch, TensorFlow)",
        "Strong Python programming skills",
        "Experience deploying ML models in production environments"
      ]
    },
    {
      id: 3,
      title: "Product Marketing Manager",
      department: "Marketing",
      location: "Remote (Worldwide)",
      type: "Full-time",
      description: "Help us grow our user base and communicate the value of our platform to job seekers. You'll develop marketing strategies, create compelling content, analyze user acquisition channels, and work closely with the product team on feature launches.",
      requirements: [
        "3+ years of experience in product marketing, preferably for SaaS or consumer tech products",
        "Strong understanding of digital marketing channels",
        "Excellent writing and communication skills",
        "Experience with marketing analytics and metrics-driven decision making",
        "Knowledge of the recruitment or career services industry is a plus"
      ]
    },
    {
      id: 4,
      title: "Customer Success Specialist",
      department: "Customer Success",
      location: "New York, NY (On-site)",
      type: "Full-time",
      description: "Be the voice of our customers and ensure they get the most value out of EzeApply. You'll provide personalized support, create educational content, gather user feedback, and collaborate with the product team to improve the user experience.",
      requirements: [
        "2+ years of experience in customer support or success roles",
        "Strong communication and empathy skills",
        "Experience with CRM systems (Zendesk, Intercom, etc.)",
        "Ability to understand technical concepts and explain them simply",
        "Background in HR, recruitment, or career services is a plus"
      ]
    },
    {
      id: 5,
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Remote (US/Canada)",
      type: "Full-time",
      description: "Help us build and maintain our cloud infrastructure and deployment pipelines. You'll work on automating deployments, monitoring system performance, ensuring security best practices, and supporting our engineering team with infrastructure needs.",
      requirements: [
        "3+ years of experience with AWS or similar cloud platforms",
        "Experience with containerization (Docker) and orchestration (Kubernetes)",
        "Knowledge of CI/CD pipelines and automation tools",
        "Scripting skills in Python, Bash, or similar",
        "Understanding of security best practices in cloud environments"
      ]
    },
    {
      id: 6,
      title: "UX/UI Designer",
      department: "Design",
      location: "Remote (Worldwide)",
      type: "Contract",
      description: "Join our design team to create intuitive and beautiful user experiences. You'll work on user research, wireframing, prototyping, and collaborating with developers to implement your designs. Help us make complex job application processes simple and accessible.",
      requirements: [
        "3+ years of experience in product design for web applications",
        "Strong portfolio showcasing UX process and UI design skills",
        "Proficiency in Figma or similar design tools",
        "Experience conducting user research and usability testing",
        "Understanding of accessibility standards and responsive design"
      ]
    }
  ];
  
  const departments = [
    { id: "all", label: "All Departments" },
    { id: "Engineering", label: "Engineering" },
    { id: "AI Team", label: "AI Team" },
    { id: "Marketing", label: "Marketing" },
    { id: "Customer Success", label: "Customer Success" },
    { id: "Design", label: "Design" }
  ];
  
  return (
    <Layout>
      <Helmet>
        <title>Careers | EzeApply</title>
      </Helmet>
      
      {/* Hero Section */}
      <div className="bg-purple-50 dark:bg-purple-950/20 py-16">
        <div className="container text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Join Our Team</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Help us transform how people find and secure their dream jobs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-purple-500 hover:bg-purple-600">View Open Positions</Button>
            <Button variant="outline">Our Benefits</Button>
          </div>
        </div>
      </div>
      
      {/* Why Work With Us */}
      <div className="container py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Why Work With Us</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Meaningful Impact",
              description: "Help thousands of people advance their careers and find fulfilling work through our technology."
            },
            {
              title: "Innovation-Driven",
              description: "Work with cutting-edge AI technology and contribute to solving real challenges in the job market."
            },
            {
              title: "Remote-First Culture",
              description: "Enjoy the flexibility of working from anywhere with a globally distributed team and asynchronous communication."
            },
            {
              title: "Growth Opportunities",
              description: "Continuous learning through professional development budgets, mentorship, and career advancement paths."
            },
            {
              title: "Work-Life Balance",
              description: "Flexible hours, unlimited PTO policy, and a culture that respects boundaries between work and personal life."
            },
            {
              title: "Inclusive Environment",
              description: "Be part of a diverse team that values different perspectives and fosters belonging for all employees."
            }
          ].map((benefit, index) => (
            <Card key={index} className="h-full">
              <CardHeader>
                <CardTitle className="text-xl">{benefit.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Open Positions */}
      <div className="bg-gray-50 dark:bg-gray-900/50 py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 text-center">Open Positions</h2>
          
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-8 flex flex-wrap justify-center">
              {departments.map((dept) => (
                <TabsTrigger key={dept.id} value={dept.id}>{dept.label}</TabsTrigger>
              ))}
            </TabsList>
            
            {departments.map((dept) => (
              <TabsContent key={dept.id} value={dept.id} className="focus-visible:outline-none focus-visible:ring-0">
                <div className="grid md:grid-cols-2 gap-6">
                  {openings
                    .filter(job => dept.id === "all" || job.department === dept.id)
                    .map((job) => (
                      <Card key={job.id} className="h-full flex flex-col">
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-xl mb-1">{job.title}</CardTitle>
                              <CardDescription>{job.department}</CardDescription>
                            </div>
                            <Badge variant={job.type === "Full-time" ? "default" : "secondary"}>
                              {job.type}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                            <MapPin className="h-4 w-4" />
                            <span>{job.location}</span>
                          </div>
                          <p className="mb-4">{job.description}</p>
                          <div>
                            <h4 className="font-medium mb-2">Requirements:</h4>
                            <ul className="list-disc pl-5 space-y-1">
                              {job.requirements.map((req, idx) => (
                                <li key={idx} className="text-sm text-muted-foreground">{req}</li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                        <CardFooter className="border-t pt-4 mt-auto">
                          <Button className="w-full bg-purple-500 hover:bg-purple-600">
                            Apply Now
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
                
                {openings.filter(job => dept.id === "all" || job.department === dept.id).length === 0 && (
                  <div className="text-center py-16">
                    <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-xl font-medium mb-2">No Open Positions</h3>
                    <p className="text-muted-foreground">
                      There are currently no open positions in this department. Please check back later or consider another department.
                    </p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
      
      {/* Application Process */}
      <div className="container py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Hiring Process</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {[
            {
              step: "1",
              title: "Application",
              description: "Submit your resume and answer a few questions about your background and interest in the role."
            },
            {
              step: "2",
              title: "Initial Interview",
              description: "A 30-minute call with our recruitment team to discuss your experience and the position."
            },
            {
              step: "3",
              title: "Assessment",
              description: "Complete a relevant task or project to showcase your skills and approach to problem-solving."
            },
            {
              step: "4",
              title: "Final Interviews",
              description: "Meet with the team and leadership to discuss the role in detail and determine mutual fit."
            }
          ].map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-lg mb-4">
                {step.step}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-purple-500 text-white py-16">
        <div className="container text-center max-w-2xl">
          <Briefcase className="h-12 w-12 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4">Don't See a Perfect Match?</h2>
          <p className="mb-8">
            We're always looking for talented individuals who are passionate about our mission. Send us your resume and let us know how you can contribute to our team.
          </p>
          <Button variant="secondary" size="lg">
            Submit Open Application
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Careers;
