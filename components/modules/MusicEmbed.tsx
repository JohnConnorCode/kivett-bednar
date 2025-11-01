type MusicEmbedProps = {
  provider: 'spotify' | 'bandcamp' | 'youtube'
  url: string
}

function getEmbedUrl(provider: string, url: string): string {
  if (provider === 'spotify') {
    const trackId = url.match(/track\/([a-zA-Z0-9]+)/)?.[1]
    const albumId = url.match(/album\/([a-zA-Z0-9]+)/)?.[1]
    if (trackId) return `https://open.spotify.com/embed/track/${trackId}`
    if (albumId) return `https://open.spotify.com/embed/album/${albumId}`
  }
  if (provider === 'youtube') {
    const videoId = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/)?.[1]
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url
  }
  return url
}

export function MusicEmbed({provider, url}: MusicEmbedProps) {
  const embedUrl = getEmbedUrl(provider, url)
  const height = provider === 'spotify' ? '380' : '300'

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <iframe
          src={embedUrl}
          className="w-full rounded-lg"
          height={height}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      </div>
    </section>
  )
}
