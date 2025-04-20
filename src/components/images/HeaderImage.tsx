
import { FC } from 'react';

interface HeaderImageProps {
  title?: string;
  subtitle?: string;
  imageUrl?: string;
  overlay?: boolean;
  height?: 'small' | 'medium' | 'large';
  className?: string;
}

const HeaderImage: FC<HeaderImageProps> = ({
  title,
  subtitle,
  imageUrl = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1200&auto=format&fit=crop",
  overlay = true,
  height = 'medium',
  className = '',
}) => {
  // Height classes
  const heightClasses = {
    small: "h-40",
    medium: "h-64",
    large: "h-96",
  };

  // Handle image loading error by providing a fallback
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1200&auto=format&fit=crop";
    e.currentTarget.onerror = null; // Prevent infinite error loop
  };

  return (
    <div 
      className={`relative w-full ${heightClasses[height]} overflow-hidden rounded-xl ${className}`}
    >
      <img 
        src={imageUrl} 
        alt={title || "Header image"} 
        className="w-full h-full object-cover"
        loading="lazy"
        onError={handleImageError}
      />
      
      {overlay && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center flex-col p-6">
          {title && (
            <h2 className="text-white text-2xl md:text-3xl font-bold text-center">
              {title}
            </h2>
          )}
          
          {subtitle && (
            <p className="text-white/90 mt-2 max-w-2xl text-center">
              {subtitle}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default HeaderImage;

