export type SubmitPaymentDto = Readonly<{
  amount: number;
  currency: string;

  payer: {
    document: string;
    name: string;
  };
}>;
