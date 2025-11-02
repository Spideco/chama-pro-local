import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
  className?: string;
}

export const CategoryCard = ({ icon: Icon, label, onClick, className }: CategoryCardProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center justify-center gap-3 p-4 rounded-2xl bg-card hover:bg-muted transition-smooth shadow-md hover:shadow-lg active:scale-95",
        className
      )}
    >
      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon className="w-7 h-7 text-primary" />
      </div>
      <span className="text-sm font-bold text-foreground text-center leading-tight">
        {label}
      </span>
    </button>
  );
};
