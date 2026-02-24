import type { AnchorHTMLAttributes } from 'react'
import { HtmlTag, ComponentName } from '../types/enums.js'
import type {
  HtmlTagPropsMap,
  TagObject,
  ComponentObject,
} from '../types/content.js'

const getDocument = (path: string): string =>
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_AWS_DISTRIBUTION_URL + path
    : `/api/localS3/${encodeURIComponent(path)}`

const Tag = <T extends HtmlTag>(
  tag: T,
  text: string | null,
  props?: HtmlTagPropsMap[T]
): TagObject<T> => ({ tag, text, props })

const openLinkInNewTab: AnchorHTMLAttributes<HTMLAnchorElement> = {
  target: '_blank',
  rel: 'noreferrer noopener',
}

const Component = (
  component: ComponentName,
  props: Record<string, unknown>
): ComponentObject => ({ component, props })

export { getDocument, Tag, openLinkInNewTab, Component }
