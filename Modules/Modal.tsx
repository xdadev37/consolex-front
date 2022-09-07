import { memo } from 'react';
import { Modal, Grid, Typography } from '@mui/material';
import sx from 'TSS/Modal.module';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import appSettings from 'AppSettings';
import type { NextPage } from 'next';
import type { IModal } from 'Types/Modal';

const ContentModal: NextPage<IModal> = ({
  open,
  setOpen,
  images,
  descriptions,
}) => (
  <Modal keepMounted {...{ open }} sx={sx.modal}>
    <Grid container justifyContent="space-between">
      <Grid item xs={12} sm={5} md={5} lg={5} marginY={1}>
        <Swiper lazy>
          {images &&
            images.map((image, index) => (
              <SwiperSlide key={index} style={{ position: 'relative' }}>
                <Image
                  layout="fill"
                  alt={image.attributes.name}
                  src={`${appSettings.baseUrl}${image.attributes.formats.small.url}`}
                />
              </SwiperSlide>
            ))}
        </Swiper>
      </Grid>
      <Grid item xs={12} sm={5} md={5} lg={5}>
        {descriptions}
      </Grid>
    </Grid>
  </Modal>
);

export default memo(ContentModal);
