import { memo, useState } from 'react'
import { Grid, Typography, Link, Zoom } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { useGetShopQuery } from 'api/shop'
import { useRouter } from 'next/router'
import { useLazyImagesQuery } from 'api/images'
import { selectParams } from 'slicers/category'
import { useAppSelector } from 'Redux/store'
import remarkParser from 'Constants/remarkParser'
import Card from 'Modules/Card'
import Modal from 'Modules/Modal'
import type { NextPage } from 'next'

const Shop: NextPage = () => {
  const { isFallback } = useRouter()
  const [modal, setModal] = useState(false)
  const thousandsFormatter = new Intl.NumberFormat()
  const [modalDescriptions, setModalDescriptions] = useState('')
  const params = useAppSelector(selectParams)
  const { data } = useGetShopQuery(params, {
    refetchOnMountOrArgChange: true,
    skip: isFallback,
  })
  const [getShopImages, gotShopImages] = useLazyImagesQuery()
  const shopImagesHandler = (id: number) => () =>
    getShopImages(id)
      .unwrap()
      .then(res =>
        remarkParser.process(res.descriptions).then(parsed => {
          setModalDescriptions(parsed.toString())
          return setModal(true)
        })
      )

  return (
    <Grid container direction='column' justifyContent='space-between'>
      <Zoom in timeout={1000}>
        <Grid container gap={3} marginTop={2} justifyContent='center'>
          {data?.data.map((card, index) => (
            <Card
              key={index}
              onClick={shopImagesHandler(card.imagesId || 0)}
              backgroundColor='primary.main'
              header={{
                title: card.title,
                subheader: 'تماس برای اطلاعات بیش تر',
                actions: (
                  <Link href='#footer' color='primary.100'>
                    <FontAwesomeIcon icon={faPhone} />
                  </Link>
                ),
              }}
              media={{
                url: card.image.formats.small.url,
                alt: card.image.name,
              }}
            >
              <Grid
                container
                justifyContent='space-between'
                alignItems='center'
              >
                <Grid item sm={6} md={6} lg={6}>
                  <Typography color='primary.100'>قیمت</Typography>
                </Grid>
                {card.price ? (
                  <Grid
                    item
                    alignItems='baseline'
                    display='flex'
                    sm={6}
                    md={6}
                    lg={6}
                  >
                    <Typography variant='subtitle1'>
                      {thousandsFormatter.format(card.price)}
                    </Typography>
                    &nbsp;
                    <Typography
                      component='sub'
                      variant='caption'
                      color='primary.200'
                    >
                      تومان
                    </Typography>
                  </Grid>
                ) : (
                  <Typography variant='caption'>تماس بگیرید</Typography>
                )}
              </Grid>
              <Typography variant='caption'>{card.ps || ''}</Typography>
            </Card>
          ))}
        </Grid>
      </Zoom>
      <Modal
        open={modal}
        setOpen={setModal}
        images={gotShopImages.data?.images || []}
        descriptions={modalDescriptions}
      />
    </Grid>
  )
}

export default memo(Shop)
