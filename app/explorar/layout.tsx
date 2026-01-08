import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Explorar bares em BH | Guia de Bar BH",
  description:
    "Explore bares em Belo Horizonte por vibe, preço, região e avaliação.",
};

export default function ExplorarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
