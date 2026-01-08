import { bares } from "@/data/bares";
import BarDetalhesClient from "./BarDetalhesClient";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";


/* Tipagem dos parâmetros da rota */
type Props = {
  params: { id: string };
};

/* SEO dinâmico por bar */
export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const bar = bares.find((b) => b.id === Number(params.id));

  if (!bar) {
    return {
      title: "Bar não encontrado | Guia de Bar BH",
      description: "O bar que você procura não foi encontrado.",
    };
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return {
    metadataBase: new URL(siteUrl),

    title: `${bar.nome} — ${bar.bairro} | Guia de Bar BH`,
    description: `Conheça o ${bar.nome}, bar em ${bar.bairro}, Belo Horizonte. Veja avaliações, vibes e informações.`,

    openGraph: {
      title: `${bar.nome} | Guia de Bar BH`,
      description: `Confira avaliações e detalhes do ${bar.nome}.`,
      url: `${siteUrl}/bar/${bar.id}`,
      images: [
        {
          url: `${siteUrl}${bar.imagem}`,
          width: 1200,
          height: 630,
          alt: bar.nome,
        },
      ],
      locale: "pt_BR",
      type: "article",
    },
  };
}

/* Página server */
export default function BarPage({ params }: Props) {
  const bar = bares.find((b) => b.id === Number(params.id));

  if (!bar) {
    return <p>Bar não encontrado.</p>;
  }

  return <BarDetalhesClient bar={bar} />;
}