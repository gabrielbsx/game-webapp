/**
 * KYC to get Score and other info
 */

export type KYCRequest = Readonly<{
  name: string;
  document: string;
}>;

export const getKYCInfo = async () => {};
