type VideoEmbedProps = {
  provider: 'youtube' | 'vimeo'
  url: string
  backgroundVariant?: string
  sectionPadding?: string
}

function getEmbedUrl(provider: string, url: string): string {
  if (provider === 'youtube') {
    const videoId = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/)?.[1]
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url
  }
  if (provider === 'vimeo') {
    const videoId = url.match(/vimeo\.com\/(\d+)/)?.[1]
    return videoId ? `https://player.vimeo.com/video/${videoId}` : url
  }
  return url
}

function sectionClasses(variant?: string, pad?: string) {
  const bg =
    variant === 'surface' ? 'bg-surface' :
    variant === 'surface-elevated' ? 'bg-surface-elevated' :
    variant === 'dark-gradient' ? 'bg-gradient-to-b from-background via-surface to-surface-elevated' :
    ''
  const py =
    pad === 'none' ? 'py-0' :
    pad === 'sm' ? 'py-8' :
    pad === 'md' ? 'py-16' :
    pad === 'lg' ? 'py-24' :
    pad === 'xl' ? 'py-32' :
    'py-16'
  return `${bg} ${py}`.trim()
}

export function VideoEmbed({provider, url, backgroundVariant, sectionPadding}: VideoEmbedProps) {
  const embedUrl = getEmbedUrl(provider, url)

  return (
    <section className={`container mx-auto px-4 ${sectionClasses(backgroundVariant, sectionPadding)}`}>
      <div className="aspect-video max-w-4xl mx-auto">
        <iframe
          src={embedUrl}
          className="w-full h-full rounded-lg"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </section>
  )
}
