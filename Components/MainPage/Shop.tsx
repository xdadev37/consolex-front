import { memo, useState } from 'react'
import { Grid, Typography } from '@mui/material'
import {
  useGetShopQuery,
  useGetConsolesQuery,
  useGetMicrosoftQuery,
  useGetSonyQuery,
} from 'api/shop'
import { useRouter } from 'next/router'
import { useLazyImagesQuery } from 'api/images'
import { selectParams, selectMainPage } from 'slicers/category'
import { useAppSelector } from 'Redux/store'
import remarkParser from 'Constants/remarkParser'
import Modal from 'Modules/Modal'
import SwiperFC from './Items/Swiper'
import type { NextPage } from 'next'

const Shop: NextPage = () => {
  const { isFallback, query, route } = useRouter()
  const [modal, setModal] = useState(false)
  const [modalDescriptions, setModalDescriptions] = useState({
    cardId: 0,
    description: '',
  })
  const params = useAppSelector(selectParams)
  const mainPage = useAppSelector(selectMainPage)
  const { data } = useGetShopQuery(
    { ...params, ...query },
    {
      refetchOnMountOrArgChange: true,
      skip: mainPage,
    }
  )
  const allConsoles = useGetConsolesQuery(undefined, { skip: isFallback })
  const allSony = useGetSonyQuery(undefined, { skip: isFallback })
  const allMicrosoft = useGetMicrosoftQuery(undefined, { skip: isFallback })
  const [getShopImages, gotShopImages] = useLazyImagesQuery()
  const shopImagesHandler = (id: number, cardId: number) => () =>
    getShopImages(id)
      .unwrap()
      .then(res =>
        remarkParser.process(res.attributes.descriptions).then(parsed => {
          setModalDescriptions({ cardId, description: parsed.toString() })
          return setModal(true)
        })
      )
  const mainPageData = [
    { name: 'کنسول ها', data: allConsoles.data },
    { name: 'سونی', data: allSony.data },
    { name: 'مایکروسافت', data: allMicrosoft.data },
  ]

  return (
    <Grid container direction='column' justifyContent='space-between'>
      {mainPage ? (
        <Grid container marginTop={2}>
          {mainPageData.map(
            ({ name, data }, i) =>
              data && (
                <Grid key={i} container direction='column'>
                  <Typography>{name}</Typography>
                  <SwiperFC {...{ data, shopImagesHandler }} />
                </Grid>
              )
          )}
        </Grid>
      ) : (
        <Grid container gap={3} marginTop={2} justifyContent='center'>
          {data && <SwiperFC {...{ data, shopImagesHandler }} />}
        </Grid>
      )}
      <Modal
        open={modal}
        setOpen={setModal}
        images={{ data: gotShopImages.data?.attributes.images.data || [] }}
        shareUri={`${route}?filters[id][$eq]=${modalDescriptions.cardId}`}
        descriptions={modalDescriptions.description}
      />
    </Grid>
  )
}

export default memo(Shop)
