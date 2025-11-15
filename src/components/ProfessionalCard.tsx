import { Star, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChatButton } from "./ChatButton";

interface ProfessionalCardProps {
  name: string;
  service: string;
  rating: number;
  reviewCount: number;
  distance: string;
  image: string;
  onChat?: () => void;
  className?: string;
}

export const ProfessionalCard = ({
  name,
  service,
  rating,
  reviewCount,
  distance,
  image,
  onChat,
  className,
}: ProfessionalCardProps) => {
  return (
    <div
      className={cn(
        "flex gap-4 p-4 rounded-2xl bg-card shadow-md hover:shadow-lg transition-smooth",
        className
      )}
    >
      <img
        src={image}
        alt={name}
        className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
      />
      <div className="flex-1 flex flex-col gap-2">
        <div>
          <h3 className="font-bold text-foreground">{name}</h3>
          <p className="text-sm text-muted-foreground">{service}</p>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-secondary fill-secondary" />
            <span className="font-bold">{rating.toFixed(1)}</span>
            <span className="text-muted-foreground">({reviewCount})</span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span>{distance}</span>
          </div>
        </div>
        <ChatButton
          size="sm"
          onClick={onChat}
          className="mt-auto self-start"
          label="Conversar"
        />
      </div>
    </div>
  );
};