
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useResume } from "@/context/ResumeContext";
import PremiumFeatureOverlay from "@/components/premium/PremiumFeatureOverlay";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Form schema for the cover letter generator
const formSchema = z.object({
  jobTitle: z.string().min(2, {
    message: "Job title must be at least 2 characters.",
  }),
  companyName: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  jobDescription: z.string().min(10, {
    message: "Please provide a more detailed job description.",
  }),
  additionalNotes: z.string().optional(),
});

interface CoverLetterGeneratorProps {
  jobTitle?: string;
  companyName?: string;
  jobDescription?: string;
  isPremium?: boolean;
}

const CoverLetterGenerator = ({
  jobTitle = "",
  companyName = "",
  jobDescription = "",
  isPremium = false,
}: CoverLetterGeneratorProps) => {
  const [generating, setGenerating] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");
  const { toast } = useToast();
  const { personalDetails, resumeData } = useResume();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobTitle,
      companyName,
      jobDescription,
      additionalNotes: "",
    },
  });

  const generateCoverLetter = async (values: z.infer<typeof formSchema>) => {
    if (!personalDetails) {
      toast({
        title: "No Resume Data",
        description: "Please upload your resume first to generate a cover letter.",
        variant: "destructive",
      });
      return;
    }

    setGenerating(true);
    // Simulating API call delay
    try {
      // In a real implementation, this would be an API call to a backend service
      setTimeout(() => {
        // Mock response - in a real app, this would come from your API
        const mockCoverLetter = `
${new Date().toLocaleDateString()}

Dear Hiring Manager at ${values.companyName},

I am writing to express my interest in the ${values.jobTitle} position at ${values.companyName}. With my background as a ${personalDetails.current_position} at ${personalDetails.current_company} and ${personalDetails.experience_years} of industry experience, I believe I would be a valuable addition to your team.

${values.additionalNotes ? "Additionally, " + values.additionalNotes : ""}

Throughout my career, I have developed a strong skill set in ${resumeData?.skills?.slice(0, 3).join(", ") || "relevant technologies"}. In my current role, I have been responsible for various projects that align well with the requirements outlined in the job description.

I am particularly excited about the opportunity to work at ${values.companyName} because of its reputation for innovation and excellence. My background and skills make me well-positioned to contribute to your team's success.

I look forward to discussing how my experiences align with your needs for the ${values.jobTitle} position. Thank you for considering my application.

Sincerely,
${personalDetails.full_name}
${personalDetails.email}
${personalDetails.phone_number}
        `;
        
        setCoverLetter(mockCoverLetter);
        toast({
          title: "Cover Letter Generated",
          description: "Your personalized cover letter has been created.",
        });
      }, 2000);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate cover letter. Please try again.",
        variant: "destructive",
      });
    } finally {
      setGenerating(false);
    }
  };

  if (!isPremium) {
    return (
      <PremiumFeatureOverlay message="Upgrade to Premium to generate custom cover letters for your job applications">
        <Card className="w-full h-[400px]">
          <CardHeader>
            <CardTitle>AI Cover Letter Generator</CardTitle>
            <CardDescription>
              Generate personalized cover letters for your job applications
            </CardDescription>
          </CardHeader>
        </Card>
      </PremiumFeatureOverlay>
    );
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-purple-500 hover:bg-purple-600">
          <FileText className="mr-2 h-4 w-4" />
          Generate Cover Letter
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>AI Cover Letter Generator</DialogTitle>
        </DialogHeader>

        {coverLetter ? (
          <div className="space-y-4">
            <div className="bg-muted p-4 rounded-md whitespace-pre-wrap font-mono text-sm overflow-y-auto max-h-[400px]">
              {coverLetter}
            </div>
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setCoverLetter("")}
              >
                Back to Form
              </Button>
              <Button 
                onClick={() => {
                  navigator.clipboard.writeText(coverLetter);
                  toast({
                    title: "Copied",
                    description: "Cover letter copied to clipboard",
                  });
                }}
              >
                Copy to Clipboard
              </Button>
            </div>
          </div>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(generateCoverLetter)} className="space-y-4">
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Title</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Software Engineer, Project Manager, etc."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Name</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Company name"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="jobDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Paste the job description here..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Adding the complete job description helps create a more tailored cover letter.
                    </FormDescription>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="additionalNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Additional Notes (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Any specific points you want to highlight..."
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              
              <Button type="submit" disabled={generating} className="w-full bg-purple-500 hover:bg-purple-600">
                {generating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>Generate Cover Letter</>
                )}
              </Button>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CoverLetterGenerator;
