import { memo, useMemo } from 'react'
import { ToggleButtonGroup, ToggleButton } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faScroll, faRadiation } from '@fortawesome/free-solid-svg-icons'
import sx from 'TSS/Toggler.module'
import { useRouter } from 'next/router'
import type { NextPage } from 'next'

const Toggler: NextPage = () => {
  const { asPath, pathname } = useRouter()

  const modesButton = useMemo(
    () => [
      {
        value: '/contents',
        label: 'مقالات',
        icon: faScroll,
        backgroundColor: '#6200ea',
      },
      {
        value: '/shop',
        label: 'محصولات',
        icon: faRadiation,
        backgroundColor: '#ffab00',
      },
    ],
    []
  )

  return (
    <ToggleButtonGroup value={asPath} sx={sx.togglerGroup}>
      {modesButton.map((button, index) => (
        <ToggleButton
          key={index}
          aria-pressed={pathname === button.value ? 'true' : 'false'}
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
