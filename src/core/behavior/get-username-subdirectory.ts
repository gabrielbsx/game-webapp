export const getUsernameSubDirectory = (username: string) =>
  username[0]?.match(/[a-z]/i) ? username[0]?.toLowerCase() : "etc";
