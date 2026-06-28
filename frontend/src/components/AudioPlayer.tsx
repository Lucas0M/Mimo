import { useRef, useState, useEffect } from "react";

interface AudioPlayerProps {
  src: string;
  /**
   * Se true, a música começa a tocar automaticamente no primeiro
   * clique/toque do usuário em QUALQUER lugar da página — não apenas
   * no botão de play. Isso contorna parte da restrição de autoplay dos
   * navegadores, que bloqueiam som automático mas liberam reprodução
   * disparada por um gesto do usuário, mesmo que esse gesto não tenha
   * sido diretamente no player.
   */
  autoPlayOnFirstInteraction?: boolean;
}

/**
 * Player de áudio customizado para arquivos mp3 enviados pelo próprio
 * usuário. Diferente do embed do Spotify/YouTube (iframe de terceiro,
 * visual fixo), aqui controlamos 100% do HTML — porque é nossa própria
 * tag <audio>, sem sandbox de outro domínio no meio.
 */
export default function AudioPlayer({ src, autoPlayOnFirstInteraction = false }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  // Toca a música no primeiro clique/toque em qualquer lugar da página.
  // Só dispara uma vez; se o usuário já pausou manualmente depois, não
  // tentamos retocar em cliques seguintes.
  useEffect(() => {
    if (!autoPlayOnFirstInteraction) return;

    function handleFirstInteraction() {
      const audio = audioRef.current;
      if (!audio) return;
      audio.play().then(() => setIsPlaying(true)).catch(() => {
        // navegador recusou mesmo assim (raro) — usuário ainda pode
        // dar play manualmente pelo botão
      });
    }

    document.addEventListener("click", handleFirstInteraction, { once: true });
    document.addEventListener("touchstart", handleFirstInteraction, { once: true });

    return () => {
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, [autoPlayOnFirstInteraction]);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      // play() retorna uma Promise — navegadores exigem que essa chamada
      // venha de uma interação direta do usuário (clique), o que já
      // é o caso aqui, então não precisa de tratamento especial de autoplay
      audio.play();
    }
    setIsPlaying(!isPlaying);
  }

  function handleSeek(e: React.ChangeEvent<HTMLInputElement>) {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = Number(e.target.value);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  }

  function handleVolumeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const audio = audioRef.current;
    if (!audio) return;
    const newVolume = Number(e.target.value);
    audio.volume = newVolume;
    setVolume(newVolume);
  }

  function formatTime(seconds: number) {
    if (!Number.isFinite(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
      <audio ref={audioRef} src={src} preload="metadata" />

      <div className="flex items-center gap-4">
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? "Pausar" : "Tocar"}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-rose-600 text-white hover:bg-rose-500 transition"
        >
          {isPlaying ? (
            // ícone de pause
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
              <rect x="2" y="1" width="4" height="12" />
              <rect x="8" y="1" width="4" height="12" />
            </svg>
          ) : (
            // ícone de play
            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
              <path d="M2 1 L13 7 L2 13 Z" />
            </svg>
          )}
        </button>

        <div className="flex-1 space-y-1">
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1 rounded-full bg-zinc-700 accent-rose-500"
          />
          <div className="flex justify-between text-xs text-zinc-500">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {/* ícone de volume — muda levemente conforme o nível, sem precisar de lib de ícones */}
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="text-zinc-500"
          >
            <path d="M2 6h2.5L8 3v10L4.5 10H2V6Z" />
            {volume > 0.05 && <path d="M10.5 5.5a3 3 0 0 1 0 5" stroke="currentColor" strokeWidth="1.2" fill="none" />}
          </svg>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={volume}
            onChange={handleVolumeChange}
            aria-label="Volume"
            className="w-16 h-1 rounded-full bg-zinc-700 accent-rose-500"
          />
        </div>
      </div>
    </div>
  );
}
