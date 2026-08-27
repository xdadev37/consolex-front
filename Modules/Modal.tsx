import { memo, useEffect, useState } from 'react'
import {
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  Zoom,
  useMediaQuery,
} from '@mui/material'
import sx from 'TSS/Modal.module'
import appSettings from 'AppSettings'
import { faCircleXmark, faShareNodes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import 'react-image-gallery/styles/css/image-gallery.css'
import Gallery from 'react-image-gallery'
import classes from 'Styles/CSS/Gallery.module.css'
import type { Theme } from '@mui/system'
import type { NextPage } from 'next'
import type { IModal } from 'Types/Modal'

const ContentModal: NextPage<IModal> = ({
  open,
  setOpen,
  descriptions,
  images,
  shareUri,
}) => {
  const [isShareSupported, setIsShareSupported] = useState(true)
  const pcMode = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))
  useEffect(() => setIsShareSupported(Boolean(navigator.canShare)), [])
  const AnyGallery: any = Gallery

  return (
    <Dialog
      {...{ open }}
      fullWidth
      fullScreen
      keepMounted
      transitionDuration={300}
      TransitionComponent={Zoom}
      sx={sx.modal}
      PaperProps={{ sx: sx.paper }}
    >
      <DialogActions sx={sx.actions}>
        <IconButton color='error' onClick={() => setOpen(false)}>
          <FontAwesomeIcon size='lg' icon={faCircleXmark} />
        </IconButton>
        {isShareSupported && (
          <IconButton
            color='info'
            onClick={async () => await navigator.share({ url: shareUri })}
          >
            <FontAwesomeIcon size='lg' icon={faShareNodes} />
          </IconButton>
        )}
      </DialogActions>
      <DialogContent>
        <Grid
          container
          justifyContent='space-between'
          alignItems='center'
          bgcolor='white'
          height='100%'
        >
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
            dangerouslySetInnerHTML={{ __html: descriptions }}
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
              items={images.data.map(image => ({
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
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default memo(ContentModal)
