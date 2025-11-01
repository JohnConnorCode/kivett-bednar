import {Hero} from './Hero'
import {RichText} from './RichText'
import {ImageGallery} from './ImageGallery'
import {FeatureGrid} from './FeatureGrid'
import {CtaBanner} from './CtaBanner'
import {VideoEmbed} from './VideoEmbed'
import {MusicEmbed} from './MusicEmbed'

type Module = {
  _type: string
  _key: string
  [key: string]: any
}

type Props = {
  modules?: Module[]
}

export function ModuleRenderer({modules}: Props) {
  if (!modules || modules.length === 0) {
    return null
  }

  return (
    <div className="space-y-16">
      {modules.map((module) => {
        switch (module._type) {
          case 'hero':
            return <Hero key={module._key} {...module} />
          case 'richText':
            return <RichText key={module._key} {...module} />
          case 'imageGallery':
            return <ImageGallery key={module._key} {...module} />
          case 'featureGrid':
            return <FeatureGrid key={module._key} {...module} />
          case 'ctaBanner':
            return <CtaBanner key={module._key} {...module} />
          case 'videoEmbed':
            return <VideoEmbed key={module._key} {...module} />
          case 'musicEmbed':
            return <MusicEmbed key={module._key} {...module} />
          default:
            console.warn(`Unknown module type: ${module._type}`)
            return null
        }
      })}
    </div>
  )
}
