import { memo, useState, Fragment } from 'react'
import { Typography } from '@mui/material'
import { useLazyImagesQuery } from 'api/images'
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
        remarkParser.process(res.attributes.descriptions).then(parsed => {
          setModalDescriptions(parsed.toString())
          return setModal(true)
        })
      )

  return (
    <Fragment>
      {data?.map((card, index) => (
        <Card
          key={index}
          onClick={contentsImagesHandler(card.attributes.images.data?.id || 0)}
          backgroundColor='primary.main'
          header={{ title: card.attributes.title }}
          media={{
            url: card.attributes.image.data
              ? card.attributes.image.data.attributes.formats.medium.url
              : '',
            alt: card.attributes.title,
          }}
        >
          <Typography>{card.attributes.ps}</Typography>
        </Card>
      ))}
      <Modal
        open={modal}
        setOpen={setModal}
        images={{ data: gotImages.data?.attributes.images.data || [] }}
        descriptions={modalDescriptions}
      />
    </Fragment>
  )
}

export default memo(Contents)
