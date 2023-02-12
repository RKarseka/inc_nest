import { HydratedDocument } from 'mongoose';
import { Filter, SortDirection } from 'mongodb';
import { ParsedQs } from 'qs';
import { IGetParams, IPagedRes, ISearchFields } from './types';

export const countProperties = <T>(document: HydratedDocument<T>) => {
  return Object.keys(document.toObject({ versionKey: false })).length;
};

export const compareObjectsProperties = (a: object, b: string[]) => {
  const array1 = Object.keys(a);
  return JSON.stringify(array1.sort()) === JSON.stringify(b.sort());
};

export const makeGetAllParams = <T>(
  params: ParsedQs,
  searchFields: Array<ISearchFields<T>>,
): IGetParams<T> => {
  const pageNumber = +(params.pageNumber || 1);
  const pageSize = +(params.pageSize || 10);
  const skip = (pageNumber - 1) * pageSize;
  const sortBy = params.sortBy?.toString() || 'createdAt';
  const sortDirection = (params.sortDirection?.toString() ||
    -1) as SortDirection;
  const sort: { [sortField: string]: SortDirection } = {
    [sortBy]: sortDirection,
  };
  if (!sort.createdAt) {
    sort.createdAt = -1;
  }

  const filters: Filter<T> = {};

  for (const field of searchFields) {
    if (params[field.query]) {
      const filter: any = {
        [field.name]: {
          $regex: new RegExp(params[field.query]?.toString() || '', 'i'),
        },
      };
      if (filters.$or != null) {
        filters.$or.push(filter);
      } else {
        filters.$or = [filter];
      }
    }
  }
  return { sort, pageNumber, pageSize, skip, filters };
};

export const mapFnDef = <T, D>(item: T): D => item as unknown as D;

export async function getAllFromCollectionPaginated<T>(
  query: IGetParams<T>,
  collection: any,
  mapFn: any = mapFnDef<T, T>,
): Promise<IPagedRes<T>> {
  const { skip, pageSize, pageNumber, filters, sort } = query;
  const totalCount = await collection.countDocuments(filters);
  const itemsRaw = await collection
    .find(filters)
    // .project({ _id: 0 })
    .sort(sort)
    .limit(pageSize)
    .skip(skip)
    .exec();
  const items = itemsRaw.map(mapFn);
  return {
    pagesCount: Math.ceil(totalCount / pageSize),
    page: pageNumber,
    pageSize,
    totalCount,
    items,
  };
}
