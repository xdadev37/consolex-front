import { memo } from 'react'
import { ToggleButtonGroup, ToggleButton } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGamepad, faShop } from '@fortawesome/free-solid-svg-icons'
import sx from 'TSS/Toggler.module'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'

const Toggler: NextPage = () => {
  const { asPath } = useRouter()

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
  ]

  return (
    <ToggleButtonGroup value={asPath} exclusive>
      {modesButton.map((button, index) => (
        <ToggleButton
          key={index}
          sx={{
            ...sx.toggler,
            backgroundColor: button.backgroundColor,
            '&:hover': { color: button.backgroundColor },
          }}
          href={button.value}
          value={button.value}
        >
          <FontAwesomeIcon size='lg' icon={button.icon} /> &nbsp;
          {button.label}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  )
}

export default memo(Toggler)
