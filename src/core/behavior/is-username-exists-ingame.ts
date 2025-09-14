import { existsSync } from "fs";
import { getUsernameSubDirectory } from "./get-username-subdirectory.js";

export const isUsernameExistsInGame = (username: string): boolean => {
  const accountSubdirectory = getUsernameSubDirectory(username);
  const accountPath = `${process.env.GAME_ACCOUNT_PATH}/${accountSubdirectory}/${username}`;
  const isAccountAlreadyCreated = existsSync(accountPath);
  return isAccountAlreadyCreated;
};
