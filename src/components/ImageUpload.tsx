import React, { useState, useCallback } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Camera, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ImageUploadProps {
  onFilesChange: (files: File[]) => void;
  maxFiles?: number;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onFilesChange,
  maxFiles = 4,
}) => {
  const [previews, setPreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(event.target.files || []);
    
    const currentTotal = files.length;
    const remainingSlots = maxFiles - currentTotal;

    if (newFiles.length > remainingSlots) {
      console.warn(`Limite de ${maxFiles} fotos atingido.`);
    }

    const filesToProcess = newFiles.slice(0, remainingSlots);
    
    const updatedFiles = [...files, ...filesToProcess];
    setFiles(updatedFiles);
    onFilesChange(updatedFiles);

    const newPreviews = filesToProcess.map(file => URL.createObjectURL(file));
    setPreviews(prev => [...prev, ...newPreviews]);

    // Clear input value to allow selecting the same file again if needed
    event.target.value = '';
  }, [files, maxFiles, onFilesChange]);

  const handleRemove = useCallback((index: number) => {
    setFiles(prevFiles => {
      const updatedFiles = prevFiles.filter((_, i) => i !== index);
      onFilesChange(updatedFiles);
      return updatedFiles;
    });
    setPreviews(prevPreviews => prevPreviews.filter((_, i) => i !== index));
  }, [onFilesChange]);

  const remainingSlots = maxFiles - files.length;

  return (
    <div className="space-y-3">
      <Label>Fotos do seu trabalho (Máx. {maxFiles})</Label>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {previews.map((preview, index) => (
          <div key={index} className="relative aspect-square rounded-lg overflow-hidden shadow-md">
            <img src={preview} alt={`Preview ${index + 1}`} className="w-full h-full object-cover" />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-1 right-1 h-6 w-6 rounded-full"
              onClick={() => handleRemove(index)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        
        {remainingSlots > 0 && (
          <Label
            htmlFor="file-upload"
            className={cn(
              "flex flex-col items-center justify-center aspect-square rounded-lg border-2 border-dashed border-muted-foreground/50 cursor-pointer hover:bg-muted transition-colors",
              remainingSlots === 0 && "hidden"
            )}
          >
            <Camera className="w-6 h-6 text-muted-foreground mb-1" />
            <span className="text-xs text-muted-foreground">Adicionar ({remainingSlots})</span>
            <Input
              id="file-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="sr-only"
              disabled={remainingSlots === 0}
            />
          </Label>
        )}
      </div>
    </div>
  );
};