import { memo } from 'react'
import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  CardActions,
  IconButton,
  Collapse,
} from '@mui/material'
import sx, { color } from 'TSS/Card.module'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import appSettings from 'AppSettings'
import type { NextPage } from 'next'
import type { ICard } from 'Types/Card'

const Cards: NextPage<ICard> = ({
  header: { actions, ...header },
  cardActions,
  collapse,
  children,
  media,
  onClick,
}) => (
  <Card
    sx={{
      ...sx.card,
      backgroundColor: color.at(Math.floor(Math.random() * color.length)),
    }}
    {...{ onClick }}
  >
    <CardHeader {...header} {...{ actions }} />
    <CardMedia
      component='img'
      image={`${appSettings.baseUrl}${media.url}`}
      loading='lazy'
      alt={media.alt}
      height={300}
      sx={sx.media}
    />
    <CardContent>{children}</CardContent>
    {(cardActions || collapse) && (
      <CardActions>
        {cardActions}
        {collapse && (
          <IconButton
            onClick={() => collapse.open.setValue(collapse.open.value)}
          >
            <FontAwesomeIcon icon={collapse ? faChevronUp : faChevronDown} />
          </IconButton>
        )}
      </CardActions>
    )}
    {collapse && (
      <Collapse
        in={collapse.open.value}
        sx={{ backgroundColor: collapse.backgroundColor }}
        unmountOnExit
      >
        <CardContent>{collapse.children}</CardContent>
      </Collapse>
    )}
  </Card>
)

export default memo(Cards, (prev, next) => prev.collapse === next.collapse)
