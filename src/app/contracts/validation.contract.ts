export type ValidationContract<T = unknown> = {
  validate(data: unknown): Promise<T>;
};
