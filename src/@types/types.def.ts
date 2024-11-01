export type MyResponse<T> = {
  statusCode: number;
  message?: string;
  data?: T;
  error?: string;
};

export type ErrorResponse = {
  statusCode: number;
  message?: string;
  error?: string;
};

