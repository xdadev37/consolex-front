import { memo, useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  Slide,
  Grid,
  Fade,
  ImageListItem,
} from '@mui/material';
import xbox from 'Components/Preview/Xbox.jpeg';
import ps5 from 'Components/Preview/PS5.jpeg';
import ps5Controller from 'Components/Preview/PS5_Controller.jpeg';
import xboxController from 'Components/Preview/Xbox_Controller.jpeg';
import { faComputerMouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TransitionGroup } from 'react-transition-group';
import sx from 'TSS/Preview.module';
import type { FC } from 'react';

const Preview: FC = () => {
  const [preview, setPreview] = useState(true);
  const [cycle, setCycle] = useState(0);
  const images = [
    { path: xbox, alt: 'ایکس باکس' },
    { path: ps5, alt: 'پلی استیشن' },
    { path: xboxController, alt: 'دسته ایکس باکس' },
    { path: ps5Controller, alt: 'دسته پلی استیشن' },
  ];

  const init = () => setPreview(false);

  useEffect(() => {
    setInterval(() => setCycle((prev) => (prev === 3 ? 0 : prev + 1)), 10000);
  }, []);

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
          <TransitionGroup>
            {images.map(
              (image, index) =>
                index === cycle && (
                  <Fade key={index} timeout={3000}>
                    <ImageListItem>
                      <Image
                        width={1920}
                        height={900}
                        alt={image.alt}
                        src={image.path}
                      />
                    </ImageListItem>
                  </Fade>
                )
            )}
          </TransitionGroup>
        </Grid>
        <Grid
          container
          position="absolute"
          left="50%"
          bottom="3%"
          color="primary.500"
        >
          <FontAwesomeIcon icon={faComputerMouse} /> scroll
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default memo(Preview);
