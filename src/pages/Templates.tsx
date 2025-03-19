
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
import { toast } from "@/hooks/use-toast";

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

type TemplateCategory = 'all' | 'minimal' | 'professional' | 'academic' | 'creative';

const Templates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [category, setCategory] = useState<TemplateCategory>('all');
  const [previewModal, setPreviewModal] = useState(false);
  const navigate = useNavigate();

  const templates = [
    { 
      id: "template1", 
      name: "Professional Clean", 
      category: "professional", 
      popular: true,
      image: "/lovable-uploads/f48bebe0-0d22-424e-945c-0766c5010c9d.png"
    },
    { 
      id: "template2", 
      name: "Academic", 
      category: "academic", 
      popular: false,
      image: "/lovable-uploads/0fe25031-2317-4f6b-a80c-9e183b89db34.png"
    },
    { 
      id: "template3", 
      name: "Technical Detail", 
      category: "professional", 
      popular: true,
      image: "/lovable-uploads/506d859b-1ee9-4a76-9bc5-2aab31eb2713.png"
    },
    { 
      id: "template4", 
      name: "Modern Achievements", 
      category: "professional", 
      popular: true,
      image: "/lovable-uploads/da38501c-178a-4ab5-83d2-24f271ab872d.png"
    },
    { 
      id: "template5", 
      name: "Tech Minimalist", 
      category: "minimal", 
      popular: false,
      image: "/lovable-uploads/045b3ae8-1bc8-4c03-9056-6e34fc137969.png"
    },
    { 
      id: "template6", 
      name: "Experience Focus", 
      category: "professional", 
      popular: false,
      image: "/lovable-uploads/8084e7d7-bcd4-443b-83fd-039f4f8ef460.png"
    },
    { 
      id: "template7", 
      name: "Data Analyst", 
      category: "professional", 
      popular: true,
      image: "/lovable-uploads/f56216a3-d7af-4bcc-b113-acb98a9e8f4f.png"
    },
  ];

  const filteredTemplates = category === 'all' 
    ? templates 
    : templates.filter(t => t.category === category);

  const handleTemplateClick = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handlePreview = () => {
    if (selectedTemplate) {
      setPreviewModal(true);
    } else {
      toast({
        title: "No template selected",
        description: "Please select a template to preview",
        variant: "destructive",
      });
    }
  };

  const handleDownload = () => {
    if (selectedTemplate) {
      toast({
        title: "Resume download started",
        description: "Your resume will be downloaded shortly...",
      });
      // In a real implementation, this would call your backend API
      setTimeout(() => {
        const link = document.createElement('a');
        const template = templates.find(t => t.id === selectedTemplate);
        if (template) {
          link.href = template.image;
          link.download = `resume-${template.name.toLowerCase().replace(/\s+/g, '-')}.pdf`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }, 1500);
    } else {
      toast({
        title: "No template selected",
        description: "Please select a template to download",
        variant: "destructive",
      });
    }
  };

  const handleContinue = () => {
    if (selectedTemplate) {
      navigate('/jobs');
    } else {
      toast({
        title: "No template selected",
        description: "Please select a template to continue",
        variant: "destructive",
      });
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
                <TabsTrigger value="professional">Professional</TabsTrigger>
                <TabsTrigger value="academic">Academic</TabsTrigger>
                <TabsTrigger value="creative">Creative</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value={category} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                    <div className="relative">
                      {/* Actual template preview */}
                      <img 
                        src={template.image} 
                        alt={template.name} 
                        className="w-full h-80 object-cover object-top"
                      />
                      
                      {/* Selection indicator */}
                      {selectedTemplate === template.id && (
                        <div className="absolute top-3 right-3 h-7 w-7 rounded-full bg-primary flex items-center justify-center text-white">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                      
                      {/* Popular badge */}
                      {template.popular && (
                        <div className="absolute top-3 left-3 px-2 py-1 rounded-md bg-primary/80 text-white text-xs font-medium">
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
            <Button variant="outline" onClick={handlePreview}>
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button variant="outline" onClick={handleDownload}>
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

        {/* Template Preview Modal */}
        {previewModal && selectedTemplate && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-auto">
              <div className="p-4 border-b flex justify-between items-center">
                <h3 className="font-medium text-lg">
                  {templates.find(t => t.id === selectedTemplate)?.name} Preview
                </h3>
                <Button variant="ghost" size="icon" onClick={() => setPreviewModal(false)}>
                  <span className="sr-only">Close</span>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-4">
                <img 
                  src={templates.find(t => t.id === selectedTemplate)?.image} 
                  alt="Resume Preview" 
                  className="max-w-full max-h-[70vh] mx-auto"
                />
              </div>
              <div className="p-4 border-t flex justify-end gap-2">
                <Button variant="outline" onClick={() => setPreviewModal(false)}>
                  Close
                </Button>
                <Button onClick={handleDownload}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Templates;
