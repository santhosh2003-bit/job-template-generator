
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

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

type TemplateOption = {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
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

// Updated template options with placeholder images instead of uploaded templates
const templateOptions: TemplateOption[] = [
  {
    id: "professional",
    name: "Professional",
    description: "Clean, traditional layout with a professional appeal",
    thumbnail: "https://placehold.co/400x300/e2e8f0/334155?text=Professional+Template"
  },
  {
    id: "modern",
    name: "Modern",
    description: "Contemporary design with creative styling",
    thumbnail: "https://placehold.co/400x300/dbeafe/1e40af?text=Modern+Template"
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Simple, clean design focusing on content",
    thumbnail: "https://placehold.co/400x300/f1f5f9/334155?text=Minimal+Template"
  },
  {
    id: "creative",
    name: "Creative",
    description: "Bold design with unique elements for creative fields",
    thumbnail: "https://placehold.co/400x300/f0fdf4/166534?text=Creative+Template"
  },
  {
    id: "executive",
    name: "Executive",
    description: "Sophisticated layout for senior positions",
    thumbnail: "https://placehold.co/400x300/fef2f2/991b1b?text=Executive+Template"
  }
];

const Templates = () => {
  const [resumeData, setResumeData] = useState<ResumeData>(mockedResumeData);
  const [previewModal, setPreviewModal] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentEditSection, setCurrentEditSection] = useState<'personal' | 'skills' | 'experience' | 'education'>('personal');
  const [generatingPdf, setGeneratingPdf] = useState(false);
  const [personalizedPreviewUrl, setPersonalizedPreviewUrl] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("professional");
  const [templateSelectOpen, setTemplateSelectOpen] = useState(false);
  const navigate = useNavigate();

  const form = useForm<ResumeData>({
    defaultValues: resumeData
  });

  const generatePersonalizedTemplate = async (templateId: string = selectedTemplate) => {
    const templateDiv = document.createElement('div');
    templateDiv.id = 'personalizedTemplate';
    templateDiv.style.width = '800px';
    templateDiv.style.height = '1130px'; // A4 ratio
    templateDiv.style.position = 'absolute';
    templateDiv.style.left = '-9999px';
    document.body.appendChild(templateDiv);
    
    let templateHtml = '';
    
    switch(templateId) {
      case "professional":
        templateHtml = `
          <div style="font-family: 'Georgia', serif; padding: 40px; height: 100%; color: #333;">
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
        break;

      case "modern":
        templateHtml = `
          <div style="font-family: 'Helvetica', sans-serif; padding: 40px; height: 100%; color: #333; background-color: #f8fafc;">
            <div style="display: flex; margin-bottom: 30px; background-color: #1e293b; color: white; padding: 25px; border-radius: 8px;">
              <div style="flex: 2;">
                <h1 style="margin: 0; font-size: 32px; letter-spacing: 1px;">${resumeData.personalInfo.name}</h1>
                <h2 style="margin: 5px 0 15px; font-size: 18px; font-weight: 400; color: #94a3b8;">${resumeData.personalInfo.title}</h2>
                <p style="line-height: 1.6;">${resumeData.personalInfo.summary}</p>
              </div>
              <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: flex-end; gap: 8px;">
                <div style="font-size: 14px;">${resumeData.personalInfo.email}</div>
                <div style="font-size: 14px;">${resumeData.personalInfo.phone}</div>
                <div style="font-size: 14px;">${resumeData.personalInfo.location}</div>
              </div>
            </div>
            
            <div style="display: flex; gap: 30px;">
              <div style="flex: 1;">
                <div style="margin-bottom: 25px; background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                  <h3 style="color: #1e293b; margin-top: 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Skills</h3>
                  <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-top: 15px;">
                    ${resumeData.skills.map(skill => `
                      <span style="background-color: #e2e8f0; color: #1e293b; padding: 6px 12px; border-radius: 20px; font-size: 13px;">${skill}</span>
                    `).join('')}
                  </div>
                </div>
                
                <div style="background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                  <h3 style="color: #1e293b; margin-top: 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Education</h3>
                  ${resumeData.education.map(edu => `
                    <div style="margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #f1f5f9;">
                      <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                        <h4 style="margin: 0; font-size: 16px; color: #334155;">${edu.degree}</h4>
                        <div style="color: #64748b; font-size: 14px;">${edu.period}</div>
                      </div>
                      <div style="color: #64748b; font-size: 14px;">${edu.school}</div>
                    </div>
                  `).join('')}
                </div>
              </div>
              
              <div style="flex: 2;">
                <div style="background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                  <h3 style="color: #1e293b; margin-top: 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Experience</h3>
                  ${resumeData.experience.map(exp => `
                    <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #f1f5f9;">
                      <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                        <h4 style="margin: 0; font-size: 17px; color: #334155;">${exp.title}</h4>
                        <div style="color: #64748b; font-size: 14px;">${exp.period}</div>
                      </div>
                      <div style="color: #64748b; font-size: 15px; margin-bottom: 10px;">${exp.company}, ${exp.location}</div>
                      <ul style="margin: 0; padding-left: 20px; color: #475569;">
                        ${exp.highlights.map(highlight => `
                          <li style="margin-bottom: 5px;">${highlight}</li>
                        `).join('')}
                      </ul>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>
        `;
        break;

      case "minimal":
        templateHtml = `
          <div style="font-family: 'Arial', sans-serif; padding: 40px; height: 100%; color: #333; line-height: 1.6;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="margin: 0; font-size: 28px; letter-spacing: 2px;">${resumeData.personalInfo.name}</h1>
              <h2 style="margin: 5px 0; font-size: 18px; font-weight: normal; color: #666;">${resumeData.personalInfo.title}</h2>
              <div style="margin-top: 10px; font-size: 14px; color: #666;">
                ${resumeData.personalInfo.email} | ${resumeData.personalInfo.phone} | ${resumeData.personalInfo.location}
              </div>
            </div>
            
            <div style="margin-bottom: 25px;">
              <p style="text-align: center; max-width: 600px; margin: 0 auto; color: #666;">
                ${resumeData.personalInfo.summary}
              </p>
            </div>
            
            <div style="margin-bottom: 25px;">
              <h3 style="text-align: center; font-size: 16px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 15px;">Skills</h3>
              <div style="text-align: center;">
                ${resumeData.skills.join(' • ')}
              </div>
            </div>
            
            <div style="margin-bottom: 25px;">
              <h3 style="text-align: center; font-size: 16px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 15px;">Experience</h3>
              ${resumeData.experience.map(exp => `
                <div style="margin-bottom: 20px; text-align: center;">
                  <h4 style="margin: 0; font-size: 16px;">${exp.title}</h4>
                  <div style="color: #666; margin: 5px 0;">${exp.company}, ${exp.location}</div>
                  <div style="color: #666; font-size: 14px; margin-bottom: 10px;">${exp.period}</div>
                  <ul style="list-style: none; padding: 0; margin: 0;">
                    ${exp.highlights.map(highlight => `
                      <li style="margin-bottom: 5px;">${highlight}</li>
                    `).join('')}
                  </ul>
                </div>
              `).join('')}
            </div>
            
            <div>
              <h3 style="text-align: center; font-size: 16px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 15px;">Education</h3>
              ${resumeData.education.map(edu => `
                <div style="margin-bottom: 15px; text-align: center;">
                  <h4 style="margin: 0; font-size: 16px;">${edu.degree}</h4>
                  <div style="color: #666;">${edu.school}</div>
                  <div style="color: #666; font-size: 14px;">${edu.period}</div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
        break;

      case "creative":
        templateHtml = `
          <div style="font-family: 'Roboto', sans-serif; padding: 40px; height: 100%; background: linear-gradient(135deg, #f3f4f6 0%, #ffffff 100%);">
            <div style="display: grid; grid-template-columns: 1fr 2fr; gap: 40px;">
              <div style="background-color: #1e293b; color: white; padding: 30px; border-radius: 15px;">
                <div style="margin-bottom: 30px;">
                  <h1 style="margin: 0; font-size: 24px; letter-spacing: 1px;">${resumeData.personalInfo.name}</h1>
                  <h2 style="margin: 5px 0; font-size: 16px; color: #94a3b8;">${resumeData.personalInfo.title}</h2>
                </div>
                
                <div style="margin-bottom: 30px;">
                  <div style="font-size: 14px; margin-bottom: 8px;">${resumeData.personalInfo.email}</div>
                  <div style="font-size: 14px; margin-bottom: 8px;">${resumeData.personalInfo.phone}</div>
                  <div style="font-size: 14px;">${resumeData.personalInfo.location}</div>
                </div>
                
                <div style="margin-bottom: 30px;">
                  <h3 style="font-size: 16px; margin-bottom: 15px; color: #94a3b8;">Skills</h3>
                  <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                    ${resumeData.skills.map(skill => `
                      <span style="background-color: rgba(255,255,255,0.1); padding: 4px 10px; border-radius: 15px; font-size: 12px;">${skill}</span>
                    `).join('')}
                  </div>
                </div>
                
                <div>
                  <h3 style="font-size: 16px; margin-bottom: 15px; color: #94a3b8;">Education</h3>
                  ${resumeData.education.map(edu => `
                    <div style="margin-bottom: 15px;">
                      <h4 style="margin: 0; font-size: 15px;">${edu.degree}</h4>
                      <div style="color: #94a3b8; font-size: 13px;">${edu.school}</div>
                      <div style="color: #94a3b8; font-size: 12px;">${edu.period}</div>
                    </div>
                  `).join('')}
                </div>
              </div>
              
              <div>
                <div style="background-color: white; padding: 30px; border-radius: 15px; margin-bottom: 30px;">
                  <h3 style="font-size: 16px; margin-bottom: 15px; color: #1e293b;">About Me</h3>
                  <p style="line-height: 1.6; color: #4b5563;">${resumeData.personalInfo.summary}</p>
                </div>
                
                <div style="background-color: white; padding: 30px; border-radius: 15px;">
                  <h3 style="font-size: 16px; margin-bottom: 20px; color: #1e293b;">Experience</h3>
                  ${resumeData.experience.map(exp => `
                    <div style="margin-bottom: 25px; position: relative;">
                      <div style="margin-bottom: 10px;">
                        <h4 style="margin: 0; font-size: 17px; color: #1e293b;">${exp.title}</h4>
                        <div style="color: #4b5563; font-size: 14px;">${exp.company}, ${exp.location}</div>
                        <div style="color: #6b7280; font-size: 13px;">${exp.period}</div>
                      </div>
                      <ul style="margin: 0; padding-left: 20px; color: #4b5563;">
                        ${exp.highlights.map(highlight => `
                          <li style="margin-bottom: 5px;">${highlight}</li>
                        `).join('')}
                      </ul>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>
        `;
        break;

      case "executive":
        templateHtml = `
          <div style="font-family: 'Times New Roman', serif; padding: 40px; height: 100%; color: #1a1a1a;">
            <div style="text-align: center; margin-bottom: 30px; border-bottom: 3px double #1a1a1a; padding-bottom: 20px;">
              <h1 style="margin: 0; font-size: 32px; text-transform: uppercase; letter-spacing: 3px;">${resumeData.personalInfo.name}</h1>
              <h2 style="margin: 10px 0; font-size: 20px; font-weight: normal;">${resumeData.personalInfo.title}</h2>
              <div style="margin-top: 15px; font-style: italic;">
                ${resumeData.personalInfo.email} | ${resumeData.personalInfo.phone} | ${resumeData.personalInfo.location}
              </div>
            </div>
            
            <div style="margin-bottom: 30px; text-align: center;">
              <p style="font-size: 16px; line-height: 1.6; max-width: 800px; margin: 0 auto;">
                ${resumeData.personalInfo.summary}
              </p>
            </div>
            
            <div style="margin-bottom: 30px;">
              <h3 style="text-align: center; font-size: 20px; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 2px;">Areas of Expertise</h3>
              <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 15px; margin-top: 10px;">
                ${resumeData.skills.map(skill => `
                  <span style="border: 1px solid #1a1a1a; padding: 5px 15px;">${skill}</span>
                `).join('')}
              </div>
            </div>
            
            <div style="margin-bottom: 30px;">
              <h3 style="text-align: center; font-size: 20px; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 2px;">Professional Experience</h3>
              ${resumeData.experience.map(exp => `
                <div style="margin-bottom: 25px; text-align: center;">
                  <h4 style="margin: 0; font-size: 18px; text-transform: uppercase;">${exp.title}</h4>
                  <div style="font-size: 16px; margin: 5px 0;">${exp.company}, ${exp.location}</div>
                  <div style="font-style: italic; margin-bottom: 10px;">${exp.period}</div>
                  <ul style="list-style: none; padding: 0; margin: 0;">
                    ${exp.highlights.map(highlight => `
                      <li style="margin-bottom: 8px; font-size: 15px;">${highlight}</li>
                    `).join('')}
                  </ul>
                </div>
              `).join('')}
            </div>
            
            <div>
              <h3 style="text-align: center; font-size: 20px; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 2px;">Education</h3>
              ${resumeData.education.map(edu => `
                <div style="margin-bottom: 15px; text-align: center;">
                  <h4 style="margin: 0; font-size: 18px;">${edu.degree}</h4>
                  <div style="font-size: 16px;">${edu.school}</div>
                  <div style="font-style: italic;">${edu.period}</div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
        break;

      default:
        templateHtml = `
          <div style="font-family: 'Arial', sans-serif; padding: 40px; height: 100%; color: #333;">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="margin: 0; font-size: 28px; letter-spacing: 2px;">${resumeData.personalInfo.name}</h1>
              <h2 style="margin: 5px 0; font-size: 18px; font-weight: normal; color: #666;">${resumeData.personalInfo.title}</h2>
              <div style="margin-top: 10px; font-size: 14px; color: #666;">
                ${resumeData.personalInfo.email} | ${resumeData.personalInfo.phone} | ${resumeData.personalInfo.location}
              </div>
            </div>
            
            <div style="margin-bottom: 25px;">
              <p style="text-align: center; max-width: 600px; margin: 0 auto; color: #666;">
                ${resumeData.personalInfo.summary}
              </p>
            </div>
            
            <div style="margin-bottom: 25px;">
              <h3 style="text-align: center; font-size: 16px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 15px;">Skills</h3>
              <div style="text-align: center;">
                ${resumeData.skills.join(' • ')}
              </div>
            </div>
            
            <div style="margin-bottom: 25px;">
              <h3 style="text-align: center; font-size: 16px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 15px;">Experience</h3>
              ${resumeData.experience.map(exp => `
                <div style="margin-bottom: 20px; text-align: center;">
                  <h4 style="margin: 0; font-size: 16px;">${exp.title}</h4>
                  <div style="color: #666; margin: 5px 0;">${exp.company}, ${exp.location}</div>
                  <div style="color: #666; font-size: 14px; margin-bottom: 10px;">${exp.period}</div>
                  <ul style="list-style: none; padding: 0; margin: 0;">
                    ${exp.highlights.map(highlight => `
                      <li style="margin-bottom: 5px;">${highlight}</li>
                    `).join('')}
                  </ul>
                </div>
              `).join('')}
            </div>
            
            <div>
              <h3 style="text-align: center; font-size: 16px; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 15px;">Education</h3>
              ${resumeData.education.map(edu => `
                <div style="margin-bottom: 15px; text-align: center;">
                  <h4 style="margin: 0; font-size: 16px;">${edu.degree}</h4>
                  <div style="color: #666;">${edu.school}</div>
                  <div style="color: #666; font-size: 14px;">${edu.period}</div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
        break;
    }
    
    templateDiv.innerHTML = templateHtml;
    
    try {
      const canvas = await html2canvas(templateDiv, {
        scale: 2, // Higher resolution
        logging: false,
        useCORS: true,
        backgroundColor: 'white'
      });
      
      const imageUrl = canvas.toDataURL('image/png');
      
      document.body.removeChild(templateDiv);
      
      return imageUrl;
    } catch (error) {
      console.error('Error generating personalized template:', error);
      document.body.removeChild(templateDiv);
      return null;
    }
  };

  const handlePreview = async () => {
    setGeneratingPdf(true);
    const previewUrl = await generatePersonalizedTemplate(selectedTemplate);
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
      const imageUrl = await generatePersonalizedTemplate(selectedTemplate);
      
      if (imageUrl) {
        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'px',
          format: [800, 1130]
        });
        
        pdf.addImage(imageUrl, 'PNG', 0, 0, 800, 1130);
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
            Resume Builder
          </span>
          <h1 className="text-3xl font-bold">Choose Your Resume Template</h1>
          <p className="text-muted-foreground mt-2">
            Select a template and customize your resume for job applications.
          </p>
        </motion.div>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Choose a Template</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templateOptions.map((template) => (
              <Card
                key={template.id}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  selectedTemplate === template.id ? 'ring-2 ring-primary' : ''
                }`}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <div className="p-4">
                  <img
                    src={template.thumbnail}
                    alt={template.name}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{template.name}</h3>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                    </div>
                    {selectedTemplate === template.id && (
                      <CheckCircle className="h-5 w-5 text-primary" />
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

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
