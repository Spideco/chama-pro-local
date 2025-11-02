# 🔧 ChamaPro

**ChamaPro** é um aplicativo mobile inspirado no layout e estrutura do iFood, mas voltado para conectar clientes a prestadores de serviços locais como marcenaria, elétrica, encanamento, jardinagem, costura, pintura, estética e muito mais.

## 📱 Sobre o Projeto

O ChamaPro facilita a busca por profissionais qualificados próximos à sua localização, permitindo comunicação direta, visualização de trabalhos anteriores, avaliações de clientes e solicitação de orçamentos — tudo em uma interface intuitiva e moderna.

---

## ✨ Funcionalidades Principais

### 🏠 Tela Inicial (Home)
- **Barra Superior**: Exibe a localização atual do usuário e ícones de status
- **Grid de Categorias**: 9 categorias de serviços organizadas em cards visuais:
  - Marcenaria
  - Eletricista
  - Encanador
  - Pintor
  - Costureira
  - Estética
  - Informática
  - Limpeza
  - Outros
- **Banner Promocional**: Destaque para funcionalidades ("Peça orçamentos sem compromisso")
- **Profissionais Próximos**: Lista de prestadores de serviços na sua região com foto, avaliação, distância e botão de ação

### 🔍 Busca Inteligente
- Campo de busca para encontrar serviços específicos
- Filtros por categoria, distância e avaliação
- Resultados ordenados por proximidade

### 👤 Perfil do Profissional
- Foto de capa e informações detalhadas
- Nome, especialidade e descrição dos serviços
- Sistema de avaliações com estrelas (⭐) e contagem de reviews
- Distância em relação ao usuário
- Galeria de trabalhos realizados (portfólio visual)
- Botão "Conversar Agora" para contato direto
- Opção de adicionar aos favoritos (❤️)

### 📂 Página de Categoria
- Lista todos os profissionais de uma categoria específica
- Filtros de ordenação e refinamento
- Cards com informações resumidas e acesso rápido

### 💬 Conversas
- Área para gerenciar conversas com profissionais (em desenvolvimento)
- Chat em tempo real (planejado)

### ⭐ Favoritos
- Lista de profissionais salvos pelo usuário
- Acesso rápido aos prestadores preferidos

### 👨‍💼 Perfil do Usuário
- Gerenciamento de dados pessoais (em desenvolvimento)
- Histórico de serviços contratados (planejado)
- Avaliações realizadas (planejado)

---

## 🎨 Design System

### Cores Principais
- **Azul Primário**: `#16385B` (marca, botões principais, destaques)
- **Amarelo Secundário**: `#FFC72C` (avaliações, CTAs, elementos de destaque)
- **Branco**: `#FFFFFF` (backgrounds, textos em áreas escuras)

### Gradientes
- **Hero Gradient**: Gradiente diagonal de azul para amarelo usado em banners
- **Subtle Gradient**: Transição suave de background

### Tipografia
- **Fonte Principal**: Plus Jakarta Sans (importada do Google Fonts)
- Hierarquia visual clara com tamanhos variados

### Componentes Estilizados
- **Buttons**: Variantes `default`, `secondary`, `outline`, `ghost` e `bottom-bar`
- **Cards**: Bordas arredondadas, sombras suaves
- **Inputs**: Foco em usabilidade mobile
- **Badges**: Para categorias e status

### Tokens Semânticos
Todas as cores são definidas usando HSL no `index.css` e `tailwind.config.ts`, seguindo as melhores práticas de design system para suportar temas e manutenção facilitada.

---

## 🛠️ Tecnologias Utilizadas

Este projeto utiliza tecnologias modernas para garantir performance, escalabilidade e experiência de desenvolvimento otimizada:

- **React 18.3** - Biblioteca para construção de interfaces
- **TypeScript** - Tipagem estática para maior segurança
- **Vite** - Build tool rápido e moderno
- **React Router DOM 6.30** - Roteamento SPA
- **Tailwind CSS** - Framework CSS utility-first
- **shadcn/ui** - Componentes acessíveis e customizáveis
- **Radix UI** - Primitivos de UI sem estilo
- **Lucide React** - Ícones modernos e consistentes
- **TanStack Query** - Gerenciamento de estado e cache (preparado para futuras integrações)

---

## 📁 Estrutura do Projeto

```
chama-pro-app/
├── public/
│   ├── robots.txt          # SEO e crawlers
│   └── ...
├── src/
│   ├── assets/             # Imagens e recursos estáticos
│   │   ├── electrician-banner.jpg
│   │   ├── carpenter-banner.jpg
│   │   ├── plumber-banner.jpg
│   │   └── painter-banner.jpg
│   ├── components/
│   │   ├── ui/             # Componentes shadcn/ui
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   └── ...
│   │   ├── BottomBar.tsx   # Navegação inferior
│   │   ├── TopBar.tsx      # Barra superior com localização
│   │   ├── CategoryCard.tsx # Card de categoria
│   │   └── ProfessionalCard.tsx # Card de profissional
│   ├── pages/
│   │   ├── Index.tsx       # Tela inicial
│   │   ├── Busca.tsx       # Página de busca
│   │   ├── Categoria.tsx   # Listagem por categoria
│   │   ├── Profissional.tsx # Perfil do profissional
│   │   ├── Favoritos.tsx   # Profissionais favoritos
│   │   ├── Conversas.tsx   # Chat e mensagens
│   │   ├── Perfil.tsx      # Perfil do usuário
│   │   └── NotFound.tsx    # Página 404
│   ├── hooks/              # Custom hooks
│   ├── lib/
│   │   └── utils.ts        # Utilitários (cn, etc)
│   ├── App.tsx             # Configuração de rotas
│   ├── main.tsx            # Entry point
│   └── index.css           # Estilos globais e design tokens
├── index.html
├── tailwind.config.ts      # Configuração do Tailwind
├── vite.config.ts          # Configuração do Vite
└── package.json
```

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos
- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/Spideco/chama-pro-app.git
cd chama-pro-app
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse no navegador:
```
http://localhost:5173
```

### Build para Produção

```bash
npm run build
npm run preview  # Para testar o build localmente
```

---

## 🗺️ Rotas do Aplicativo

| Rota | Componente | Descrição |
|------|-----------|-----------|
| `/` | `Index.tsx` | Tela inicial com categorias e profissionais próximos |
| `/busca` | `Busca.tsx` | Página de busca com filtros |
| `/categoria/:id` | `Categoria.tsx` | Lista de profissionais por categoria |
| `/profissional/:id` | `Profissional.tsx` | Perfil detalhado do profissional |
| `/favoritos` | `Favoritos.tsx` | Lista de profissionais favoritos |
| `/conversas` | `Conversas.tsx` | Gerenciamento de conversas |
| `/perfil` | `Perfil.tsx` | Perfil do usuário |
| `*` | `NotFound.tsx` | Página 404 |

---

## 📦 Componentes Principais

### `<TopBar />`
Barra superior com localização do usuário e ícones de status.

### `<BottomBar />`
Navegação inferior fixa com 5 seções principais (Início, Busca, Favoritos, Conversas, Perfil).

### `<CategoryCard />`
Card clicável para cada categoria de serviço com ícone e label.

### `<ProfessionalCard />`
Card de profissional exibindo:
- Foto/banner
- Nome e especialidade
- Avaliação com estrelas
- Distância
- Botão de ação

---

## 🎯 Próximos Passos (Roadmap)

### Backend e Autenticação
- [ ] Integrar Lovable Cloud (Supabase)
- [ ] Sistema de autenticação (login/registro)
- [ ] Perfis reais de profissionais e clientes

### Funcionalidades Avançadas
- [ ] Chat em tempo real entre cliente e profissional
- [ ] Sistema de geolocalização real
- [ ] Notificações push
- [ ] Sistema de pagamento integrado
- [ ] Agendamento de serviços
- [ ] Avaliações e comentários reais
- [ ] Upload de fotos de trabalhos realizados
- [ ] Sistema de orçamentos

### Melhorias de UX
- [ ] Animações e transições
- [ ] Loading states
- [ ] Error handling robusto
- [ ] Modo offline
- [ ] PWA (Progressive Web App)

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

---

## 📄 Licença

Este projeto foi desenvolvido com [Lovable](https://lovable.dev) e está disponível para uso pessoal e comercial.

---

## 🔗 Links Úteis

- **Lovable Project**: [https://lovable.dev/projects/50cac91f-a7ee-4f83-86a8-efdad6e4c31b](https://lovable.dev/projects/50cac91f-a7ee-4f83-86a8-efdad6e4c31b)
- **Documentação Lovable**: [https://docs.lovable.dev/](https://docs.lovable.dev/)
- **Repositório GitHub**: [https://github.com/Spideco/chama-pro-app](https://github.com/Spideco/chama-pro-app)

---

## 👨‍💻 Desenvolvido por

Projeto criado com ❤️ usando [Lovable](https://lovable.dev) - a plataforma que transforma ideias em aplicativos reais.
