import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Hammer,
  Zap,
  Wrench,
  PaintBucket,
  Scissors,
  Sparkles,
  Laptop,
  Trash2,
  MoreHorizontal,
} from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { BottomBar } from "@/components/BottomBar";
import { CategoryCard } from "@/components/CategoryCard";
import { ProfessionalCard } from "@/components/ProfessionalCard";
import electricianBanner from "@/assets/electrician-banner.jpg";
import carpenterBanner from "@/assets/carpenter-banner.jpg";
import plumberBanner from "@/assets/plumber-banner.jpg";
import painterBanner from "@/assets/painter-banner.jpg";

const categories = [
  { icon: Hammer, label: "Marcenaria", id: "marcenaria" },
  { icon: Zap, label: "Eletricista", id: "eletricista" },
  { icon: Wrench, label: "Encanador", id: "encanador" },
  { icon: PaintBucket, label: "Pintor", id: "pintor" },
  { icon: Scissors, label: "Costureira", id: "costureira" },
  { icon: Sparkles, label: "Estética", id: "estetica" },
  { icon: Laptop, label: "Informática", id: "informatica" },
  { icon: Trash2, label: "Limpeza", id: "limpeza" },
  { icon: MoreHorizontal, label: "Outros", id: "outros" },
];

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
      <TopBar location="São Paulo, SP" />

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-8">
        {/* Hero Banner */}
        <div className="gradient-hero rounded-3xl p-8 text-center shadow-lg">
          <h1 className="text-3xl font-bold text-primary-foreground mb-2">
            Bem-vindo ao ChamaPro
          </h1>
          <p className="text-primary-foreground/90 text-lg">
            Encontre profissionais próximos de você
          </p>
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
