import { useState } from "react";
import { Search } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { BottomBar } from "@/components/BottomBar";
import { Input } from "@/components/ui/input";
import { ProfessionalCard } from "@/components/ProfessionalCard";
import { useNavigate } from "react-router-dom";
import electricianBanner from "@/assets/electrician-banner.jpg";
import carpenterBanner from "@/assets/carpenter-banner.jpg";

const allProfessionals = [
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
];

const Busca = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredProfessionals = allProfessionals.filter(
    (prof) =>
      prof.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prof.service.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar />

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar serviços ou profissionais..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-14 text-base rounded-2xl shadow-md"
          />
        </div>

        <div className="space-y-3">
          {filteredProfessionals.map((professional) => (
            <ProfessionalCard
              key={professional.id}
              {...professional}
              onChat={() => navigate(`/profissional/${professional.id}`)}
            />
          ))}
          {filteredProfessionals.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Nenhum resultado encontrado
              </p>
            </div>
          )}
        </div>
      </main>

      <BottomBar />
    </div>
  );
};

export default Busca;
