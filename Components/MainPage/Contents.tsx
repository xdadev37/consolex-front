import { memo, useState, Fragment } from 'react'
import { Typography } from '@mui/material'
import { useLazyImagesQuery } from 'api/images'
import { useGetContentsQuery } from 'api/contents'
import remarkParser from 'Constants/remarkParser'
import { useRouter } from 'next/router'
import { useAppSelector } from 'Redux/store'
import { selectParams } from 'slicers/category'
import Card from 'Modules/Card'
import Modal from 'Modules/Modal'
import type { NextPage } from 'next'

const Contents: NextPage = () => {
  const { isFallback, query, route } = useRouter()
  const [modal, setModal] = useState(false)
  const params = useAppSelector(selectParams)
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
    <Fragment>
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
      <Modal
        open={modal}
        setOpen={setModal}
        images={{ data: gotImages.data?.attributes.images.data || [] }}
        shareUri={`${route}?filters[id][$eq]=${modalDescriptions.cardId}`}
        descriptions={modalDescriptions.description}
      />
    </Fragment>
  )
}

export default memo(Contents)
