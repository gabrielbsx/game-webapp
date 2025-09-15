export type GameAccountRepositoryContract = {
  isUsernameExists: (username: string) => Promise<boolean>;
  addCash: (username: string, amount: number) => Promise<void>;
};
