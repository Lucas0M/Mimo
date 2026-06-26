const timeline = [
  {
    year: "2019",
    title: "Primeiro verao",
    caption: "A foto que inaugura a memoria afetiva da capsula.",
  },
  {
    year: "2022",
    title: "Mensagem guardada",
    caption: "Uma lembranca simples, mas que muda o tom do presente.",
  },
  {
    year: "2026",
    title: "Abertura da capsula",
    caption: "A experiencia se revela com luz, som e ritmo.",
  },
];

function App() {
  return (
    <main className="min-h-screen bg-aurabox-radial text-paper">
      <section className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-between overflow-hidden px-6 py-8 sm:px-10 lg:px-12">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-[-8rem] h-80 w-80 -translate-x-1/2 rounded-full bg-ember/20 blur-3xl animate-floatSlow" />
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-gold/10 blur-3xl" />
        </div>

        <header className="relative z-10 flex items-center justify-between border-b border-white/10 pb-5">
          <div>
            <p className="text-xs uppercase tracking-[0.45em] text-mist">
              AuraBox
            </p>
            <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
              Capsula do tempo digital
            </h1>
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-gold">
            Gift mode
          </div>
        </header>

        <div className="relative z-10 grid flex-1 items-center gap-12 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div className="max-w-2xl animate-reveal">
            <p className="text-xs uppercase tracking-[0.5em] text-gold">
              Experiencia imersiva para presente
            </p>
            <h2 className="mt-5 text-5xl font-semibold leading-none tracking-tight sm:text-6xl lg:text-7xl">
              Um lacre digital com atmosfera de filme, feito para emocionar.
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-7 text-white/72 sm:text-base">
              A primeira tela convida a abrir o presente, a trilha sonora entra
              com delicadeza e a carta viva conduz a leitura no ritmo certo.
              Tudo desenhado para mobile, com contraste alto e sensação premium.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button className="rounded-full bg-paper px-6 py-3 text-sm font-semibold text-ink transition hover:bg-gold hover:text-ink">
                Abrir capsula
              </button>
              <button className="rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-paper transition hover:border-gold/40 hover:bg-white/10">
                Ver linha do tempo
              </button>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                ["Som suave", "Audio inicia com consentimento"],
                ["Scroll elegante", "Fotos e legendas com transicao limpa"],
                ["Carta viva", "Typewriter controlado"],
              ].map(([title, text]) => (
                <article
                  key={title}
                  className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-glow backdrop-blur-sm"
                >
                  <p className="text-sm font-medium text-paper">{title}</p>
                  <p className="mt-2 text-xs leading-6 text-white/62">{text}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute inset-0 rounded-[2rem] border border-gold/20 bg-white/5 blur-sm" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0e0e12]/90 p-6 shadow-glow backdrop-blur-xl">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.35em] text-mist">
                <span>Lacre digital</span>
                <span>01</span>
              </div>
              <div className="mt-6 rounded-[1.5rem] border border-gold/20 bg-gradient-to-b from-white/12 to-white/5 p-5">
                <div className="flex h-56 flex-col items-center justify-center rounded-[1.2rem] border border-dashed border-white/12 bg-[#101015] text-center">
                  <div className="mb-4 h-20 w-20 rounded-full border border-gold/30 bg-gold/10" />
                  <p className="text-sm uppercase tracking-[0.45em] text-gold">
                    Clique para abrir
                  </p>
                  <p className="mt-3 max-w-xs text-xs leading-6 text-white/58">
                    Envelope minimalista, brilho controlado e expectativa visual
                    antes da revelacao.
                  </p>
                </div>
              </div>
              <div className="mt-5 grid gap-3 text-sm text-white/75">
                <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                  <span>Audio</span>
                  <span className="text-gold">background</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-white/5 px-4 py-3">
                  <span>Presenteado</span>
                  <span className="text-gold">mobile first</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto grid max-w-7xl gap-6 px-6 pb-12 sm:px-10 lg:grid-cols-3 lg:px-12">
        {timeline.map((item) => (
          <article
            key={item.year}
            className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white/7"
          >
            <p className="text-xs uppercase tracking-[0.4em] text-gold">
              {item.year}
            </p>
            <h3 className="mt-4 text-xl font-semibold">{item.title}</h3>
            <p className="mt-3 text-sm leading-7 text-white/68">
              {item.caption}
            </p>
          </article>
        ))}
      </section>
    </main>
  );
}

export default App;
