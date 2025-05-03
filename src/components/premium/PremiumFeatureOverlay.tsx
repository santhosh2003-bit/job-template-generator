
import { useNavigate } from "react-router-dom";
import { Lock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PremiumFeatureOverlayProps {
  children: React.ReactNode;
  message?: string;
}

const PremiumFeatureOverlay = ({ 
  children, 
  message = "This is a premium feature" 
}: PremiumFeatureOverlayProps) => {
  const navigate = useNavigate();

  return (
    <div className="relative">
      <div className="filter blur-[2px] pointer-events-none">
        {children}
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm rounded-md">
        <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
          <Lock className="h-6 w-6 text-purple-500" />
        </div>
        <div className="flex items-center mb-2 text-purple-500">
          <Star className="h-4 w-4 mr-1" fill="currentColor" />
          <span className="font-medium">Premium Feature</span>
        </div>
        <p className="text-center mb-4 font-medium text-lg max-w-xs">{message}</p>
        <Button 
          className="bg-purple-500 hover:bg-purple-600"
          onClick={() => navigate("/premium")}
        >
          Upgrade to Premium
        </Button>
      </div>
    </div>
  );
};

export default PremiumFeatureOverlay;
