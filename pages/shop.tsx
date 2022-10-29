import { memo, useState } from 'react'
import { Grid, Typography, Link, Zoom } from '@mui/material'
import lazy from 'next/dynamic'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { getRunningOperationPromises, getShop, useGetShopQuery } from 'api/shop'
import { useCategoriesQuery } from 'api/filtration'
import { getStaticProps as wrapper } from 'Redux/store'
import type { NextPage } from 'next'
import type { IContentsImagesHandler } from 'Types/MainPage'

/** @module lazy @constant import */
const Card = lazy(() => import('Modules/Card'))
const Selector = lazy(() => import('Modules/Selector'))

export const getStaticProps = wrapper(({ dispatch }) => async ({ params }) => {
  dispatch(getShop.initiate(params as Record<'categories.key', string>))

  await Promise.all(getRunningOperationPromises())

  return {
    props: {},
  }
})

const Shop: NextPage<IContentsImagesHandler> = ({ contentsImagesHandler }) => {
  const [params, setParams] = useState<Record<'categories.key', string>>()
  const shopContents = useGetShopQuery(params, {
    refetchOnMountOrArgChange: true,
    skip: true,
  })
  const categories = useCategoriesQuery(undefined)
  const all = { id: 0, value: 'همه' }

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
      <Zoom in>
        <Grid container gap={3} marginTop={2} justifyContent='center'>
          {shopContents.data?.map((card, index) => (
            <Card
              key={index}
              onClick={contentsImagesHandler(card.imagesId)}
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
                    <Typography variant='subtitle1'>{card.price}</Typography>
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
    </Grid>
  )
}

export default memo(Shop)
