import { memo, useState } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  Slide,
  ImageList,
  ImageListItem,
  Grid,
} from '@mui/material';
import xbox from 'Components/Preview/Xbox.jpeg';
import ps5 from 'Components/Preview/PS5.jpeg';
import nintendo from 'Components/Preview/Nintendo-Switch.jpeg';
import ps5Controller from 'Components/Preview/PS5_Controller.jpeg';
import xboxController from 'Components/Preview/Xbox_Controller.jpeg';
import { faComputerMouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TransitionGroup } from 'react-transition-group';
import sx from 'TSS/Preview.module';
import type { FC } from 'react';

const Preview: FC = () => {
  const [preview, setPreview] = useState(true);
  const images1 = [
    { path: xbox, alt: 'ایکس باکس' },
    { path: ps5, alt: 'پلی استیشن' },
    { path: nintendo, alt: 'نینتندو سوییچ' },
  ];
  const images2 = [
    { path: nintendo, alt: 'نینتندو سوییچ' },
    { path: xboxController, alt: 'دسته ایکس باکس' },
    { path: ps5Controller, alt: 'دسته پلی استیشن' },
  ];

  const init = () => setPreview(false);

  return (
    <Dialog
      fullScreen
      fullWidth
      open={preview}
      TransitionComponent={Slide}
      transitionDuration={500}
      onScrollCapture={init}
      onTouchMoveCapture={init}
      PaperProps={{ sx: sx.dialog }}
    >
      <DialogContent sx={sx.zeroPad}>
        <Grid container>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <ImageList sx={sx.dialog} cols={1} rowHeight={300}>
              <TransitionGroup>
                {images1.map((image, index) => (
                  <Slide
                    key={index}
                    in
                    direction="up"
                    timeout={(index + 1) * 1000}
                  >
                    <ImageListItem>
                      <Image priority alt={image.alt} src={image.path} />
                    </ImageListItem>
                  </Slide>
                ))}
              </TransitionGroup>
            </ImageList>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
            <ImageList sx={sx.dialog} cols={1} rowHeight={300}>
              <TransitionGroup>
                {images2.map((image, index) => (
                  <Slide
                    key={index}
                    in
                    direction="up"
                    timeout={(index + 1) * 1000}
                  >
                    <ImageListItem>
                      <Image alt={image.alt} src={image.path} loading="lazy" />
                    </ImageListItem>
                  </Slide>
                ))}
              </TransitionGroup>
            </ImageList>
          </Grid>
        </Grid>
        <Grid
          container
          position="absolute"
          left="50%"
          bottom="5%"
          color="primary.main"
        >
          <FontAwesomeIcon icon={faComputerMouse} /> scroll
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default memo(Preview);
