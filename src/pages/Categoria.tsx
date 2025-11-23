import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { TopBar } from "@/components/TopBar";
import { BottomBar } from "@/components/BottomBar";
import { ProfessionalCard } from "@/components/ProfessionalCard";
import { supabase } from "@/integrations/supabase/client";
import electricianBanner from "@/assets/electrician-banner.jpg";
import { categories } from "@/lib/categories";

const Categoria = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const category = categories.find(c => c.id === id);
  const categoryTitle = category?.label || "Serviços";

  const { data: professionals = [], isLoading } = useQuery({
    queryKey: ['professionals', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('professionals_public')
        .select('*')
        .eq('category', id)
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
    enabled: !!id,
  });

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
            {categoryTitle}
          </h1>
        </div>

        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">
            Carregando profissionais...
          </div>
        ) : (
          <div className="space-y-3">
            {professionals.map((professional) => (
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
            {professionals.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  Nenhum profissional encontrado nesta categoria
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

export default Categoria;
