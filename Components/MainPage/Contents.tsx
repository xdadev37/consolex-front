import { memo, useState } from 'react'
import {
  Typography,
  TextField,
  Grid,
  IconButton,
  InputAdornment,
} from '@mui/material'
import { useLazyImagesQuery } from 'api/images'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faXmark } from '@fortawesome/free-solid-svg-icons'
import { useGetContentsQuery } from 'api/contents'
import remarkParser from 'Constants/remarkParser'
import { useRouter } from 'next/router'
import { useAppSelector, useAppDispatch } from 'Redux/store'
import { selectParams, setParams } from 'slicers/category'
import Card from 'Modules/Card'
import Modal from 'Modules/Modal'
import type { NextPage } from 'next'

const Contents: NextPage = () => {
  const [search, setSearch] = useState('')
  const { isFallback, query, route } = useRouter()
  const [modal, setModal] = useState(false)
  const params = useAppSelector(selectParams)
  const dispatch = useAppDispatch()
  const [modalDescriptions, setModalDescriptions] = useState({
    cardId: 0,
    description: '',
  })
  const { data } = useGetContentsQuery(
    { ...params, ...query },
    {
      refetchOnMountOrArgChange: true,
      skip: isFallback,
    }
  )
  const [getImages, gotImages] = useLazyImagesQuery()
  const contentsImagesHandler = (id: number, cardId: number) => () =>
    getImages(id)
      .unwrap()
      .then(res =>
        remarkParser.process(res.attributes.descriptions).then(parsed => {
          setModalDescriptions({ cardId, description: parsed.toString() })
          return setModal(true)
        })
      )

  return (
    <Grid container>
      <Grid container onSubmit={e => e.preventDefault()}>
        <TextField
          id='search'
          onReset={() =>
            dispatch(setParams({ 'filters[title][$contains]': '' }))
          }
          onChange={e => setSearch(e.target.value)}
          onSubmit={() =>
            dispatch(
              setParams({
                'filters[title][$contains]': search,
              })
            )
          }
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
                      setParams({ 'filters[title][$contains]': '' })
                    )
                  }}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </IconButton>
                <IconButton
                  onClick={() =>
                    dispatch(
                      setParams({
                        'filters[title][$contains]': search,
                      })
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
        {data?.map((card, index) => (
          <Card
            key={index}
            onClick={contentsImagesHandler(
              card.attributes.images.data?.id || 0,
              card.id
            )}
            backgroundColor='primary.main'
            header={{ title: card.attributes.title }}
            media={{
              url: card.attributes.image.data?.attributes.formats.small
                ? card.attributes.image.data?.attributes.formats.small.url
                : card.attributes.image.data?.attributes.formats.thumbnail?.url,
              alt: card.attributes.title,
            }}
          >
            <Typography>{card.attributes.ps}</Typography>
          </Card>
        ))}
      </Grid>
      <Modal
        open={modal}
        setOpen={setModal}
        images={{ data: gotImages.data?.attributes.images.data || [] }}
        shareUri={`${route}?filters[id][$eq]=${modalDescriptions.cardId}`}
        descriptions={modalDescriptions.description}
      />
    </Grid>
  )
}

export default memo(Contents)
