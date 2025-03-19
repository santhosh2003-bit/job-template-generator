
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Upload Resume', path: '/upload' },
    { name: 'Templates', path: '/templates' },
    { name: 'Jobs', path: '/jobs' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        isScrolled || isMenuOpen
          ? 'glass border-b border-white/10 py-3'
          : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-primary"
        >
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white font-bold">R</span>
          </div>
          <span className="font-semibold text-xl tracking-tight">ResumeCraft</span>
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'transition-colors hover:text-primary',
                location.pathname === link.path
                  ? 'text-primary font-medium'
                  : 'text-foreground/80'
              )}
            >
              {link.name}
            </Link>
          ))}
          <Button size="sm">Get Started</Button>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <nav className="md:hidden absolute top-full left-0 right-0 glass border-b border-white/10 animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'py-2 px-4 rounded-md transition-colors',
                  `animate-slide-in animate-stagger-${index + 1}`,
                  location.pathname === link.path
                    ? 'bg-accent text-primary font-medium'
                    : 'hover:bg-accent/50'
                )}
              >
                {link.name}
              </Link>
            ))}
            <Button className="animate-slide-in animate-stagger-5">Get Started</Button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
