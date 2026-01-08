export interface Bar {
  id: number;
  nome: string;
  bairro: string;
  regiao: string;
  preco: "$" | "$$" | "$$$";
  vibe: string[];
  imagem: string;
  endereco: string;
  nota: number;
  avaliacoes: number;

}

export const bares: Bar[] = [
  {
    id: 1,
    nome: "Bar do Zé",
    bairro: "Savassi",
    regiao: "Centro-Sul",
    preco: "$$$",
    vibe: ["chopp", "happy hour", "amigos"],
    imagem: "/images/bar-1.webp",
    endereco: "Rua Antônio de Albuquerque, 123 - Savassi, Belo Horizonte - MG",
    nota: 4.3,
    avaliacoes: 256,
  },

  {
    id: 2,
    nome: "Buteco da Esquina",
    bairro: "Santa Tereza",
    regiao: "Leste",
    preco: "$$$",
    vibe: ["samba", "tradicional", "raiz"],
    imagem: "/images/bar-4.jpeg",
    endereco: "Rua Paraisópolis, 738 - Santa Tereza, Belo Horizonte - MG",
    nota: 4.3,
    avaliacoes: 17,
  },
  {
    id: 3,
    nome: "Varanda BH",
    bairro: "Funcionários",
    regiao: "Centro-Sul",
    preco: "$$",
    vibe: ["casal", "tranquilo"],
    imagem: "/images/bar-2.jpg",
    endereco: "Rua dos Aimorés, 629 - Funcionários, Belo Horizonte - MG",
    nota: 4.3,
    avaliacoes: 128,
  },
  {
    id: 4,
    nome: "Copo Sujo",
    bairro: "Lagoinha",
    regiao: "Noroeste",
    preco: "$",
    vibe: ["raiz", "barato"],
    imagem: "/images/bar-3.jpeg",
    endereco: "Rua Diamantina, 492 - Lagoinha, Belo Horizonte - MG",
    nota: 4.7,
    avaliacoes: 145,
  },
  
];
export const vibesDisponiveis = [
  "chopp",
  "happy hour",
  "amigos",
  "samba",
  "tradicional",
  "raiz",
  "casal",
  "tranquilo",
  "barato",
];

