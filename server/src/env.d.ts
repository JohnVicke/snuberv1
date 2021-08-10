declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    DATABASE_URL: string;
    REDIS_URL: string;
    NODE_ENV: string;
    REDIS_SECRET: string;
    CORS_ORIGIN: string;
    AWS_ACCESS_KEY_ID: string;
    AWS_SECRET_ACCESS_KEY: string;
    AWS_S3_BUCKET_NAME: string;
    AWS_S3_BUCKET_REGION: string;
  }
}
