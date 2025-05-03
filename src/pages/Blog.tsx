
import { Helmet } from "react-helmet";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Book } from "lucide-react";
import { Link } from "react-router-dom";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "How to Stand Out in a Competitive Job Market",
      description: "Learn strategies to differentiate yourself from other candidates.",
      content: "In today's competitive job market, standing out is more important than ever. Employers are looking for candidates who not only have the right skills but also bring unique perspectives and approaches to problem-solving. This article explores various strategies to help you differentiate yourself from other candidates, including developing a personal brand, showcasing your achievements with data, and leveraging your unique experiences. We'll also discuss how to effectively communicate your value proposition in resumes, cover letters, and interviews.",
      author: "Career Expert",
      date: "May 1, 2025",
      category: "Career Development",
      image: "https://placehold.co/600x400"
    },
    {
      id: 2,
      title: "The Future of Remote Work",
      description: "Discover how remote work is evolving and what it means for job seekers.",
      content: "Remote work has transformed from a temporary solution into a permanent fixture of the modern workplace. This shift has profound implications for job seekers, employers, and the future of work itself. This article examines the latest trends in remote work, including hybrid models, digital nomad visas, and the technologies shaping virtual collaboration. We'll also explore how job seekers can position themselves for success in this new landscape by developing remote-specific skills, creating effective home office environments, and navigating remote job interviews.",
      author: "Workplace Analyst",
      date: "April 22, 2025",
      category: "Workplace Trends",
      image: "https://placehold.co/600x400"
    },
    {
      id: 3,
      title: "Mastering the Art of Networking",
      description: "Build meaningful professional connections that advance your career.",
      content: "Networking remains one of the most powerful tools for career advancement, yet many professionals find it challenging or uncomfortable. This comprehensive guide breaks down the process of building meaningful professional connections into actionable steps. We'll cover strategies for both in-person and virtual networking, how to craft an effective elevator pitch, and techniques for following up that turn brief encounters into lasting relationships. Whether you're an introvert or extrovert, you'll discover approaches that align with your communication style and career goals.",
      author: "Networking Specialist",
      date: "April 15, 2025",
      category: "Professional Development",
      image: "https://placehold.co/600x400"
    },
    {
      id: 4,
      title: "AI Tools That Are Revolutionizing Job Hunting",
      description: "Leverage artificial intelligence to optimize your job search process.",
      content: "Artificial intelligence is transforming the job hunting landscape, offering tools that can help candidates find better matches, prepare more effectively, and stand out in the application process. This article explores the most innovative AI tools for resume optimization, job matching, interview preparation, and skills assessment. We'll provide practical advice on incorporating these technologies into your job search strategy while maintaining the personal touch that hiring managers value. Learn how to work alongside AI rather than competing with it in your professional journey.",
      author: "Tech Career Advisor",
      date: "April 10, 2025",
      category: "Technology",
      image: "https://placehold.co/600x400"
    },
    {
      id: 5,
      title: "Navigating Career Transitions Successfully",
      description: "Strategies for changing industries or roles with confidence.",
      content: "Career transitions are becoming increasingly common as the job market evolves and professionals seek new challenges or better work-life balance. This guide provides a roadmap for successfully navigating changes in your professional path, whether you're switching industries, moving from specialist to management roles, or pursuing entrepreneurship after corporate experience. We'll discuss how to identify transferable skills, address gaps through strategic learning, build narratives that connect your past experience to new opportunities, and manage the emotional aspects of career change.",
      author: "Career Coach",
      date: "April 5, 2025",
      category: "Career Development",
      image: "https://placehold.co/600x400"
    },
    {
      id: 6,
      title: "Building Resilience in Your Job Search",
      description: "Mental strategies to stay motivated during extended job hunting periods.",
      content: "Job searching can be an emotionally challenging process, especially when it extends longer than anticipated. This article focuses on building psychological resilience to maintain motivation, confidence, and productivity throughout your job hunt. Drawing on research from psychology and career development fields, we'll explore practical techniques for managing rejection, maintaining perspective, establishing productive routines, and leveraging support networks. Learn how to view setbacks as opportunities for growth and refinement rather than personal failures.",
      author: "Career Psychologist",
      date: "March 28, 2025",
      category: "Wellness",
      image: "https://placehold.co/600x400"
    }
  ];
  
  return (
    <Layout>
      <Helmet>
        <title>Blog | EzeApply</title>
      </Helmet>
      <div className="container py-8 md:py-12">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Blog</h1>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
            Latest insights, trends, and tips for job seekers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Card key={post.id} className="h-full flex flex-col">
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Book className="h-4 w-4 text-purple-500" />
                  <span className="text-xs text-muted-foreground">{post.category}</span>
                </div>
                <CardTitle className="text-xl">{post.title}</CardTitle>
                <CardDescription className="text-sm">{post.date} · {post.author}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground mb-4">{post.description}</p>
                <p className="line-clamp-4 text-sm">{post.content.substring(0, 200)}...</p>
              </CardContent>
              <div className="p-6 pt-0 mt-auto">
                <Link 
                  to={`/blog/${post.id}`} 
                  className="text-purple-500 font-medium hover:underline text-sm"
                >
                  Read More
                </Link>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground">
            Subscribe to our newsletter to receive the latest articles directly in your inbox
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
