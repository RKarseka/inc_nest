export interface IGetParams {
  searchNameTerm?: string;
  searchLoginTerm?: string;
  searchEmailTerm?: string;
  sortBy: string;
  sortDirection: string;
  pageNumber: string;
  pageSize: string;
}

export interface responsePaginated {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: [];
}

export const paginatedResponse = {
  pagesCount: 0,
  page: 0,
  pageSize: 0,
  totalCount: 0,
  items: [],
};
