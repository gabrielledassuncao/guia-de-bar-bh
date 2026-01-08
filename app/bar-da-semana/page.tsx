import Link from "next/link";
import { bares } from "@/data/bares";
import BarCard from "@/components/BarCard";

export default function BarDaSemana() {
  // 🔥 Escolha manual do bar da semana (mock)
  const BAR_DA_SEMANA_ID = 1;

  const bar = bares.find((b) => b.id === BAR_DA_SEMANA_ID);

  if (!bar) {
    return (
      <main>
        <h1>Bar da Semana</h1>
        <p>Bar não encontrado.</p>
      </main>
    );
  }

  return (
    <main>
      <h1>🍺 Bar da Semana</h1>

      <p>
        Toda semana a gente escolhe um bar que merece destaque —
        seja pelo clima, pelo atendimento ou pelo custo-benefício.
      </p>

      <section style={{ marginTop: "24px" }}>
        <BarCard bar={bar} />
      </section>

      <section style={{ marginTop: "24px" }}>
        <h2>Por que escolhemos esse bar?</h2>

        <p>
          O <strong>{bar.nome}</strong> é aquele tipo de lugar que
          combina bem com qualquer rolê: dá pra ir em casal, reunir
          os amigos ou só sentar tranquilo pra tomar uma gelada.
        </p>

        <p>
          Fica no <strong>{bar.bairro}</strong>, tem vibe{" "}
          <strong>{bar.vibe.join(", ")}</strong> e costuma agradar
          tanto quem curte boteco raiz quanto quem prefere algo
          mais arrumadinho.
        </p>
      </section>

      <Link
        href={`/bar/${bar.id}`}
        style={{ display: "inline-block", marginTop: "24px" }}
      >
        👉 Ver página completa do bar
      </Link>
    </main>
  );
}
