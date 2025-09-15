export type Entity = Readonly<{
  id: string;
  createdAt: Date;
  updatedAt: Date | undefined;
  deletedAt: Date | undefined;
}>;
