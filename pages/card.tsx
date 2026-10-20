import { memo, useEffect, useState } from 'react'
import { Grid, IconButton, useMediaQuery } from '@mui/material'
import sx from 'TSS/Modal.module'
import appSettings from 'AppSettings'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareNodes } from '@fortawesome/free-solid-svg-icons'
import { useAppSelector } from 'Redux/store'
import { useGetContentsQuery } from 'api/contents'
import { selectParams, setParams } from 'slicers/category'
import { useImagesQuery } from 'api/images'
import 'react-image-gallery/styles/css/image-gallery.css'
import Gallery from 'react-image-gallery'
import Loading from 'Modules/Loading'
import classes from 'Styles/CSS/Gallery.module.css'
import type { Theme } from '@mui/system'
import type { NextPage } from 'next'
import type { IModal } from 'Types/Modal'

const Card: NextPage = () => {
  const { isFallback, query, route } = useRouter()
  const [isShareSupported, setIsShareSupported] = useState(true)
  const pcMode = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))
  const params = useAppSelector(selectParams)
  useEffect(() => setIsShareSupported(Boolean(navigator.canShare)), [])
  const AnyGallery: any = Gallery
  const { data, isLoading } = useGetContentsQuery(
    { ...params, ...query },
    { refetchOnMountOrArgChange: true, skip: isFallback },
  )
  const images = useImagesQuery(data?.at(0)?.attributes.images.data?.id || 0, {
    refetchOnMountOrArgChange: true,
    skip: isFallback,
  })

  return (
    <Grid
      container
      justifyContent='space-between'
      alignItems='center'
      bgcolor='white'
      height='100%'
    >
      {isShareSupported && (
        <IconButton
          color='info'
          onClick={async () =>
            await navigator.share({
              url: `${route}?filters[id][$eq]=${data?.at(0)?.id}`,
            })
          }
        >
          <FontAwesomeIcon size='lg' icon={faShareNodes} />
        </IconButton>
      )}
      <Grid
        item
        xs={12}
        sm={12}
        md={5}
        lg={5}
        xl={5}
        sx={sx.contents}
        borderLeft={pcMode ? '1px solid #ccc' : undefined}
        borderBottom={pcMode ? undefined : '1px solid #ccc'}
        paddingLeft={pcMode ? 5 : undefined}
        dangerouslySetInnerHTML={{
          __html: images.data?.attributes.descriptions || '',
        }}
      />
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        lg={6}
        xl={6}
        paddingTop={pcMode ? undefined : 2}
      >
        <AnyGallery
          additionalClass={classes.gallery}
          items={images.data?.attributes.images.data.map(image => ({
            original: `${appSettings.baseUrl}${
              pcMode && image.attributes.formats.medium
                ? image.attributes.formats.medium.url
                : image.attributes.formats.small
                  ? image.attributes.formats.small.url
                  : image.attributes.formats.thumbnail.url
            }`,
            thumbnail: `${appSettings.baseUrl}${image.attributes.formats.thumbnail.url}`,
          }))}
          lazyLoad
          autoPlay
          infinite
          useTranslate3D
          useBrowserFullscreen
          showFullscreenButton
          showPlayButton
          showBullets
          showIndex
          // thumbnailPosition={pcMode ? 'right' : 'bottom'}
          // slideOnThumbnailOver
          // disableThumbnailScroll
          showThumbnails={false}
          showNav={false}
        />
      </Grid>
      <Loading open={isLoading} />
    </Grid>
  )
}

export default memo(Card)
