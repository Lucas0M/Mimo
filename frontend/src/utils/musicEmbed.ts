export type MusicEmbed =
  | { platform: "spotify"; type: string; id: string }
  | { platform: "youtube"; videoId: string }
  | null;

/**
 * Extrai os dados necessários pra montar o embed a partir da URL que o
 * usuário colou. Suporta:
 * - Spotify: track, album, playlist, artist, episode, show
 *   ex: https://open.spotify.com/track/4uLU6hMCjMI75M1A2tKUQC
 * - YouTube: vídeos normais e links curtos
 *   ex: https://www.youtube.com/watch?v=dQw4w9WgXcQ ou https://youtu.be/dQw4w9WgXcQ
 */
export function parseMusicUrl(url: string): MusicEmbed {
  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes("open.spotify.com")) {
      // path tipo: /track/4uLU6hMCjMI75M1A2tKUQC
      // O Spotify também gera links com prefixo de localização, tipo
      // /intl-pt/track/4uLU6hMCjMI75M1A2tKUQC — esses prefixos sempre
      // começam com "intl-" e devem ser ignorados antes de ler type/id.
      const segments = parsed.pathname
        .split("/")
        .filter(Boolean)
        .filter((segment) => !segment.startsWith("intl-"));
      const [type, id] = segments;
      if (type && id) {
        return { platform: "spotify", type, id };
      }
    }

    if (parsed.hostname.includes("youtube.com")) {
      const videoId = parsed.searchParams.get("v");
      if (videoId) return { platform: "youtube", videoId };
    }

    if (parsed.hostname.includes("youtu.be")) {
      const videoId = parsed.pathname.replace("/", "");
      if (videoId) return { platform: "youtube", videoId };
    }
  } catch {
    // URL inválida — retorna null e deixa o componente decidir o que mostrar
  }

  return null;
}
