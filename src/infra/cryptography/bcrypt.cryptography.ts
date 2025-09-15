import bcrypt from "bcrypt";
import type { CryptographyContract } from "@/app/contracts/cryptography.contract.ts";

export const cryptography: CryptographyContract = {
  async hash(value: string): Promise<string> {
    const saltRounds = bcrypt.genSaltSync(10);
    return bcrypt.hash(value, saltRounds);
  },

  async compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  },
};
