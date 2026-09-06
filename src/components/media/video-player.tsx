"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";

import { Icon } from "@/components/common/icon";
import { ASPECT_RATIOS, type AspectRatio } from "@/lib/image";
import { cn } from "@/lib/utils";

export interface VideoPlayerProps {
  /** Self-hosted file (mp4/webm). For YouTube/Vimeo use <VideoEmbed />. */
  src: string;
  poster?: string;
  title?: string;
  ratio?: AspectRatio;
  loop?: boolean;
  /** Autoplay muted while in view — for ambient/background footage. */
  playInView?: boolean;
  className?: string;
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

/**
 * Self-hosted video with a custom, themeable control bar. Lazy metadata, no
 * third-party player, keyboard accessible.
 */
export function VideoPlayer({
  src,
  poster,
  title,
  ratio = "video",
  loop = false,
  playInView = false,
  className,
}: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(containerRef, { amount: 0.4 });

  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(playInView);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [started, setStarted] = useState(false);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, []);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  }, []);

  // Ambient mode: play while visible, pause once it leaves the viewport.
  useEffect(() => {
    if (!playInView) return;
    const video = videoRef.current;
    if (!video) return;

    if (inView) {
      video.muted = true;
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [inView, playInView]);

  const seek = (value: number) => {
    const video = videoRef.current;
    if (!video || !duration) return;
    video.currentTime = (value / 100) * duration;
    setProgress(value);
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "group/player relative isolate overflow-hidden rounded-xl bg-black",
        ASPECT_RATIOS[ratio],
        className,
      )}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        title={title}
        loop={loop}
        playsInline
        preload="metadata"
        muted={playInView}
        onClick={togglePlay}
        onPlay={() => {
          setPlaying(true);
          setStarted(true);
        }}
        onPause={() => setPlaying(false)}
        onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
        onTimeUpdate={(event) => {
          const el = event.currentTarget;
          setProgress(el.duration ? (el.currentTime / el.duration) * 100 : 0);
        }}
        className="size-full cursor-pointer object-cover"
      />

      {/* Centre play button, shown until the first play. */}
      <AnimatePresence>
        {!started && !playInView ? (
          <motion.button
            type="button"
            onClick={togglePlay}
            aria-label={title ? `Play ${title}` : "Play video"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/25"
          >
            <span className="flex size-16 items-center justify-center rounded-full bg-white/95 text-black shadow-xl transition-transform duration-300 ease-out-expo group-hover/player:scale-110 sm:size-20">
              <Icon
                name="play"
                size="lg"
                className="translate-x-0.5 fill-current"
              />
            </span>
          </motion.button>
        ) : null}
      </AnimatePresence>

      {!playInView ? (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-linear-to-t from-black/80 to-transparent p-3 opacity-0 transition duration-300 focus-within:translate-y-0 focus-within:opacity-100 group-hover/player:translate-y-0 group-hover/player:opacity-100">
          <div className="pointer-events-auto flex items-center gap-3 text-white">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={playing ? "Pause" : "Play"}
              className="cursor-pointer rounded-full p-1.5 transition-colors hover:bg-white/20"
            >
              <Icon
                name={playing ? "pause" : "play"}
                size="sm"
                className="fill-current"
              />
            </button>

            <span className="w-10 text-xs tabular-nums">
              {formatTime((progress / 100) * duration)}
            </span>

            <input
              type="range"
              min={0}
              max={100}
              step={0.1}
              value={progress}
              onChange={(event) => seek(Number(event.target.value))}
              aria-label="Seek"
              className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-white/30 accent-white outline-none"
            />

            <span className="w-10 text-right text-xs tabular-nums">
              {formatTime(duration)}
            </span>

            <button
              type="button"
              onClick={toggleMute}
              aria-label={muted ? "Unmute" : "Mute"}
              className="cursor-pointer rounded-full p-1.5 transition-colors hover:bg-white/20"
            >
              <Icon name={muted ? "volumeOff" : "volumeOn"} size="sm" />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
