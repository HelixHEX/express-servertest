declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL: string;
    PORT: string;
    ADMINUUID: string;
    DEFAULTUUID: string;
  }
}