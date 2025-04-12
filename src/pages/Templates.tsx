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
      image: "/templates/template1.png",
    },
    {
      id: "template2",
      name: "Creative",
      description: "Modern design for creative positions",
      image: "/templates/template1.png",
    },
    {
      id: "template3",
      name: "Academic",
      description: "Formal design for academic and research positions",
      image: "/templates/template1.png",
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
        className="p-4 sm:p-6 md:mt-20 md:p-6"
      >
        <div className="text-center mb-6 sm:mb-10">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            Choose Your Resume Template
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">
            Select a template that best represents your professional style and
            career goals.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-10">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => handleTemplateSelect(template.id)}
              className={`border rounded-lg p-1 sm:p-4 h-fit transition-all cursor-pointer ${
                selectedTemplate === template.id
                  ? "ring-2 ring-primary"
                  : "hover:border-primary/50"
              }`}
            >
              <div className="relative aspect-[5/5] bg-accent/20">
                <img
                  src="/templates/template1.png"
                  alt={template.name}
                  className="h-auto max-h-[300px] sm:max-h-[400px] w-full object-contain"
                />
                {selectedTemplate === template.id && (
                  <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                    <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-primary flex items-center justify-center">
                      <Check className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-2 sm:mt-3">
                <h3 className="font-semibold text-sm sm:text-base mb-1">
                  {template.name}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
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
            className="w-full sm:w-auto"
          >
            Continue to Jobs
          </Button>
        </div>
      </motion.div>
    </Layout>
  );
};

export default Templates;
