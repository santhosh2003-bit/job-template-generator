
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { useResume } from "@/context/ResumeContext";
import { Check } from "lucide-react";

const Templates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const { setSelectedTemplate: setGlobalTemplate } = useResume();
  const navigate = useNavigate();

  const templates = [
    {
      id: "template1",
      name: "Professional",
      description: "Clean and professional design for corporate positions",
      image: "/public/placeholder.svg",
    },
    {
      id: "template2",
      name: "Creative",
      description: "Modern design for creative positions",
      image: "/public/placeholder.svg",
    },
    {
      id: "template3",
      name: "Academic",
      description: "Formal design for academic and research positions",
      image: "/public/placeholder.svg",
    },
    {
      id: "template4",
      name: "Technical",
      description: "Structured design for technical positions",
      image: "/public/placeholder.svg",
    },
    {
      id: "template5",
      name: "Executive",
      description: "Elegant design for executive positions",
      image: "/public/placeholder.svg",
    },
    {
      id: "template6",
      name: "Minimalist",
      description: "Simple design for any position",
      image: "/public/placeholder.svg",
    },
  ];

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handleContinue = () => {
    if (selectedTemplate) {
      setGlobalTemplate(selectedTemplate);
      navigate("/jobs");
    }
  };

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-20"
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Choose Your Resume Template</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Select a template that best represents your professional style and
            career goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => handleTemplateSelect(template.id)}
              className={`border rounded-lg overflow-hidden transition-all cursor-pointer ${
                selectedTemplate === template.id
                  ? "ring-2 ring-primary"
                  : "hover:border-primary/50"
              }`}
            >
              <div className="relative aspect-[4/5] bg-accent/20">
                <img
                  src={template.image}
                  alt={template.name}
                  className="w-full h-full object-cover"
                />
                {selectedTemplate === template.id && (
                  <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                    <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
                      <Check className="h-6 w-6 text-white" />
                    </div>
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-1">{template.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {template.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            onClick={handleContinue}
            disabled={!selectedTemplate}
          >
            Continue to Jobs
          </Button>
        </div>
      </motion.div>
    </Layout>
  );
};

export default Templates;
