"use client"

import { useState } from "react"
import { Play } from "lucide-react"

/**
 * Click-to-play explainer video.
 *
 * Speed notes:
 * - Only a 12 KB poster image loads with the page (lazy, below the hero).
 * - The 775 KB mp4 is not requested until the visitor presses play.
 * - The box has a fixed 16:9 ratio, so nothing jumps when the video swaps in.
 */
interface ExplainerVideoProps {
  src?: string
  poster?: string
  title?: string
}

export function ExplainerVideo({
  src = "/smarter-home-explainer.mp4",
  poster = "/smarter-home-explainer-poster.webp",
  title = "Smarter Home PH: your home, but smarter",
}: ExplainerVideoProps) {
  const [playing, setPlaying] = useState(false)

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl border bg-card">
      {playing ? (
        <video
          className="h-full w-full"
          src={src}
          poster={poster}
          controls
          autoPlay
          playsInline
          preload="auto"
          aria-label={title}
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group absolute inset-0 h-full w-full"
          aria-label={`Play video: ${title}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={poster}
            alt={title}
            width={1280}
            height={720}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
          <span className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/20" aria-hidden="true" />
          <span className="absolute left-1/2 top-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform group-hover:scale-105">
            <Play className="ml-1 h-8 w-8 fill-current" aria-hidden="true" />
          </span>
        </button>
      )}
    </div>
  )
}
