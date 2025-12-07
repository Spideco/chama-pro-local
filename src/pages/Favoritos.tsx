import { Heart, Loader2 } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { BottomBar } from "@/components/BottomBar";
import { ProfessionalCard } from "@/components/ProfessionalCard";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const Favoritos = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { data: favorites, isLoading } = useQuery({
    queryKey: ['favorites', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];
      
      // First get user's favorites
      const { data: favoritesData, error: favoritesError } = await supabase
        .from('favorites')
        .select('id, professional_id, created_at')
        .eq('user_id', user.id);

      if (favoritesError) throw favoritesError;
      if (!favoritesData || favoritesData.length === 0) return [];

      // Get professional IDs
      const professionalIds = favoritesData.map(f => f.professional_id);

      // Fetch professionals from public view
      const { data: professionals, error: profError } = await supabase
        .from('professionals_public')
        .select('*')
        .in('id', professionalIds);

      if (profError) throw profError;

      // Fetch first image for each professional
      const professionalsWithImages = await Promise.all(
        (professionals || []).map(async (prof) => {
          const { data: imageData } = await supabase
            .from('professional_images')
            .select('image_url')
            .eq('professional_id', prof.id!)
            .limit(1)
            .single();

          return {
            id: prof.id!,
            name: prof.business_name || 'Profissional',
            service: prof.category || 'Serviço',
            rating: Number(prof.rating) || 0,
            reviewCount: prof.total_reviews || 0,
            distance: prof.city || 'Local não informado',
            image: imageData?.image_url,
            favoriteId: favoritesData.find(f => f.professional_id === prof.id)?.id
          };
        })
      );

      return professionalsWithImages;
    },
    enabled: !!user?.id,
  });

  const handleRemoveFavorite = async (favoriteId: string) => {
    await supabase
      .from('favorites')
      .delete()
      .eq('id', favoriteId);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar />

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center gap-3">
          <Heart className="w-7 h-7 text-primary fill-primary" />
          <h1 className="text-2xl font-bold text-foreground">Meus Favoritos</h1>
        </div>

        <div className="space-y-3">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : !user ? (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">
                Faça login para ver seus favoritos
              </p>
            </div>
          ) : favorites && favorites.length > 0 ? (
          favorites.map((professional) => (
              <ProfessionalCard
                key={professional.id}
                name={professional.name}
                service={professional.service}
                rating={professional.rating}
                reviewCount={professional.reviewCount}
                distance={professional.distance}
                image={professional.image || ''}
                onChat={() => navigate(`/profissional/${professional.id}`)}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">
                Você ainda não tem favoritos
              </p>
              <p className="text-muted-foreground text-sm mt-2">
                Salve profissionais para acessá-los rapidamente
              </p>
            </div>
          )}
        </div>
      </main>

      <BottomBar />
    </div>
  );
};

export default Favoritos;
