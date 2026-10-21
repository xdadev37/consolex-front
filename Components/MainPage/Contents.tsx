import { memo, useState, useMemo } from 'react'
import {
  Typography,
  TextField,
  Grid,
  IconButton,
  InputAdornment,
  useMediaQuery,
} from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useGetContentsQuery } from 'api/contents'
import { useRouter } from 'next/router'
import { useAppSelector, useAppDispatch } from 'Redux/store'
import { selectParams, setParams } from 'slicers/category'
import Card from 'Modules/Card'
import Loading from 'Modules/Loading'
import type { NextPage } from 'next'
import type { Theme } from '@mui/system'

const Contents: NextPage = () => {
  const [search, setSearch] = useState('')
  const { isFallback, query, push } = useRouter()
  const params = useAppSelector(selectParams)
  const dispatch = useAppDispatch()
  const pcMode = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))
  const gamesCatalog = useMemo(
    () => !pcMode && params && params['filters[menu_1s][key][$eq]'] === 'swny',
    [params, pcMode],
  )
  const { data, isLoading } = useGetContentsQuery(
    { ...params, ...query },
    {
      refetchOnMountOrArgChange: true,
      skip: isFallback,
    },
  )

  const cards = useMemo(
    () =>
      data &&
      data.map((card, index) => (
        <Card
          key={index}
          gamesCatalog={gamesCatalog}
          onClick={() => push(`card?filters[id][$eq]=${card.id}`)}
          backgroundColor='primary.main'
          header={{ title: card.attributes.title }}
          media={{
            url: card.attributes.image.data?.attributes.formats.small
              ? card.attributes.image.data?.attributes.formats.small.url
              : card.attributes.image.data?.attributes.formats.thumbnail?.url,
            alt: card.attributes.title,
          }}
        >
          <Typography
            fontSize={gamesCatalog ? 10 : undefined}
            fontFamily={gamesCatalog ? 'sans-serif !important' : undefined}
          >
            {card.attributes.ps}
          </Typography>
        </Card>
      )),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, pcMode],
  )

  return (
    <Grid container>
      <Grid
        container
        component='form'
        autoComplete='off'
        autoCorrect='off'
        autoSave='off'
        sx={{ scale: '0.7' }}
        onSubmit={e => {
          e.preventDefault()
          return dispatch(
            setParams({
              'filters[title][$containsi]': search,
            }),
          )
        }}
      >
        <TextField
          id='search'
          onReset={() =>
            dispatch(setParams({ 'filters[title][$containsi]': '' }))
          }
          onChange={e => setSearch(e.target.value)}
          type='search'
          placeholder='جستجو ...'
          sx={{
            borderRadius: 5,
            borderStyle: 'none',
            minHeight: 39.5,
            marginRight: 3,
            '.MuiInputBase-root': {
              minHeight: 39.5,
              color: 'primary.A100',
              borderRadius: 5,
            },
            '.MuiOutlinedInput-root': {
              padding: 0,
              paddingInline: 1,
              backgroundColor: '#f1f3f4',
            },
            '.MuiInputLabel-root': {
              bottom: 30,
              overflow: 'visible',
              display: 'flex',
              alignItems: 'center',
              color: 'primary.A100',
              opacity: 0.5,
            },
            '.Mui-disabled': { WebkitTextFillColor: '#474E68' },
            '::-ms-clear': { display: 'none' },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton
                  onClick={() => {
                    const input = document.querySelector('input')
                    if (input) {
                      input!.value = ''
                    }
                    return dispatch(
                      setParams({ 'filters[title][$containsi]': '' }),
                    )
                  }}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </IconButton>
                <IconButton
                  onClick={() =>
                    dispatch(
                      setParams({
                        'filters[title][$containsi]': search,
                      }),
                    )
                  }
                >
                  <FontAwesomeIcon icon={faSearch} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Grid>
      <Grid container justifyContent='center'>
        {cards}
      </Grid>
      <Loading open={isLoading} />
    </Grid>
  )
}

export default memo(Contents)
