import { Heart } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { BottomBar } from "@/components/BottomBar";
import { ProfessionalCard } from "@/components/ProfessionalCard";
import { useNavigate } from "react-router-dom";
import electricianBanner from "@/assets/electrician-banner.jpg";

// Removendo dados estáticos
// const favoriteProfessionals = [
//   {
//     id: 1,
//     name: "Carlos Silva",
//     service: "Eletricista Residencial",
//     rating: 4.9,
//     reviewCount: 127,
//     distance: "1.2 km",
//     image: electricianBanner,
//   },
// ];

const Favoritos = () => {
  const navigate = useNavigate();

  // Removendo dados estáticos
  // const favoriteProfessionals = [];

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar />

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center gap-3">
          <Heart className="w-7 h-7 text-primary fill-primary" />
          <h1 className="text-2xl font-bold text-foreground">Meus Favoritos</h1>
        </div>

        <div className="space-y-3">
          {/* Removendo dados estáticos */}
          {/* {favoriteProfessionals.map((professional) => (
            <ProfessionalCard
              key={professional.id}
              {...professional}
              onChat={() => navigate(`/profissional/${professional.id}`)}
            />
          ))} */}
          {/* Exibindo mensagem caso não haja favoritos */}
          {[]?.length === 0 && (
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