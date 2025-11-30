'use client'

export function GrainOverlay() {
  return (
    <>
      {/* Animated film grain texture */}
      <div
        className="pointer-events-none fixed inset-0 z-[9999] opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay',
          animation: 'grain 0.5s steps(10) infinite',
        }}
      />

      {/* Vignette effect - refined intensity */}
      <div
        className="pointer-events-none fixed inset-0 z-[9998]"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, transparent 0%, transparent 50%, rgba(0,0,0,0.4) 100%)',
        }}
      />

      {/* Top gold light leak effect - subtle premium touch */}
      <div
        className="pointer-events-none fixed inset-0 z-[9997] opacity-[0.03]"
        style={{
          background: 'linear-gradient(180deg, rgba(212, 175, 55, 0.15) 0%, transparent 30%)',
        }}
      />
    </>
  )
}
