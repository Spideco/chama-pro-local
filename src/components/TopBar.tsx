import { MapPin, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TopBarProps {
  location?: string;
}

export const TopBar = ({ location = "São Paulo, SP" }: TopBarProps) => {
  return (
    <header className="sticky top-0 left-0 right-0 bg-background border-b border-border shadow-md z-40">
      <div className="flex items-center justify-between px-4 py-3 max-w-2xl mx-auto">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          <span className="text-sm font-bold text-foreground">{location}</span>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Bell className="w-5 h-5 text-foreground" />
        </Button>
      </div>
    </header>
  );
};
