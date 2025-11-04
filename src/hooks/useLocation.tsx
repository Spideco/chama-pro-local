import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";

interface LocationData {
  city: string;
  state: string;
  street?: string;
  fullAddress: string;
}

export const useLocation = () => {
  const [location, setLocation] = useState<LocationData>({
    city: "São Paulo",
    state: "SP",
    fullAddress: "São Paulo, SP",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [hasRequestedLocation, setHasRequestedLocation] = useState(false);

  const fetchLocationFromCoords = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&accept-language=pt-BR`
      );
      const data = await response.json();

      if (data && data.address) {
        const city = data.address.city || data.address.town || data.address.municipality || "Cidade desconhecida";
        const state = data.address.state || "";
        const street = data.address.road || data.address.suburb || "";
        
        const newLocation: LocationData = {
          city,
          state,
          street,
          fullAddress: street ? `${street}, ${city}` : `${city}, ${state}`,
        };

        setLocation(newLocation);
        localStorage.setItem("userLocation", JSON.stringify(newLocation));
        
        toast({
          title: "Localização detectada",
          description: `${newLocation.fullAddress}`,
        });
      }
    } catch (error) {
      console.error("Erro ao buscar localização:", error);
      toast({
        title: "Erro",
        description: "Não foi possível obter sua localização",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const requestCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Geolocalização não suportada",
        description: "Seu navegador não suporta geolocalização",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setHasRequestedLocation(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchLocationFromCoords(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        setIsLoading(false);
        let message = "Não foi possível obter sua localização";
        
        if (error.code === error.PERMISSION_DENIED) {
          message = "Permissão de localização negada. Ative nas configurações do navegador.";
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          message = "Localização indisponível no momento";
        } else if (error.code === error.TIMEOUT) {
          message = "Tempo esgotado ao buscar localização";
        }

        toast({
          title: "Erro",
          description: message,
          variant: "destructive",
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  const setManualLocation = (city: string, state: string, street?: string) => {
    const newLocation: LocationData = {
      city,
      state,
      street,
      fullAddress: street ? `${street}, ${city}` : `${city}, ${state}`,
    };
    setLocation(newLocation);
    localStorage.setItem("userLocation", JSON.stringify(newLocation));
  };

  useEffect(() => {
    const savedLocation = localStorage.getItem("userLocation");
    if (savedLocation) {
      try {
        setLocation(JSON.parse(savedLocation));
      } catch (e) {
        console.error("Erro ao carregar localização salva:", e);
      }
    }
  }, []);

  return {
    location,
    isLoading,
    hasRequestedLocation,
    requestCurrentLocation,
    setManualLocation,
  };
};
