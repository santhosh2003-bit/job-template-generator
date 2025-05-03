
import { Helmet } from "react-helmet";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Info, Briefcase, Mail, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const CompanyPage = () => {
  const companyTabs = [
    {
      id: "about",
      title: "About Us",
      icon: <Info className="h-5 w-5" />,
      content: (
        <div className="space-y-8 max-w-4xl mx-auto">
          <div>
            <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
            <p>
              At EzeApply, we're transforming the way people find employment opportunities. Our mission is to 
              empower job seekers with AI-driven tools that simplify the job application process, making it more 
              efficient and effective. We believe everyone deserves the chance to showcase their true potential to employers.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2">Our Story</h3>
            <p>
              Founded in 2024, EzeApply emerged from a simple observation: job hunting is unnecessarily complicated 
              and time-consuming. Our founders, who experienced firsthand the frustrations of tailoring applications 
              for every position, set out to build a platform that leverages the latest in AI technology to streamline 
              the process.
            </p>
            <p className="mt-4">
              Since then, we've grown from a small startup to a comprehensive career platform that has helped thousands 
              of job seekers land their dream positions. Our team of engineers, career experts, and AI specialists work 
              tirelessly to innovate and improve our services.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-2">Our Values</h3>
            <ul className="space-y-2 list-disc pl-5">
              <li><span className="font-medium">Innovation:</span> We continuously explore new technologies to improve job seeking.</li>
              <li><span className="font-medium">Accessibility:</span> We believe career tools should be available to everyone.</li>
              <li><span className="font-medium">Excellence:</span> We strive for the highest quality in all our products and services.</li>
              <li><span className="font-medium">Empathy:</span> We understand the challenges of job hunting and design with users in mind.</li>
              <li><span className="font-medium">Integrity:</span> We're committed to honest practices and protecting user data.</li>
            </ul>
          </div>
          
          <div className="bg-accent p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Impact by the Numbers</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center mt-4">
              <div>
                <p className="text-3xl font-bold text-primary">150K+</p>
                <p className="text-sm text-muted-foreground">Active Users</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">85%</p>
                <p className="text-sm text-muted-foreground">Interview Success Rate</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">25K+</p>
                <p className="text-sm text-muted-foreground">Jobs Secured</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">42%</p>
                <p className="text-sm text-muted-foreground">Time Saved on Applications</p>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "careers",
      title: "Careers",
      icon: <Briefcase className="h-5 w-5" />,
      content: (
        <div className="space-y-8 max-w-4xl mx-auto">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold">Join Our Team</h3>
            <p className="text-muted-foreground">Help us build the future of job searching and career development</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Why Work With Us</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-2">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Remote-First Culture</h4>
                    <p className="text-sm text-muted-foreground">Work from anywhere in the world</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Competitive Benefits</h4>
                    <p className="text-sm text-muted-foreground">Health, retirement, and wellness perks</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Career Growth</h4>
                    <p className="text-sm text-muted-foreground">Clear paths for advancement</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="m9 12 2 2 4-4"></path></svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Inclusive Environment</h4>
                    <p className="text-sm text-muted-foreground">Diverse and supportive team culture</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="lg:col-span-2">
              <h3 className="text-xl font-semibold mb-4">Open Positions</h3>
              <div className="space-y-4">
                {[
                  {
                    title: "Senior Full Stack Developer",
                    department: "Engineering",
                    location: "Remote (US/Europe)"
                  },
                  {
                    title: "AI Research Scientist",
                    department: "AI & Machine Learning",
                    location: "Remote (Worldwide)"
                  },
                  {
                    title: "UX/UI Designer",
                    department: "Design",
                    location: "Remote (Worldwide)"
                  },
                  {
                    title: "Career Content Specialist",
                    department: "Content & Marketing",
                    location: "Remote (US preferred)"
                  }
                ].map((job, index) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="flex flex-col md:flex-row md:items-center justify-between p-4 md:p-6">
                      <div className="mb-4 md:mb-0">
                        <h4 className="font-semibold">{job.title}</h4>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-sm text-muted-foreground mt-1">
                          <span>{job.department}</span>
                          <span className="hidden sm:inline">•</span>
                          <span>{job.location}</span>
                        </div>
                      </div>
                      <Button>
                        View Details
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "contact",
      title: "Contact",
      icon: <Mail className="h-5 w-5" />,
      content: (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-4xl mx-auto">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Get In Touch</h3>
              <p className="text-muted-foreground">
                Have questions or feedback? We'd love to hear from you. Our team is always ready to help.
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="font-medium">General Inquiries</h4>
                <a href="mailto:info@ezeapply.com" className="text-primary hover:underline">info@ezeapply.com</a>
              </div>
              
              <div>
                <h4 className="font-medium">Support</h4>
                <a href="mailto:support@ezeapply.com" className="text-primary hover:underline">support@ezeapply.com</a>
              </div>
              
              <div>
                <h4 className="font-medium">Business Opportunities</h4>
                <a href="mailto:partners@ezeapply.com" className="text-primary hover:underline">partners@ezeapply.com</a>
              </div>
              
              <div>
                <h4 className="font-medium">Office Location</h4>
                <address className="text-sm text-muted-foreground not-italic">
                  123 Innovation Way<br />
                  San Francisco, CA 94107<br />
                  United States
                </address>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Send Us a Message</CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Name</label>
                      <input
                        id="name"
                        type="text"
                        className="w-full p-2 border rounded-md bg-background"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email</label>
                      <input
                        id="email"
                        type="email"
                        className="w-full p-2 border rounded-md bg-background"
                        placeholder="Your email"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                    <input
                      id="subject"
                      type="text"
                      className="w-full p-2 border rounded-md bg-background"
                      placeholder="Message subject"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">Message</label>
                    <textarea
                      id="message"
                      rows={5}
                      className="w-full p-2 border rounded-md bg-background resize-none"
                      placeholder="Your message"
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">Send Message</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      )
    },
    {
      id: "privacy",
      title: "Privacy Policy",
      icon: <Shield className="h-5 w-5" />,
      content: (
        <div className="max-w-4xl mx-auto prose prose-sm dark:prose-invert">
          <h2 className="text-xl font-bold mb-4">Privacy Policy</h2>
          <p className="text-sm text-muted-foreground mb-2">Last Updated: May 1, 2025</p>
          
          <div className="space-y-6">
            <section>
              <h3 className="font-semibold">1. Introduction</h3>
              <p>
                EzeApply ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
              </p>
            </section>
            
            <section>
              <h3 className="font-semibold">2. Information We Collect</h3>
              <p>We may collect information about you in various ways, including:</p>
              <ul className="list-disc pl-5 space-y-1 my-2">
                <li>Personal Data: Name, email address, phone number, professional experience, education history, and other information you provide when creating an account or using our services.</li>
                <li>Resume Data: Information contained in resumes you upload or create using our platform.</li>
                <li>Usage Information: How you interact with our website, features you use, and time spent on pages.</li>
                <li>Device Information: IP address, browser type, operating system, and device identifiers.</li>
              </ul>
            </section>
            
            <section>
              <h3 className="font-semibold">3. How We Use Your Information</h3>
              <p>We may use the information we collect for various purposes, including:</p>
              <ul className="list-disc pl-5 space-y-1 my-2">
                <li>Providing and improving our services</li>
                <li>Personalizing your experience</li>
                <li>Processing transactions</li>
                <li>Sending service-related communications</li>
                <li>Analyzing usage patterns and trends</li>
                <li>Protecting against fraud and unauthorized access</li>
              </ul>
            </section>
            
            <section>
              <h3 className="font-semibold">4. Sharing Your Information</h3>
              <p>We may share your information with:</p>
              <ul className="list-disc pl-5 space-y-1 my-2">
                <li>Service providers who assist in our operations</li>
                <li>Partners with your explicit consent</li>
                <li>Legal authorities when required by law</li>
                <li>Affiliated businesses and corporate transactions</li>
              </ul>
            </section>
            
            <section>
              <h3 className="font-semibold">5. Your Rights and Choices</h3>
              <p>
                Depending on your location, you may have certain rights regarding your personal information, including the right to access, correct, delete, or restrict the use of your data. To exercise these rights, please contact us using the information provided at the end of this policy.
              </p>
            </section>
            
            <section>
              <h3 className="font-semibold">6. Data Security</h3>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
              </p>
            </section>
            
            <section>
              <h3 className="font-semibold">7. Updates to This Policy</h3>
              <p>
                We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last Updated" date. We encourage you to review this Privacy Policy frequently.
              </p>
            </section>
            
            <section>
              <h3 className="font-semibold">8. Contact Us</h3>
              <p>
                If you have questions or concerns about this Privacy Policy or our practices, please contact us at:
              </p>
              <p>
                Email: privacy@ezeapply.com<br />
                Address: 123 Innovation Way, San Francisco, CA 94107, United States
              </p>
            </section>
          </div>
        </div>
      )
    }
  ];

  return (
    <Layout>
      <Helmet>
        <title>Company | EzeApply</title>
      </Helmet>
      <div className="container py-8 md:py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Company</h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Learn about our mission, values, and the team building the future of job application tools.
          </p>
        </div>

        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
            {companyTabs.map((tab) => (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id}
                className="flex items-center gap-2"
              >
                {tab.icon}
                <span className="hidden md:inline">{tab.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          {companyTabs.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="mt-6">
              <div className="mb-6">
                <h2 className="text-2xl font-semibold flex items-center gap-2 mb-2">
                  {tab.icon}
                  {tab.title}
                </h2>
              </div>
              {tab.content}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
};

export default CompanyPage;
