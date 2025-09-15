export type GameAccountRepositoryContract = {
  isUsernameExists: (username: string) => Promise<boolean>;
};
