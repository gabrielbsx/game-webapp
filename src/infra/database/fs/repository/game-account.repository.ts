import type { GameAccountRepositoryContract } from "@/core/contracts/game-account-repository.contract.ts";
import { existsSync } from "fs";

export const getUsernameSubDirectory = (username: string) =>
  username[0]?.match(/[a-z]/i) ? username[0]?.toLowerCase() : "etc";

export const gameAccountRepository: GameAccountRepositoryContract = {
  async isUsernameExists(username: string): Promise<boolean> {
    const accountSubdirectory = getUsernameSubDirectory(username);
    const accountPath = `${process.env.GAME_ACCOUNT_PATH}/${accountSubdirectory}/${username}`;
    const isAccountAlreadyCreated = existsSync(accountPath);
    return isAccountAlreadyCreated;
  },
};
