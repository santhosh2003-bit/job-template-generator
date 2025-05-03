
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";
import { useResume } from "@/context/ResumeContext";
import { Check, Lock } from "lucide-react";
import PremiumBadge from "@/components/premium/PremiumBadge";
import PremiumFeatureOverlay from "@/components/premium/PremiumFeatureOverlay";

const Templates = () => {
  const { selectedTemplate, setSelectedTemplate: setGlobalTemplate, checkResumeStatus } = useResume();
  const [localSelectedTemplate, setLocalSelectedTemplate] = useState<string | null>(selectedTemplate);
  const navigate = useNavigate();

  // Check if user has uploaded a resume
  if (!checkResumeStatus()) {
    return null; // checkResumeStatus will redirect to upload page
  }

  const templates = [
    {
      id: "template1",
      name: "Professional",
      description: "Clean and professional design for corporate positions",
      image: "/templates/template1.png",
      premium: false
    },
    {
      id: "template2",
      name: "Creative",
      description: "Modern design with accent colors for creative positions",
      image: "/templates/template1.png", // Use same image for now
      premium: false
    },
    {
      id: "template3",
      name: "Academic",
      description: "Formal design for academic and research positions",
      image: "/templates/template1.png", // Use same image for now
      premium: false
    },
    {
      id: "template4",
      name: "Executive",
      description: "Premium template for senior executive positions",
      image: "/templates/template1.png", // Use same image for now
      premium: true
    },
    {
      id: "template5",
      name: "Tech Specialist",
      description: "Showcase technical skills with this premium template",
      image: "/templates/template1.png", // Use same image for now
      premium: true
    },
  ];

  const handleTemplateSelect = (templateId: string) => {
    // Only allow selection of non-premium templates
    const template = templates.find(t => t.id === templateId);
    if (template && !template.premium) {
      setLocalSelectedTemplate(templateId);
    }
  };

  const handleContinue = () => {
    if (localSelectedTemplate) {
      setGlobalTemplate(localSelectedTemplate);
      navigate("/jobs");
    }
  };

  const handlePremiumClick = () => {
    navigate("/premium");
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
              onClick={() => !template.premium && handleTemplateSelect(template.id)}
              className={`border rounded-lg p-1 sm:p-4 h-fit transition-all ${
                template.premium 
                  ? "cursor-default" 
                  : "cursor-pointer " + (localSelectedTemplate === template.id
                      ? "ring-2 ring-primary"
                      : "hover:border-primary/50")
              }`}
            >
              <div className="relative aspect-[5/5] bg-accent/20">
                {template.premium ? (
                  <PremiumFeatureOverlay message="Unlock premium templates">
                    <img
                      src="/templates/template1.png"
                      alt={template.name}
                      className="h-auto max-h-[300px] sm:max-h-[400px] w-full object-contain"
                    />
                  </PremiumFeatureOverlay>
                ) : (
                  <>
                    <img
                      src="/templates/template1.png"
                      alt={template.name}
                      className="h-auto max-h-[300px] sm:max-h-[400px] w-full object-contain"
                    />
                    {localSelectedTemplate === template.id && (
                      <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                        <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-primary flex items-center justify-center">
                          <Check className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
              <div className="mt-2 sm:mt-3">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold text-sm sm:text-base">
                    {template.name}
                  </h3>
                  {template.premium && <PremiumBadge tooltipText="Premium template" />}
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {template.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            onClick={handleContinue}
            disabled={!localSelectedTemplate}
            className="w-full sm:w-auto bg-purple-500 hover:bg-purple-600"
          >
            Continue to Jobs
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={handlePremiumClick}
            className="w-full sm:w-auto"
          >
            Unlock Premium Templates
          </Button>
        </div>
      </motion.div>
    </Layout>
  );
};

export default Templates;
