import { HydratedDocument } from 'mongoose';

export const countProperties = <T>(document: HydratedDocument<T>) => {
  return Object.keys(document.toObject({ versionKey: false })).length;
};

export const compareObjectsProperties = (a: object, b: string[]) => {
  const array1 = Object.keys(a);
  return JSON.stringify(array1.sort()) === JSON.stringify(b.sort());
};
