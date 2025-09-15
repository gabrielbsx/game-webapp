export type Entity = Readonly<{
  id: string;
  createdAt: Date;
  updatedAt: Date | null;
  deletedAt: Date | null;
}>;
