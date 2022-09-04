import { memo } from 'react';
import { Modal, Grid } from '@mui/material';
import type { NextPage } from 'next';
import type { IModal } from 'Types/Modal';

const ContentModal: NextPage<IModal> = ({ open }) => (
  <Modal {...{ open }}>
    <Grid container>
      <Grid item></Grid>
      <Grid item></Grid>
    </Grid>
  </Modal>
);

export default memo(ContentModal);
