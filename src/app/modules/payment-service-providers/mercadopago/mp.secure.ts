import crypto from "crypto";

export const checkMpRequest = async (
  transactionId: string,
  signature: string,
  requestId: string,
  secretKey: string
) => {
  const dataId = transactionId;
  const parts = signature.split(",");

  let ts;
  let hash;

  parts.forEach((part) => {
    const [key, value] = part.split("=");
    if (key && value) {
      const trimmedKey = key.trim();
      const trimmedValue = value.trim();
      if (trimmedKey === "ts") {
        ts = trimmedValue;
      } else if (trimmedKey === "v1") {
        hash = trimmedValue;
      }
    }
  });

  const manifest = `id:${dataId};request-id:${requestId};ts:${ts};`;

  const hmac = crypto.createHmac("sha256", secretKey);

  hmac.update(manifest);

  const sha = hmac.digest("hex");

  if (sha !== hash) {
    return false;
  }

  return true;
};
