interface IMeta {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

interface IData<Data> {
  id: number;
  attributes: Data;
}

export interface IBaseQuery<Data> {
  data: IData<Data>[];
  meta: IMeta;
}
