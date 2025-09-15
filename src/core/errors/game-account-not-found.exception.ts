import { NotFoundException } from "./generic/not-found.exception.ts";

export class GameAccountNotFoundException extends NotFoundException {
  constructor(message?: string) {
    super(message ?? "Game account not found");
    this.name = "GameAccountNotFoundException";
  }
}
