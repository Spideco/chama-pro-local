import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search, // Importando o ícone de busca
} from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { BottomBar } from "@/components/BottomBar";
import { CategoryCard } from "@/components/CategoryCard";
import { ProfessionalCard } from "@/components/ProfessionalCard";
import electricianBanner from "@/assets/electrician-banner.jpg";
import carpenterBanner from "@/assets/carpenter-banner.jpg";
import plumberBanner from "@/assets/plumber-banner.jpg";
import { categories } from "@/lib/categories"; // Importando categorias

const mockProfessionals = [
  {
    id: 1,
    name: "Carlos Silva",
    service: "Eletricista Residencial",
    rating: 4.9,
    reviewCount: 127,
    distance: "1.2 km",
    image: electricianBanner,
  },
  {
    id: 2,
    name: "João Santos",
    service: "Marceneiro Profissional",
    rating: 4.8,
    reviewCount: 95,
    distance: "2.5 km",
    image: carpenterBanner,
  },
  {
    id: 3,
    name: "Pedro Costa",
    service: "Encanador 24h",
    rating: 4.7,
    reviewCount: 83,
    distance: "1.8 km",
    image: plumberBanner,
  },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar />

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-8">
        {/* Search Bar */}
        <div
          onClick={() => navigate("/busca")}
          className="relative cursor-pointer"
        >
          <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground">
            <Search className="w-5 h-5" />
          </div>
          <div className="flex items-center h-14 pl-12 pr-4 text-base rounded-2xl shadow-md bg-card border border-input text-muted-foreground hover:bg-muted transition-colors">
            O que você procura?
          </div>
        </div>

        {/* Categories Grid */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">Serviços</h2>
          <div className="grid grid-cols-3 gap-3">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                icon={category.icon}
                label={category.label}
                onClick={() => navigate(`/categoria/${category.id}`)}
              />
            ))}
          </div>
        </section>

        {/* Promotional Banner */}
        <div className="bg-secondary/10 border-2 border-secondary rounded-2xl p-6 text-center">
          <h3 className="font-bold text-foreground text-lg mb-1">
            🎉 Peça orçamentos sem compromisso
          </h3>
          <p className="text-muted-foreground text-sm">
            Compare preços e escolha o melhor profissional
          </p>
        </div>

        {/* Nearby Professionals */}
        <section>
          <h2 className="text-xl font-bold text-foreground mb-4">
            Profissionais próximos de você
          </h2>
          <div className="space-y-3">
            {mockProfessionals.map((professional) => (
              <ProfessionalCard
                key={professional.id}
                {...professional}
                onChat={() => navigate(`/profissional/${professional.id}`)}
              />
            ))}
          </div>
        </section>
      </main>

      <BottomBar />
    </div>
  );
};

export default Index;