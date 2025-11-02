import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TopBar } from "@/components/TopBar";
import { BottomBar } from "@/components/BottomBar";
import { ProfessionalCard } from "@/components/ProfessionalCard";
import electricianBanner from "@/assets/electrician-banner.jpg";
import carpenterBanner from "@/assets/carpenter-banner.jpg";
import plumberBanner from "@/assets/plumber-banner.jpg";

const categoryData: Record<string, { title: string; professionals: any[] }> = {
  eletricista: {
    title: "Eletricistas",
    professionals: [
      {
        id: 1,
        name: "Carlos Silva",
        service: "Eletricista Residencial",
        rating: 4.9,
        reviewCount: 127,
        distance: "1.2 km",
        image: electricianBanner,
      },
    ],
  },
  marcenaria: {
    title: "Marceneiros",
    professionals: [
      {
        id: 2,
        name: "João Santos",
        service: "Marceneiro Profissional",
        rating: 4.8,
        reviewCount: 95,
        distance: "2.5 km",
        image: carpenterBanner,
      },
    ],
  },
  encanador: {
    title: "Encanadores",
    professionals: [
      {
        id: 3,
        name: "Pedro Costa",
        service: "Encanador 24h",
        rating: 4.7,
        reviewCount: 83,
        distance: "1.8 km",
        image: plumberBanner,
      },
    ],
  },
};

const Categoria = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const category = categoryData[id || ""] || {
    title: "Serviços",
    professionals: [],
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar />

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/")}
            className="rounded-full"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">
            {category.title}
          </h1>
        </div>

        <div className="space-y-3">
          {category.professionals.map((professional) => (
            <ProfessionalCard
              key={professional.id}
              {...professional}
              onChat={() => navigate(`/profissional/${professional.id}`)}
            />
          ))}
          {category.professionals.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Nenhum profissional encontrado nesta categoria
              </p>
            </div>
          )}
        </div>
      </main>

      <BottomBar />
    </div>
  );
};

export default Categoria;
