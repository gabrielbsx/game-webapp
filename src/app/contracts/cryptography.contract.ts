export type CryptographyContract = {
  hash: (plaintext: string) => Promise<string>;
  compare: (plaintext: string, hash: string) => Promise<boolean>;
};
