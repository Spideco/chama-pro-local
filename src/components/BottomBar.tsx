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
    <nav className="fixed bottom-0 left-0 right-0 bg-[#10283C] border-t border-white/20 shadow-2xl z-50">
      <div className="flex justify-around items-center px-2 py-1 max-w-2xl mx-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Button
              key={item.path}
              variant="bottom-bar"
              onClick={() => navigate(item.path)}
              className={cn(
                "text-white/80 hover:text-white active:text-primary",
                isActive && "text-primary bg-primary/20 shadow-md"
              )}
            >
              <item.icon className={cn("w-6 h-6", isActive && "text-primary shadow-md")} />
              <span className={cn("text-xs", isActive && "text-primary font-semibold")}>{item.label}</span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
};