import { memo } from 'react';
import { Modal, Grid, Typography } from '@mui/material';
import sx from 'TSS/Modal.module';
import type { NextPage } from 'next';
import type { IModal } from 'Types/Modal';

const ContentModal: NextPage<IModal> = ({ open, setOpen }) => (
  <Modal {...{ open }} sx={sx.modal}>
    <Grid container justifyContent="space-between">
      <Grid item xs={12} sm={5} md={5} lg={5} marginY={1}>
      </Grid>
      <Grid item xs={12} sm={5} md={5} lg={5}>
        <Typography variant="h4"></Typography>
        <Typography variant="body1"></Typography>
      </Grid>
    </Grid>
  </Modal>
);

export default memo(ContentModal);
