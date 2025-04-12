
import { FC } from 'react';

interface CareerImageProps {
  category?: 'tech' | 'design' | 'marketing' | 'business' | 'general';
  className?: string;
  size?: 'small' | 'medium' | 'large';
}

const CareerImages: FC<CareerImageProps> = ({ 
  category = 'general', 
  className = "", 
  size = 'medium' 
}) => {
  // Map of high-quality image URLs by category
  const imagesByCategory = {
    tech: [
      "https://images.unsplash.com/photo-1581089781785-603411fa81e5?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?q=80&w=2069&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
    ],
    design: [
      "https://images.unsplash.com/photo-1613909207039-6b173b755cc1?q=80&w=2069&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=2064&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop",
    ],
    marketing: [
      "https://images.unsplash.com/photo-1533750516280-125c550b92d3?q=80&w=2106&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2074&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop",
    ],
    business: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1573164574001-518958d9baa2?q=80&w=2069&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1664575600796-ffa828c5cb6e?q=80&w=2070&auto=format&fit=crop",
    ],
    general: [
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=2187&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop",
    ],
  };

  // Select a random image from the appropriate category
  const randomIndex = Math.floor(Math.random() * imagesByCategory[category].length);
  const selectedImage = imagesByCategory[category][randomIndex];

  // Size classes
  const sizeClasses = {
    small: "h-32 w-32",
    medium: "h-48 w-full",
    large: "h-64 w-full",
  };

  return (
    <div className={`overflow-hidden rounded-lg ${sizeClasses[size]} ${className}`}>
      <img 
        src={selectedImage} 
        alt={`Career in ${category}`} 
        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
      />
    </div>
  );
};

export default CareerImages;
