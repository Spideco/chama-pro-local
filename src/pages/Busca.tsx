import { useState } from "react";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { TopBar } from "@/components/TopBar";
import { BottomBar } from "@/components/BottomBar";
import { Input } from "@/components/ui/input";
import { ProfessionalCard } from "@/components/ProfessionalCard";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import electricianBanner from "@/assets/electrician-banner.jpg";

const Busca = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const { data: allProfessionals = [], isLoading } = useQuery({
    queryKey: ['professionals-search'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('professionals_public')
        .select('*')
        .order('rating', { ascending: false });

      if (error) throw error;

      // Buscar primeira imagem de cada profissional
      const professionalsWithImages = await Promise.all(
        (data || []).map(async (prof) => {
          const { data: images } = await supabase
            .from('professional_images')
            .select('image_url')
            .eq('professional_id', prof.id)
            .limit(1)
            .single();

          return {
            ...prof,
            image: images?.image_url || electricianBanner,
          };
        })
      );

      return professionalsWithImages;
    },
  });

  const filteredProfessionals = allProfessionals.filter(
    (prof) =>
      prof.business_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prof.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (prof.description && prof.description.toLowerCase().includes(searchQuery.toLowerCase()))
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

        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">
            Carregando...
          </div>
        ) : (
          <div className="space-y-3">
            {filteredProfessionals.map((professional) => (
              <ProfessionalCard
                key={professional.id}
                name={professional.business_name}
                service={professional.category}
                rating={professional.rating || 0}
                reviewCount={professional.total_reviews || 0}
                distance={professional.city || "Localização não informada"}
                image={professional.image}
                onChat={() => navigate(`/profissional/${professional.id}`)}
              />
            ))}
            {filteredProfessionals.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  {searchQuery ? "Nenhum resultado encontrado" : "Digite algo para buscar"}
                </p>
              </div>
            )}
          </div>
        )}
      </main>

      <BottomBar />
    </div>
  );
};

export default Busca;
