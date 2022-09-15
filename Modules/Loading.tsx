import { memo } from 'react';
import { Modal, Stack } from '@mui/material';
import Logo from 'Logo.png';
import classes from 'CSS/Loading.module.css';
import Image from 'next/image';
import type { FC } from 'react';
import type { ILoading } from 'Types/Loading';

const Loading: FC<ILoading> = ({ open }) => (
  <Modal {...{ open }} classes={{ root: classes.zIndexModal }}>
    <Stack className={`${classes.stack} ${classes.backdrop}`}>
      <Stack className={classes.loading}>
        {Array(4)
          .fill(1)
          .map((dot, index) => (
            <Stack key={index} />
          ))}
        <Image alt="logo" src={Logo} />
      </Stack>
    </Stack>
  </Modal>
);

export default memo(Loading);
