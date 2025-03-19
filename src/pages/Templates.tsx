
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Check,
  CheckCircle,
  Download,
  Edit,
  Eye,
  FileCheck,
  ThumbsUp,
} from 'lucide-react';
import Layout from '@/components/layout/Layout';

const mockedResumeData = {
  personalInfo: {
    name: "Alex Johnson",
    title: "Senior Software Engineer",
    email: "alex@example.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    summary: "Experienced software engineer with expertise in React, Node.js, and cloud technologies. Passionate about building scalable and user-friendly applications that solve real-world problems."
  },
  skills: [
    "JavaScript", "TypeScript", "React", "Node.js", "AWS", "Docker", 
    "GraphQL", "RESTful APIs", "CI/CD", "Agile Methodologies"
  ],
  experience: [
    {
      title: "Senior Frontend Engineer",
      company: "Tech Innovations Inc.",
      location: "San Francisco, CA",
      period: "Jan 2021 - Present",
      highlights: [
        "Led development of company's flagship React application, improving performance by 40%",
        "Implemented CI/CD pipeline reducing deployment time by 60%",
        "Mentored junior developers and conducted code reviews"
      ]
    },
    {
      title: "Software Engineer",
      company: "DataSystems LLC",
      location: "Portland, OR",
      period: "Mar 2018 - Dec 2020",
      highlights: [
        "Developed and maintained multiple Node.js microservices",
        "Created RESTful APIs consumed by web and mobile clients",
        "Reduced server costs by 30% through optimization efforts"
      ]
    }
  ],
  education: [
    {
      degree: "Master of Science in Computer Science",
      school: "University of California, Berkeley",
      period: "2016 - 2018"
    },
    {
      degree: "Bachelor of Science in Computer Science",
      school: "University of Washington",
      period: "2012 - 2016"
    }
  ]
};

const templateColors = {
  minimal: "bg-white",
  modern: "bg-gray-50",
  professional: "bg-blue-50",
  creative: "bg-purple-50"
};

type TemplateCategory = 'all' | 'minimal' | 'modern' | 'professional' | 'creative';

const Templates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [category, setCategory] = useState<TemplateCategory>('all');
  const navigate = useNavigate();

  const templates = [
    { id: "template1", name: "Stockholm", category: "minimal", popular: true },
    { id: "template2", name: "Berlin", category: "modern", popular: true },
    { id: "template3", name: "Paris", category: "professional" },
    { id: "template4", name: "Tokyo", category: "creative", popular: true },
    { id: "template5", name: "New York", category: "minimal" },
    { id: "template6", name: "Sydney", category: "modern" },
    { id: "template7", name: "London", category: "professional", popular: true },
    { id: "template8", name: "Vienna", category: "creative" },
  ];

  const filteredTemplates = category === 'all' 
    ? templates 
    : templates.filter(t => t.category === category);

  const handleTemplateClick = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handleContinue = () => {
    if (selectedTemplate) {
      navigate('/jobs');
    }
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary mb-4">
            Your Resume Information Has Been Extracted
          </span>
          <h1 className="text-3xl font-bold">Choose Your Resume Template</h1>
          <p className="text-muted-foreground mt-2">
            Select a template that best represents your professional brand.
          </p>
        </motion.div>

        <div className="mb-8">
          <Tabs defaultValue="all" className="w-full" onValueChange={(v) => setCategory(v as TemplateCategory)}>
            <div className="flex justify-center mb-6">
              <TabsList className="glass">
                <TabsTrigger value="all">All Templates</TabsTrigger>
                <TabsTrigger value="minimal">Minimal</TabsTrigger>
                <TabsTrigger value="modern">Modern</TabsTrigger>
                <TabsTrigger value="professional">Professional</TabsTrigger>
                <TabsTrigger value="creative">Creative</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value={category} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredTemplates.map((template) => (
                  <motion.div 
                    key={template.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className={`glass-card rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                      selectedTemplate === template.id 
                        ? 'ring-2 ring-primary scale-[1.02]' 
                        : 'hover:shadow-lg hover:scale-[1.01]'
                    }`}
                    onClick={() => handleTemplateClick(template.id)}
                  >
                    <div className={`h-48 ${templateColors[template.category as keyof typeof templateColors]} relative`}>
                      {/* Template preview mockup */}
                      <div className="absolute inset-4 border border-gray-200 rounded shadow-sm p-2 bg-white">
                        <div className="h-6 bg-primary/10 w-24 mx-auto mb-2"></div>
                        <div className="h-3 bg-gray-200 w-full mb-2"></div>
                        <div className="h-3 bg-gray-200 w-5/6 mb-2"></div>
                        <div className="h-3 bg-gray-200 w-full mb-4"></div>
                        <div className="h-2 bg-gray-100 w-full mb-1"></div>
                        <div className="h-2 bg-gray-100 w-full mb-1"></div>
                        <div className="h-2 bg-gray-100 w-3/4 mb-2"></div>
                      </div>
                      
                      {/* Selection indicator */}
                      {selectedTemplate === template.id && (
                        <div className="absolute top-2 right-2 h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white">
                          <Check size={14} />
                        </div>
                      )}
                      
                      {/* Popular badge */}
                      {template.popular && (
                        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-primary/80 text-white text-xs font-medium">
                          Popular
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{template.name}</h3>
                        <span className="text-xs capitalize px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                          {template.category}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Resume Data Preview */}
        <div className="glass-card rounded-xl p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Your Resume Information</h2>
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit Details
            </Button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2 flex items-center">
                <CheckCircle className="h-4 w-4 text-primary mr-2" />
                Personal Information
              </h3>
              <div className="space-y-3 text-sm">
                <p><span className="font-medium">Name:</span> {mockedResumeData.personalInfo.name}</p>
                <p><span className="font-medium">Title:</span> {mockedResumeData.personalInfo.title}</p>
                <p><span className="font-medium">Contact:</span> {mockedResumeData.personalInfo.email} | {mockedResumeData.personalInfo.phone}</p>
                <p><span className="font-medium">Location:</span> {mockedResumeData.personalInfo.location}</p>
              </div>
            </div>
            
            <div>
              <h3 className="font-medium mb-2 flex items-center">
                <CheckCircle className="h-4 w-4 text-primary mr-2" />
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {mockedResumeData.skills.map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-secondary rounded-full text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <h3 className="font-medium mb-2 flex items-center">
              <CheckCircle className="h-4 w-4 text-primary mr-2" />
              Experience
            </h3>
            <div className="space-y-4">
              {mockedResumeData.experience.map((exp, index) => (
                <div key={index} className="text-sm">
                  <div className="flex justify-between mb-1">
                    <p className="font-medium">{exp.title}</p>
                    <p className="text-muted-foreground">{exp.period}</p>
                  </div>
                  <p className="text-muted-foreground">{exp.company}, {exp.location}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <Button variant="outline" disabled={!selectedTemplate}>
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button variant="outline" disabled={!selectedTemplate}>
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
          <Button 
            onClick={handleContinue}
            disabled={!selectedTemplate}
          >
            Continue to Job Matches
            <FileCheck className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Templates;
