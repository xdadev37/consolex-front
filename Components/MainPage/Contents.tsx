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
        remarkParser.process(res.data.descriptions).then(parsed => {
          setModalDescriptions(parsed.toString())
          return setModal(true)
        })
      )

  return (
    <Fragment>
      {data?.data.map((card, index) => (
        <Card
          key={index}
          onClick={contentsImagesHandler(card.attributes.image || 0)}
          backgroundColor='primary.main'
          header={{ title: card.attributes.title }}
          media={{
            url: card.attributes.image.formats.medium.url,
            alt: card.attributes.image.name,
          }}
        >
          <Typography>{card.attributes.ps}</Typography>
        </Card>
      ))}
      <Modal
        open={modal}
        setOpen={setModal}
        images={gotImages.data?.data || []}
        descriptions={modalDescriptions}
      />
    </Fragment>
  )
}

export default memo(Contents)
