import { memo, Fragment, useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  CardActions,
  IconButton,
  Collapse,
  Menu,
  MenuItem,
} from '@mui/material';
import sx from 'TSS/Card.module';
import dropMenuSX from 'TSS/Header/Profile.module';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDown,
  faChevronUp,
  faEllipsisV,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import appSettings from 'AppSettings';
import type { FC, MouseEvent } from 'react';
import type { ICard } from 'Types/Card';

const Cards: FC<ICard> = ({
  header: { actions, ...header },
  backgroundColor,
  cardActions,
  collapse,
  children,
  isDeleted,
  media,
  onClick,
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const openMenu = (e: MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(e.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  return (
    <Card sx={{ ...sx.card, backgroundColor }} {...{ onClick }}>
      <CardHeader
        {...header}
        action={
          actions ? (
            <Fragment>
              <IconButton onClick={openMenu} sx={sx.dropMenu}>
                <FontAwesomeIcon icon={faEllipsisV} size="1x" />
              </IconButton>
              <Menu
                {...{ anchorEl }}
                open={Boolean(anchorEl)}
                PaperProps={{ sx: dropMenuSX.menu }}
                BackdropProps={{ sx: dropMenuSX.backdropSet }}
                onClick={closeMenu}
                anchorOrigin={{ horizontal: 'left', vertical: 'center' }}
              >
                {actions.map(
                  (action, index) =>
                    action && (
                      <MenuItem
                        key={index}
                        onClick={action.onClick}
                        sx={dropMenuSX.menuItem}
                      >
                        <FontAwesomeIcon icon={action.icon} />
                        &nbsp; {action.label}
                      </MenuItem>
                    )
                )}
              </Menu>
            </Fragment>
          ) : (
            isDeleted && <FontAwesomeIcon icon={faXmark} />
          )
        }
      />
      <CardMedia
        component="img"
        image={`${appSettings.baseUrl}${media.url}`}
        alt={media.alt}
        height={300}
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
  );
};

export default memo(Cards);
