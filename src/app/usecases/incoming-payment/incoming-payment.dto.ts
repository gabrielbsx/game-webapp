export type IncomingPaymentDto = Readonly<{
  amount: number;
  status: string;
  externalReference: string;
}>;
