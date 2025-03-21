
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Form, FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import {
  Check,
  CheckCircle,
  Download,
  Edit,
  Eye,
  FileCheck,
  Pencil,
  X,
} from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { toast } from "@/hooks/use-toast";
import { useForm } from 'react-hook-form';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

type ResumeData = {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    summary: string;
  };
  skills: string[];
  experience: {
    title: string;
    company: string;
    location: string;
    period: string;
    highlights: string[];
  }[];
  education: {
    degree: string;
    school: string;
    period: string;
  }[];
};

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

const Templates = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(mockedResumeData);
  const [previewModal, setPreviewModal] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentEditSection, setCurrentEditSection] = useState<'personal' | 'skills' | 'experience' | 'education'>('personal');
  const [generatingPdf, setGeneratingPdf] = useState(false);
  const [personalizedPreviewUrl, setPersonalizedPreviewUrl] = useState<string | null>(null);
  const navigate = useNavigate();

  const form = useForm<ResumeData>({
    defaultValues: resumeData
  });

  const generatePersonalizedTemplate = async () => {
    // Create a canvas element to render the personalized resume
    const templateDiv = document.createElement('div');
    templateDiv.id = 'personalizedTemplate';
    templateDiv.style.width = '800px';
    templateDiv.style.height = '1130px'; // A4 ratio
    templateDiv.style.position = 'absolute';
    templateDiv.style.left = '-9999px';
    document.body.appendChild(templateDiv);
    
    // Generate a custom resume design
    const templateHtml = `
      <div style="font-family: Arial, sans-serif; padding: 40px; height: 100%; color: #333;">
        <div style="border-bottom: 2px solid #2563eb; margin-bottom: 20px;">
          <h1 style="color: #1e40af; margin: 0; font-size: 28px;">${resumeData.personalInfo.name}</h1>
          <h2 style="color: #3b82f6; margin: 5px 0; font-size: 20px;">${resumeData.personalInfo.title}</h2>
          <div style="display: flex; justify-content: space-between; margin-top: 10px; color: #4b5563; font-size: 14px;">
            <div>${resumeData.personalInfo.email}</div>
            <div>${resumeData.personalInfo.phone}</div>
            <div>${resumeData.personalInfo.location}</div>
          </div>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h3 style="color: #1e40af; border-bottom: 1px solid #d1d5db; padding-bottom: 5px;">Summary</h3>
          <p>${resumeData.personalInfo.summary}</p>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h3 style="color: #1e40af; border-bottom: 1px solid #d1d5db; padding-bottom: 5px;">Skills</h3>
          <div style="display: flex; flex-wrap: wrap; gap: 8px;">
            ${resumeData.skills.map(skill => `
              <span style="background-color: #dbeafe; color: #1e40af; padding: 4px 8px; border-radius: 4px; font-size: 13px;">${skill}</span>
            `).join('')}
          </div>
        </div>
        
        <div style="margin-bottom: 20px;">
          <h3 style="color: #1e40af; border-bottom: 1px solid #d1d5db; padding-bottom: 5px;">Experience</h3>
          ${resumeData.experience.map(exp => `
            <div style="margin-bottom: 15px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                <h4 style="margin: 0; font-size: 17px;">${exp.title}</h4>
                <div style="color: #4b5563; font-size: 14px;">${exp.period}</div>
              </div>
              <div style="color: #4b5563; font-size: 15px; margin-bottom: 6px;">${exp.company}, ${exp.location}</div>
              <ul style="margin-top: 5px; padding-left: 20px;">
                ${exp.highlights.map(highlight => `
                  <li style="margin-bottom: 3px;">${highlight}</li>
                `).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
        
        <div>
          <h3 style="color: #1e40af; border-bottom: 1px solid #d1d5db; padding-bottom: 5px;">Education</h3>
          ${resumeData.education.map(edu => `
            <div style="margin-bottom: 10px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                <h4 style="margin: 0; font-size: 17px;">${edu.degree}</h4>
                <div style="color: #4b5563; font-size: 14px;">${edu.period}</div>
              </div>
              <div style="color: #4b5563; font-size: 15px;">${edu.school}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
    
    // Set the HTML content
    templateDiv.innerHTML = templateHtml;
    
    try {
      // Generate image from the personalized template
      const canvas = await html2canvas(templateDiv, {
        scale: 2, // Higher resolution
        logging: false,
        useCORS: true,
        backgroundColor: 'white'
      });
      
      // Convert canvas to data URL
      const imageUrl = canvas.toDataURL('image/png');
      
      // Clean up
      document.body.removeChild(templateDiv);
      
      return imageUrl;
    } catch (error) {
      console.error('Error generating personalized template:', error);
      document.body.removeChild(templateDiv);
      return null;
    }
  };

  const handlePreview = async () => {
    // Generate personalized preview
    setGeneratingPdf(true);
    const previewUrl = await generatePersonalizedTemplate();
    setGeneratingPdf(false);
    
    if (previewUrl) {
      setPersonalizedPreviewUrl(previewUrl);
      setPreviewModal(true);
    } else {
      toast({
        title: "Could not generate preview",
        description: "There was an error generating your resume preview",
        variant: "destructive",
      });
    }
  };

  const handleDownload = async () => {
    setGeneratingPdf(true);
    toast({
      title: "Generating your resume",
      description: "This may take a moment...",
    });
    
    try {
      // Generate personalized template
      const imageUrl = await generatePersonalizedTemplate();
      
      if (imageUrl) {
        // Create PDF
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'px',
          format: [800, 1130]
        });
        
        // Add the image to the PDF
        pdf.addImage(imageUrl, 'PNG', 0, 0, 800, 1130);
        
        // Download PDF
        pdf.save(`resume-${resumeData.personalInfo.name.toLowerCase().replace(/\s+/g, '-')}.pdf`);
        
        toast({
          title: "Resume downloaded!",
          description: "Your resume has been downloaded as a PDF",
          variant: "default",
        });
      } else {
        throw new Error("Failed to generate template");
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Download failed",
        description: "There was a problem generating your resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setGeneratingPdf(false);
    }
  };

  const handleContinue = () => {
    navigate('/jobs');
  };

  const openEditModal = (section: 'personal' | 'skills' | 'experience' | 'education') => {
    form.reset(resumeData);
    setCurrentEditSection(section);
    setEditModalOpen(true);
  };

  const handleSaveEdits = (data: ResumeData) => {
    setResumeData(data);
    setEditModalOpen(false);
    toast({
      title: "Resume information updated",
      description: "Your changes have been saved successfully.",
    });
  };

  const addSkill = () => {
    const currentSkills = form.getValues('skills') || [];
    form.setValue('skills', [...currentSkills, '']);
  };

  const removeSkill = (index: number) => {
    const currentSkills = form.getValues('skills') || [];
    form.setValue('skills', currentSkills.filter((_, i) => i !== index));
  };

  const addExperience = () => {
    const currentExperience = form.getValues('experience') || [];
    form.setValue('experience', [
      ...currentExperience, 
      { title: '', company: '', location: '', period: '', highlights: [''] }
    ]);
  };

  const addHighlight = (expIndex: number) => {
    const currentExperience = form.getValues('experience') || [];
    const updatedExperience = [...currentExperience];
    updatedExperience[expIndex].highlights.push('');
    form.setValue('experience', updatedExperience);
  };

  const removeHighlight = (expIndex: number, highlightIndex: number) => {
    const currentExperience = form.getValues('experience') || [];
    const updatedExperience = [...currentExperience];
    updatedExperience[expIndex].highlights = updatedExperience[expIndex].highlights.filter((_, i) => i !== highlightIndex);
    form.setValue('experience', updatedExperience);
  };

  const removeExperience = (index: number) => {
    const currentExperience = form.getValues('experience') || [];
    form.setValue('experience', currentExperience.filter((_, i) => i !== index));
  };

  const addEducation = () => {
    const currentEducation = form.getValues('education') || [];
    form.setValue('education', [
      ...currentEducation,
      { degree: '', school: '', period: '' }
    ]);
  };

  const removeEducation = (index: number) => {
    const currentEducation = form.getValues('education') || [];
    form.setValue('education', currentEducation.filter((_, i) => i !== index));
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
          <h1 className="text-3xl font-bold">Your Customized Resume</h1>
          <p className="text-muted-foreground mt-2">
            We've analyzed your uploaded resume and created an optimized version for job applications.
          </p>
        </motion.div>

        <div className="glass-card rounded-xl p-8 mb-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-2xl font-bold mb-2">{resumeData.personalInfo.name}</h2>
              <h3 className="text-lg text-muted-foreground">{resumeData.personalInfo.title}</h3>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handlePreview} disabled={generatingPdf}>
                {generatingPdf ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Generating...
                  </>
                ) : (
                  <>
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={handleDownload} disabled={generatingPdf}>
                {generatingPdf ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Download PDF
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-lg">Personal Information</h3>
                <Button variant="ghost" size="sm" onClick={() => openEditModal('personal')}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Email:</span> {resumeData.personalInfo.email}</p>
                <p><span className="font-medium">Phone:</span> {resumeData.personalInfo.phone}</p>
                <p><span className="font-medium">Location:</span> {resumeData.personalInfo.location}</p>
              </div>

              <div className="mt-6">
                <h4 className="font-medium mb-2">Professional Summary</h4>
                <p className="text-sm text-muted-foreground">{resumeData.personalInfo.summary}</p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-lg">Skills</h3>
                <Button variant="ghost" size="sm" onClick={() => openEditModal('skills')}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-lg">Experience</h3>
              <Button variant="ghost" size="sm" onClick={() => openEditModal('experience')}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>
            <div className="space-y-6">
              {resumeData.experience.map((exp, index) => (
                <div key={index} className="border-l-2 border-primary/30 pl-4">
                  <div className="flex justify-between mb-1">
                    <h4 className="font-medium">{exp.title}</h4>
                    <span className="text-sm text-muted-foreground">{exp.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{exp.company}, {exp.location}</p>
                  <ul className="space-y-1 list-disc list-inside text-sm">
                    {exp.highlights.map((highlight, idx) => (
                      <li key={idx}>{highlight}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-lg">Education</h3>
              <Button variant="ghost" size="sm" onClick={() => openEditModal('education')}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resumeData.education.map((edu, index) => (
                <Card key={index} className="p-4">
                  <h4 className="font-medium">{edu.degree}</h4>
                  <p className="text-sm text-muted-foreground">{edu.school}</p>
                  <p className="text-xs text-muted-foreground mt-1">{edu.period}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Your resume has been optimized for ATS systems
            <CheckCircle className="h-4 w-4 inline ml-1 text-green-500" />
          </p>
          <Button onClick={handleContinue}>
            Continue to Job Matches
            <FileCheck className="h-4 w-4 ml-2" />
          </Button>
        </div>

        {previewModal && personalizedPreviewUrl && (
          <Dialog open={previewModal} onOpenChange={setPreviewModal}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-auto">
              <DialogHeader>
                <DialogTitle>Resume Preview</DialogTitle>
                <DialogDescription>
                  This is how your resume will look when downloaded as a PDF
                </DialogDescription>
              </DialogHeader>
              <div className="flex justify-center my-4">
                <img 
                  src={personalizedPreviewUrl} 
                  alt="Resume Preview" 
                  className="max-w-full max-h-[70vh] border shadow-sm rounded"
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setPreviewModal(false)}>
                  Close
                </Button>
                <Button onClick={handleDownload} disabled={generatingPdf}>
                  {generatingPdf ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      Generating...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-auto">
            <DialogHeader>
              <DialogTitle>
                Edit Resume Information
              </DialogTitle>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSaveEdits)} className="space-y-6">
                {currentEditSection === 'personal' && (
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="personalInfo.name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="personalInfo.title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Job Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Software Engineer" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="personalInfo.email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="email@example.com" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="personalInfo.phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input placeholder="(123) 456-7890" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="personalInfo.location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input placeholder="City, State" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="personalInfo.summary"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Summary</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Brief professional summary..." 
                              className="min-h-[100px]" 
                              {...field} 
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                )}
                
                {currentEditSection === 'skills' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-sm font-medium">Skills</h3>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm" 
                        onClick={addSkill}
                      >
                        Add Skill
                      </Button>
                    </div>
                    
                    <Card>
                      <div className="p-4 space-y-2">
                        {form.watch('skills')?.map((_, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <FormField
                              control={form.control}
                              name={`skills.${index}`}
                              render={({ field }) => (
                                <FormItem className="flex-1 mb-0">
                                  <FormControl>
                                    <Input placeholder="e.g. JavaScript" {...field} />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8" 
                              onClick={() => removeSkill(index)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </Card>
                  </div>
                )}
                
                {currentEditSection === 'experience' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-sm font-medium">Work Experience</h3>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm" 
                        onClick={addExperience}
                      >
                        Add Experience
                      </Button>
                    </div>
                    
                    {form.watch('experience')?.map((_, expIndex) => (
                      <Card key={expIndex} className="mb-4">
                        <div className="p-4 space-y-4">
                          <div className="flex justify-between">
                            <h4 className="text-sm font-medium">Experience {expIndex + 1}</h4>
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8" 
                              onClick={() => removeExperience(expIndex)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <FormField
                            control={form.control}
                            name={`experience.${expIndex}.title`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                  <Input placeholder="Software Engineer" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name={`experience.${expIndex}.company`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Company</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Company Name" {...field} />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                            
                            <FormField
                              control={form.control}
                              name={`experience.${expIndex}.location`}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Location</FormLabel>
                                  <FormControl>
                                    <Input placeholder="City, State" {...field} />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          </div>
                          
                          <FormField
                            control={form.control}
                            name={`experience.${expIndex}.period`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Period</FormLabel>
                                <FormControl>
                                  <Input placeholder="Jan 2021 - Present" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <FormLabel>Highlights</FormLabel>
                              <Button 
                                type="button" 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => addHighlight(expIndex)}
                              >
                                Add Highlight
                              </Button>
                            </div>
                            
                            {form.watch(`experience.${expIndex}.highlights`)?.map((_, highlightIndex) => (
                              <div key={highlightIndex} className="flex items-center gap-2 mb-2">
                                <FormField
                                  control={form.control}
                                  name={`experience.${expIndex}.highlights.${highlightIndex}`}
                                  render={({ field }) => (
                                    <FormItem className="flex-1 mb-0">
                                      <FormControl>
                                        <Input placeholder="Accomplishment or responsibility..." {...field} />
                                      </FormControl>
                                    </FormItem>
                                  )}
                                />
                                <Button 
                                  type="button" 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8" 
                                  onClick={() => removeHighlight(expIndex, highlightIndex)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
                
                {currentEditSection === 'education' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-sm font-medium">Education</h3>
                      <Button 
                        type="button" 
                        variant="outline" 
                        size="sm" 
                        onClick={addEducation}
                      >
                        Add Education
                      </Button>
                    </div>
                    
                    {form.watch('education')?.map((_, eduIndex) => (
                      <Card key={eduIndex} className="mb-4">
                        <div className="p-4 space-y-4">
                          <div className="flex justify-between">
                            <h4 className="text-sm font-medium">Education {eduIndex + 1}</h4>
                            <Button 
                              type="button" 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8" 
                              onClick={() => removeEducation(eduIndex)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <FormField
                            control={form.control}
                            name={`education.${eduIndex}.degree`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Degree</FormLabel>
                                <FormControl>
                                  <Input placeholder="Bachelor of Science in Computer Science" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name={`education.${eduIndex}.school`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>School</FormLabel>
                                <FormControl>
                                  <Input placeholder="University Name" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={form.control}
                            name={`education.${eduIndex}.period`}
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Period</FormLabel>
                                <FormControl>
                                  <Input placeholder="2016 - 2020" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
                
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setEditModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">Save Changes</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Templates;
