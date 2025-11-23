import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Star, MapPin, Heart } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { TopBar } from "@/components/TopBar";
import { BottomBar } from "@/components/BottomBar";
import { ChatButton } from "@/components/ChatButton";
import { supabase } from "@/integrations/supabase/client";
import electricianBanner from "@/assets/electrician-banner.jpg";

const Profissional = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: professional, isLoading } = useQuery({
    queryKey: ['professional', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('professionals_public')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const { data: images = [] } = useQuery({
    queryKey: ['professional-images', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('professional_images')
        .select('*')
        .eq('professional_id', id)
        .order('created_at', { ascending: true });

      if (error) throw error;
      return data || [];
    },
    enabled: !!id,
  });

  const { data: reviews = [] } = useQuery({
    queryKey: ['reviews', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('reviews_public')
        .select('*')
        .eq('professional_id', id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  if (!professional) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">Profissional não encontrado</p>
          <Button onClick={() => navigate(-1)}>Voltar</Button>
        </div>
      </div>
    );
  }

  const mainImage = images[0]?.image_url || electricianBanner;

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar />

      <main className="max-w-2xl mx-auto">
        {/* Header Image */}
        <div className="relative h-64">
          <img
            src={mainImage}
            alt={professional.business_name}
            className="w-full h-full object-cover"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 rounded-full bg-background/80 backdrop-blur-sm"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 rounded-full bg-background/80 backdrop-blur-sm"
          >
            <Heart className="w-6 h-6" />
          </Button>
        </div>

        <div className="px-4 py-6 space-y-6">
          {/* Professional Info */}
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {professional.business_name}
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              {professional.category}
            </p>

            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-primary fill-primary" />
                <span className="font-bold text-lg">{(professional.rating || 0).toFixed(1)}</span>
                <span className="text-muted-foreground">
                  ({professional.total_reviews || 0} avaliações)
                </span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="w-5 h-5" />
                <span>{professional.city || "Localização não informada"}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          {professional.description && (
            <div className="bg-card rounded-2xl p-6 shadow-md">
              <h2 className="text-lg font-bold text-foreground mb-3">Sobre</h2>
              <p className="text-muted-foreground leading-relaxed">
                {professional.description}
              </p>
            </div>
          )}

          {/* Work Gallery */}
          {images.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-foreground mb-4">
                Trabalhos Realizados
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {images.map((img) => (
                  <img
                    key={img.id}
                    src={img.image_url}
                    alt={img.caption || "Trabalho realizado"}
                    className="w-full h-40 object-cover rounded-xl shadow-md"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Reviews */}
          {reviews.length > 0 && (
            <div>
              <h2 className="text-lg font-bold text-foreground mb-4">
                Avaliações
              </h2>
              <div className="space-y-3">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-card rounded-2xl p-4 shadow-md">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < (review.rating || 0)
                                ? "text-primary fill-primary"
                                : "text-muted"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(review.created_at).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    {review.comment && (
                      <p className="text-muted-foreground text-sm">
                        {review.comment}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Chat Button */}
          <ChatButton
            size="lg"
            className="w-full"
            label="Conversar Agora"
            onClick={() => navigate("/conversas")} // Placeholder action
          />
        </div>
      </main>

      <BottomBar />
    </div>
  );
};

export default Profissional;