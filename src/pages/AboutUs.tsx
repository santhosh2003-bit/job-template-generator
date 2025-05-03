
import { Helmet } from "react-helmet";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Jennifer Thompson",
      title: "CEO & Founder",
      bio: "Former tech recruiter with 12+ years of experience helping candidates land their dream jobs. Founded EzeApply to democratize access to effective job seeking tools.",
      image: "https://placehold.co/300x300"
    },
    {
      name: "Michael Rodriguez",
      title: "CTO",
      bio: "Machine learning specialist with a background in NLP and document processing. Leads the development of our AI resume analysis and optimization tools.",
      image: "https://placehold.co/300x300"
    },
    {
      name: "Sarah Chen",
      title: "Head of Product",
      bio: "Career development expert with experience at leading job platforms. Focuses on creating intuitive user experiences that help job seekers succeed.",
      image: "https://placehold.co/300x300"
    },
    {
      name: "David Okafor",
      title: "Head of Customer Success",
      bio: "Passionate about helping users achieve their career goals through technology and education. Leads our customer support and success initiatives.",
      image: "https://placehold.co/300x300"
    }
  ];
  
  return (
    <Layout>
      <Helmet>
        <title>About Us | EzeApply</title>
      </Helmet>
      
      {/* Hero Section */}
      <div className="bg-purple-50 dark:bg-purple-950/20 py-16">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About EzeApply</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We're on a mission to simplify the job application process and help people land their dream jobs
          </p>
        </div>
      </div>
      
      {/* Our Story Section */}
      <div className="container py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-lg mb-4">
              EzeApply was founded in 2023 with a simple but powerful mission: to transform the way people find and apply for jobs.
            </p>
            <p className="mb-4">
              After years of working in recruitment and witnessing the frustrations of both job seekers and employers, our founder Jennifer Thompson recognized a critical gap in the job search process. High-quality candidates were being overlooked due to non-optimized resumes, while employers were struggling to identify the best talent efficiently.
            </p>
            <p>
              By combining cutting-edge AI technology with deep recruitment expertise, EzeApply was born to create a seamless bridge between talented candidates and great opportunities. Today, we're proud to have helped thousands of job seekers optimize their applications and connect with their ideal employers.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src="https://placehold.co/600x400" 
              alt="EzeApply founding team" 
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
      
      {/* Values Section */}
      <div className="bg-gray-50 dark:bg-gray-900/50 py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "User-Centered Innovation",
                description: "We develop every feature with the job seeker's needs in mind, focusing on creating tools that provide real value and solve actual pain points."
              },
              {
                title: "Equity & Accessibility",
                description: "We believe everyone deserves access to effective job search tools, regardless of background or experience level. We strive to make our platform accessible to all."
              },
              {
                title: "Continuous Improvement",
                description: "The job market is ever-evolving, and so are we. We constantly refine our algorithms and features based on user feedback and changing industry needs."
              }
            ].map((value, index) => (
              <Card key={index} className="bg-white dark:bg-gray-800 h-full">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      {/* Team Section */}
      <div className="container py-16">
        <h2 className="text-3xl font-bold mb-12 text-center">Meet Our Team</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
              <p className="text-purple-500 mb-3">{member.title}</p>
              <p className="text-sm text-muted-foreground">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Mission Section */}
      <div className="bg-purple-50 dark:bg-purple-950/20 py-16">
        <div className="container max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-lg mb-8">
            We aim to level the playing field in job searching by providing powerful tools that were once available only to those with access to expensive career coaching services. By democratizing these resources, we're helping job seekers from all backgrounds present themselves in the best possible light to potential employers.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-purple-500 mb-2">10,000+</div>
              <p className="text-muted-foreground">Successful Applications</p>
            </div>
            <Separator orientation="vertical" className="h-16 hidden md:block" />
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-purple-500 mb-2">500+</div>
              <p className="text-muted-foreground">Partner Companies</p>
            </div>
            <Separator orientation="vertical" className="h-16 hidden md:block" />
            <div className="flex flex-col items-center">
              <div className="text-4xl font-bold text-purple-500 mb-2">15+</div>
              <p className="text-muted-foreground">Industries Served</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutUs;
