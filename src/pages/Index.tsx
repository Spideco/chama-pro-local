import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { TopBar } from "@/components/TopBar";
import { BottomBar } from "@/components/BottomBar";
import { CategoryCard } from "@/components/CategoryCard";
import { ProfessionalCard } from "@/components/ProfessionalCard";
import { categories } from "@/lib/categories";
import { supabase } from "@/integrations/supabase/client";
import electricianBanner from "@/assets/electrician-banner.jpg";

const Index = () => {
  const navigate = useNavigate();

  const { data: professionals = [], isLoading } = useQuery({
    queryKey: ['professionals'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('professionals_public')
        .select('*')
        .order('rating', { ascending: false })
        .limit(10);

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
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">
              Carregando profissionais...
            </div>
          ) : professionals.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Nenhum profissional cadastrado ainda
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
            </div>
          )}
        </section>
      </main>

      <BottomBar />
    </div>
  );
};

export default Index;