interface IMeta {
  pagination: {
    page: number
    pageSize: number
    pageCount: number
    total: number
  }
}

interface IData<Data> {
  id: number
  attributes: Data
}

interface IBaseQuery<Data> {
  data: IData<Data>[]
  meta: IMeta
}

interface IDataById<Data> {
  data: Data[]
}

export interface IBaseQueryById<Data> {
  data: IData<Data>
  meta: IMeta
}
