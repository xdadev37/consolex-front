import { memo } from 'react'
import {
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  Zoom,
  useMediaQuery,
} from '@mui/material'
import sx from 'TSS/Modal.module'
import appSettings from 'AppSettings'
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons'
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
  images,
  descriptions,
}) => {
  const pcMode = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))

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
      </DialogActions>
      <DialogContent>
        <Grid
          container
          justifyContent='space-between'
          alignItems='center'
          bgcolor='white'
          height='100%'
        >
          <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
            <DialogContentText
              paragraph
              sx={sx.contents}
              dangerouslySetInnerHTML={{ __html: descriptions }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <Gallery
              additionalClass={classes.gallery}
              items={images.map(image => ({
                original: `${appSettings.baseUrl}${
                  pcMode && image.formats.medium
                    ? image.formats.medium.url
                    : image.formats.small.url
                }`,
                thumbnail: `${appSettings.baseUrl}${image.formats.thumbnail.url}`,
              }))}
              lazyLoad
              autoPlay
              infinite
              useTranslate3D
              useBrowserFullscreen
              showFullscreenButton
              showPlayButton
              showBullets
              showThumbnails
              thumbnailPosition={pcMode ? 'right' : 'bottom'}
              slideOnThumbnailOver
              showIndex
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}

export default memo(ContentModal)
