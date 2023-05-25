import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { Grid, Typography, Link } from '@mui/material'
import classes from 'Styles/CSS/Swiper.module.css'
import Card from 'Modules/Card'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Pagination } from 'swiper'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import type { FC } from 'react'
import type { ISwiper } from 'Types/Redux/Swiper.d'

const SwiperFC: FC<ISwiper> = ({ data, shopImagesHandler }) => {
  const thousandsFormatter = new Intl.NumberFormat('fa-IR')

  return (
    <Swiper
      effect='coverflow'
      grabCursor
      centeredSlides
      slidesPerView='auto'
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: false,
      }}
      pagination
      modules={[EffectCoverflow, Pagination]}
      className={classes.swiper}
    >
      {data.map((card, index) => (
        <SwiperSlide className={classes['swiper-slide']} key={index}>
          <Card
            onClick={shopImagesHandler(
              card.attributes.images.data?.id || 0,
              card.id
            )}
            backgroundColor='primary.main'
            header={{
              title: card.attributes.title,
              subheader: 'تماس برای اطلاعات بیش تر',
              actions: (
                <Link href='#footer' color='primary.100'>
                  <FontAwesomeIcon icon={faPhone} />
                </Link>
              ),
            }}
            media={{
              url: card.attributes.image.data?.attributes.formats.small
                ? card.attributes.image.data?.attributes.formats.small.url
                : card.attributes.image.data?.attributes.formats.thumbnail?.url,
              alt: card.attributes.title,
            }}
          >
            <Grid container justifyContent='space-between' alignItems='center'>
              <Grid item sm={6} md={6} lg={6}>
                <Typography color='primary.100'>قیمت</Typography>
              </Grid>
              {card.attributes.price ? (
                <Grid
                  item
                  alignItems='baseline'
                  display='flex'
                  sm={6}
                  md={6}
                  lg={6}
                >
                  <Typography variant='subtitle1'>
                    {thousandsFormatter.format(card.attributes.price)}
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
            <Typography variant='caption'>
              {card.attributes.ps || ''}
            </Typography>
          </Card>
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
export default SwiperFC
