import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, Navigation } from "lucide-react";

interface LocationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentCity: string;
  currentState: string;
  currentStreet?: string;
  onUseCurrentLocation: () => void;
  onSetManualLocation: (city: string, state: string, street?: string) => void;
  isLoadingLocation: boolean;
}

export const LocationDialog = ({
  open,
  onOpenChange,
  currentCity,
  currentState,
  currentStreet,
  onUseCurrentLocation,
  onSetManualLocation,
  isLoadingLocation,
}: LocationDialogProps) => {
  const [city, setCity] = useState(currentCity);
  const [state, setState] = useState(currentState);
  const [street, setStreet] = useState(currentStreet || "");

  const handleSave = () => {
    if (city.trim() && state.trim()) {
      onSetManualLocation(city.trim(), state.trim(), street.trim() || undefined);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Sua Localização
          </DialogTitle>
          <DialogDescription>
            Use sua localização atual ou insira manualmente para encontrar serviços próximos.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <Button
            onClick={onUseCurrentLocation}
            disabled={isLoadingLocation}
            className="w-full"
            variant="outline"
          >
            <Navigation className="w-4 h-4 mr-2" />
            {isLoadingLocation ? "Detectando..." : "Usar minha localização atual"}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Ou insira manualmente
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="street">Rua / Bairro (opcional)</Label>
              <Input
                id="street"
                placeholder="Ex: Av. Paulista, Bela Vista"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="city">Cidade *</Label>
                <Input
                  id="city"
                  placeholder="Ex: São Paulo"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="state">Estado *</Label>
                <Input
                  id="state"
                  placeholder="Ex: SP"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  maxLength={2}
                  required
                />
              </div>
            </div>
          </div>

          <Button onClick={handleSave} className="w-full" disabled={!city || !state}>
            Salvar Localização
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
