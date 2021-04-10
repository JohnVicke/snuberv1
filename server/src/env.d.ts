declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    DATABASE_URL: string;
    REDIS_URL: string;
    NODE_ENV: string;
    REDIS_SECRET: string;
    CORS_ORIGIN: string;
  }
}
