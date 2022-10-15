import { memo, useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  Slide,
  Grid,
  Grow,
  ImageListItem,
  useMediaQuery,
} from '@mui/material';
import gow_Landscape from 'Components/Preview/Landscape/god_of_war.jpg';
import ps5_white_Landscape from 'Components/Preview/Landscape/ps5_white.jpg';
import ps5_controller_Landscape from 'Components/Preview/Landscape/ps5-dualsense-controller.jpg';
import ps5_Landscape from 'Components/Preview/Landscape/ps5.jpeg';
import god_of_war from 'Components/Preview/Portrait/god_of_war.png';
import headphone_Portrait from 'Components/Preview/Portrait/ps5.png';
import Wireless_Controller_Portrait from 'Components/Preview/Portrait/xbox_s.jpg';
import xbox_series_Portrait from 'Components/Preview/Portrait/xbox.png';
import { faComputerMouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { TransitionGroup } from 'react-transition-group';
import sx from 'TSS/Preview.module';
import type { FC } from 'react';
import type { Theme } from '@mui/system';

const Preview: FC = () => {
  const [preview, setPreview] = useState(false);
  const [cycle, setCycle] = useState(0);
  const mobile = useMediaQuery((media: Theme) => media.breakpoints.down('sm'));
  const images = mobile
    ? [
        { path: headphone_Portrait, alt: 'هدفون پلی استیشن' },
        { path: god_of_war, alt: 'بازی Hallo' },
        { path: Wireless_Controller_Portrait, alt: 'دسته پلی استیشن' },
        { path: xbox_series_Portrait, alt: 'ایکس باکس سری اس' },
      ]
    : [
        { path: ps5_Landscape, alt: 'پلی استیشن' },
        { path: ps5_controller_Landscape, alt: 'دسته پلی استیشن' },
        { path: ps5_white_Landscape, alt: 'پلی استیشن سفید' },
        { path: gow_Landscape, alt: 'گاد اف وار' },
      ];

  const init = () => {
    sessionStorage.setItem('firstLaunch', 'false');
    return setPreview(false);
  };

  useEffect(() => {
    !sessionStorage.getItem('firstLaunch') && setPreview(true);
    setInterval(() => setCycle((prev) => (prev === 3 ? 0 : prev + 1)), 11000);
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
      onKeyUpCapture={init}
      PaperProps={{ sx: sx.dialog }}
    >
      <DialogContent sx={sx.zeroPad}>
        <Grid container display="block" alignContent="center" bgcolor="#fafafa">
          <TransitionGroup>
            {images.map(
              (image, index) =>
                index === cycle && (
                  <Grow key={index} timeout={5000}>
                    <ImageListItem>
                      <Image
                        height={mobile ? '1400%' : undefined}
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
