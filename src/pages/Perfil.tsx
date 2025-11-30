import { User, Settings, Star, Clock, UserPlus, LogOut } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { BottomBar } from "@/components/BottomBar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Perfil = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  
  const displayName = user?.user_metadata?.full_name || 
                     user?.email?.split('@')[0] || 
                     'Usuário';
  const email = user?.email || 'usuario@email.com';

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar />

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <div className="bg-card rounded-3xl p-6 shadow-md text-center">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <User className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-1">{displayName}</h1>
          <p className="text-muted-foreground">{email}</p>
        </div>

        <div className="space-y-3">
          <Button
            variant="default"
            className="w-full justify-start h-16 text-base"
            onClick={() => navigate("/cadastro-profissional")}
          >
            <UserPlus className="w-5 h-5 mr-3" />
            Quero ser um Profissional
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start h-16 text-base"
          >
            <Star className="w-5 h-5 mr-3" />
            Minhas Avaliações
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start h-16 text-base"
          >
            <Clock className="w-5 h-5 mr-3" />
            Histórico de Serviços
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start h-16 text-base"
          >
            <Settings className="w-5 h-5 mr-3" />
            Configurações
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start h-16 text-base"
            onClick={signOut}
          >
            <LogOut className="w-5 h-5 mr-3" />
            Sair
          </Button>
        </div>
      </main>

      <BottomBar />
    </div>
  );
};

export default Perfil;