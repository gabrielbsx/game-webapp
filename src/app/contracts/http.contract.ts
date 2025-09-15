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

export type HttpMiddlewareGoNext = { next: true };

export type HttpMiddlewareResponseContract<T = unknown> =
  | HttpResponseContract<T>
  | HttpMiddlewareGoNext;

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

export const goNext = () => ({ next: true } as const);

export const isGoNext = (
  response: HttpMiddlewareResponseContract<unknown>
): response is HttpMiddlewareGoNext => "next" in response && response.next;
