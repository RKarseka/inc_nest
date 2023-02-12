import { Filter, SortDirection } from 'mongodb';

export interface IGetParams<T> {
  sort: {
    [sortField: string]: SortDirection;
  };
  pageNumber: number;
  pageSize: number;
  skip: number;
  filters: Filter<T>;
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

export interface IFilter {
  name?: { $regex: RegExp };
}

export interface ISort {
  sortBy?: -1 | 1;
  createdAt?: -1 | 1;
}

export interface ISearchFields<T> {
  name: keyof T;
  query: string;
  // [searchField in keyof T]?: string
}

export interface IPagedRes<T> {
  pagesCount: number;
  page: number;
  totalCount: number;
  pageSize: number;
  items: T[];
}
