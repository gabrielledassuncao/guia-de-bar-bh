import { bares } from "@/data/bares";
import BarCard from "@/components/BarCard";

export default function TopBares() {
  // Ordena bares pela nota (maior primeiro)
  const baresOrdenados = [...bares]
    .sort((a, b) => b.nota - a.nota)
    .slice(0, 5); // Top 5

  return (
    <main>
      <h1>⭐ Top Bares de BH</h1>
      <p>Os bares mais bem avaliados da cidade.</p>

      <div className="bars-grid">
        {baresOrdenados.map((bar, index) => (
          <div key={bar.id}>
            <strong>{index + 1}º lugar</strong>
            <BarCard bar={bar} />
          </div>
        ))}
      </div>
    </main>
  );
}
