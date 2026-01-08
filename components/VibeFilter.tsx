"use client";

interface VibeFilterProps {
  vibes: string[];
  selecionadas: string[];
  onChange: (vibes: string[]) => void;
}

export default function VibeFilter({
  vibes,
  selecionadas,
  onChange,
}: VibeFilterProps) {
  function toggleVibe(vibe: string) {
    if (selecionadas.includes(vibe)) {
      onChange(selecionadas.filter((v) => v !== vibe));
    } else {
      onChange([...selecionadas, vibe]);
    }
  }

  return (
    <div className="vibe-filter">
      <h3>Filtrar por vibe</h3>

      <div className="vibe-chips">
        {vibes.map((vibe) => {
          const ativa = selecionadas.includes(vibe);

          return (
            <button
              key={vibe}
              className={`vibe-chip ${ativa ? "active" : ""}`}
              onClick={() => toggleVibe(vibe)}
              type="button"
            >
              {vibe}
            </button>
          );
        })}
      </div>
    </div>
  );
}
