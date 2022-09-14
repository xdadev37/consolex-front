import { memo } from 'react';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faShop } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/router';
import type { MouseEvent } from 'react';
import type { NextPage } from 'next';
import type { IToggler, Modes } from 'Types/Toggler';

const Toggler: NextPage<IToggler> = ({ mode, setMode }) => {
  const router = useRouter();
  const handleMode = (e: MouseEvent<HTMLElement>, mode: Modes | null) => {
    if (mode) {
      setMode(mode);
      return router.push(mode);
    } else return;
  };

  const modesButton = [
    {
      value: '/contents',
      label: 'مطالب',
      icon: faGamepad,
    },
    {
      value: '/shop',
      label: 'فروشگاه',
      icon: faShop,
    },
  ];

  return (
    <ToggleButtonGroup value={mode} exclusive onChange={handleMode}>
      {modesButton.map((button, index) => (
        <ToggleButton key={index} value={button.value}>
          <FontAwesomeIcon icon={button.icon} /> {button.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
};

export default memo(Toggler);
