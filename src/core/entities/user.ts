import { type Entity } from "./entity.ts";

export type User = Readonly<{
  name: string;
  email: string;
  balance: number;
  inAnalysis: boolean;
  username: string;
  password: string;
}> &
  Entity;
