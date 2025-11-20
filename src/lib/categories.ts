import { Hammer, Zap, Wrench, PaintBucket, Scissors, Sparkles, Laptop, Trash2, MoreHorizontal, LucideIcon } from "lucide-react";

interface Category {
  icon: LucideIcon;
  label: string;
  id: string;
}

export const categories: Category[] = [
  { icon: Hammer, label: "Marcenaria", id: "marcenaria" },
  { icon: Zap, label: "Eletricista", id: "eletricista" },
  { icon: Wrench, label: "Encanador", id: "encanador" },
  { icon: PaintBucket, label: "Pintor", id: "pintor" },
  { icon: Scissors, label: "Costureira", id: "costureira" },
  { icon: Sparkles, label: "Estética", id: "estetica" },
  { icon: Laptop, label: "Informática", id: "informatica" },
  { icon: Trash2, label: "Limpeza", id: "limpeza" },
  { icon: MoreHorizontal, label: "Outros", id: "outros" },
];

export const categoryOptions = categories.map(c => ({
  value: c.id,
  label: c.label,
}));