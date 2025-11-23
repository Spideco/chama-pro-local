import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, UserPlus } from "lucide-react";
import { TopBar } from "@/components/TopBar";
import { BottomBar } from "@/components/BottomBar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageUpload } from "@/components/ImageUpload";
import { categoryOptions } from "@/lib/categories";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

// Define the schema for form validation
const professionalSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres."),
  serviceId: z.string().min(1, "Selecione um tipo de serviço."),
  about: z.string().min(20, "A descrição deve ter pelo menos 20 caracteres."),
});

type ProfessionalFormData = z.infer<typeof professionalSchema>;

const CadastroProfissional = () => {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfessionalFormData>({
    resolver: zodResolver(professionalSchema),
  });

  const handleServiceChange = (value: string) => {
    setValue("serviceId", value, { shouldValidate: true });
  };

  const handlePhotosChange = (files: File[]) => {
    setPhotos(files);
  };

  const onSubmit = async (data: ProfessionalFormData) => {
    if (photos.length === 0) {
      toast.error("Adicione pelo menos uma foto do seu trabalho.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("Usuário não autenticado");
      }

      // 1. Upload das imagens para o Supabase Storage
      const uploadedImageUrls: string[] = [];
      
      for (let i = 0; i < photos.length; i++) {
        const photo = photos[i];
        const fileExt = photo.name.split('.').pop();
        const fileName = `${user.id}/${Date.now()}-${i}.${fileExt}`;
        
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('professional-images')
          .upload(fileName, photo);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('professional-images')
          .getPublicUrl(fileName);

        uploadedImageUrls.push(publicUrl);
      }

      // 2. Inserir registro do profissional
      const { data: professionalData, error: professionalError } = await supabase
        .from('professionals')
        .insert({
          user_id: user.id,
          business_name: data.name,
          category: data.serviceId,
          description: data.about,
        })
        .select()
        .single();

      if (professionalError) throw professionalError;

      // 3. Inserir as URLs das imagens
      const imageInserts = uploadedImageUrls.map(url => ({
        professional_id: professionalData.id,
        image_url: url,
      }));

      const { error: imagesError } = await supabase
        .from('professional_images')
        .insert(imageInserts);

      if (imagesError) throw imagesError;

      // 4. Atualizar perfil do usuário para indicar que é profissional
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ is_professional: true })
        .eq('id', user.id);

      if (profileError) throw profileError;

      toast.success("Cadastro concluído com sucesso!", {
        description: "Seu perfil profissional foi criado e já está disponível.",
      });

      navigate("/perfil");
    } catch (error) {
      console.error("Erro no cadastro:", error);
      toast.error("Erro ao cadastrar profissional", {
        description: "Ocorreu um erro ao enviar o cadastro. Tente novamente.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <TopBar />

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <UserPlus className="w-6 h-6 text-primary" />
            Cadastro Profissional
          </h1>
        </div>

        <p className="text-muted-foreground text-sm">
          Preencha seus dados para começar a receber pedidos de orçamento.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Nome */}
          <div className="space-y-2">
            <Label htmlFor="name">Nome Completo / Nome Fantasia *</Label>
            <Input
              id="name"
              placeholder="Ex: João da Silva Eletricista"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Tipo de Serviço */}
          <div className="space-y-2">
            <Label htmlFor="serviceId">Tipo de Serviço *</Label>
            <Select onValueChange={handleServiceChange} name="serviceId">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione a categoria principal" />
              </SelectTrigger>
              <SelectContent>
                {categoryOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.serviceId && (
              <p className="text-sm text-destructive">{errors.serviceId.message}</p>
            )}
          </div>

          {/* Sobre */}
          <div className="space-y-2">
            <Label htmlFor="about">Sobre o Prestador (Descrição) *</Label>
            <Textarea
              id="about"
              placeholder="Descreva sua experiência, especialidades e diferenciais. Mínimo de 20 caracteres."
              rows={4}
              {...register("about")}
            />
            {errors.about && (
              <p className="text-sm text-destructive">{errors.about.message}</p>
            )}
          </div>

          {/* Fotos */}
          <ImageUpload onFilesChange={handlePhotosChange} maxFiles={4} />
          
          <div className="pt-4">
            <Button type="submit" className="w-full h-12 text-lg" disabled={isSubmitting}>
              {isSubmitting ? "Enviando..." : "Finalizar Cadastro"}
            </Button>
          </div>
          
          <p className="text-center text-xs text-muted-foreground">
            Ao finalizar, seu perfil será enviado para análise e aprovação.
          </p>
        </form>
      </main>

      <BottomBar />
    </div>
  );
};

export default CadastroProfissional;