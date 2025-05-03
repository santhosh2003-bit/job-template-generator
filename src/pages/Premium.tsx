import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, ShieldCheck, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/layout/Layout";
import { Link } from "react-router-dom";

const Premium = () => {
  const [isMonthly, setIsMonthly] = useState(true);

  const toggleBillingCycle = () => {
    setIsMonthly(!isMonthly);
  };

  const features = [
    {
      name: "Advanced Resume Templates",
      description: "Access to exclusive premium resume templates.",
    },
    {
      name: "Advanced Job Search",
      description: "Filter jobs by salary, experience level, and date posted.",
    },
    {
      name: "AI Cover Letter Generator",
      description: "Create tailored cover letters instantly for any job application.",
      new: true,
    },
    {
      name: "Resume Analytics",
      description: "Track views and downloads of your resume.",
      coming: true,
    },
    {
      name: "Priority Support",
      description: "Get priority customer support and feedback.",
    },
    {
      name: "Ad-free Experience",
      description: "Enjoy using our platform without any advertisements.",
    },
  ];

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto mt-20 md:mt-20 px-4 md:px-0"
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Unlock Premium Features
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Upgrade to premium and take advantage of all the features to help
            you land your dream job.
          </p>
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-6 mb-12">
          <Card className="w-full md:w-96">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-semibold">
                {isMonthly ? "Monthly" : "Yearly"}
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Our most popular plan
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="text-5xl font-bold">
                ${isMonthly ? "19" : "199"}
              </div>
              <p className="text-muted-foreground">
                {isMonthly ? "per month" : "per year"}
              </p>
            </CardContent>
            <div className="p-6">
              <Button className="w-full bg-purple-500 hover:bg-purple-600">
                Get Started
              </Button>
            </div>
          </Card>
        </div>

        <div className="flex justify-center mb-8">
          <Button
            variant="outline"
            className="bg-transparent hover:bg-secondary"
            onClick={toggleBillingCycle}
          >
            Switch to {isMonthly ? "Yearly" : "Monthly"} Billing
          </Button>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Premium Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                    {feature.name}
                    {feature.new && (
                      <div className="ml-2 rounded-full bg-green-500 text-white text-xs px-2 py-0.5">
                        New
                      </div>
                    )}
                    {feature.coming && (
                      <div className="ml-2 rounded-full bg-blue-500 text-white text-xs px-2 py-0.5">
                        Coming Soon
                      </div>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="text-muted-foreground">
            Secure payments powered by Stripe.
          </p>
          <ShieldCheck className="mx-auto h-6 w-6 text-purple-500 mt-2" />
        </div>
      </motion.div>
    </Layout>
  );
};

export default Premium;
