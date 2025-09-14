import EfiPay from "sdk-typescript-apis-efi";

export const efipay = new EfiPay.default({
  client_id: process.env.EFI_PAY_CLIENT_ID,
  client_secret: process.env.EFI_PAY_CLIENT_SECRET,
  pathCert: process.env.EFI_PAY_CERT_PATH,
  sandbox: true,
});
