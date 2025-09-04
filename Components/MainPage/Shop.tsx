import { memo, useState, useMemo } from 'react'
import { Grid, Typography, useMediaQuery, Paper } from '@mui/material'
import {
  useGetShopQuery,
  useGetRadiotherapyQuery,
  useGetIndustrialQuery,
  useGetRadiologyQuery,
  useGetNuclearQuery,
} from 'api/shop'
import { useGetBannersQuery } from 'api/banners'
import { useRouter } from 'next/router'
import { useLazyImagesQuery } from 'api/images'
import { selectParams, selectMainPage } from 'slicers/category'
import { useAppSelector } from 'Redux/store'
import remarkParser from 'Constants/remarkParser'
import Modal from 'Modules/Modal'
import SwiperFC from './Items/Swiper'
import Gallery from 'react-image-gallery'
import classes from 'Styles/CSS/Gallery.module.css'
import appSettings from 'AppSettings'
import 'react-image-gallery/styles/css/image-gallery.css'
import type { Theme } from '@mui/system'
import type { NextPage } from 'next'

const Shop: NextPage = () => {
  const AnyGallery: any = Gallery
  const { isFallback, query, route } = useRouter()
  const [modal, setModal] = useState(false)
  const [slideIndex, setSlideIndex] = useState(0)
  const pcMode = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'))
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
  const allBanners = useGetBannersQuery(undefined, { skip: isFallback })
  const allRadiotherapy = useGetRadiotherapyQuery(undefined, { skip: isFallback })
  const allNuclear = useGetNuclearQuery(undefined, { skip: isFallback })
  const allRadiology = useGetRadiologyQuery(undefined, { skip: isFallback })
  const allIndustrial = useGetIndustrialQuery(undefined, { skip: isFallback })
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
    { name: 'رادیوتراپی', data: allRadiotherapy.data },
    { name: 'پزشکی هسته ای', data: allNuclear.data },
    { name: 'سیتی اسکن و رادیولوژی', data: allRadiology.data },
    { name: 'صنعتی', data: allIndustrial.data },
  ]

  const mapData = useMemo(
    () =>
      mainPageData.map(
        ({ name, data }, i) =>
          data && (
            <Grid
              key={i}
              container
              direction='column'
              component={Paper}
              borderRadius={5}
              paddingY={3}
              marginY={3}
            >
              <Typography variant='h5' marginRight={3}>
                {name}
              </Typography>
              <SwiperFC {...{ data, shopImagesHandler }} />
            </Grid>
          )
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [mainPageData]
  )

  const swiper = useMemo(
    () => data && <SwiperFC {...{ data, shopImagesHandler }} />,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  )

  return (
    <Grid container direction='column' justifyContent='space-between'>
      <Grid container justifyContent='center'>
        <AnyGallery
          additionalClass={classes.banner}
          items={
            allBanners.data?.data.map(banner => ({
              original: `${appSettings.baseUrl}${
                banner.attributes.image.data.attributes.formats
                  ? pcMode &&
                    banner.attributes.image.data.attributes.formats.large
                    ? banner.attributes.image.data.attributes.formats.large.url
                    : banner.attributes.image.data.attributes.formats.medium
                    ? banner.attributes.image.data.attributes.formats.medium.url
                    : banner.attributes.image.data.attributes.formats.small.url
                  : banner.attributes.image.data.attributes.url
              }`,
              thumbnail: `${appSettings.baseUrl}${
                banner.attributes.image.data.attributes.formats
                  ? banner.attributes.image.data.attributes.formats.thumbnail
                      .url
                  : banner.attributes.image.data.attributes.url
              }`,
              description: banner.attributes.ps,
              originalAlt: banner.attributes.ps,
              thumbnailAlt: banner.attributes.ps,
            })) || []
          }
          autoPlay
          infinite
          showNav={false}
          showBullets
          showPlayButton={false}
          showFullscreenButton={false}
          showThumbnails={false}
          isRTL
          onSlide={setSlideIndex}
          onClick={() =>
            window
              .open(
                allBanners.data?.data.at(slideIndex)?.attributes.link,
                '_blank'
              )
              ?.focus()
          }
        />
      </Grid>
      <Grid container marginTop={2} display={mainPage ? undefined : 'none'}>
        {mapData}
      </Grid>
      <Grid
        container
        gap={3}
        marginTop={2}
        justifyContent='center'
        display={mainPage ? 'none' : undefined}
      >
        {swiper}
      </Grid>
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
