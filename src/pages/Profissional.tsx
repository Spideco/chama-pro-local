import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, Star, MapPin, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TopBar } from "@/components/TopBar";
import { BottomBar } from "@/components/BottomBar";
import { ChatButton } from "@/components/ChatButton";
import electricianBanner from "@/assets/electrician-banner.jpg";
import carpenterBanner from "@/assets/carpenter-banner.jpg";
import plumberBanner from "@/assets/plumber-banner.jpg";
import painterBanner from "@/assets/painter-banner.jpg";

const professionalData: Record<string, any> = {
  "1": {
    name: "Carlos Silva",
    service: "Eletricista Residencial",
    rating: 4.9,
    reviewCount: 127,
    distance: "1.2 km",
    image: electricianBanner,
    description:
      "Especialista em instalações elétricas residenciais e comerciais. Mais de 10 anos de experiência.",
    workImages: [electricianBanner, carpenterBanner, plumberBanner, painterBanner],
  },
  "2": {
    name: "João Santos",
    service: "Marceneiro Profissional",
    rating: 4.8,
    reviewCount: 95,
    distance: "2.5 km",
    image: carpenterBanner,
    description:
      "Móveis planejados e sob medida. Trabalho com madeira de qualidade e acabamento impecável.",
    workImages: [carpenterBanner, electricianBanner, painterBanner],
  },
  "3": {
    name: "Pedro Costa",
    service: "Encanador 24h",
    rating: 4.7,
    reviewCount: 83,
    distance: "1.8 km",
    image: plumberBanner,
    description:
      "Atendimento 24 horas para emergências. Desentupimento, vazamentos e instalações.",
    workImages: [plumberBanner, electricianBanner, carpenterBanner],
  },
};

const Profissional = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const professional = professionalData[id || "1"];

  if (!professional) {
    return <div>Profissional não encontrado</div>;
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar />

      <main className="max-w-2xl mx-auto">
        {/* Header Image */}
        <div className="relative h-64">
          <img
            src={professional.image}
            alt={professional.name}
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
              {professional.name}
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              {professional.service}
            </p>

            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-secondary fill-secondary" />
                <span className="font-bold text-lg">{professional.rating}</span>
                <span className="text-muted-foreground">
                  ({professional.reviewCount} avaliações)
                </span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground">
                <MapPin className="w-5 h-5" />
                <span>{professional.distance}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-card rounded-2xl p-6 shadow-md">
            <h2 className="text-lg font-bold text-foreground mb-3">Sobre</h2>
            <p className="text-muted-foreground leading-relaxed">
              {professional.description}
            </p>
          </div>

          {/* Work Gallery */}
          <div>
            <h2 className="text-lg font-bold text-foreground mb-4">
              Trabalhos Realizados
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {professional.workImages.map((img: string, idx: number) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Trabalho ${idx + 1}`}
                  className="w-full h-40 object-cover rounded-xl shadow-md"
                />
              ))}
            </div>
          </div>

          {/* Chat Button */}
          <ChatButton
            size="lg"
            className="w-full"
            label="Conversar Agora"
            onClick={() => navigate("/conversas")}
          />
        </div>
      </main>

      <BottomBar />
    </div>
  );
};

export default Profissional;