import {Hero} from './Hero'
import {RichText} from './RichText'
import {ImageGallery} from './ImageGallery'
import {FeatureGrid} from './FeatureGrid'
import {CtaBanner} from './CtaBanner'
import {VideoEmbed} from './VideoEmbed'
import {MusicEmbed} from './MusicEmbed'
import {Testimonials} from './Testimonials'
import {FAQ} from './FAQ'
import {dataAttr} from '@/sanity/lib/utils'

type Module = {
  _type: string
  _key: string
  [key: string]: any
}

type Props = {
  modules?: Module[]
  pageId?: string
  pageType?: string
  fieldPath?: string
}

export function ModuleRenderer({modules, pageId, pageType, fieldPath = 'modules'}: Props) {
  if (!modules || modules.length === 0) {
    return null
  }

  return (
    <div className="space-y-16">
      {modules.map((module) => {
        const wrapperAttr =
          pageId && pageType
            ? dataAttr({id: pageId, type: pageType, path: `${fieldPath}[_key=="${module._key}"]`}).toString()
            : undefined
        switch (module._type) {
          case 'hero':
            return (
              <div key={module._key} {...(wrapperAttr ? {'data-sanity': wrapperAttr} : {})}>
                <Hero {...(module as any)} />
              </div>
            )
          case 'richText':
            return (
              <div key={module._key} {...(wrapperAttr ? {'data-sanity': wrapperAttr} : {})}>
                <RichText {...(module as any)} />
              </div>
            )
          case 'imageGallery':
            return (
              <div key={module._key} {...(wrapperAttr ? {'data-sanity': wrapperAttr} : {})}>
                <ImageGallery {...(module as any)} />
              </div>
            )
          case 'featureGrid':
            return (
              <div key={module._key} {...(wrapperAttr ? {'data-sanity': wrapperAttr} : {})}>
                <FeatureGrid {...(module as any)} />
              </div>
            )
          case 'ctaBanner':
            return (
              <div key={module._key} {...(wrapperAttr ? {'data-sanity': wrapperAttr} : {})}>
                <CtaBanner {...(module as any)} />
              </div>
            )
          case 'videoEmbed':
            return (
              <div key={module._key} {...(wrapperAttr ? {'data-sanity': wrapperAttr} : {})}>
                <VideoEmbed {...(module as any)} />
              </div>
            )
          case 'musicEmbed':
            return (
              <div key={module._key} {...(wrapperAttr ? {'data-sanity': wrapperAttr} : {})}>
                <MusicEmbed {...(module as any)} />
              </div>
            )
          case 'testimonials':
            return (
              <div key={module._key} {...(wrapperAttr ? {'data-sanity': wrapperAttr} : {})}>
                <Testimonials {...(module as any)} />
              </div>
            )
          case 'faq':
            return (
              <div key={module._key} {...(wrapperAttr ? {'data-sanity': wrapperAttr} : {})}>
                <FAQ {...(module as any)} />
              </div>
            )
      default:
        console.warn(`Unknown module type: ${module._type}`)
        return null
        }
      })}
    </div>
  )
}
