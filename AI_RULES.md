# 🤖 Diretrizes de Desenvolvimento (AI Rules)

Este documento estabelece as regras e o stack tecnológico do projeto ChamaPro para garantir a consistência, manutenibilidade e performance do código.

## 🛠️ Stack Tecnológica

O projeto é construído com as seguintes tecnologias principais:

*   **Frontend:** React 18.3 (com Vite e TypeScript).
*   **Linguagem:** TypeScript (uso obrigatório para tipagem estática).
*   **Estilização:** Tailwind CSS (abordagem utility-first).
*   **Componentes UI:** shadcn/ui (baseado em Radix UI) para componentes acessíveis e prontos para uso.
*   **Roteamento:** React Router DOM (v6).
*   **Gerenciamento de Estado/Dados:** TanStack Query (para caching e sincronização de dados).
*   **Ícones:** Lucide React.
*   **Notificações:** Sonner (para toasts modernos) e o sistema de Toast padrão do shadcn/ui (para alertas de sistema).
*   **Design System:** Cores e tokens definidos em HSL no `src/index.css`.

## 📚 Regras de Uso de Bibliotecas

Para manter a coesão do projeto, siga estas regras ao implementar novas funcionalidades:

1.  **Componentes de UI:**
    *   **Prioridade:** Sempre utilize os componentes existentes do `shadcn/ui` (ex: `Button`, `Card`, `Input`).
    *   **Customização:** Se for necessário modificar um componente existente, crie um novo arquivo em `src/components/` e utilize os primitivos do shadcn/ui/Radix UI como base, mantendo a estrutura de classes do Tailwind.
2.  **Estilização:**
    *   **Exclusividade:** Use exclusivamente classes do Tailwind CSS para estilização.
    *   **Responsividade:** Todos os componentes devem ser responsivos (mobile-first).
    *   **Tokens:** Utilize as variáveis de cor e espaçamento definidas no `tailwind.config.ts` e `src/index.css` (ex: `bg-primary`, `text-secondary`).
3.  **Roteamento:**
    *   **Rotas:** Todas as rotas devem ser configuradas em `src/App.tsx`.
    *   **Navegação:** Use os hooks do `react-router-dom` (`useNavigate`, `useParams`, `useLocation`) para navegação e acesso a parâmetros.
4.  **Estrutura de Arquivos:**
    *   **Páginas:** Devem residir em `src/pages/`.
    *   **Componentes:** Devem residir em `src/components/`.
    *   **Hooks:** Devem residir em `src/hooks/`.
    *   **Utilitários:** Devem residir em `src/lib/`.
    *   **Regra de Ouro:** Crie um novo arquivo para cada novo componente ou hook, mesmo que pequeno.
5.  **Notificações (Toasts):**
    *   Use o componente `<Sonner />` (importado como `Sonner` em `src/App.tsx`) para mensagens de sucesso, informação ou erro que aparecem no canto da tela.
    *   Use o hook `useToast` (do shadcn/ui) para alertas de sistema mais críticos ou que exigem interação (como a notificação de erro de geolocalização).
6.  **Ícones:**
    *   Use a biblioteca `lucide-react` para todos os ícones.