import SearchBar from "@/components/SearchBar";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>
          BH tem o bar. <br />
          A gente tem o mapa. 🍻
        </h1>

        <p>
          Descubra bares em BH do jeito certo: por vibe, região ou necessidade.
        </p>

        <SearchBar />
      </div>
    </section>
  );
}
