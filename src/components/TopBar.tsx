import { MapPin, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useLocation } from "@/hooks/useLocation";
import { LocationDialog } from "@/components/LocationDialog";

export const TopBar = () => {
  const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false);
  const { location, isLoading, requestCurrentLocation, setManualLocation } = useLocation();

  return (
    <>
      <header className="sticky top-0 left-0 right-0 bg-background border-b border-border shadow-md z-40">
        <div className="flex items-center justify-between px-4 py-3 max-w-2xl mx-auto">
          <button
            onClick={() => setIsLocationDialogOpen(true)}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <MapPin className="w-5 h-5 text-primary" />
            <span className="text-sm font-bold text-foreground">
              {location.fullAddress}
            </span>
          </button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="w-5 h-5 text-foreground" />
          </Button>
        </div>
      </header>

      <LocationDialog
        open={isLocationDialogOpen}
        onOpenChange={setIsLocationDialogOpen}
        currentCity={location.city}
        currentState={location.state}
        currentStreet={location.street}
        onUseCurrentLocation={requestCurrentLocation}
        onSetManualLocation={setManualLocation}
        isLoadingLocation={isLoading}
      />
    </>
  );
};
