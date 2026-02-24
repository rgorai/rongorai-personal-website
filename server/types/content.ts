import type { AnchorHTMLAttributes, HTMLAttributes } from 'react'
import { HtmlTag, ComponentName, MediaType } from './enums.js'

export type HtmlTagPropsMap = {
  [HtmlTag.H1]: HTMLAttributes<HTMLHeadingElement>
  [HtmlTag.H2]: HTMLAttributes<HTMLHeadingElement>
  [HtmlTag.H3]: HTMLAttributes<HTMLHeadingElement>
  [HtmlTag.P]: HTMLAttributes<HTMLParagraphElement>
  [HtmlTag.A]: AnchorHTMLAttributes<HTMLAnchorElement>
  [HtmlTag.Div]: HTMLAttributes<HTMLDivElement>
}

export type TagObject<T extends HtmlTag = HtmlTag> = {
  tag: T
  text: string | null
  props?: HtmlTagPropsMap[T]
}

export type ComponentObject = {
  component: ComponentName
  props: Record<string, unknown>
}

export type PageData = Array<TagObject | ComponentObject>

export type MediaProps = {
  Type: MediaType
  src: string
  mediaProps: Record<string, unknown>
  caption?: string
  adjustWidth?: number
}

export type MediaGridProps = {
  columns: number
  media: Array<MediaProps>
  caption?: string
}
