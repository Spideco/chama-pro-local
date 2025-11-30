import { Home, Search, Heart, MessageCircle, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const BottomBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { icon: Home, label: "Início", path: "/" },
    { icon: Search, label: "Busca", path: "/busca" },
    { icon: Heart, label: "Favoritos", path: "/favoritos" },
    { icon: MessageCircle, label: "Conversas", path: "/conversas" },
    { icon: User, label: "Perfil", path: "/perfil" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#10283c] border-t border-[#10283c]/30 shadow-2xl z-50">
      <div className="flex justify-around items-center px-2 py-2 max-w-2xl mx-auto h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Button
              key={item.path}
              variant={isActive ? "default" : "ghost"}
              size="sm"
              onClick={() => navigate(item.path)}
              className={cn(
                "flex-1 flex-col h-full gap-1 p-0 mx-1 rounded-xl text-xs font-medium transition-all duration-200",
                isActive 
                  ? "bg-primary/20 text-primary shadow-lg shadow-primary/20 hover:bg-primary/30" 
                  : "text-white/80 hover:text-white hover:bg-white/10"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "fill-primary" : "")} />
              <span className="leading-none">{item.label}</span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
};