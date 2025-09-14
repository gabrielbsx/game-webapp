export type HttpRequestContract = {
  authenticatedUser: { id: string } | undefined;
  setAuthenticatedUser: (user: { id: string }) => void;

  headers: {
    [key: string]: string | string[] | undefined;
  };

  request: unknown;
};

export type HttpResponseContract<T = unknown> = {
  statusCode: number;
  data: T;
};

export const ok = <T>(data: T) => ({
  statusCode: 200,
  data,
});

export const created = <T>(data: T) => ({
  statusCode: 201,
  data,
});

export const noContent = () => ({
  statusCode: 204,
  data: null,
});

export const badRequest = (message: string) => ({
  statusCode: 400,
  data: { error: message },
});

export const unauthorized = (message: string) => ({
  statusCode: 401,
  data: { error: message },
});

export const notFound = (message: string) => ({
  statusCode: 404,
  data: { error: message },
});

export const conflict = (message: string) => ({
  statusCode: 409,
  data: { error: message },
});

export const internalServerError = (message: string) => ({
  statusCode: 500,
  data: { error: message },
});
