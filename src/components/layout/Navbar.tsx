import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useResume } from "@/context/ResumeContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [signInData, setSignInData] = useState({ email: "", password: "" });
  const [signUpData, setSignUpData] = useState({
    email: "",
    password: "",
  });
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  const { checkResumeStatus } = useResume();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    {
      name: "Upload Resume",
      path: "/upload",
      onClick: () => true,
    },
    {
      name: "Templates",
      path: "/templates",
      onClick: () => checkResumeStatus(),
    },
    {
      name: "Jobs",
      path: "/jobs",
      onClick: () => checkResumeStatus(),
    },
  ];

  const handleGetStarted = () => {
    setIsAuthDialogOpen(true);
  };

  const handleNavLinkClick = (e: React.MouseEvent, link: any) => {
    if (link.onClick && !link.onClick()) {
      e.preventDefault();
    }
  };

  const handleSignInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const fieldName = id
      .replace("email-signin", "email")
      .replace("password-signin", "password");
    setSignInData({ ...signInData, [fieldName]: value });
  };

  const handleSignUpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    const fieldName = id
      .replace("name-signup", "name")
      .replace("email-signup", "email")
      .replace("password-signup", "password");
    setSignUpData({ ...signUpData, [fieldName]: value });
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // API INTEGRATION COMMENT:
      // 1. Implement actual API call here to authenticate user
      // Example API call:
      const response = await fetch("http://127.0.0.1:3012/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signInData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Sign in failed");

      // Simulate API response delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock successful authentication
      toast({
        title: "Welcome back!",
        description: "You've been signed in successfully.",
      });

      // Close dialog and potentially redirect user
      setIsAuthDialogOpen(false);
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Sign in failed",
        description:
          error instanceof Error
            ? error.message
            : "Please check your credentials and try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    // setIsLoading(true);
    console.log(signUpData);
    try {
      // API INTEGRATION COMMENT:
      // 1. Implement actual API call here to register user
      // Example API call:
      const response = await fetch("http://127.0.0.1:3012/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Sign up failed");
      console.log(response);
      // Simulate API response delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock successful registration
      toast({
        title: "Account created!",
        description: "Your account has been created successfully.",
      });

      // Close dialog and potentially redirect user
      setIsAuthDialogOpen(false);
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Sign up failed",
        description:
          error instanceof Error
            ? error.message
            : "Please check your information and try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    // API INTEGRATION COMMENT:
    // Implement password reset functionality
    // const response = await fetch('https://api.example.com/auth/reset-password', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ email: signInData.email }),
    // });

    toast({
      title: "Password reset",
      description:
        "If your email is registered, you'll receive reset instructions.",
    });
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
          isScrolled || isMenuOpen
            ? "glass border-b border-white/10 py-3 dark:bg-background/80 dark:border-border/30"
            : "bg-transparent py-5"
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-primary">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white font-bold dark:text-primary-foreground">
                E
              </span>
            </div>
            <span className="font-semibold text-xl tracking-tight">
              EzeApply
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "transition-colors hover:text-primary",
                  location.pathname === link.path
                    ? "text-primary font-medium"
                    : "text-foreground/80"
                )}
                onClick={(e) => handleNavLinkClick(e, link)}
              >
                {link.name}
              </Link>
            ))}
            <ThemeToggle />
            <Button size="sm" onClick={handleGetStarted}>
              Get Started
            </Button>
          </nav>

          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className="p-2 text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden absolute top-full left-0 right-0 glass border-b border-white/10 animate-fade-in dark:bg-background/80 dark:border-border/30">
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navLinks.map((link, index) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "py-2 px-4 rounded-md transition-colors",
                    `animate-slide-in animate-stagger-${index + 1}`,
                    location.pathname === link.path
                      ? "bg-accent text-primary font-medium"
                      : "hover:bg-accent/50"
                  )}
                  onClick={(e) => handleNavLinkClick(e, link)}
                >
                  {link.name}
                </Link>
              ))}
              <Button
                className="animate-slide-in animate-stagger-5"
                onClick={handleGetStarted}
              >
                Get Started
              </Button>
            </div>
          </nav>
        )}
      </header>

      <Dialog open={isAuthDialogOpen} onOpenChange={setIsAuthDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">
              Welcome to EzeApply
            </DialogTitle>
            <DialogDescription className="text-center">
              Sign in to your account or create a new one to get started
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="space-y-4">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email-signin">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email-signin"
                      placeholder="name@example.com"
                      type="email"
                      className="pl-10"
                      value={signInData.email}
                      onChange={handleSignInChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="password-signin">Password</Label>
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="text-xs text-primary hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password-signin"
                      type="password"
                      className="pl-10"
                      value={signInData.password}
                      onChange={handleSignInChange}
                      required
                    />
                  </div>
                </div>
                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              <form onSubmit={handleSignUp} className="space-y-4">
                {/* <div className="space-y-2">
                  <Label htmlFor="name-signup">Full Name</Label>
                  <Input
                    id="name-signup"
                    placeholder="John Doe"
                    value={signUpData.name}
                    onChange={handleSignUpChange}
                    required
                  />
                </div> */}
                <div className="space-y-2">
                  <Label htmlFor="email-signup">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email-signup"
                      placeholder="name@example.com"
                      type="email"
                      className="pl-10"
                      value={signUpData.email}
                      onChange={handleSignUpChange}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password-signup">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password-signup"
                      type="password"
                      className="pl-10"
                      value={signUpData.password}
                      onChange={handleSignUpChange}
                      required
                    />
                  </div>
                </div>
                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            By continuing, you agree to our{" "}
            <Link to="#" className="text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="#" className="text-primary hover:underline">
              Privacy Policy
            </Link>
            .
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Navbar;
