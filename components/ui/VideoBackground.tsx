'use client'
/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from 'react'

export function VideoBackground({
  videoSrc,
  posterSrc,
  overlayOpacity = 0.5
}: {
  videoSrc: string
  posterSrc: string
  overlayOpacity?: number
}) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {!isMobile && (
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={posterSrc}
          className="absolute w-full h-full object-cover"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}
      {isMobile && (
        <img
          src={posterSrc}
          alt=""
          className="absolute w-full h-full object-cover"
        />
      )}
      <div
        className="absolute inset-0 bg-black"
        style={{ opacity: overlayOpacity }}
      />
    </div>
  )
}
