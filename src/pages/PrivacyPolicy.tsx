
import { Helmet } from "react-helmet";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const PrivacyPolicy = () => {
  const lastUpdated = "May 1, 2025";
  
  return (
    <Layout>
      <Helmet>
        <title>Privacy Policy | EzeApply</title>
      </Helmet>
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-3">Privacy Policy</h1>
            <p className="text-muted-foreground">Last Updated: {lastUpdated}</p>
          </div>
          
          <Card>
            <CardContent className="p-8">
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <section className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                  <p>
                    At EzeApply ("we," "us," or "our"), we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and services.
                  </p>
                  <p>
                    Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access our services.
                  </p>
                </section>
                
                <Separator className="my-8" />
                
                <section className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
                  
                  <h3 className="text-xl font-medium mb-2">Personal Information</h3>
                  <p>We may collect personal information that you voluntarily provide to us when you:</p>
                  <ul className="list-disc pl-6 mb-4">
                    <li>Register for an account</li>
                    <li>Upload your resume</li>
                    <li>Apply for jobs through our platform</li>
                    <li>Contact our customer support</li>
                    <li>Subscribe to our newsletters or marketing communications</li>
                  </ul>
                  <p>This information may include:</p>
                  <ul className="list-disc pl-6 mb-4">
                    <li>Name, email address, phone number, and other contact details</li>
                    <li>Professional information including work history, education, skills, and certifications</li>
                    <li>Login credentials</li>
                    <li>Payment information (for premium subscriptions)</li>
                    <li>Communication preferences</li>
                  </ul>
                  
                  <h3 className="text-xl font-medium mb-2 mt-6">Resume Information</h3>
                  <p>
                    When you upload your resume, we collect and process the information contained within it, which may include personal and professional details such as your work history, education, skills, achievements, and contact information.
                  </p>
                  
                  <h3 className="text-xl font-medium mb-2 mt-6">Automatically Collected Information</h3>
                  <p>
                    When you access our services, we automatically collect certain information about your device and usage patterns, including:
                  </p>
                  <ul className="list-disc pl-6">
                    <li>Device information (browser type, operating system, device type)</li>
                    <li>IP address and approximate location based on IP</li>
                    <li>Pages visited and features used within our platform</li>
                    <li>Time spent on pages and user engagement metrics</li>
                    <li>Referring websites or sources</li>
                  </ul>
                </section>
                
                <Separator className="my-8" />
                
                <section className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
                  <p>We use the information we collect for various purposes, including to:</p>
                  <ul className="list-disc pl-6">
                    <li>Provide, maintain, and improve our services</li>
                    <li>Process and analyze your resume to match you with suitable job opportunities</li>
                    <li>Facilitate job applications</li>
                    <li>Customize your experience and provide personalized content</li>
                    <li>Communicate with you about our services, updates, and promotions</li>
                    <li>Respond to your inquiries and provide customer support</li>
                    <li>Monitor and analyze usage patterns and trends</li>
                    <li>Detect, prevent, and address technical issues or fraudulent activities</li>
                    <li>Comply with legal obligations</li>
                  </ul>
                </section>
                
                <Separator className="my-8" />
                
                <section className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Sharing Your Information</h2>
                  <p>We may share your personal information with:</p>
                  <ul className="list-disc pl-6">
                    <li>
                      <strong>Employers and Recruiters:</strong> When you apply for jobs through our platform, your resume and application information will be shared with the respective employers or recruiters.
                    </li>
                    <li>
                      <strong>Service Providers:</strong> We may share your information with third-party vendors who provide services on our behalf, such as hosting, data analysis, payment processing, customer service, and marketing assistance.
                    </li>
                    <li>
                      <strong>Business Partners:</strong> We may share your information with our business partners to offer certain products, services, or promotions.
                    </li>
                    <li>
                      <strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests from public authorities.
                    </li>
                    <li>
                      <strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.
                    </li>
                  </ul>
                </section>
                
                <Separator className="my-8" />
                
                <section className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Data Retention</h2>
                  <p>
                    We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. When determining the appropriate retention period, we consider:
                  </p>
                  <ul className="list-disc pl-6">
                    <li>The amount, nature, and sensitivity of the personal information</li>
                    <li>The potential risk of harm from unauthorized use or disclosure</li>
                    <li>The purposes for which we process the information and whether we can achieve those purposes through other means</li>
                    <li>Applicable legal requirements</li>
                  </ul>
                </section>
                
                <Separator className="my-8" />
                
                <section className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
                  <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
                  <ul className="list-disc pl-6">
                    <li>The right to access the personal information we hold about you</li>
                    <li>The right to request the correction of inaccurate personal information</li>
                    <li>The right to request deletion of your personal information</li>
                    <li>The right to withdraw consent at any time, where we rely on consent to process your information</li>
                    <li>The right to data portability</li>
                    <li>The right to object to processing of your personal information</li>
                  </ul>
                  <p className="mt-4">
                    To exercise these rights, please contact us using the information provided in the "Contact Us" section below.
                  </p>
                </section>
                
                <Separator className="my-8" />
                
                <section className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Security</h2>
                  <p>
                    We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                  </p>
                </section>
                
                <Separator className="my-8" />
                
                <section className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Changes to This Privacy Policy</h2>
                  <p>
                    We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
                  </p>
                  <p>
                    We encourage you to review this Privacy Policy periodically to stay informed about how we collect, use, and protect your information.
                  </p>
                </section>
                
                <Separator className="my-8" />
                
                <section>
                  <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                  <p>
                    If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us at:
                  </p>
                  <p className="mt-2">
                    <strong>Email:</strong> privacy@ezeapply.com<br />
                    <strong>Address:</strong> 123 Startup Way, San Francisco, CA 94107, USA<br />
                    <strong>Phone:</strong> +1 (555) 123-4567
                  </p>
                </section>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;
