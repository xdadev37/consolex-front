import { memo, useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  Slide,
  Grid,
  Grow,
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
  const [preview, setPreview] = useState(false);
  const [cycle, setCycle] = useState(0);
  const [size, setSize] = useState(0);
  const images = [
    { path: xbox, alt: 'ایکس باکس' },
    { path: ps5, alt: 'پلی استیشن' },
    { path: xboxController, alt: 'دسته ایکس باکس' },
    { path: ps5Controller, alt: 'دسته پلی استیشن' },
  ];

  const init = () => {
    localStorage.setItem('firstLaunch', 'false');
    return setPreview(false);
  };

  useEffect(() => {
    !localStorage.getItem('firstLaunch') && setPreview(true);
    setSize(window.screenY * 2);
    setInterval(() => setCycle((prev) => (prev === 3 ? 0 : prev + 1)), 14000);
  }, []);

  return (
    <Dialog
      fullScreen
      fullWidth
      open={preview}
      TransitionComponent={Slide}
      transitionDuration={500}
      onClickCapture={init}
      onTouchMoveCapture={init}
      PaperProps={{ sx: sx.dialog }}
    >
      <DialogContent sx={sx.zeroPad}>
        <Grid container display="block">
          <TransitionGroup>
            {images.map(
              (image, index) =>
                index === cycle && (
                  <Grow key={index} timeout={7000}>
                    <ImageListItem>
                      <Image
                        height={size}
                        width="100%"
                        alt={image.alt}
                        src={image.path}
                        layout="responsive"
                      />
                    </ImageListItem>
                  </Grow>
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
          <FontAwesomeIcon icon={faComputerMouse} /> &nbsp; Click
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default memo(Preview);
