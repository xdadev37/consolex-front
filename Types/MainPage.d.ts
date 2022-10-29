export interface IContentsImagesHandler {
  contentsImagesHandler: (id?: number) => (() => Promise<void>) | undefined
}
