import { parseMusicUrl } from "../utils/musicEmbed";

interface MusicPlayerProps {
  songUrl: string;
}

/**
 * Renderiza o player oficial (iframe) do Spotify ou YouTube, baseado na URL.
 * Não há autoplay com som por política dos navegadores — o usuário precisa
 * clicar em play manualmente, o que é uma limitação da plataforma, não nossa.
 */
export default function MusicPlayer({ songUrl }: MusicPlayerProps) {
  const embed = parseMusicUrl(songUrl);

  if (!embed) {
    // Fallback caso a URL não seja reconhecida — ainda funciona como link
    return (
      <a
        href={songUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-block rounded-full border border-rose-900/40 bg-rose-950/20 px-6 py-3 text-sm font-bold text-rose-300 hover:bg-rose-950/40"
      >
        🎵 Ouvir nossa música
      </a>
    );
  }

  if (embed.platform === "spotify") {
    // height 152 é o formato compacto recomendado pelo Spotify para faixas
    // únicas; para album/playlist o formato com mais espaço (352) fica melhor
    const height = embed.type === "track" ? 152 : 352;

    return (
      <iframe
        title="Player do Spotify"
        src={`https://open.spotify.com/embed/${embed.type}/${embed.id}?utm_source=generator`}
        width="100%"
        height={height}
        frameBorder="0"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        className="rounded-xl"
      />
    );
  }

  return (
    <iframe
      title="Player do YouTube"
      src={`https://www.youtube.com/embed/${embed.videoId}`}
      width="100%"
      height={215}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      loading="lazy"
      className="rounded-xl"
    />
  );
}
