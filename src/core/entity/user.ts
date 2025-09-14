import { type Entity } from "./entity.js";

export type User = Readonly<{
  name: string;
  username: string;
  email: string;
  password: string;
}> &
  Entity;
