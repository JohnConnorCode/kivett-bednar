type VideoEmbedProps = {
  provider: 'youtube' | 'vimeo'
  url: string
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

export function VideoEmbed({provider, url}: VideoEmbedProps) {
  const embedUrl = getEmbedUrl(provider, url)

  return (
    <section className="container mx-auto px-4 py-8">
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
