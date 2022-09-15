import { memo } from 'react';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faShop } from '@fortawesome/free-solid-svg-icons';
import sx from 'TSS/Toggler.module';
import type { MouseEvent } from 'react';
import type { NextPage } from 'next';
import type { IToggler } from 'Types/Toggler';

const Toggler: NextPage<IToggler> = ({ mode, setMode }) => {
  const handleMode = (e: MouseEvent<HTMLElement>, mode: string | null) =>
    mode && setMode(mode);

  const modesButton = [
    {
      value: '/contents',
      label: 'مطالب',
      icon: faGamepad,
      backgroundColor: '#6200ea',
    },
    {
      value: '/shop',
      label: 'فروشگاه',
      icon: faShop,
      backgroundColor: '#ffab00',
    },
  ];

  return (
    <ToggleButtonGroup value={mode} exclusive onChange={handleMode}>
      {modesButton.map((button, index) => (
        <ToggleButton
          sx={{
            ...sx.toggler,
            backgroundColor: button.backgroundColor,
            '&:hover': { color: button.backgroundColor },
          }}
          key={index}
          href={button.value}
          value={button.value}
        >
          <FontAwesomeIcon icon={button.icon} /> &nbsp; {button.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default memo(Toggler);
