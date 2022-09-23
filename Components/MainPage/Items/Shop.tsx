import { memo, useState } from 'react';
import { Grid, Typography, Link } from '@mui/material';
import lazy from 'next/dynamic';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { useShopQuery } from 'api/shop';
import { useCatalogsQuery } from 'api/filtration';
import type { NextPage } from 'next';
import type { IContentsImagesHandler } from 'Types/MainPage';

/** @module lazy @constant import */
const Card = lazy(() => import('Modules/Card'));
const Selector = lazy(() => import('Modules/Selector'));
const Loading = lazy(() => import('Modules/Loading'));

const Shop: NextPage<IContentsImagesHandler> = ({ contentsImagesHandler }) => {
  const [params, setParams] = useState<Record<'catalogs', string>>();
  const shopContents = useShopQuery(params);
  const catalogs = useCatalogsQuery(undefined);
  const all = { id: 0, value: 'همه' };

  return (
    <Grid container>
      <Selector
        defaultValue={all}
        optionLabel="value"
        options={catalogs.data || [all]}
        onChange={(object: Record<string, any>) =>
          setParams({ catalogs: object.id })
        }
      />
      {shopContents.data?.map((card, index) => (
        <Card
          key={index}
          onClick={
            card.imagesId
              ? () => contentsImagesHandler(card.imagesId || 0)
              : undefined
          }
          backgroundColor="#ffd401"
          header={{
            title: card.title,
            subheader: 'تماس برای اطلاعات بیش تر',
            actions: (
              <Link href="#footer" color="primary.100">
                <FontAwesomeIcon icon={faPhone} />
              </Link>
            ),
          }}
          media={{
            url: card.image.formats.small.url,
            alt: card.image.name,
          }}
        >
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item sm={6} md={6} lg={6}>
              <Typography color="primary.100">قیمت</Typography>
            </Grid>
            {card.price ? (
              <Grid
                item
                alignItems="baseline"
                display="flex"
                sm={6}
                md={6}
                lg={6}
              >
                <Typography variant="subtitle1">{card.price}</Typography>
                &nbsp;
                <Typography
                  component="sub"
                  variant="caption"
                  color="primary.200"
                >
                  تومان
                </Typography>
              </Grid>
            ) : (
              <Typography variant="caption">تماس بگیرید</Typography>
            )}
          </Grid>
          <Typography variant="caption">{card.ps || ''}</Typography>
        </Card>
      ))}
      <Loading open={(shopContents || catalogs).isFetching} />
    </Grid>
  );
};

export default memo(Shop);
