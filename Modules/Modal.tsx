import { memo } from 'react';
import {
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  Zoom,
} from '@mui/material';
import sx from 'TSS/Modal.module';
import { Navigation, Pagination, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import appSettings from 'AppSettings';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import type { NextPage } from 'next';
import type { IModal } from 'Types/Modal';

const ContentModal: NextPage<IModal> = ({
  open,
  setOpen,
  images,
  descriptions,
}) => (
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
      <IconButton color="error" onClick={() => setOpen(false)}>
        <FontAwesomeIcon size="lg" icon={faCircleXmark} />
      </IconButton>
    </DialogActions>
    <DialogContent>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        bgcolor="white"
        height="100%"
      >
        <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
          <DialogContentText
            paragraph
            sx={sx.contents}
            dangerouslySetInnerHTML={{ __html: descriptions }}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={5} xl={5} display="block">
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            pagination={{ clickable: true }}
            navigation
            lazy
            loop
            style={{ borderRadius: 28 }}
          >
            {images &&
              images.map((image, index) => (
                <SwiperSlide key={index}>
                  <Image
                    layout="responsive"
                    height="100%"
                    width="100%"
                    alt={image.name}
                    src={`${appSettings.baseUrl}${image.formats.small.url}`}
                  />
                </SwiperSlide>
              ))}
          </Swiper>
        </Grid>
      </Grid>
    </DialogContent>
  </Dialog>
);

export default memo(ContentModal);
