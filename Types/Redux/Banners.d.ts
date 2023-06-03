import type { IAttributes as IImage, IId } from 'Types/Redux/Images'

interface IBanners {
  link: string
  image: Record<'data', IImage>
}
