"use client";

import { useEffect, useRef, useState } from "react";
import { T, useT } from "../Lang";

/**
 * Autoplaying (muted) YouTube player. Browsers block autoplay with sound, so it starts muted and the
 * visitor can switch the sound on. The iframe mounts just after first paint so it never competes with
 * the page's LCP; the thumbnail covers the gap.
 */
export default function YouTubeCard({ id, title }: { id: string; title: string }) {
  const t = useT();
  const frame = useRef<HTMLIFrameElement>(null);
  const [mount, setMount] = useState(false);
  const [ready, setReady] = useState(false);
  const [muted, setMuted] = useState(true);
  const [thumb, setThumb] = useState(`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`);

  useEffect(() => {
    const timer = setTimeout(() => setMount(true), 600);
    return () => clearTimeout(timer);
  }, []);

  const unmute = () => {
    frame.current?.contentWindow?.postMessage(JSON.stringify({ event: "command", func: muted ? "unMute" : "mute", args: "" }), "*");
    setMuted(!muted);
  };

  return (
    <figure className="relative">
      {/* offset frame behind the player */}
      <div aria-hidden className="absolute -bottom-3 -right-3 h-full w-full rounded-lg bg-primary/70 md:-bottom-4 md:-right-4" />
      <div className="relative aspect-video overflow-hidden rounded-lg bg-black shadow-xl">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumb}
          alt={title}
          loading="eager"
          fetchPriority="high"
          onError={() => setThumb(`https://i.ytimg.com/vi/${id}/hqdefault.jpg`)}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {mount && (
          <iframe
            ref={frame}
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&mute=1&loop=1&playlist=${id}&playsinline=1&rel=0&modestbranding=1&enablejsapi=1&vq=hd1080`}
            title={title}
            allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
            onLoad={() => setReady(true)}
            className={`absolute inset-0 h-full w-full border-0 transition-opacity duration-700 ${ready ? "opacity-100" : "opacity-0"}`}
          />
        )}
        {ready && (
          <button
            type="button"
            onClick={unmute}
            aria-label={muted ? t("Nyalakan suara", "Turn sound on") : t("Matikan suara", "Turn sound off")}
            className="absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-black/60 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-black/80"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M11 5 6 9H2v6h4l5 4V5Z" fill="currentColor" />
              {muted ? <path d="m22 9-6 6m0-6 6 6" /> : <path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a10 10 0 0 1 0 14" />}
            </svg>
            {muted ? <T en="Sound on">Nyalakan suara</T> : <T en="Sound off">Matikan suara</T>}
          </button>
        )}
      </div>
      <figcaption className="relative mt-7 text-sm text-muted-foreground">
        <T en="A podcast we recorded at CLAPHAM.CO.">Podcast yang pernah kami rekam di CLAPHAM.CO.</T>
      </figcaption>
    </figure>
  );
}
