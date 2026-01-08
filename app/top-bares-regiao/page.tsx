import { bares } from "@/data/bares";
import BarCard from "@/components/BarCard";

export default function TopBaresPorRegiao() {
  // Agrupa bares por região
  const baresPorRegiao = bares.reduce((acc, bar) => {
    if (!acc[bar.regiao]) {
      acc[bar.regiao] = [];
    }
    acc[bar.regiao].push(bar);
    return acc;
  }, {} as Record<string, typeof bares>);

  return (
    <main>
      <h1>⭐ Top Bares por Região</h1>
      <p>Os bares mais bem avaliados de cada região de BH.</p>

      {Object.entries(baresPorRegiao).map(([regiao, lista]) => {
        const topDaRegiao = [...lista]
          .sort((a, b) => b.nota - a.nota)
          .slice(0, 3); // Top 3 por região

        return (
          <section key={regiao} style={{ marginBottom: "40px" }}>
            <h2>{regiao}</h2>

            <div className="bars-grid">
              {topDaRegiao.map((bar, index) => (
                <div key={bar.id}>
                  <strong>{index + 1}º lugar</strong>
                  <BarCard bar={bar} />
                </div>
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}
