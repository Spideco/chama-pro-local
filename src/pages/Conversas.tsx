import { MessageCircle } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { BottomBar } from "@/components/BottomBar";

const Conversas = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar />

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center gap-3">
          <MessageCircle className="w-7 h-7 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Conversas</h1>
        </div>

        <div className="text-center py-12">
          <MessageCircle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground text-lg">
            Nenhuma conversa ainda
          </p>
          <p className="text-muted-foreground text-sm mt-2">
            Suas conversas com profissionais aparecerão aqui
          </p>
        </div>
      </main>

      <BottomBar />
    </div>
  );
};

export default Conversas;
