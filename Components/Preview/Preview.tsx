import { memo } from 'react';
import Image from 'next/image';
import { Grid, Slide, ImageList, ImageListItem } from '@mui/material';
import xbox from 'Components/Preview/Xbox.jpeg';
import ps5 from 'Components/Preview/PS5.jpeg';
import nintendo from 'Components/Preview/Nintendo-Switch.jpeg';
import ps5Controller from 'Components/Preview/Nintendo-Switch.jpeg';
import xboxController from 'Components/Preview/Nintendo-Switch.jpeg';
import sx from 'TSS/Preview.module';
import { TransitionGroup } from 'react-transition-group';
import type { FC } from 'react';

const Preview: FC = () => {
  const images = [
    { path: xbox },
    { path: ps5 },
    { path: nintendo },
    { path: ps5Controller },
    { path: xboxController },
  ];

  return (
    <ImageList>
      <TransitionGroup>
        {images.map((image, index) => (
          <Slide key={index} in>
            <ImageListItem>
              <Image src={image.path} />
            </ImageListItem>
          </Slide>
        ))}
      </TransitionGroup>
    </ImageList>
  );
};

export default memo(Preview);
