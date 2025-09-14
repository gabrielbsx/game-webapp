import { type Entity } from "./entity.ts";

export type User = Readonly<{
  name: string;
  username: string;
  email: string;
  password: string;
}> &
  Entity;
