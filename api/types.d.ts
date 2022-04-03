export interface StrapiResponseTypename {
  __typename: string
}

export interface StrapiResponseData extends StrapiResponseTypename {
  data: StrapiResponseAttributes | StrapiResponseData[],
  meta?: {
    pagination: StrapiPagination
  }
}

export interface StrapiPagination {
  page: number,
  pageSize: number,
  total: number,
  pageCount: number
}

export interface StrapiResponseAttributes extends StrapiResponseTypename {
  id?: string,
  attributes: object
}
