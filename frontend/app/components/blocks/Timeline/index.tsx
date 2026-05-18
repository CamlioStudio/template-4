'use client'

// Invitation + Countdown — Figma node 24:2514
import { useEffect, useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import { Container } from '@/app/components/Container'
import type { TimelineBlockProps } from '@/app/components/blocks/types'
import { FlowerDecor } from '../../ui/FlowerDecor'

function getRemaining(target: Date) {
  const diff = Math.max(0, target.getTime() - Date.now())
  return {
    days:    Math.floor(diff / 86_400_000),
    hours:   Math.floor((diff % 86_400_000) / 3_600_000),
    minutes: Math.floor((diff % 3_600_000)  / 60_000),
    seconds: Math.floor((diff % 60_000)     / 1_000),
  }
}

function useCountdown(target: Date) {
  const [t, setT] = useState(() => getRemaining(target))
  useEffect(() => {
    const id = setInterval(() => setT(getRemaining(target)), 1000)
    return () => clearInterval(id)
  }, [target])
  return t
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

function renderHeadingWithScriptI(text: string) {
  // Highlight the first capital I at the start of a word (e.g. "Invited")
  const match = text.match(/^(.*?\b)(I)(\w+.*)$/)
  if (!match) return <>{text}</>
  return (
    <>
      {match[1]}
      <span className="font-script text-display not-italic ml-5">{match[2]}</span>
      {match[3]}
    </>
  )
}

export default function TimelineBlock({ heading, description, promoText, targetDate, ctaText, ctaHref, videoUrl, videoThumbnail }: TimelineBlockProps) {
  const target = new Date(targetDate)
  const { days, hours, minutes, seconds } = useCountdown(target)

  // ── Video state ────────────────────────────────────────────────────────────
  const videoRef = useRef<HTMLVideoElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showThumbnail, setShowThumbnail] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [hoverRatio, setHoverRatio] = useState<number | null>(null)

  const progress = duration > 0 ? currentTime / duration : 0

  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    setCurrentTime(video.currentTime)
    if (duration === 0) {
      const d = video.duration
      if (d && isFinite(d)) setDuration(d)
    }
  }, [duration])

  const handleLoadedMetadata = useCallback(() => {
    const d = videoRef.current?.duration
    if (d && isFinite(d)) setDuration(d)
  }, [])

  const handleDurationChange = useCallback(() => {
    const d = videoRef.current?.duration
    if (d && isFinite(d)) setDuration(d)
  }, [])

  const handleEnded = useCallback(() => {
    setIsPlaying(false)
    setCurrentTime(0)
    if (videoThumbnail) setShowThumbnail(true)
  }, [videoThumbnail])

  const handlePlayPause = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    if (isPlaying) {
      video.pause()
      setIsPlaying(false)
    } else {
      setShowThumbnail(false)
      video.play()
      setIsPlaying(true)
    }
  }, [isPlaying])

  const getRatioFromEvent = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const bar = progressBarRef.current
    if (!bar) return 0
    const rect = bar.getBoundingClientRect()
    return Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
  }, [])

  const handleProgressClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (duration === 0) return
      const seekTime = getRatioFromEvent(e) * duration
      const video = videoRef.current
      if (!video) return
      video.currentTime = seekTime
      setCurrentTime(seekTime)
    },
    [duration, getRatioFromEvent]
  )

  const handleProgressMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (duration === 0) return
      setHoverRatio(getRatioFromEvent(e))
    },
    [duration, getRatioFromEvent]
  )

  const handleProgressMouseLeave = useCallback(() => setHoverRatio(null), [])

  const units = [
    { value: days,    label: 'Days'    },
    { value: hours,   label: 'Hours'   },
    { value: minutes, label: 'Minutes' },
    { value: seconds, label: 'Seconds' },
  ]

  return (
    <section>
      {/* Video frame */}
      <div className="mx-4 sm:mx-20">
        {videoUrl ? (
          <div
            className="relative min-h-130.75 overflow-hidden rounded-2xl group"
            style={{ background: 'linear-gradient(145deg,#2a1f1a,#1a1611)' }}
          >
            {/* MP4 — preload="metadata" shows first frame as default poster */}
            <video
              ref={videoRef}
              src={videoUrl}
              className="absolute inset-0 h-full w-full object-cover"
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onDurationChange={handleDurationChange}
              onEnded={handleEnded}
              playsInline
              preload="metadata"
            />

            {/* Thumbnail overlay */}
            {showThumbnail && videoThumbnail && (
              <Image
                src={videoThumbnail}
                alt="Video invitation thumbnail"
                fill
                className="object-cover"
              />
            )}

            {/* Play / Pause button */}
            <button
              onClick={handlePlayPause}
              aria-label={isPlaying ? 'Pause' : 'Play'}
              className={[
                'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
                'size-16 md:size-25 flex items-center justify-center',
                'transition-opacity duration-200',
                !showThumbnail && isPlaying
                  ? 'opacity-0 group-hover:opacity-100 focus:opacity-100'
                  : 'opacity-100',
              ].join(' ')}
            >
              <div className="size-full rounded-full bg-white/90 flex items-center justify-center shadow-lg cursor-pointer">
                {isPlaying ? (
                  <svg width="20" height="24" viewBox="0 0 24 24" fill="none" className="md:w-8 md:h-8">
                    <rect x="5" y="4" width="4" height="16" rx="1" fill="var(--color-ink)" />
                    <rect x="15" y="4" width="4" height="16" rx="1" fill="var(--color-ink)" />
                  </svg>
                ) : (
                  <svg width="20" height="24" viewBox="0 0 32 36" fill="none" className="md:w-8 md:h-9">
                    <path d="M0 0L32 18L0 36V0Z" fill="var(--color-ink)" />
                  </svg>
                )}
              </div>
            </button>

            {/* Custom toolbar */}
            <div className="absolute bottom-3 left-4 right-4 md:bottom-5 md:left-6 md:right-6 flex flex-col gap-1.5">
              {/* Hover time tooltip */}
              <div className="relative">
                {hoverRatio !== null && duration > 0 && (
                  <div
                    className="absolute bottom-full mb-2 -translate-x-1/2 bg-black/75 text-white text-xs font-bold px-2 py-0.5 rounded pointer-events-none whitespace-nowrap"
                    style={{ left: `${hoverRatio * 100}%` }}
                  >
                    {formatTime(hoverRatio * duration)}
                  </div>
                )}
                {/* Progress bar — tall hit area, slim visual track */}
                <div
                  ref={progressBarRef}
                  role="slider"
                  aria-valuenow={Math.round(progress * 100)}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  onClick={handleProgressClick}
                  onMouseMove={handleProgressMouseMove}
                  onMouseLeave={handleProgressMouseLeave}
                  className="relative flex items-center w-full h-4 cursor-pointer"
                >
                  <div className="relative w-full h-1.5 rounded-full overflow-hidden">
                    <div className="absolute inset-0 bg-white/40" />
                    <div
                      className="absolute inset-y-0 left-0 bg-paper"
                      style={{ width: `${progress * 100}%` }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-between text-xs text-white/80 font-bold tracking-tight">
                <span>{formatTime(currentTime)}</span>
                <span>{duration > 0 ? formatTime(duration) : ''}</span>
              </div>
            </div>
          </div>
        ) : (
          /* Placeholder when no videoUrl is provided */
          <div
            className="flex min-h-130.75 items-center justify-center rounded-2xl"
            // style={{ background: 'linear-gradient(145deg,#2a1f1a,#1a1611)' }}
          >
            <div className="text-center /40">
              <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full border-2 border-paper/30">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8" aria-hidden="true">
                  <path d="M8 5.5v13l11-6.5L8 5.5z" />
                </svg>
              </div>
              <p className="text-sm">Video Invitation</p>
            </div>
          </div>
        )}
      </div>

      {/* Dark countdown section */}
      <div className="relative overflow-hidden py-20">
        <Image src="/flower-left.png" alt="" aria-hidden="true" width={347} height={410} className="pointer-events-none absolute bottom-0 left-0 opacity-60" />
        <Image src="/flower-right.png" alt="" aria-hidden="true" width={347} height={410} className="pointer-events-none absolute bottom-0 right-0 opacity-60" />

          <Container className="relative z-10 flex flex-col items-center gap-10 px-6 pt-36 text-center">
          <FlowerDecor className='translate-y-20' />
          {heading && <h2 className="font-display text-section leading-[1.1]">{renderHeadingWithScriptI(heading)}</h2>}
          {description && <p className="text-muted max-w-122">{description}</p>}
          {promoText && <p className="font-display text-[96px] leading-[1.1]">{promoText}</p>}

          <div className="mt-2 grid grid-cols-4 gap-3 sm:gap-6">
            {units.map(({ value, label }) => (
              <div
                key={label}
                className="flex bg-white min-w-18 flex-col items-center gap-1 rounded-2xl px-10 py-5"
                // style={{ background: 'rgba(255,255,255,0.08)' }}
              >
                <span className="font-display text-section leading-[1.1] ">
                  {String(value).padStart(2, '0')}
                </span>
                <span>{label}</span>
              </div>
            ))}
          </div>

          <a href={ctaHref} className="mt-2 rounded-full bg-accent px-8 py-3 text-sm text-ink transition-colors hover:bg-sand">
            {ctaText}
          </a>
        </Container>
      </div>
    </section>
  )
}
