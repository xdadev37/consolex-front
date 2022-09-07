import type { IData, IDataById } from 'Types/BaseQuery';
import type { Image } from 'Types/Redux/Images';

interface IImages {
  ShopImages: IDataById<IData<Image>>;
}
