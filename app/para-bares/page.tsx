import Link from "next/link";

export default function ParaBares() {
  return (
    <main className="pagina-institucional">
      <h1>🍺 Para Bares</h1>

      <p>
        O <strong>Guia de Bar BH</strong> ajuda pessoas a encontrarem
        bares de acordo com o que elas estão procurando: happy hour,
        música ao vivo, rolê em casal ou aquele boteco raiz.
      </p>

      <p>
        Se você é dono de bar em Belo Horizonte, aqui é a chance de
        colocar seu estabelecimento na rota de quem realmente
        quer sair de casa.
      </p>

      <section style={{ marginTop: "32px" }}>
        <h2>🚀 Por que estar no Guia de Bar BH?</h2>

        <ul>
          <li>📍 Seu bar aparece para quem está perto</li>
          <li>⭐ Destaque por avaliação e ranking</li>
          <li>🎯 Público segmentado por vibe e preço</li>
          <li>📱 Presença digital simples e direta</li>
        </ul>
      </section>

      <section style={{ marginTop: "32px" }}>
        <h2>💼 Como funciona?</h2>

        <p>
          Em um primeiro momento, fazemos a curadoria dos bares
          participantes e destacamos aqueles que oferecem uma boa
          experiência para o público.
        </p>

        <p>
          No futuro, teremos planos de destaque, campanhas e
          ações patrocinadas — sempre mantendo a experiência do
          usuário em primeiro lugar.
        </p>
      </section>

      <section style={{ marginTop: "32px" }}>
        <h2>📲 Quer seu bar aqui?</h2>

        <p>
          Entre em contato com a gente e vamos conversar sobre como
          colocar seu bar no Guia de Bar BH.
        </p>

        <p>
          📧 <strong>contato@guiadebarbh.com.br</strong>
        </p>

        <p>
          📸 Instagram:{" "}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            @guiadebarbh
          </a>
        </p>
      </section>

      <Link
        href="/explorar"
        style={{ display: "inline-block", marginTop: "40px" }}
      >
        ← Voltar para explorar bares
      </Link>
    </main>
  );
}
