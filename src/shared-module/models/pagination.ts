// using interface causes ts error: Index signature is missing in type 'string'
// https://github.com/microsoft/TypeScript/issues/15300
export type TPaginationRequest = {
  page: number;
  limit: number;
};

export type TPaginationResponse<T> = {
  list: T[];
  totalPages: number;
  totalCount: number;
};
