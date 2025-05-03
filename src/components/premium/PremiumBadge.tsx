
import { Star } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";

interface PremiumBadgeProps {
  tooltipText?: string;
  interactive?: boolean;
}

const PremiumBadge = ({ 
  tooltipText = "Premium feature", 
  interactive = false 
}: PremiumBadgeProps) => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (interactive) {
      navigate("/premium");
    }
  };
  
  const badgeClasses = `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-500/10 text-purple-500 border border-purple-500/20 ${
    interactive ? "cursor-pointer hover:bg-purple-500/20 transition-colors" : ""
  }`;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={badgeClasses} onClick={handleClick}>
            <Star className="h-3 w-3 mr-1" fill="currentColor" />
            Premium
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default PremiumBadge;
