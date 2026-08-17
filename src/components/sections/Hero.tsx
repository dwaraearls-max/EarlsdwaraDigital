"use client";

import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/data";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ArrowRight, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = async () => {
      try {
        video.muted = true;
        await video.play();
        setPlaying(true);
        setReady(true);
      } catch {
        setPlaying(false);
        setReady(true);
      }
    };

    if (video.readyState >= 2) {
      void tryPlay();
    } else {
      video.addEventListener("loadeddata", () => void tryPlay(), { once: true });
    }
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  return (
    <section className="hero-cinema relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#060b12]">
      <div className="hero-cinema__bar hero-cinema__bar--top" aria-hidden />
      <div className="hero-cinema__bar hero-cinema__bar--bottom" aria-hidden />

      <div className="hero-cinema__frame absolute inset-x-0 top-[max(4.5rem,env(safe-area-inset-top))] bottom-[clamp(2.5rem,8vh,4.5rem)] mx-auto w-[min(1400px,100%)] overflow-hidden md:top-[max(5.5rem,env(safe-area-inset-top))]">
        <video
          ref={videoRef}
          className="hero-cinema__video absolute inset-0 h-full w-full object-cover object-[center_38%]"
          src="/hero-video.mp4"
          poster="/hero-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label="Earlsdwara Digital cinematic hero video"
        />

        <div className="hero-cinema__grade absolute inset-0" aria-hidden />
        <div className="hero-cinema__vignette absolute inset-0" aria-hidden />
        <div className="hero-cinema__grain absolute inset-0" aria-hidden />

        <motion.div
          className="absolute inset-0 z-20 bg-[#060b12]"
          initial={{ opacity: 1 }}
          animate={{ opacity: ready ? 0 : 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden
        />

        {/* Video controls — movie player chrome */}
        <div className="absolute bottom-4 right-4 z-30 flex items-center gap-2 sm:bottom-5 sm:right-5">
          <button
            type="button"
            onClick={togglePlay}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/45 text-white backdrop-blur-md transition hover:bg-black/60"
            aria-label={playing ? "Pause video" : "Play video"}
          >
            {playing ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
          </button>
          <button
            type="button"
            onClick={toggleMute}
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-black/45 text-white backdrop-blur-md transition hover:bg-black/60",
            )}
            aria-label={muted ? "Unmute video" : "Mute video"}
          >
            {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
          </button>
        </div>
      </div>

      <div className="relative z-10 mx-auto flex w-[min(1100px,92%)] flex-col items-center px-2 pb-8 pt-28 text-center sm:pt-32 md:items-start md:pb-12 md:pt-36 md:text-left">
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.4em" }}
          animate={{ opacity: 1, letterSpacing: "0.28em" }}
          transition={{ duration: 1.1, delay: 0.5 }}
          className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-[#e0c08a] sm:mb-5 sm:text-xs"
        >
          Now playing · Earlsdwara Digital
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="hero-cinema__title font-display text-4xl font-semibold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {siteConfig.name}
        </motion.p>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          className="my-5 h-px w-24 origin-left bg-gradient-to-r from-[#e0c08a] via-[#c9a46c] to-transparent md:w-32"
          aria-hidden
        />

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1 }}
          className="max-w-2xl font-display text-xl font-medium leading-[1.25] tracking-tight text-white/85 sm:text-2xl md:text-3xl lg:text-[2.4rem]"
        >
          We Build Websites That{" "}
          <span className="text-[#e0c08a]">Grow Businesses.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="mt-4 max-w-xl text-sm leading-relaxed text-white/70 sm:mt-5 sm:text-base"
        >
          Premium websites that convert visitors into customers—crafted for brands that refuse to look average.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.45 }}
          className="mt-8 flex w-full max-w-md flex-col items-stretch gap-3 sm:mt-10 sm:w-auto sm:max-w-none sm:flex-row"
        >
          <Button href="/#contact" className="w-full min-w-[200px] sm:w-auto">
            Get My Website <ArrowRight size={16} />
          </Button>
          <Button
            href="/#portfolio"
            variant="secondary"
            className="w-full min-w-[200px] border-white/25 bg-white/10 text-white hover:bg-white/20 sm:w-auto"
          >
            View Portfolio
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.65, duration: 0.8 }}
          className="mt-7 text-[11px] uppercase tracking-[0.22em] text-white/55 sm:mt-8 sm:text-xs"
        >
          {siteConfig.tagline}
        </motion.p>
      </div>
    </section>
  );
}
