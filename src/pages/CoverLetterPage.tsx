
import { useState } from "react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { useResume } from "@/context/ResumeContext";
import CoverLetterGenerator from "@/components/premium/CoverLetterGenerator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// For demonstration purposes, let's assume this user is premium
// In a real application, this would come from an auth context or API
const userIsPremium = true;

const CoverLetterPage = () => {
  const { checkResumeStatus } = useResume();

  // Check if user has a resume
  const hasResume = checkResumeStatus();

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto mt-20 md:mt-20 px-4 md:px-0"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            AI Cover Letter Generator
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Create personalized cover letters tailored to your resume and specific job descriptions
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2" />
                How It Works
              </CardTitle>
              <CardDescription>
                Our AI-powered cover letter generator creates tailored letters in three easy steps
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="p-4 border rounded-lg">
                  <div className="bg-purple-100 dark:bg-purple-900/20 h-10 w-10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-purple-500 font-bold">1</span>
                  </div>
                  <h3 className="font-medium mb-1">Enter Job Details</h3>
                  <p className="text-sm text-muted-foreground">
                    Provide the job title, company name, and job description
                  </p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="bg-purple-100 dark:bg-purple-900/20 h-10 w-10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-purple-500 font-bold">2</span>
                  </div>
                  <h3 className="font-medium mb-1">AI Generates Letter</h3>
                  <p className="text-sm text-muted-foreground">
                    Our AI uses your resume data to craft a personalized letter
                  </p>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <div className="bg-purple-100 dark:bg-purple-900/20 h-10 w-10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="text-purple-500 font-bold">3</span>
                  </div>
                  <h3 className="font-medium mb-1">Review & Edit</h3>
                  <p className="text-sm text-muted-foreground">
                    Make any final adjustments and export your cover letter
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="glass-card p-6 md:p-8 rounded-xl">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold mb-2">
                Generate Your Cover Letter
              </h2>
              <p className="text-muted-foreground">
                Fill in the details below to create your personalized cover letter
              </p>
            </div>
            
            {hasResume ? (
              <div className="max-w-xl mx-auto">
                <CoverLetterGenerator isPremium={userIsPremium} />
              </div>
            ) : (
              <div className="text-center p-8">
                <p>Please upload your resume first to use this feature.</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default CoverLetterPage;
