import { memo, useState } from 'react'
import { Grid, Typography, Link, Zoom } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { useGetShopQuery } from 'api/shop'
import { useLazyShopImagesQuery } from 'api/shopImages'
import { useGetCategoriesQuery } from 'api/filtration'
import remarkParser from 'Constants/remarkParser'
import Card from 'Modules/Card'
import Selector from 'Modules/Selector'
import Modal from 'Modules/Modal'
import type { NextPage } from 'next'

const Shop: NextPage = () => {
  const [params, setParams] = useState<Record<'categories.key', string>>()
  const [modal, setModal] = useState(false)
  const thousandsFormatter = new Intl.NumberFormat()
  const [modalDescriptions, setModalDescriptions] = useState('')
  const { data } = useGetShopQuery(params, { refetchOnMountOrArgChange: true })
  const categories = useGetCategoriesQuery(undefined)
  const all = { id: 0, value: 'همه' }
  const [getShopImages, gotShopImages] = useLazyShopImagesQuery()
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
      <Grid container>
        <Grid
          item
          marginY={2}
          xs={6}
          sm={3}
          md={3}
          lg={2}
          alignItems='center'
          display='flex'
        >
          فیلتر:
          <Selector
            defaultValue={all}
            optionLabel='value'
            options={[all, ...(categories.data || [])]}
            onChange={(object: Record<string, any>) =>
              setParams({ 'categories.key': object.key })
            }
          />
        </Grid>
      </Grid>
      <Zoom in timeout={1000}>
        <Grid container gap={3} marginTop={2} justifyContent='center'>
          {data?.map((card, index) => (
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
        images={gotShopImages.data?.shopImages || []}
        descriptions={modalDescriptions}
      />
    </Grid>
  )
}

export default memo(Shop)
