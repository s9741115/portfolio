interface Props {
  href?: string
  className?: string[]
  id?: string
}

interface Child {
  type?: string
  value?: string
  tag?: string
  props?: Props
  children?: Child[]
}

interface Body {
  type?: string
  children?: Child[]
}

export interface Toc {
  id?: string
  depth?: number
  text?: string
}

export interface Project {
  categories?: string[]
  type?: string
  header?: string
  slug?: string
  description?: string
  title?: string
  related?: string[]
  toc?: Toc[]
  body?: Body
  dir?: string
  path?: string
  extension?: string
  createdAt?: string
  updatedAt?: Date
  tags?: string[]
  indicatorsHidden?: boolean
}
