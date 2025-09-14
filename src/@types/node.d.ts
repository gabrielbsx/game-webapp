declare namespace NodeJS {
  interface ProcessEnv {
    DB_FILE_NAME: string;

    GAME_IMPORT_ACCOUNT_PATH: string;
    GAME_IMPORT_CASH_PATH: string;
    GAME_IMPORT_PASSWORD_PATH: string;
    GAME_ACCOUNT_PATH: string;

    EFI_PAY_CLIENT_ID: string;
    EFI_PAY_CLIENT_SECRET: string;
    EFI_PAY_CERT_PATH: string;
  }
}
