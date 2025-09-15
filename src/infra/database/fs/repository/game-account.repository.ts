import type { GameAccountRepositoryContract } from "@/core/contracts/game-account-repository.contract.ts";
import { randomUUID } from "crypto";
import { existsSync, writeFileSync } from "fs";

export const getUsernameSubDirectory = (username: string) =>
  username[0]?.match(/[a-z]/i) ? username[0]?.toLowerCase() : "etc";

export const gameAccountRepository: GameAccountRepositoryContract = {
  async isUsernameExists(username: string): Promise<boolean> {
    const accountSubdirectory = getUsernameSubDirectory(username);
    const accountPath = `${process.env.GAME_ACCOUNT_PATH}/${accountSubdirectory}/${username}`;
    const isAccountAlreadyCreated = existsSync(accountPath);
    return isAccountAlreadyCreated;
  },

  async addCash(username: string, amount: number): Promise<void> {
    const importCash = `${
      process.env.GAME_IMPORT_CASH_PATH
    }/${randomUUID()}.txt`;

    writeFileSync(importCash, `${username} ${amount}`);
  },
};
