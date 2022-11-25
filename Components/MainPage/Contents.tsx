import { memo, useState, Fragment } from 'react'
import { Typography } from '@mui/material'
import { useLazyImagesQuery } from 'api/contentsImages'
import { useGetContentsQuery } from 'api/contents'
import remarkParser from 'Constants/remarkParser'
import { useRouter } from 'next/router'
import Card from 'Modules/Card'
import Modal from 'Modules/Modal'
import type { NextPage } from 'next'

const Contents: NextPage = () => {
  const { isFallback } = useRouter()
  const [modal, setModal] = useState(false)
  const [modalDescriptions, setModalDescriptions] = useState('')
  const { data } = useGetContentsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    skip: isFallback,
  })
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
    <Fragment>
      {data?.map((card, index) => (
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
    </Fragment>
  )
}

export default memo(Contents)
