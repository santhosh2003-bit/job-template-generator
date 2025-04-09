
import { useEffect, useState } from "react";

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  color: string;
}

export const BubbleBackground = () => {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  
  useEffect(() => {
    // Generate initial bubbles
    const colors = [
      "rgba(155, 135, 245, 0.3)", // Primary color with opacity
      "rgba(214, 188, 250, 0.2)", // Light purple
      "rgba(229, 222, 255, 0.15)", // Soft purple
    ];
    
    const initialBubbles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 100 + 20,
      speed: Math.random() * 0.5 + 0.1,
      opacity: Math.random() * 0.3 + 0.1,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    
    setBubbles(initialBubbles);
    
    // Animation loop
    const interval = setInterval(() => {
      setBubbles(prevBubbles => 
        prevBubbles.map(bubble => ({
          ...bubble,
          y: bubble.y - bubble.speed,
          // Reset bubble position when it goes off the top of the screen
          ...(bubble.y < -10 ? { 
            y: 110, 
            x: Math.random() * 100,
            size: Math.random() * 100 + 20,
            speed: Math.random() * 0.5 + 0.1,
            opacity: Math.random() * 0.3 + 0.1,
          } : {})
        }))
      );
    }, 50);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          className="absolute rounded-full"
          style={{
            left: `${bubble.x}%`,
            top: `${bubble.y}%`,
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            opacity: bubble.opacity,
            background: bubble.color,
            filter: "blur(4px)",
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </div>
  );
};

export default BubbleBackground;
