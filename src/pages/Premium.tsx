
import { motion } from "framer-motion";
import { useState } from "react";
import { Check, X, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

const Premium = () => {
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">("monthly");
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handlePurchase = (planType: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to purchase a premium plan",
        variant: "destructive",
      });
      return;
    }
    
    // This would connect to a payment processor in a real implementation
    toast({
      title: "Feature coming soon",
      description: `Premium ${planType} plan purchase will be available soon!`,
    });
  };

  const planFeatures = {
    free: [
      { name: "Basic resume templates", included: true },
      { name: "Resume parsing", included: true },
      { name: "Job matching", included: true },
      { name: "Up to 3 resume versions", included: true },
      { name: "Basic resume analytics", included: false },
      { name: "AI-enhanced resume optimization", included: false },
      { name: "Priority job matching", included: false },
      { name: "Unlimited resume versions", included: false },
    ],
    premium: [
      { name: "Basic resume templates", included: true },
      { name: "Resume parsing", included: true },
      { name: "Job matching", included: true },
      { name: "Up to 3 resume versions", included: true },
      { name: "Basic resume analytics", included: true },
      { name: "AI-enhanced resume optimization", included: true },
      { name: "Priority job matching", included: true },
      { name: "Unlimited resume versions", included: true },
    ]
  };

  return (
    <Layout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container max-w-6xl py-16 md:py-24"
      >
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Upgrade Your Career Journey</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get access to premium features that will help you stand out in the job market and 
            land your dream job faster.
          </p>
        </div>

        <div className="flex justify-center mb-10">
          <div className="bg-muted p-1 rounded-full">
            <Button
              variant={selectedPlan === "monthly" ? "default" : "ghost"}
              className={selectedPlan === "monthly" ? "bg-purple-500 hover:bg-purple-600" : ""}
              onClick={() => setSelectedPlan("monthly")}
            >
              Monthly
            </Button>
            <Button
              variant={selectedPlan === "yearly" ? "default" : "ghost"}
              className={selectedPlan === "yearly" ? "bg-purple-500 hover:bg-purple-600" : ""}
              onClick={() => setSelectedPlan("yearly")}
            >
              Yearly
              <span className="ml-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                20% off
              </span>
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Free Plan */}
          <Card className="relative border-2 overflow-hidden">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-2xl">Free Plan</span>
                <span className="text-xl font-normal">$0</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {planFeatures.free.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    {feature.included ? (
                      <Check className="h-5 w-5 mr-2 text-green-500" />
                    ) : (
                      <X className="h-5 w-5 mr-2 text-muted-foreground" />
                    )}
                    <span className={feature.included ? "" : "text-muted-foreground"}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant="outline"
                onClick={() => navigate("/upload")}
              >
                Get Started
              </Button>
            </CardFooter>
          </Card>

          {/* Premium Plan */}
          <Card className="relative border-2 border-purple-500 overflow-hidden">
            <div className="absolute top-0 right-0 bg-purple-500 text-white px-3 py-1 rounded-bl-lg flex items-center">
              <Star className="h-4 w-4 mr-1" /> Premium
            </div>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-2xl">Premium</span>
                <span className="text-xl">
                  ${selectedPlan === "monthly" ? "9.99" : "95.90"}
                  <span className="text-sm text-muted-foreground">
                    /{selectedPlan === "monthly" ? "mo" : "yr"}
                  </span>
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2">
                {planFeatures.premium.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="h-5 w-5 mr-2 text-green-500" />
                    <span>{feature.name}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full bg-purple-500 hover:bg-purple-600" 
                onClick={() => handlePurchase(selectedPlan)}
              >
                Upgrade Now
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-16 bg-muted/50 p-8 rounded-xl">
          <h2 className="text-2xl font-bold mb-4">What our Premium users are saying</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: "I landed my dream job within 2 weeks of using the premium features!",
                author: "Sarah K.",
                position: "Software Engineer"
              },
              {
                quote: "The AI resume optimization made a huge difference in my callback rate.",
                author: "Michael T.",
                position: "Marketing Manager"
              },
              {
                quote: "Worth every penny. The premium template designs are gorgeous.",
                author: "Jessica L.",
                position: "UX Designer"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-background p-6 rounded-lg shadow-sm">
                <p className="mb-4 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-medium">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </Layout>
  );
};

export default Premium;
