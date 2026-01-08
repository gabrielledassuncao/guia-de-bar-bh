import "./globals.css";
import Header from "@/components/Header";
import { AuthProvider } from "@/context/AuthContext";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: "Guia de Bar BH — Encontre o bar perfeito em Belo Horizonte",
  description:
    "Descubra bares em Belo Horizonte por vibe, região, preço e avaliações.",
  openGraph: {
    title: "Guia de Bar BH",
    description:
      "Encontre bares em BH do jeito certo: por vibe, região e avaliação.",
    siteName: "Guia de Bar BH",
    images: [
      {
        url: "/images/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Guia de Bar BH",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>
        <AuthProvider>
          <Header />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
