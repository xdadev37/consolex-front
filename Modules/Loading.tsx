import { memo } from 'react'
import { Dialog, Stack, Fade } from '@mui/material'
import Logo from 'Logo.jpg'
import classes from 'CSS/Loading.module.css'
import Image from 'next/image'
import type { FC } from 'react'
import type { ILoading } from 'Types/Loading'

const Loading: FC<ILoading> = ({ open }) => (
  <Dialog
    TransitionComponent={Fade}
    transitionDuration={1000}
    {...{ open }}
    classes={{ root: classes.zIndexModal }}
  >
    <Stack className={`${classes.stack} ${classes.backdrop}`}>
      <Stack>
        {Array(4)
          .fill(1)
          .map((dot, index) => (
            <Stack key={index} />
          ))}
        <Image alt='logo' src={Logo} />
      </Stack>
    </Stack>
  </Dialog>
)

export default memo(Loading)
