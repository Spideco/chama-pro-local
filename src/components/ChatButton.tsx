import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react";

const chatButtonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
        chip: "bg-card border-2 border-border text-foreground hover:bg-muted shadow-sm", // Novo estilo
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-full px-3",
        lg: "h-14 rounded-full px-8 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ChatButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof chatButtonVariants> {
  asChild?: boolean;
  label?: string;
}

const ChatButton = React.forwardRef<HTMLButtonElement, ChatButtonProps>(
  ({ className, variant, size, asChild = false, label = "Conversar", ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    
    // Determina a cor do ícone: primary (amarelo) se for chip, ou primary-foreground (branco/escuro) se for default/secondary
    const iconColorClass = variant === 'chip' ? 'text-primary' : 'text-primary-foreground';
    
    // Se o variant for 'default', ele já tem o fundo primário (azul escuro no dark mode)
    const currentVariant = variant || 'default';

    return (
      <Comp
        className={cn(chatButtonVariants({ variant: currentVariant, size }), className, "shadow-md")}
        ref={ref}
        {...props}
      >
        <MessageCircle className={cn("w-4 h-4 mr-2", size === "lg" && "w-6 h-6", iconColorClass)} />
        {label}
      </Comp>
    );
  }
);
ChatButton.displayName = "ChatButton";

export { ChatButton, chatButtonVariants };