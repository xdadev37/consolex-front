import { memo } from 'react';
import {
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
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
  <Dialog fullWidth keepMounted {...{ open }} PaperProps={{ sx: sx.paper }}>
    <DialogActions>
      <IconButton sx={sx.close} color="error" onClick={() => setOpen(false)}>
        <FontAwesomeIcon icon={faCircleXmark} />
      </IconButton>
    </DialogActions>
    <DialogContent>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        bgcolor="white"
      >
        <Grid
          item
          xs={12}
          sm={5}
          md={5}
          lg={5}
          dangerouslySetInnerHTML={{ __html: descriptions }}
        />
        <Grid item xs={12} sm={5} md={5} lg={5}>
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
                <SwiperSlide key={index} style={{ position: 'relative' }}>
                  <Image
                    width={800}
                    height={1000}
                    alt={image.attributes.name}
                    src={`${appSettings.baseUrl}${image.attributes.formats.small.url}`}
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
