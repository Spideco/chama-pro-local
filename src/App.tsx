import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Busca from "./pages/Busca";
import Favoritos from "./pages/Favoritos";
import Conversas from "./pages/Conversas";
import Perfil from "./pages/Perfil";
import Categoria from "./pages/Categoria";
import Profissional from "./pages/Profissional";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/busca" element={<Busca />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/conversas" element={<Conversas />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/categoria/:id" element={<Categoria />} />
          <Route path="/profissional/:id" element={<Profissional />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
