import { memo, useState } from 'react'
import { Typography, Grid } from '@mui/material'
import lazy from 'next/dynamic'
import { useLazyImagesQuery } from 'api/contentsImages'
import { useGetContentsQuery } from 'api/contents'
import remarkParser from 'Constants/remarkParser'
import type { NextPage } from 'next'

/** @module lazy @constant import */
const Card = lazy(() => import('Modules/Card'))
const Modal = lazy(() => import('Modules/Modal'))

const Contents: NextPage = () => {
  const [modal, setModal] = useState(false)
  const [modalDescriptions, setModalDescriptions] = useState('')
  const contents = useGetContentsQuery(undefined, { skip: true })
  const [getImages, gotImages] = useLazyImagesQuery()
  const contentsImagesHandler = (id: number) => () =>
    getImages(id)
      .unwrap()
      .then(res =>
        remarkParser.process(res.descriptions).then(parsed => {
          setModalDescriptions(parsed.toString())
          return setModal(true)
        })
      )

  return (
    <Grid container direction='column' justifyContent='space-between'>
      {contents.data?.map((card, index) => (
        <Card
          key={index}
          onClick={contentsImagesHandler(card.imagesId || 0)}
          backgroundColor='primary.main'
          header={{ title: card.title }}
          media={{
            url: card.image.formats.small.url,
            alt: card.image.name,
          }}
        >
          <Typography>{card.ps}</Typography>
        </Card>
      ))}
      <Modal
        open={modal}
        setOpen={setModal}
        images={gotImages.data?.contentsImages || []}
        descriptions={modalDescriptions}
      />
    </Grid>
  )
}

export default memo(Contents)
