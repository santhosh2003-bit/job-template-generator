
import { useState } from "react";
import { Helmet } from "react-helmet";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Mail, MessageSquare, Phone, MapPin, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
      toast({
        title: "Message Sent",
        description: "We've received your message and will respond soon.",
      });
      // Reset form
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setIsSubmitted(false), 5000);
    }
  };
  
  return (
    <Layout>
      <Helmet>
        <title>Contact Us | EzeApply</title>
      </Helmet>
      
      <div className="container py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">Contact Us</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Have questions or feedback? Our team is here to help. Reach out through the form below or use our direct contact information.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Send a Message</CardTitle>
                <CardDescription>
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input 
                        id="name" 
                        placeholder="John Doe" 
                        required 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="john@example.com" 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="inquiry-type">Inquiry Type</Label>
                    <Select 
                      value={subject} 
                      onValueChange={setSubject}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select an inquiry type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Question</SelectItem>
                        <SelectItem value="support">Technical Support</SelectItem>
                        <SelectItem value="billing">Billing Inquiry</SelectItem>
                        <SelectItem value="feedback">Feedback</SelectItem>
                        <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Your Message</Label>
                    <Textarea 
                      id="message" 
                      placeholder="How can we help you?" 
                      className="min-h-[150px]" 
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-purple-500 hover:bg-purple-600"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : isSubmitted ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Sent!
                      </>
                    ) : (
                      <>Send Message</>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>
                  Reach out directly through these channels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-3">
                  <div className="bg-purple-500/10 p-2 rounded-md">
                    <Mail className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="font-medium">Email</p>
                    <a href="mailto:support@ezeapply.com" className="text-sm text-muted-foreground hover:text-purple-500">
                      support@ezeapply.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-purple-500/10 p-2 rounded-md">
                    <Phone className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="font-medium">Phone</p>
                    <a href="tel:+15551234567" className="text-sm text-muted-foreground hover:text-purple-500">
                      +1 (555) 123-4567
                    </a>
                    <p className="text-xs text-muted-foreground">Mon-Fri, 9am-5pm PT</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-purple-500/10 p-2 rounded-md">
                    <MapPin className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="font-medium">Address</p>
                    <address className="text-sm text-muted-foreground not-italic">
                      123 Startup Way<br />
                      San Francisco, CA 94107<br />
                      United States
                    </address>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="bg-purple-500/10 p-2 rounded-md">
                    <MessageSquare className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <p className="font-medium">Live Chat</p>
                    <p className="text-sm text-muted-foreground">
                      Available on weekdays from our support team.
                    </p>
                    <Button variant="link" className="text-purple-500 p-0 h-auto">
                      Start a chat
                    </Button>
                  </div>
                </div>
                
                <div className="pt-6 mt-6 border-t">
                  <h3 className="font-medium mb-3">Connect With Us</h3>
                  <div className="flex gap-3">
                    {["twitter", "linkedin", "facebook", "instagram"].map((social) => (
                      <a 
                        key={social}
                        href={`https://${social}.com/ezeapply`}
                        className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md hover:bg-purple-500/20 transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="sr-only">{social}</span>
                        <div className="w-5 h-5" />
                      </a>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                question: "How quickly can I expect a response?",
                answer: "We typically respond to all inquiries within 24-48 business hours. For urgent matters, please indicate this in your message subject."
              },
              {
                question: "Do you offer phone support?",
                answer: "Yes, phone support is available for all users during our business hours (9am-5pm PT, Monday through Friday)."
              },
              {
                question: "I'm having technical issues with my account. What should I do?",
                answer: "For technical support, please include your account email address and a detailed description of the issue, including any error messages you're seeing."
              },
              {
                question: "How can I request a feature or provide product feedback?",
                answer: "We love hearing your ideas! Select 'Feedback' in the inquiry type dropdown and share your suggestions with us."
              }
            ].map((faq, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
